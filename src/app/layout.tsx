import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeModeScript } from "flowbite-react";
import { CustomTheme } from "@/componentes/providers/teme.provider";
import Header from "@/componentes/layouts/navbar";
import { GloblaProvider } from "@/componentes/providers/global.provider";
import CustomBreadcrumb from "@/componentes/layouts/breadcrumb";
import { ToastProvider } from "@/componentes/layouts/menu/toast/container";


export const metadata: Metadata = {
  title: "AgilityFeat",
  description: "Coding Challenge",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <GloblaProvider>
      <CustomTheme>
        <html suppressHydrationWarning>
          <head>
            <ThemeModeScript />
          </head>
          <body>
            <Header />
            <div className="mt-16 flex items-start">
              <div id="main-content" className="relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <main>
                  <div className="grid grid-cols-1 px-4 pt-6  dark:bg-gray-900">
                    <CustomBreadcrumb />
                    <ToastProvider />
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </body>
        </html>
      </CustomTheme>
    </GloblaProvider>
  );
}
