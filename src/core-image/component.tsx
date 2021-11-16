import {
  EventHandler,
  ForwardRefRenderFunction,
  ImgHTMLAttributes,
  Ref,
  SyntheticEvent,
  forwardRef,
} from "react";

import { cn } from "lib";

// https://github.com/bitjourney/react-simple-image

const descriptorMatcher = (key: string) => {
  return new RegExp(/^(\d+\.?\d*)(w|x)$/).test(key);
};

export interface CoreImageSize {
  size: string;
  mediaCondition?: string;
}

export type CoreSrcSet = {
  [descriptor: string]: string;
};

export interface CoreImageProps {
  className?: string;
  /**
   * URL of the image resource.
   *
   * @example https://s3-us-west-2.amazonaws.com/web-design-int-production/assets/brand/images/Photography--1.jpg
   */
  src: string;
  /**
   * User-readable description of the image being displayed.
   *
   * @example Required alternative text.
   */
  alt: string;
  /**
   * The element's title.
   */
  title?: string;
  /**
   * A configuration object for responsive image display. Accepts an object with valid descriptors for keys and image urls for values.
   */
  srcSet?: CoreSrcSet | string;
  /**
   * The intended display size of the image at various breakpoints. Accepts an array of objects that contain a size, and optionally a mediaCondition.
   */
  sizes?: CoreImageSize[] | string;
  /**
   * Callback that fires when image fails to load.
   */
  onError?: EventHandler<SyntheticEvent<HTMLImageElement>>;
  /**
   * Callback that fires when image loads.
   */
  onLoad?: EventHandler<SyntheticEvent<HTMLImageElement>>;
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refHandler` */
  refHandler?: Ref<HTMLImageElement>;
}

const CoreImage: ForwardRefRenderFunction<
  HTMLImageElement,
  CoreImageProps & Omit<ImgHTMLAttributes<HTMLImageElement>, "srcSet" | "sizes">
> = ({ refHandler, sizes, srcSet, src, ...imgProps }, ref) => {
  const classes: ClassValue = {
    "tw-image": true,
  };

  if (sizes && typeof sizes !== "string") {
    sizes =
      sizes
        .map((size) => {
          if (size.mediaCondition) {
            return `${size.mediaCondition} ${size.size}`;
          }
          return `${size.size}`;
        })
        .join(",") || undefined;
  }

  const srcSetString =
    typeof srcSet === "string"
      ? srcSet
      : Object.keys(srcSet || {})
          .filter(descriptorMatcher)
          .map((descriptor) =>
            srcSet ? `${srcSet[descriptor]} ${descriptor}` : "",
          )
          .join(",") || undefined;

  // srcSet implementation is browser dependent, and in some browsers the attribute
  // order is important (especially in JS-generated HTML). Incorrect ordering
  // can cause the browser pre-loader to download multiple versions of an image,
  // especially with regard to w descriptor srcSets. The optimal ordering is
  // sizes > srcSet > src, as seen in the specification example:
  // https://html.spec.whatwg.org/multipage/images.html#viewport-based-selection
  return (
    <img
      {...imgProps}
      ref={ref || refHandler}
      className={cn(imgProps.className, classes)} // @ts-ignore
      sizes={sizes}
      srcSet={srcSetString}
      src={src}
    />
  );
};

CoreImage.displayName = "CoreImage";
const ComponentWithRef = forwardRef(CoreImage);
export { ComponentWithRef as CoreImage };
