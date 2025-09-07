'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Select, Pagination as FlowbitePagination } from 'flowbite-react';
import { OPTIONS_SIZE_PAGE } from '@/config/constants/ui.config';

type Props = {
  totalPages: number;
  total_elements: number;
}

export default function Pagination({ totalPages, total_elements }: Props) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const _size = Number(searchParams.get('size')) || OPTIONS_SIZE_PAGE[0];

  const [size, setSize] = useState(_size);
  const [since, setSince] = useState(currentPage);
  const [until, setUntil] = useState(currentPage * size);

  const handleSizeChange = (value: string) => {
    const newSize = Number(value);
    setSize(newSize);
    const params = new URLSearchParams(searchParams);
    params.set('size', newSize.toString());
    params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    const currentSize = Number(searchParams.get('size')) || OPTIONS_SIZE_PAGE[0];

    setUntil(page === totalPages ? total_elements : page * currentSize);
    setSince(page > 1 ? ((page - 1) * currentSize) + 1 : 1);
    setSize(currentSize);
  }, [searchParams, totalPages, total_elements]);


  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-4 py-4 space-y-4 md:space-y-0">

      <div className="flex items-center space-x-2">
        <label htmlFor="sizePage" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('ui.data_table.pagination.page_size')}
        </label>
        <Select
          id="sizePage"
          value={size}
          onChange={(e) => handleSizeChange(e.target.value)}
          className="w-20"
        >
          {OPTIONS_SIZE_PAGE.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>


      <div className="text-sm text-gray-700 dark:text-gray-300 text-center">
        {t('ui.data_table.pagination.showing_rows', {
          since,
          until,
          total_elements
        })}
      </div>


      <div className="flex justify-center">
        {totalPages > 0 && (

          <FlowbitePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showIcons
            previousLabel=""
            nextLabel=""
            className="pagination-custom"
          />
        )}
      </div>
    </div>
  );
}