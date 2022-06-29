import client from 'part:@sanity/base/client'
import { defer, concat, BehaviorSubject, Observable } from 'rxjs'
import { debounceTime, switchMap, map, distinctUntilChanged, withLatestFrom } from 'rxjs/operators'
import { UnsplashPhoto } from 'src/types'

type SearchSubject = BehaviorSubject<string>
type PageSubject = BehaviorSubject<number>

let token: string | undefined
const projectId = client?.clientConfig?.projectId

if (!projectId) console.error('Unsplash asset source could not get project ID from client')

// For other browsers than Chrome we need to explicitly set the auth token,
// similarly to https://github.com/sanity-io/sanity/pull/3155
if (projectId && typeof window !== 'undefined' && !!localStorage) {
  const localStorageToken = localStorage.getItem(`__studio_auth_token_${projectId}`)
  try {
    token = localStorageToken ? JSON.parse(localStorageToken)?.token : undefined
  } catch (err) {
    console.error('Could not parse Sanity auth token from localStorage:', err)
  }
}

const requestConfig = {
  withCredentials: true,
  method: 'GET',
  token
}

const fetchSearch = (query: string, page: number, perPage: number): Observable<any> =>
  defer(() =>
    client.observable.request({
      url: `/addons/unsplash/search/photos?query=${encodeURIComponent(
        query
      )}&page=${page}&per_page=${perPage}`,
      ...requestConfig
    })
  )

const fetchList = (type: string, page: number, perPage: number): Observable<any> =>
  defer(() =>
    client.observable.request({
      url: `/addons/unsplash/photos?order_by=${type}&page=${page}&per_page=${perPage}`,
      ...requestConfig
    })
  )

export function fetchDownloadUrl(photo: UnsplashPhoto): Promise<string> {
  const downloadUrl = photo.links.download_location.replace(
    'https://api.unsplash.com',
    '/addons/unsplash'
  )
  return client
    .request({
      url: downloadUrl,
      ...requestConfig
    })
    .then((result: { url: string }) => {
      return result.url
    })
}

export const sanityClient = client

export const search = (
  query: SearchSubject,
  page: PageSubject,
  resultsPerPage: number
): Observable<any> => {
  return concat(
    query.pipe(
      withLatestFrom(page),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(([q, p]) => {
        if (q) {
          return fetchSearch(q, p, resultsPerPage).pipe(
            distinctUntilChanged(),
            map(result => result.results)
          )
        }
        return fetchList('popular', p, resultsPerPage)
      })
    )
  )
}
