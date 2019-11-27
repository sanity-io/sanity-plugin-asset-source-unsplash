import React from 'react'
import Gallery from 'react-photo-gallery'
import { flatten } from 'lodash'
import { BehaviorSubject, Subscription } from 'rxjs'
import Dialog from 'part:@sanity/components/dialogs/fullscreen'
import SearchTextField from 'part:@sanity/components/textfields/search'
import { Asset, AssetDocument, UnsplashPhoto, SanityDocument } from '../types'
import Scroller from './Scroller'
import Photo from './Photo'
import styles from './UnsplashAssetSource.css'
import { search, fetchDownloadUrl, sanityClient } from '../datastores/unsplash'

type Props = {
  onSelect: (assets: Asset[]) => void
  onClose: () => void
  selectedAssets?: AssetDocument[]
  selectionType: 'single' | 'multiple'
  document?: SanityDocument
}

type State = {
  query: string
  searchResults: UnsplashPhoto[][]
  page: number
  isLoading: boolean
  cursor: number
}

const RESULTS_PER_PAGE = 42
const GALLERY_PHOTO_WIDTH = 400

export default class UnsplashAssetSource extends React.Component<Props, State> {
  static defaultProps = {
    selectedAssets: undefined
  }

  state = {
    cursor: 0,
    query: '',
    page: 1,
    searchResults: [[]],
    isLoading: true
  }

  searchSubscription: Subscription | null = null

  searchSubject$ = new BehaviorSubject('')
  pageSubject$ = new BehaviorSubject(1)

  componentDidMount() {
    this.searchSubscription = search(
      this.searchSubject$,
      this.pageSubject$,
      RESULTS_PER_PAGE
    ).subscribe({
      next: (results: UnsplashPhoto[]) => {
        const searchResults = [...this.state.searchResults, results]
        this.setState({
          searchResults,
          isLoading: false
        })
      }
    })
  }

  componentWillUnmount() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe()
    }
  }
  handleSelect = (photo: UnsplashPhoto) => {
    this.setState({isLoading: true})
    return fetchDownloadUrl(photo).then(downloadUrl => {
      const description = photo.description || undefined
      const asset: Asset = {
        kind: 'url',
        value: downloadUrl,
        assetDocumentProps: {
          source: {
            name: 'unsplash',
            id: photo.id,
            url: photo.links.html
          },
          description,
          creditLine: `${photo.user.name} by Unsplash`
        }
      }
      this.props.onSelect([asset])
    })
  }

  handleClose = () => {
    this.props.onClose()
  }

  handleSearchTermChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value
    this.setState({ query, page: 1, searchResults: [[]], isLoading: true, cursor: 0 })
    this.pageSubject$.next(1)
    this.searchSubject$.next(query)
  }

  handleScollerLoadMore = () => {
    const nextPage = this.state.page + 1
    this.setState({ page: nextPage, isLoading: true })
    this.pageSubject$.next(nextPage)
    this.searchSubject$.next(this.state.query)
  }

  handleKeyDown = (event: any) => {
    const { cursor } = this.state
    if ((event.keyCode === 38 || event.keyCode === 37) && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }))
    } else if (
      (event.keyCode === 40 || event.keyCode === 39) &&
      cursor < this.getPhotos().length - 1
    ) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }))
    }
  }

  getPhotos() {
    return flatten(this.state.searchResults)
  }

  updateCursor = (photo: UnsplashPhoto) => {
    const index = this.getPhotos().findIndex((result: UnsplashPhoto) => result.id === photo.id)
    this.setState({ cursor: index })
  }

  renderImage = (props: any) => {
    const { photo } = props
    const active =
      this.getPhotos().findIndex((result: UnsplashPhoto) => result.id === photo.data.id) ===
        this.state.cursor || false
    return (
      <Photo
        onClick={this.handleSelect.bind(photo.data)}
        onKeyDown={this.handleKeyDown}
        key={`Photo-${photo.data.id}`}
        data={photo.data}
        width={photo.width}
        height={photo.height}
        active={active}
        onFocus={this.updateCursor}
      />
    )
  }

  render() {
    const { query, searchResults, isLoading } = this.state
    return (
      <Dialog title="Select image from Unsplash" onClose={this.handleClose} isOpen>
        <div className={styles.root}>
          <SearchTextField
            label="Search Unsplash.com"
            placeholder="Topics or colors"
            value={query}
            onChange={this.handleSearchTermChanged}
          />
          <Scroller onLoad={this.handleScollerLoadMore} name={query} isLoading={isLoading}>
            {!isLoading && flatten(searchResults).length === 0 && <div>No results found</div>}
            {searchResults.map((photos: UnsplashPhoto[], index) => (
              <Gallery
                key={`gallery-${query || 'popular'}-${index}`}
                photos={photos.map((photo: UnsplashPhoto) => ({
                  src: photo.urls.small,
                  width: GALLERY_PHOTO_WIDTH,
                  height: Math.round((photo.height / photo.width) * GALLERY_PHOTO_WIDTH),
                  key: photo.id,
                  data: photo
                }))}
                renderImage={this.renderImage}
              />
            ))}
          </Scroller>
        </div>
      </Dialog>
    )
  }
}
