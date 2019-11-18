import React from 'react'
import { UnsplashPhoto } from '../types'

// A "Uploader" component for 'unsplash-react' that will just return
// the API result for the selected image, so we can access that in our plugin's onSelect method.
export default class APIResultUploader extends React.Component<any> {
  componentDidUpdate(prevProps: any) {
    const nextPhoto: UnsplashPhoto | undefined = this.props.unsplashPhoto
    const prevPhoto: UnsplashPhoto | undefined = prevProps.unsplashPhoto
    if ((prevPhoto && prevPhoto.id) === (nextPhoto && nextPhoto.id)) return
    if (nextPhoto) {
      this.props.onFinishedUploading(nextPhoto)
    }
  }
  render() {
    return null
  }
}
