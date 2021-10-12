import { Card } from '@sanity/ui'
import styled from 'styled-components'

export const Root = styled.div`
  overflow: hidden;
  background-origin: content-box;
  background-repeat: no-repeat;
  background-clip: border-box;
  background-size: cover;
  position: relative;
  outline: none !important;
  border: 1px solid white;
  user-drag: none;

  &:hover {
    opacity: 0.85;
  }

  &:focus,
  &:active {
    border: 1px solid var(--input-border-color-focus);
    box-shadow: inset 0 0 0 3px var(--input-border-color-focus);
  }
`

export const CreditLineLink = styled.a`
  text-decoration: none;
  cursor: pointer;
`

export const CreditLine = styled(Card)`
  ${({ theme }) => `
     --creditline-fg: ${theme.sanity.color.base.bg};
     --creditline-bg: ${theme.sanity.color.base.fg};
   `};
  user-drag: none;
  position: absolute;
  background-color: var(--creditline-bg);
  bottom: 0;

  [data-ui='Text'] {
    color: var(--creditline-fg);
  }
`
