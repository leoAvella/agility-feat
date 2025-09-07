'use client'

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import MenuPage from "./menu/page";

export default function CustomBreadcrumb() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);


  const getTranslatedPath = (path: string, currentIndex: number) => {

    const pathParts = paths.slice(0, currentIndex + 1);
    const fullKey = `routes.${pathParts.join('.')}.title`;
    const fullTranslation = t(fullKey);

    if (fullTranslation !== fullKey) {
      return fullTranslation;
    }

    const singleKey = `routes.${path}.title`;
    const singleTranslation = t(singleKey);

    return singleTranslation !== singleKey ? singleTranslation : path.charAt(0).toUpperCase() + path.slice(1);
  };

  const getPageTitle = () => {
    if (pathname === '/') {
      return t('routes.title');
    }

    const fullKey = `routes${pathname.replace(/\//g, '.')}.title`;
    const translation = t(fullKey);

    return translation !== fullKey ? translation :
      paths[paths.length - 1].charAt(0).toUpperCase() + paths[paths.length - 1].slice(1);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-col mb-4 md:mb-0">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {getPageTitle()}
        </h4>
        <Breadcrumb>
          <BreadcrumbItem href="/" icon={HiHome}>
            {t('routes.title')}
          </BreadcrumbItem>
          {paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join('/')}`;
            const isLast = index === paths.length - 1;

            return (
              <BreadcrumbItem
                key={`${path}-${index}`}
                href={isLast ? undefined : href}
              >
                {getTranslatedPath(path, index)}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-6">
        <MenuPage />
      </div>
    </div>
  );
}