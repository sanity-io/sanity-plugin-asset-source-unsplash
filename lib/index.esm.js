var e, t, n, r, o, s
function i(e, t) {
  var n = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e)
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable
      })),
      n.push.apply(n, r)
  }
  return n
}
function a(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {}
    t % 2
      ? i(Object(n), !0).forEach(function (t) {
          c(e, t, n[t])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : i(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
        })
  }
  return e
}
function c(e, t, n) {
  return (
    (t = (function (e) {
      var t = (function (e, t) {
        if ('object' != typeof e || null === e) return e
        var n = e[Symbol.toPrimitive]
        if (void 0 !== n) {
          var r = n.call(e, t || 'default')
          if ('object' != typeof r) return r
          throw new TypeError('@@toPrimitive must return a primitive value.')
        }
        return ('string' === t ? String : Number)(e)
      })(e, 'string')
      return 'symbol' == typeof t ? t : String(t)
    })(t)) in e
      ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
      : (e[t] = n),
    e
  )
}
function l(e, t) {
  return (
    t || (t = e.slice(0)),
    Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }))
  )
}
import { jsx as h, jsxs as u } from 'react/jsx-runtime'
import d, { useRef as p, useCallback as m, useEffect as g } from 'react'
import b from 'react-photo-album'
import f from 'lodash/flatten'
import { concat as y, defer as v, BehaviorSubject as w } from 'rxjs'
import {
  Card as S,
  useTheme as x,
  Text as j,
  Stack as C,
  Dialog as P,
  TextInput as k,
  Flex as O,
  Spinner as D,
} from '@sanity/ui'
import T from 'styled-components'
import {
  withLatestFrom as z,
  debounceTime as L,
  distinctUntilChanged as U,
  switchMap as R,
  map as q,
} from 'rxjs/operators'
import I from 'react-infinite-scroll-component'
import { useClient as $, definePlugin as M } from 'sanity'
const _ = T.div(
    e ||
      (e = l([
        '\n  overflow: hidden;\n  background-origin: content-box;\n  background-repeat: no-repeat;\n  background-clip: border-box;\n  background-size: cover;\n  position: relative;\n  outline: none !important;\n  border: ',
        ';\n  box-sizing: content-box;\n  user-drag: none;\n\n  &:hover {\n    opacity: 0.85;\n  }\n\n  &:focus,\n  &:active {\n    border: 1px solid var(--input-border-color-focus);\n    box-shadow: inset 0 0 0 3px var(--input-border-color-focus);\n  }\n',
      ])),
    (e) => {
      let { studioTheme: t } = e
      return '1px solid '.concat(t.color.card.enabled.border)
    }
  ),
  E = T.a(t || (t = l(['\n  text-decoration: none;\n  cursor: pointer;\n']))),
  K = T(S)(
    n ||
      (n = l([
        '\n  ',
        ";\n  user-drag: none;\n  position: absolute;\n  background-color: var(--creditline-bg);\n  bottom: 0;\n\n  [data-ui='Text'] {\n    color: var(--creditline-fg);\n  }\n",
      ])),
    (e) => {
      let { theme: t } = e
      return '\n     --creditline-fg: '
        .concat(t.sanity.color.card.enabled.fg, ';\n     --creditline-bg: ')
        .concat(t.sanity.color.card.enabled.bg, ';\n   ')
    }
  )
function V(e) {
  const { onClick: t, data: n, onKeyDown: r, onFocus: o, active: s, width: i, height: a } = e,
    c = p(null),
    l = p(!1),
    d = m(() => {
      t(n)
    }, [t, n]),
    b = m(
      (e) => {
        e.stopPropagation()
        const t = ''
          .concat(n.links.html, '?utm_source=')
          .concat(encodeURIComponent('sanity-plugin-asset-source-unsplash'), '&utm_medium=referral')
        window.open(t, n.id, 'noreferrer,noopener')
      },
      [n]
    ),
    f = m(
      (e) => {
        r(e), 13 === e.keyCode && t(n)
      },
      [r, n, t]
    ),
    y = m(() => {
      o(n)
    }, [o, n])
  g(() => {
    !l.current && s && c.current && (c.current.focus(), o(n)), (l.current = s)
  }, [s])
  const v = n.urls.small,
    w = n.user.name,
    S = x().sanity
  return h(_, {
    ref: c,
    studioTheme: S,
    title: 'Select image by '.concat(w, ' from Unsplash'),
    tabIndex: 0,
    onKeyDown: f,
    onMouseDown: y,
    style: {
      width: ''.concat(i, 'px'),
      height: ''.concat(a, 'px'),
      backgroundImage: 'url("'.concat(v, '")'),
    },
    onClick: d,
    children: h(E, {
      onClick: b,
      children: h(K, {
        padding: 2,
        radius: 2,
        margin: 2,
        children: u(j, {
          size: 1,
          title: 'Open image by '.concat(w, ' on Unsplash in new window'),
          children: ['By @', n.user.username],
        }),
      }),
    }),
  })
}
const B = (e, t, n, r) =>
    y(
      t.pipe(
        z(n),
        L(500),
        U(),
        R((t) => {
          let [n, o] = t
          return n
            ? ((e, t, n, r) =>
                v(() =>
                  e.observable.request({
                    url: '/addons/unsplash/search/photos?query='
                      .concat(encodeURIComponent(t), '&page=')
                      .concat(n, '&per_page=')
                      .concat(r),
                    withCredentials: !0,
                    method: 'GET',
                  })
                ))(e, n, o, r).pipe(
                U(),
                q((e) => e.results)
              )
            : ((e, t, n, r) =>
                v(() =>
                  e.observable.request({
                    url: '/addons/unsplash/photos?order_by='
                      .concat(t, '&page=')
                      .concat(n, '&per_page=')
                      .concat(r),
                    withCredentials: !0,
                    method: 'GET',
                  })
                ))(e, 'popular', o, r)
        })
      )
    ),
  G = T(C)(r || (r = l(['\n  position: sticky;\n  top: 0;\n  z-index: 1;\n'])))
T.div(o || (o = l(['\n  overflow-y: auto;\n  max-height: 80vh;\n'])))
class H extends d.Component {
  constructor() {
    super(...arguments),
      (this.state = { cursor: 0, query: '', page: 1, searchResults: [[]], isLoading: !0 }),
      (this.searchSubscription = null),
      (this.searchSubject$ = new w('')),
      (this.pageSubject$ = new w(1)),
      (this.handleSelect = (e) => (
        this.setState({ isLoading: !0 }),
        (function (e, t) {
          const n = t.links.download_location.replace(
            'https://api.unsplash.com',
            '/addons/unsplash'
          )
          return e.request({ url: n, withCredentials: !0, method: 'GET' }).then((e) => e.url)
        })(this.props.client, e).then((t) => {
          const n = e.description || void 0,
            r = {
              kind: 'url',
              value: t,
              assetDocumentProps: {
                _type: 'sanity.imageAsset',
                source: { name: 'unsplash', id: e.id, url: e.links.html },
                description: n,
                creditLine: ''.concat(e.user.name, ' by Unsplash'),
              },
            }
          this.props.onSelect([r])
        })
      )),
      (this.handleClose = () => {
        this.props.onClose()
      }),
      (this.handleSearchTermChanged = (e) => {
        const t = e.currentTarget.value
        this.setState({ query: t, page: 1, searchResults: [[]], isLoading: !0, cursor: 0 }),
          this.pageSubject$.next(1),
          this.searchSubject$.next(t)
      }),
      (this.handleScollerLoadMore = () => {
        const e = this.state.page + 1
        this.setState({ page: e, isLoading: !0 }),
          this.pageSubject$.next(e),
          this.searchSubject$.next(this.state.query)
      }),
      (this.handleKeyDown = (e) => {
        const { cursor: t } = this.state
        ;(38 === e.keyCode || 37 === e.keyCode) && t > 0
          ? this.setState((e) => ({ cursor: e.cursor - 1 }))
          : (40 === e.keyCode || 39 === e.keyCode) &&
            t < this.getPhotos().length - 1 &&
            this.setState((e) => ({ cursor: e.cursor + 1 }))
      }),
      (this.updateCursor = (e) => {
        const t = this.getPhotos().findIndex((t) => t.id === e.id)
        this.setState({ cursor: t })
      }),
      (this.renderImage = (e) => {
        const { photo: t, layout: n } = e,
          r = this.getPhotos().findIndex((e) => e.id === t.data.id) === this.state.cursor || !1
        return h(V, {
          onClick: this.handleSelect.bind(t.data),
          onKeyDown: this.handleKeyDown,
          data: t.data,
          width: n.width,
          height: n.height,
          active: r,
          onFocus: this.updateCursor,
        })
      })
  }
  componentDidMount() {
    this.searchSubscription = B(
      this.props.client,
      this.searchSubject$,
      this.pageSubject$,
      42
    ).subscribe({
      next: (e) => {
        this.setState((t) => ({ searchResults: [...t.searchResults, e], isLoading: !1 }))
      },
    })
  }
  componentWillUnmount() {
    this.searchSubscription && this.searchSubscription.unsubscribe()
  }
  getPhotos() {
    return f(this.state.searchResults)
  }
  render() {
    const { query: e, searchResults: t, isLoading: n } = this.state
    return h(P, {
      id: 'unsplash-asset-source',
      header: 'Select image from Unsplash',
      onClose: this.handleClose,
      open: !0,
      width: 4,
      children: u(C, {
        space: 3,
        padding: 4,
        children: [
          h(S, {
            children: u(G, {
              space: 3,
              children: [
                h(j, { size: 1, weight: 'semibold', children: 'Search Unsplash' }),
                h(k, {
                  label: 'Search Unsplash.com',
                  placeholder: 'Topics or colors',
                  value: e,
                  onChange: this.handleSearchTermChanged,
                }),
              ],
            }),
          }),
          !n &&
            0 === this.getPhotos().length &&
            h(j, { size: 1, muted: !0, children: 'No results found' }),
          h(I, {
            dataLength: this.getPhotos().length,
            next: this.handleScollerLoadMore,
            hasMore: !0,
            scrollThreshold: 0.99,
            height: '60vh',
            loader: h(O, {
              align: 'center',
              justify: 'center',
              padding: 3,
              children: h(D, { muted: !0 }),
            }),
            endMessage: h(j, { size: 1, muted: !0, children: 'No more results' }),
            children: t
              .filter((e) => e.length > 0)
              .map((t, n) =>
                h(
                  b,
                  {
                    layout: 'rows',
                    spacing: 2,
                    padding: 1,
                    targetRowHeight: (e) => (e < 300 ? 150 : e < 600 ? 200 : 300),
                    photos: t.map((e) => ({
                      src: e.urls.small,
                      width: e.width,
                      height: e.height,
                      key: e.id,
                      data: e,
                    })),
                    renderPhoto: this.renderImage,
                    componentsProps: {
                      containerProps: { style: { marginBottom: ''.concat(2, 'px') } },
                    },
                  },
                  'gallery-'.concat(e || 'popular', '-').concat(n)
                )
              ),
          }),
        ],
      }),
    })
  }
}
H.defaultProps = { selectedAssets: void 0 }
const N = T.svg(s || (s = l(['\n  transform: scale(0.8);\n  transform-origin: top;\n'])))
const A = {
    name: 'unsplash',
    title: 'Unsplash',
    component: function (e) {
      const t = $({ apiVersion: '2022-09-01' })
      return h(H, a(a({}, e), {}, { client: t }))
    },
    icon: function () {
      return u(N, {
        role: 'img',
        viewBox: '0 0 24 24',
        width: '1em',
        height: '1em',
        fill: 'currentColor',
        children: [
          h('title', {}),
          h('path', { d: 'M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z' }),
        ],
      })
    },
  },
  F = M({
    name: 'asset-source-unsplash-plugin',
    form: { image: { assetSources: (e) => [...e, A] } },
  })
export { A as unsplashAssetSource, F as unsplashImageAsset }
//# sourceMappingURL=index.esm.js.map
