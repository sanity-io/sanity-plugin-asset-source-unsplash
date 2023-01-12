'use strict'
var e, t, n, r, s, o
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
Object.defineProperty(exports, '__esModule', { value: !0 })
var u = require('react/jsx-runtime'),
  h = require('react'),
  d = require('react-photo-album'),
  p = require('lodash/flatten'),
  g = require('rxjs'),
  b = require('@sanity/ui'),
  m = require('styled-components'),
  f = require('rxjs/operators'),
  x = require('react-infinite-scroll-component'),
  y = require('sanity')
function j(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var v = j(h),
  w = j(d),
  S = j(p),
  C = j(m),
  k = j(x)
const P = C.default.div(
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
  O = C.default.a(t || (t = l(['\n  text-decoration: none;\n  cursor: pointer;\n']))),
  T = C.default(b.Card)(
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
function q(e) {
  const { onClick: t, data: n, onKeyDown: r, onFocus: s, active: o, width: i, height: a } = e,
    c = h.useRef(null),
    l = h.useRef(!1),
    d = h.useCallback(() => {
      t(n)
    }, [t, n]),
    p = h.useCallback(
      (e) => {
        e.stopPropagation()
        const t = ''
          .concat(n.links.html, '?utm_source=')
          .concat(encodeURIComponent('sanity-plugin-asset-source-unsplash'), '&utm_medium=referral')
        window.open(t, n.id, 'noreferrer,noopener')
      },
      [n]
    ),
    g = h.useCallback(
      (e) => {
        r(e), 13 === e.keyCode && t(n)
      },
      [r, n, t]
    ),
    m = h.useCallback(() => {
      s(n)
    }, [s, n])
  h.useEffect(() => {
    !l.current && o && c.current && (c.current.focus(), s(n)), (l.current = o)
  }, [o])
  const f = n.urls.small,
    x = n.user.name,
    y = b.useTheme().sanity
  return u.jsx(P, {
    ref: c,
    studioTheme: y,
    title: 'Select image by '.concat(x, ' from Unsplash'),
    tabIndex: 0,
    onKeyDown: g,
    onMouseDown: m,
    style: {
      width: ''.concat(i, 'px'),
      height: ''.concat(a, 'px'),
      backgroundImage: 'url("'.concat(f, '")'),
    },
    onClick: d,
    children: u.jsx(O, {
      onClick: p,
      children: u.jsx(T, {
        padding: 2,
        radius: 2,
        margin: 2,
        children: u.jsxs(b.Text, {
          size: 1,
          title: 'Open image by '.concat(x, ' on Unsplash in new window'),
          children: ['By @', n.user.username],
        }),
      }),
    }),
  })
}
const D = (e, t, n, r) =>
    g.concat(
      t.pipe(
        f.withLatestFrom(n),
        f.debounceTime(500),
        f.distinctUntilChanged(),
        f.switchMap((t) => {
          let [n, s] = t
          return n
            ? ((e, t, n, r) =>
                g.defer(() =>
                  e.observable.request({
                    url: '/addons/unsplash/search/photos?query='
                      .concat(encodeURIComponent(t), '&page=')
                      .concat(n, '&per_page=')
                      .concat(r),
                    withCredentials: !0,
                    method: 'GET',
                  })
                ))(e, n, s, r).pipe(
                f.distinctUntilChanged(),
                f.map((e) => e.results)
              )
            : ((e, t, n, r) =>
                g.defer(() =>
                  e.observable.request({
                    url: '/addons/unsplash/photos?order_by='
                      .concat(t, '&page=')
                      .concat(n, '&per_page=')
                      .concat(r),
                    withCredentials: !0,
                    method: 'GET',
                  })
                ))(e, 'popular', s, r)
        })
      )
    ),
  U = C.default(b.Stack)(r || (r = l(['\n  position: sticky;\n  top: 0;\n  z-index: 1;\n'])))
C.default.div(s || (s = l(['\n  overflow-y: auto;\n  max-height: 80vh;\n'])))
class z extends v.default.Component {
  constructor() {
    super(...arguments),
      (this.state = { cursor: 0, query: '', page: 1, searchResults: [[]], isLoading: !0 }),
      (this.searchSubscription = null),
      (this.searchSubject$ = new g.BehaviorSubject('')),
      (this.pageSubject$ = new g.BehaviorSubject(1)),
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
        return u.jsx(q, {
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
    this.searchSubscription = D(
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
    return S.default(this.state.searchResults)
  }
  render() {
    const { query: e, searchResults: t, isLoading: n } = this.state
    return u.jsx(b.Dialog, {
      id: 'unsplash-asset-source',
      header: 'Select image from Unsplash',
      onClose: this.handleClose,
      open: !0,
      width: 4,
      children: u.jsxs(b.Stack, {
        space: 3,
        padding: 4,
        children: [
          u.jsx(b.Card, {
            children: u.jsxs(U, {
              space: 3,
              children: [
                u.jsx(b.Text, { size: 1, weight: 'semibold', children: 'Search Unsplash' }),
                u.jsx(b.TextInput, {
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
            u.jsx(b.Text, { size: 1, muted: !0, children: 'No results found' }),
          u.jsx(k.default, {
            dataLength: this.getPhotos().length,
            next: this.handleScollerLoadMore,
            hasMore: !0,
            scrollThreshold: 0.99,
            height: '60vh',
            loader: u.jsx(b.Flex, {
              align: 'center',
              justify: 'center',
              padding: 3,
              children: u.jsx(b.Spinner, { muted: !0 }),
            }),
            endMessage: u.jsx(b.Text, { size: 1, muted: !0, children: 'No more results' }),
            children: t
              .filter((e) => e.length > 0)
              .map((t, n) =>
                u.jsx(
                  w.default,
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
z.defaultProps = { selectedAssets: void 0 }
const L = C.default.svg(o || (o = l(['\n  transform: scale(0.8);\n  transform-origin: top;\n'])))
const R = {
    name: 'unsplash',
    title: 'Unsplash',
    component: function (e) {
      const t = y.useClient({ apiVersion: '2022-09-01' })
      return u.jsx(z, a(a({}, e), {}, { client: t }))
    },
    icon: function () {
      return u.jsxs(L, {
        role: 'img',
        viewBox: '0 0 24 24',
        width: '1em',
        height: '1em',
        fill: 'currentColor',
        children: [
          u.jsx('title', {}),
          u.jsx('path', { d: 'M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z' }),
        ],
      })
    },
  },
  I = y.definePlugin({
    name: 'asset-source-unsplash-plugin',
    form: { image: { assetSources: (e) => [...e, R] } },
  })
;(exports.unsplashAssetSource = R), (exports.unsplashImageAsset = I)
//# sourceMappingURL=index.js.map
