import React, { RefObject } from 'react'
import { debounce } from 'lodash'
import styles from './Scroller.css'
import Spinner from 'part:@sanity/components/loading/spinner'

type Props = {
  onLoad: () => void
  name: string
  children: React.ReactNode
  isLoading: boolean
}

type State = {
  lastScrollHeight: number
}

export default class Scroller extends React.Component<Props, State> {
  scroll: void | null = null
  rootElm: RefObject<HTMLDivElement> = React.createRef()
  scrollElm: RefObject<HTMLDivElement> = React.createRef()
  state = {
    lastScrollHeight: 0
  }

  componentDidMount() {
    if (this.rootElm.current && this.scrollElm.current) {
      const rootElm = this.rootElm.current
      const scrollElm = this.scrollElm.current
      this.scroll = this.rootElm.current.addEventListener(
        'scroll',
        debounce(() => {
          if (
            rootElm.scrollTop + rootElm.offsetHeight >= scrollElm.scrollHeight - 1200 &&
            scrollElm.scrollHeight !== this.state.lastScrollHeight
          ) {
            this.props.onLoad()
            this.setState({ lastScrollHeight: scrollElm.scrollHeight })
          }
        }, 100)
      )
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.name !== this.props.name && this.rootElm.current) {
      this.rootElm.current.scrollTo(0, 0)
    }
  }

  componentWillUnmount() {
    if (this.scroll) {
      document.removeEventListener('scroll', this.scroll)
    }
  }

  render() {
    const { isLoading } = this.props
    return (
      <div className={styles.root} ref={this.rootElm}>
        <div className={styles.content} ref={this.scrollElm}>
          {this.props.children}
          {isLoading && (
            <Spinner center />
          )}
        </div>
      </div>
    )
  }
}
