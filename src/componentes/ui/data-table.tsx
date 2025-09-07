import { IDataTable, ITableSearch } from "@/interfaces/table-search";
import Pagination from "./pagination";
import Table from "./table";
import MobileDataCard from "./cart";

// Tipo genérico para reutilizar el componente
type Props<T> = {
  attributes: (keyof T)[];
  params?: ITableSearch;
  locale: string;
  fetchData: (params?: ITableSearch) => Promise<IDataTable<T>>;
  detailRoute?: string;
}

export default async function DataTable<T extends { id: string | number }>({
  attributes,
  params,
  locale,
  fetchData,
  detailRoute = "/applications"
}: Props<T>) {
  const data = await fetchData(params);

  return (
    <div className="p-4 sm:p-6 xl:p-8">
      <Table
        data={data?.content || []}
        attributes={attributes}
        locale={locale}
      />
      <Pagination
        totalPages={data?.total_pages ?? 0}
        total_elements={data?.total_elements || 0}
      />
      <MobileDataCard
        data={data?.content || []}
        attributes={attributes}
        locale={locale}
        detailRoute={detailRoute}
      />
    </div>
  );
}