declare module 'unsplash-react' {
  interface Props {
    accessKey?: string,
    Uploader?: any,
    onFinishedUploading?: any
  }
  export default class UnsplashReact extends React.Component<Props, any> {}
  export function withDefaultProps(component: React.ComponentClass, props: any): {}
}
