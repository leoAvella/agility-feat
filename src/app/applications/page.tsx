import { Suspense } from "react";
import { Metadata } from "next";
import { getApplications } from "@/actions/applications";
import DataTable from "@/componentes/ui/data-table";
import { TableSkeleton } from "@/componentes/ui/skeletons/table";
import { LoadApplications } from "@/interfaces/load-applications";

export const metadata: Metadata = {
  title: "Applications",
  description: "Loan applications management"
};

interface PageProps {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  const attributes: (keyof LoadApplications)[] = [
    'occupancy_type',
    'property_value',
    'loan_amount',
    'credit_score',
    'monthly_income',
    'monthly_debts',
    'decision',
    'reasons',
  ];

  const tableSearchParams = {
    page: resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page as string, 10) : undefined,
    size: resolvedSearchParams?.size ? parseInt(resolvedSearchParams.size as string, 10) : undefined,
    sort: resolvedSearchParams?.sort as 'ASC' | 'DESC' | undefined,
    sortby: resolvedSearchParams?.sortby as string | undefined,
  };

  return (
    <Suspense fallback={<TableSkeleton />}>
      <DataTable<LoadApplications>
        attributes={attributes}
        params={tableSearchParams}
        locale={'pages.applications.attributes'}
        fetchData={getApplications}
      />
    </Suspense>
  );
}