import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  transform: scale(0.8);
`

export default function UnsplashIcon() {
  return (
    <Svg role="img" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <title />
      <path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z" />
    </Svg>
  )
}
