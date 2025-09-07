'use client';

import {
  Badge,
  Accordion,
  Avatar,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
  Button
} from 'flowbite-react';
import { HiDocument, HiEye } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

type Props = {
  data: any[],
  attributes: string[],
  locale: string,
  title?: string;
  emptyMessage?: string;
  showIndex?: boolean;
  showId?: boolean;
  idField?: string;
  formatValues?: boolean;
  detailRoute?: string; // Nueva prop para la ruta de detalle
}

export default function MobileDataCard({
  data,
  attributes,
  locale,
  title = "Registro",
  emptyMessage = "No se encontraron registros",
  showIndex = true,
  showId = true,
  idField = "id",
  formatValues = true,
  detailRoute = "/applications" // Ruta por defecto
}: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleViewDetails = (id: string) => {
    router.push(`${detailRoute}/${id}`);
  };

  if (!data || data.length === 0) {
    return (
      <div className="md:hidden flex flex-col items-center justify-center py-12 px-4">
        <HiDocument />
        <p className="text-gray-500 dark:text-gray-400 text-center">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="md:hidden space-y-3">
      {data.map((row, index) => (
        <Accordion
          key={row?.[idField] || index}
          collapseAll
          className="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700"
        >
          <AccordionPanel>
            <AccordionTitle className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  {showIndex && (
                    <Badge color="gray" className="px-2 py-1">
                      #{index + 1}
                    </Badge>
                  )}
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {title} {showIndex ? index + 1 : ''}
                    </p>
                    {showId && row?.[idField] && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {row[idField]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </AccordionTitle>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {attributes.map((attr) => (
                  <div
                    key={`${row?.[idField]}-${attr}`}
                    className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0 dark:border-gray-600"
                  >
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 capitalize flex-shrink-0">
                      {t(`${locale}.${attr}`)}:
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white text-right ml-2 break-words max-w-[60%]">
                      {formatValues ? formatValue(row[attr]) : row[attr]}
                    </span>
                  </div>
                ))}


                <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                  <Button
                    onClick={() => handleViewDetails(row[idField])}
                    color="blue"
                    size="sm"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <HiEye className="w-4 h-4" />
                    {t('general.view_details')}
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      ))}
    </div>
  );
}


export function formatValue(value: any): string {
  if (value === null || value === undefined) return 'N/A';
  if (value instanceof Date) return value.toLocaleDateString();
  if (typeof value === 'string' && !isNaN(Date.parse(value)) && Date.parse(value) > 0) {
    return new Date(value).toLocaleDateString();
  }
  if (typeof value === 'number') return value.toLocaleString();
  if (typeof value === 'boolean') return value ? 'Sí' : 'No';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}