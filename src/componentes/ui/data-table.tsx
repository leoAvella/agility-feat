

import { IDataTable } from "@/interfaces/table-search";
import Pagination from "./pagination";
import Table from "./table";
import MobileDataCard from "./cart";


type Props = {
  attributes: string[],
  params?: any,
  locale: string,
  fetchData: (params?: any) => Promise<IDataTable>
}

export default async function DataTable({ attributes, params, locale, fetchData }: Props) {
  const data = await fetchData(params);
  return (

    <div className="p-4 sm:p-6 xl:p-8">
      <Table data={data?.content || []} attributes={attributes} locale={locale} />
      <Pagination totalPages={data?.total_pages ?? 0} total_elements={data?.total_elements || 0} />
      <MobileDataCard data={data?.content || []} attributes={attributes} locale={locale} />
    </div>

  );
}