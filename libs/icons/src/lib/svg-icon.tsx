import { memo, useState, useEffect, CSSProperties } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';


export type SvgIconType = () => Promise<typeof import('*.svg')>;

interface SvgIconProps {
  className?: string;
  style?: CSSProperties;
  icon: SvgIconType;
  onClick?: () => void;
}

interface BrowserSpriteSymbol {
  id: string;
  viewBox: string;
  content: string;
  node: SVGSymbolElement;
}

const SvgIcon: FC<SvgIconProps> = (
  {
    className,
    style,
    icon,
    onClick,
  }
) => {
  const [symbol, setSymbol] = useState<BrowserSpriteSymbol | null>(null);

  useEffect(() => {
    if (typeof icon === 'function') {
      icon().then((module) => {
        if (setSymbol) {
          setSymbol(JSON.parse(JSON.stringify(module.default)));
        }
      }).catch(() => {});
    } else {
      console.log('Icon not exist');
    }
  }, [icon]);

  return (
    <>
      {symbol ? (
        <svg
          viewBox={symbol.viewBox}
          className={clsx(
            'svg-icon',
            className,
          )}
          style={style}
          onClick={onClick}
        >
          <use href={`#${symbol.id}`} />
        </svg>
      ) : (
        <svg
          className={clsx(
            'svg-icon',
            'svg-icon--placeholder',
            className,
          )}
          onClick={onClick}
        />
      )}
    </>
  );
};

const _SvgIcon = memo(SvgIcon);

export { _SvgIcon as SvgIcon };
