import type { ImgHTMLAttributes } from "react"
import type { SiteImage } from "@/types/media"

interface ResponsiveImageProps {
  image: SiteImage
  pictureClassName?: string
  imageClassName?: string
  eager?: boolean
  dataHeroImage?: boolean
  imgProps?: Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "alt" | "className" | "decoding" | "height" | "loading" | "src" | "width"
  >
}

export default function ResponsiveImage({
  image,
  pictureClassName,
  imageClassName,
  eager = false,
  dataHeroImage = false,
  imgProps,
}: ResponsiveImageProps) {
  return (
    <picture className={pictureClassName}>
      <source media="(max-width: 640px)" srcSet={image.mobile.src} />
      <img
        {...imgProps}
        className={imageClassName}
        src={image.desktop.src}
        alt={image.alt}
        width={image.desktop.width}
        height={image.desktop.height}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        data-hero-image={dataHeroImage ? "" : undefined}
        style={{ objectPosition: image.objectPosition, ...imgProps?.style }}
      />
    </picture>
  )
}
