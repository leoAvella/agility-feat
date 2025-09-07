import { Suspense } from "react";
import { Metadata } from "next";

import { getApplications } from "@/actions/applications";
import DataTable from "@/componentes/ui/data-table";
import { TableSkeleton } from "@/componentes/ui/skeletons/table";
import { ApplicationsSearch } from "@/interfaces/load-applications";

export const metadata: Metadata = {
  title: "Users",
  description: ""
};

export default async function Page({ searchParams }: { searchParams?: any }) {
  const attributes = ['occupancy_type', 'property_value', 'loan_amount', 'credit_score', 'monthly_income', 'monthly_debts', 'decision', 'reasons'];
  return (
    <Suspense
      fallback={<TableSkeleton />}>
      <DataTable
        attributes={attributes}
        params={searchParams}
        locale={'pages.applications.attributes'}
        fetchData={getApplications}
      />
    </Suspense>
  );
}