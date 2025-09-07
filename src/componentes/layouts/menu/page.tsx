'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
import { HiDotsVertical, HiPlus, HiViewGrid } from "react-icons/hi";
import { fetchDirectories } from "@/lib/directories";

export default function MenuPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const [directories, setDirectories] = useState<string[]>([]);

  useEffect(() => {
    const fetchDirectoriesData = async () => {
      try {
        const directories = await fetchDirectories(pathname);

        // Filtrar carpetas dinámicas (que contienen [ ])
        const filteredDirectories = directories.filter(dir =>
          !dir.includes('[') && !dir.includes(']')
        );

        setDirectories(filteredDirectories);
      } catch (error) {
        console.error('Error fetching directories:', error);
      }
    };

    fetchDirectoriesData();
  }, [pathname]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Si no hay directorios válidos, no mostrar nada
  if (directories.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {directories.length > 0 && (
        <button
          onClick={() => handleNavigation(`${pathname}/${directories[0]}`)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"
        >
          <HiPlus className="h-4 w-4" />
          {t(`routes${(pathname + "/" + directories[0]).replace(/\//g, '.')}.title`)}
        </button>
      )}

      {directories.length > 1 && (
        <Dropdown
          label=""
          dismissOnClick={true}
          renderTrigger={() => (
            <button className="p-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
              <HiDotsVertical className="h-5 w-5" />
            </button>
          )}
        >
          <DropdownHeader>
            <div className="flex items-center gap-2">
              <HiViewGrid className="h-4 w-4" />
              <span>Opciones</span>
            </div>
          </DropdownHeader>
          {directories.slice(1).map((option) => (
            <DropdownItem
              key={option}
              onClick={() => handleNavigation(`${pathname}/${option}`)}
              className="flex items-center gap-2 cursor-pointer"
            >
              {t(`routes${(pathname + "/" + option).replace(/\//g, '.')}.title`)}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </div>
  );
}