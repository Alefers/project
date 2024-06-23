import { memo } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import { Select } from '../form';
import { UiSelectItem } from '@lib/helper';
import { svgIconsMap, SvgIcon } from '@lib/icons';


interface PaginationProps {
  page?: number;
  totalPages?: number;
  totalItems?: number;
  limit: string;
  cn?: string;
  limitItems?: UiSelectItem[];
  setPage: (val: number) => void;
  setLimit?: (val: string) => void;
}

const Pagination: FC<PaginationProps> = (
  {
    page,
    totalPages,
    totalItems,
    limit,
    cn,
    limitItems,
    setPage,
    setLimit,
  }
) => {
  const current = page || 1;

  return (
    <div
      className={clsx(
        'ui-pagination',
        cn,
      )}
    >
      <div className="ui-pagination__total">
        {typeof totalItems === 'number' && (
          <>
            Total: <span className="w700">{totalItems}</span> items
          </>
        )}
      </div>
      <div className="ui-pagination__actions">
        <div
          className={clsx(
            'ui-pagination__action-arrow',
            'ui-pagination__action-arrow--prev',
            current === 1 && 'ui-pagination__action-arrow--disabled',
          )}
          onClick={() => setPage(current - 1)}
        >
          <SvgIcon icon={svgIconsMap.Arrow} />
        </div>
        <span>
        Page {current} of {totalPages || 1}
      </span>
        <div
          className={clsx(
            'ui-pagination__action-arrow',
            'ui-pagination__action-arrow--next',
            current === totalPages && 'ui-pagination__action-arrow--disabled',
          )}
          onClick={() => setPage(current + 1)}
        >
          <SvgIcon icon={svgIconsMap.Arrow} />
        </div>
      </div>
      <div className="ui-pagination__filter">
        {limitItems && setLimit ? (
          <>
            Show on page
            <Select
              modifiers={['small']}
              value={limit}
              items={limitItems}
              onChange={setLimit}
            />
          </>
        ) : (
          <>
            Items per page:&nbsp;<span className="w700">{limit}</span>
          </>
        )}
      </div>
    </div>
  );
};

const _Pagination = memo(Pagination);

export {
  _Pagination as Pagination,
};