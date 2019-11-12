import React from 'react'
import UnsplashReact, { withDefaultProps } from 'unsplash-react'
import Dialog from 'part:@sanity/components/dialogs/fullscreen'
import pluginConfig from 'config:asset-source-unsplash'
import ShallowUploader from './ShallowUploader'
import { Asset, AssetDocument, UnsplashPhoto } from '../types'
import styles from './UnsplashAssetSource.css'

type Props = {
  onSelect: (assets: Asset[]) => void
  onClose: () => void
  selectedAssets?: AssetDocument[]
  selectionType: 'single' | 'multiple'
}

export default class UnsplashAssetSource extends React.Component<Props> {
  static defaultProps = {
    selectedAssets: undefined
  }

  handleSelect = (photo: UnsplashPhoto) => {
    const asset: Asset = {
      kind: 'url',
      value: photo.urls.full,
      assetDocumentProps: {
        source: 'unsplash',
        sourceId: photo.id
      }
    }
    this.props.onSelect([asset])
  }

  handleClose = () => {
    this.props.onClose()
  }

  renderConfigWarning() {
    return (
      <div>
        <h2>Missing configuration</h2>
        <p>You must first configure the plugin with your Unsplash API key</p>
        <p>Edit the <code>./config/asset-source-unsplash.json</code> file in your Sanity Studio folder.</p>
      </div>
    )
  }

  render() {
    return (
      <Dialog title="Select image from Unsplash" onClose={this.handleClose} isOpen>
        <div className={styles.root}>
          {pluginConfig.accessKey && (
            <UnsplashReact
              accessKey={pluginConfig.accessKey}
              Uploader={withDefaultProps(ShallowUploader, {})}
              onFinishedUploading={this.handleSelect}
            />
          )}
        {!pluginConfig.accessKey && this.renderConfigWarning()}
        </div>
      </Dialog>
    )
  }
}
