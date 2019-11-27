import React, { RefObject } from 'react'
import styles from './Photo.css'
import { UnsplashPhoto } from 'src/types'

type Props = {
  data: UnsplashPhoto
  width: number
  height: number
  onClick: (photo: UnsplashPhoto) => void
  onKeyDown: (event: any) => void
  active: boolean
  onFocus: (photo: UnsplashPhoto) => void
}

const UTM_SOURCE = 'sanity-plugin-asset-source-unsplash'

export default class Photo extends React.Component<Props> {
  rootElm: RefObject<HTMLAnchorElement> = React.createRef()

  handleClick = (event: any) => {
    this.props.onClick(this.props.data)
  }

  handleCreditLineClicked = (event: any) => {
    event.stopPropagation()
    const { data } = this.props
    const url = `${data.links.html}?utm_source=${encodeURIComponent(
      UTM_SOURCE
    )}&utm_medium=referral`
    window.open(url, data.id, 'noreferrer,noopener')
  }

  handleKeyDown = (event: any) => {
    const { onKeyDown, data } = this.props
    onKeyDown(event)
    if (event.keyCode === 13) {
      this.props.onClick(data)
    }
  }

  handleMouseDown = (event: any) => {
    this.props.onFocus(this.props.data)
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.active && this.props.active && this.rootElm.current) {
      this.rootElm.current.focus()
      this.props.onFocus(this.props.data)
    }
  }

  render() {
    const { width, height, data, active } = this.props
    const src = data.urls.small
    const userName = data.user.name
    return (
      <a
        ref={this.rootElm}
        href="#"
        className={`${styles.root}`}
        title={`Select image by ${userName} from Unsplash`}
        tabIndex={0}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundImage: `url("${src}")`
        }}
        onClick={this.handleClick}
      >
        <div className={styles.creditLine} onClick={this.handleCreditLineClicked}>
          <div
            className={styles.creditLineLink}
            title={`Open image by ${userName} on Unsplash in new window`}
          >
            By @{data.user.username}
          </div>
        </div>
      </a>
    )
  }
}
