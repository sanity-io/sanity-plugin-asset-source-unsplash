export type Asset = {
  kind: 'url' | 'base64' | 'file' | 'assetDocumentId'
  value: string | File
  assetDocumentProps?: {
    originalFileName?: string
    label?: string
    source?: string
    sourceId?: string
  }
}

export type AssetDocument = {
  _id: string
  label?: string
  source?: string
  sourceId?: string
  originalFilename?: string
}

export type UnsplashPhoto = {
  id: string,
  urls: {
    full: string
  }
}
