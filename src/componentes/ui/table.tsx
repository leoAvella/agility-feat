import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import I18n from "./i18n";
import Search from "./search";
import { HiEye } from "react-icons/hi";

type Props = {
    data: any[],
    attributes: string[],
    locale: string
}

export default function CustomTable({ data, attributes, locale }: Props) {

    const formatCellValue = (value: any): React.ReactNode => {
        if (value === null || value === undefined) return 'N/A';

        if (value instanceof Date) {
            return value.toLocaleDateString();
        }

        if (typeof value === 'string' && !isNaN(Date.parse(value))) {
            return new Date(value).toLocaleDateString();
        }

        if (typeof value === 'number') {
            return value.toLocaleString();
        }

        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }

        return String(value);
    };

    return (
        <div className="hidden md:block">
            <div className="overflow-x-auto">
                <Table hoverable>
                    <TableHead>
                        <TableRow>
                            {attributes?.map(attr => (
                                <TableHeadCell key={`th-${attr}`}>
                                    <I18n text={`${locale}.${attr}`} />
                                </TableHeadCell>
                            ))}
                            <TableHeadCell key="th-actions">
                                <I18n text={`general.actions`} />
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className="divide-y">
                        {data?.map((row: any) => (
                            <TableRow
                                key={`tr-${row?.id || Math.random()}`}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                            >
                                {attributes?.map(attr => (
                                    <TableCell
                                        key={`td-${row?.id}-${attr}`}
                                        className="px-4 py-3"
                                    >
                                        {formatCellValue(row[attr])}
                                    </TableCell>
                                ))}
                                <TableCell key={`td-actions-${row?.id}`}>
                                    <div className="flex space-x-2">
                                        <Link
                                            href={`/applications/${row.id}`}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                        >
                                            <HiEye className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                        {data?.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={attributes.length + 1}
                                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
                                >
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}