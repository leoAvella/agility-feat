'use client';

import { FaSearch } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

type Props = {
  attribute: string,
  locale: string
}

export default function Search({ attribute, locale }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { t } = useTranslation();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(attribute, term);
      params.delete('page');
    } else {
      params.delete(attribute);
    }
    replace(`${pathname}?${params.toString()}`);
  }



  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={t(`${locale}.${attribute}`)}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get(attribute)?.toString()}
      />
      <FaSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}