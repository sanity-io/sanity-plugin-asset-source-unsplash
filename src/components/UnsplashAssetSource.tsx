import React from 'react'
import Gallery from 'react-photo-gallery'
import { flatten } from 'lodash'
import { BehaviorSubject, Subscription } from 'rxjs'
import Dialog from 'part:@sanity/components/dialogs/fullscreen'
import SearchTextField from 'part:@sanity/components/textfields/search'
import { Asset, AssetDocument, UnsplashPhoto } from '../types'
import Scroller from './Scroller'
import Photo from './Photo'
import styles from './UnsplashAssetSource.css'
import { search, sanityClient } from '../datastores/unsplash'

type Props = {
  onSelect: (assets: Asset[]) => void
  onClose: () => void
  selectedAssets?: AssetDocument[]
  selectionType: 'single' | 'multiple'
}

type State = {
  query: string
  searchResults: UnsplashPhoto[][]
  page: number
  isLoading: boolean
}

const RESULTS_PER_PAGE = 42

export default class UnsplashAssetSource extends React.Component<Props, State> {
  static defaultProps = {
    selectedAssets: undefined
  }

  state = {
    query: '',
    page: 1,
    searchResults: [[]],
    isLoading: true
  }

  searchSubscription: Subscription | null = null

  searchSubject$ = new BehaviorSubject('')
  pageSubject$ = new BehaviorSubject(1)

  componentDidMount() {
    this.searchSubscription = search(this.searchSubject$, this.pageSubject$, RESULTS_PER_PAGE).subscribe({
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
    const asset: Asset = {
      kind: 'url',
      value: photo.urls.full,
      assetDocumentProps: {
        source: {
          name: 'unsplash',
          id: photo.id,
          url: photo.links.html
        },
        creditLine: `${photo.user.name} by Unsplash`
      }
    }
    this.props.onSelect([asset])
  }

  handleClose = () => {
    this.props.onClose()
  }

  handleSearchTermChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value
    this.setState({ query, page: 1, searchResults: [[]], isLoading: true })
    this.pageSubject$.next(1)
    this.searchSubject$.next(query)
  }

  handleScollerLoadMore = () => {
    const nextPage = this.state.page + 1
    this.setState({ page: nextPage, isLoading: true })
    this.pageSubject$.next(nextPage)
    this.searchSubject$.next(this.state.query)
  }

  getReferralName() {
    return `Sanity Studio Plugin for project ${sanityClient.clientConfig.projectId}`
  }

  renderImage = (props: any) => {
    const { photo } = props
    return (
      <Photo
        referralName={this.getReferralName()}
        onClick={this.handleSelect.bind(photo.data)}
        key={`Photo-${photo.data.id}`}
        data={photo.data}
        width={photo.width}
        height={photo.height}
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
                  width: 400,
                  height: Math.round((photo.height / photo.width) * 400),
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
