import { AssetSource } from 'sanity'
import { Plugin as Plugin_2 } from 'sanity'

/**
 * @public
 */
export declare interface Asset {
  kind: 'url' | 'base64' | 'file' | 'assetDocumentId'
  value: string | File
  assetDocumentProps?: {
    originalFileName?: string
    label?: string
    title?: string
    description?: string
    source?: {
      id: string
      name: string
      url?: string
    }
    creditLine?: string
  }
}

/**
 * @public
 */
export declare interface AssetDocument {
  _id: string
  label?: string
  title?: string
  description?: string
  source?: {
    id: string
    name: string
    url?: string
  }
  creditLine?: string
  originalFilename?: string
}

/**
 * @public
 */
export declare const unsplashAssetSource: AssetSource

/**
 * @public
 */
export declare const unsplashImageAsset: Plugin_2<void>

/**
 * @public
 */
export declare interface UnsplashPhoto {
  id: string
  width: number
  height: number
  description?: string
  alt_description?: string
  urls: {
    full: string
    small: string
  }
  user: {
    name: string
    username: string
    links: {
      html: string
    }
  }
  links: {
    html: string
    self: string
    download: string
    download_location: string
  }
}

export {}
