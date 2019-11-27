import client from 'part:@sanity/base/client'
import { defer, concat, BehaviorSubject, Observable } from 'rxjs'
import { debounceTime, switchMap, map, distinctUntilChanged, withLatestFrom } from 'rxjs/operators'
import { UnsplashPhoto } from 'src/types'

type SearchSubject = BehaviorSubject<string>
type PageSubject = BehaviorSubject<number>

const fetchSearch = (query: string, page: number, perPage: number): Observable<any> =>
  defer(() =>
    client.observable.request({
      url: `/addons/unsplash/search/photos?query=${encodeURIComponent(
        query
      )}&page=${page}&per_page=${perPage}`,
      withCredentials: true,
      method: 'GET'
    })
  )

const fetchList = (type: string, page: number, perPage: number): Observable<any> =>
  defer(() =>
    client.observable.request({
      url: `/addons/unsplash/photos?order_by=${type}&page=${page}&per_page=${perPage}`,
      withCredentials: true,
      method: 'GET'
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
      withCredentials: true,
      method: 'GET'
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
