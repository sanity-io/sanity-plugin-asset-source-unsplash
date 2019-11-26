import React from 'react'
import styles from './Photo.css'
import { UnsplashPhoto } from 'src/types'

type Props = {
  data: UnsplashPhoto
  width: number
  height: number
  onClick: (data: UnsplashPhoto) => void
}

export default class Photo extends React.Component<Props> {
  handleClick = () => {
    this.props.onClick(this.props.data)
  }
  render() {
    const { width, height, data } = this.props
    const src = data.urls.small
    return (
      <div className={styles.root} style={{width: `${width}px`, height: `${height}px`}}>
        <img
          className={styles.image}
          src={src}
          width={width}
          height={height}
          onClick={this.handleClick}
        />
        <div className={styles.creditLine}>
          <a href={data.links.html} target="_blank" rel="notopopener noreferrer">
            By @{data.user.username}
          </a>
        </div>
      </div>
    )
  }
}
