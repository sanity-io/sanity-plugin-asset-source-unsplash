import AssetSource from '../src/components/UnsplashAssetSource'

describe('AssetSource', () => {
  it('AssetSource is instantiable', () => {
    expect(
      new AssetSource({
        onSelect: () => void 0,
        onClose: () => void 0,
        selectionType: 'single'
      })
    ).toBeInstanceOf(AssetSource)
  })
})
