import client from 'part:@sanity/base/client'
import { defer, concat, BehaviorSubject, Observable } from 'rxjs'
import { debounceTime, switchMap, map, distinctUntilChanged, withLatestFrom } from 'rxjs/operators'

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
