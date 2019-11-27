declare module 'part:@sanity/components/buttons/default' {
  import * as React from 'react'
  interface Props {
    children?: any
    onClick?: any
    inverted?: boolean
    kind?: 'default' | 'simple'
  }
  export default class DefaultButton extends React.Component<Props, any> {}
}

declare module 'part:@sanity/components/buttons/anchor' {
  import * as React from 'react'
  interface Props {
    children?: any
    disabled?: boolean
    href?: string
    bleed?: boolean
    color?: string
    kind?: string
  }
  export default class AnchorButton extends React.Component<Props, any> {}
}

declare module 'part:@sanity/components/loading/spinner' {
  import * as React from 'react'
  interface Props {
    center?: boolean
    message?: string
    fullscreen?: boolean
    inline?: boolean
  }
  export default class Spinner extends React.Component<Props, any> {}
}

declare module 'part:@sanity/base/theme/variables-style' {
  const shim: any
  export default shim
}

declare module 'part:@sanity/components/loading/spinner-style' {
  const shim: any
  export default shim
}

declare module 'part:@sanity/components/dialogs/fullscreen-style' {
  const shim: any
  export default shim
}

declare module 'part:@sanity/components/textfields/search-style' {
  const shim: any
  export default shim
}

declare module 'part:@sanity/components/dialogs/fullscreen' {
  import * as React from 'react'
  interface Props {
    title?: string
    onClose?: () => void
    isOpen?: boolean
  }
  export default class FullscreenDialog extends React.Component<Props, any> {}
}

declare module 'part:@sanity/components/textfields/search' {
  import * as React from 'react'
  interface Props {
    label: string
    value: string
    onChange?: (event: any) => void
    onKeyPress?: (event: any) => void
    onFocus?: () => void
    onBlur?: () => void
    hotkeys?: string[]
    placeholder?: string | React.ReactNode
  }
  export default class SearchFieldField extends React.Component<Props, any> {}
}

declare module 'part:@sanity/base/client' {
  const shim: any
  export default shim
}
