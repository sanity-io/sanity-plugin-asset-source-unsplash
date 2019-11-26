import React from 'react'
import styles from './Photo.css'
import { UnsplashPhoto } from 'src/types'

type Props = {
  data: UnsplashPhoto
  width: number
  height: number
  onClick: (data: UnsplashPhoto) => void
  referralName: string
}

export default class Photo extends React.Component<Props> {
  handleClick = (event: any) => {
    this.props.onClick(this.props.data)
  }
  handleCreditLineClicked = (event: any) => {
    event.stopPropagation()
    const { data, referralName } = this.props
    const url = `${data.links.html}?utm_source=${encodeURIComponent(referralName)}&utm_medium=referral`
    window.open(url)
  }

  render() {
    const { width, height, data } = this.props
    const src = data.urls.small
    const userName = data.user.name
    return (
      <div
        className={styles.root}
        style={{ width: `${width}px`, height: `${height}px` }}
        title={`Select image by ${userName} from Unsplash`}
      >
        <img
          className={styles.image}
          src={src}
          width={width}
          height={height}
          onClick={this.handleClick}
        />
        <div className={styles.creditLine} onClick={this.handleCreditLineClicked}>
          <div className={styles.creditLineLink} title={`Open image by ${userName} on Unsplash in new window`}>
            By @{data.user.username}
          </div>
        </div>
      </div>
    )
  }
}
