import { Text, useTheme } from '@sanity/ui'
import React, { useCallback, useEffect, useRef } from 'react'
import { UnsplashPhoto } from 'src/types'
import { CreditLine, CreditLineLink, Root } from './Photo.styled'

type Props = {
  data: UnsplashPhoto
  width: number
  height: number
  onClick: (photo: UnsplashPhoto) => void
  onKeyDown: (event: any) => void
  active: boolean
  onFocus: (photo: UnsplashPhoto) => void
}

const UTM_SOURCE = 'sanity-plugin-asset-source-unsplash'

export default function Photo(props: Props) {
  const { onClick, data, onKeyDown, onFocus, active, width, height } = props
  const rootElm = useRef<HTMLDivElement>(null)
  const prevActive = useRef<boolean>(false)

  const handleClick = useCallback(() => {
    onClick(data)
  }, [onClick, data])

  const handleCreditLineClicked = useCallback(
    (event: any) => {
      event.stopPropagation()
      const url = `${data.links.html}?utm_source=${encodeURIComponent(
        UTM_SOURCE
      )}&utm_medium=referral`
      window.open(url, data.id, 'noreferrer,noopener')
    },
    [data]
  )

  const handleKeyDown = useCallback(
    (event: any) => {
      onKeyDown(event)
      if (event.keyCode === 13) {
        onClick(data)
      }
    },
    [onKeyDown, data, onClick]
  )

  const handleMouseDown = useCallback(() => {
    onFocus(data)
  }, [onFocus, data])

  useEffect(() => {
    if (!prevActive.current && active && rootElm.current) {
      rootElm.current.focus()
      onFocus(data)
    }
    prevActive.current = active
    // data changing alone should not re-trigger effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const src = data.urls.small
  const userName = data.user.name

  const theme = useTheme().sanity
  return (
    <Root
      ref={rootElm}
      studioTheme={theme}
      title={`Select image by ${userName} from Unsplash`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url("${src}")`,
      }}
      onClick={handleClick}
    >
      <CreditLineLink onClick={handleCreditLineClicked}>
        <CreditLine padding={2} radius={2} margin={2}>
          <Text size={1} title={`Open image by ${userName} on Unsplash in new window`}>
            By @{data.user.username}
          </Text>
        </CreditLine>
      </CreditLineLink>
    </Root>
  )
}
