import Unsplash from './components/UnsplashAssetSource'
import Icon from './components/Icon'
import { createPlugin, AssetSource } from 'sanity'

export type { UnsplashPhoto, Asset, AssetDocument } from './types'

/**
 * @public
 */
export const unsplashAssetSource: AssetSource = {
  name: 'unsplash',
  title: 'Unsplash',
  component: Unsplash,
  icon: Icon,
}

/**
 * @public
 */
export const unsplashImageAsset = createPlugin({
  name: 'asset-source-unsplash-plugin',

  form: {
    image: {
      assetSources: (prev) => {
        return [...prev, unsplashAssetSource]
      },
    },
  },
})
