import React from 'react'
import {UnsplashPhoto} from '../types'

export default class ShallowUploader extends React.Component<any> {
  componentWillReceiveProps(nextProps: any) {
    const prevPhoto: UnsplashPhoto | undefined = this.props.unsplashPhoto
    const nextPhoto: UnsplashPhoto | undefined = nextProps.unsplashPhoto
    if ((prevPhoto && prevPhoto.id) === (nextPhoto && nextPhoto.id)) return
    if (nextPhoto) {
      this.props.onFinishedUploading(nextPhoto)
    }
  }
  render() {
    return null
  }
}
