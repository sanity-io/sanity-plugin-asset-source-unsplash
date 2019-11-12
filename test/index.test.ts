import index from '../src/index'
import AssetSource from '../src/components/UnsplashAssetSource'

describe('index', () => {
  it('has a name', () => {
    expect(index.name).toBe('unsplash')
  })
  it('has a component', () => {
    expect(index.component).toBe(AssetSource)
  })
})
