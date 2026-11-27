export interface ResponsiveImageSource {
  src: string
  width: number
  height: number
}

export interface SiteImage {
  desktop: ResponsiveImageSource
  mobile: ResponsiveImageSource
  alt: string
  objectPosition?: string
}
