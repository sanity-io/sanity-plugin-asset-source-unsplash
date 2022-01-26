export type Asset = {
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
    user?: {
      name?: string
      username?: string
      links?: {
        html?: string
      }
    }
  }
}

export type AssetDocument = {
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
  user?: {
    name?: string
    username?: string
    links?: {
      html?: string
    }
  }
}

export type SanityDocument = {
  _id: string
  _rev?: string
  _updatedAt?: string
  [attribute: string]: any
}

export type UnsplashPhoto = {
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
