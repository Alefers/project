import { memo } from 'react';
import type { CSSProperties, FC, SyntheticEvent } from 'react';
import { generateWebpPath, getWebpSupport } from '@lib/helper';


interface LazyImageProps {
  title?: string;
  alt?: string;
  src: string;
  cn?: string;
  draggable?: boolean;
  onErrorCapture?: (event: SyntheticEvent) => void;
  onLoad?: () => void;
  height?: number;
  width?: number;
  style?: CSSProperties;
}

const LazyImage: FC<LazyImageProps> = (
  {
    title,
    alt,
    src,
    cn,
    draggable = false,
    onErrorCapture,
    onLoad,
    height,
    width,
    style,
  }
) => (
  <img
    src={generateWebpPath(src, getWebpSupport())}
    title={title}
    alt={alt}
    className={cn}
    onLoad={onLoad}
    onError={onErrorCapture}
    loading="lazy"
    decoding="async"
    height={height}
    width={width}
    draggable={draggable}
    style={style}
  />
);

const _LazyImage = memo(LazyImage);

export {
  _LazyImage as LazyImage,
};
