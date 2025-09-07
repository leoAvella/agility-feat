import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import I18n from "./i18n";
import { HiEye } from "react-icons/hi";

interface TableData {
    id: string | number;
    [key: string]: unknown;
}

type Props<T extends TableData> = {
    data: T[],
    attributes: (keyof T)[],
    locale: string
}

export default function CustomTable<T extends TableData>({ data, attributes, locale }: Props<T>) {

    const formatCellValue = (value: unknown): React.ReactNode => {
        if (value === null || value === undefined) return 'N/A';

        if (value instanceof Date) {
            return value.toLocaleDateString();
        }

        if (typeof value === 'string') {
            // Intentar parsear como fecha
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString();
            }
            return value;
        }

        if (typeof value === 'number') {
            return value.toLocaleString();
        }

        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        }

        if (Array.isArray(value)) {
            return value.map(item => String(item)).join(', ');
        }

        if (typeof value === 'object') {
            try {
                return JSON.stringify(value);
            } catch {
                return '[Object]';
            }
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
                                <TableHeadCell key={`th-${String(attr)}`}>
                                    <I18n text={`${locale}.${String(attr)}`} />
                                </TableHeadCell>
                            ))}
                            <TableHeadCell key="th-actions">
                                <I18n text={`general.actions`} />
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className="divide-y">
                        {data?.map((row) => (
                            <TableRow
                                key={`tr-${row.id}`}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                            >
                                {attributes?.map(attr => (
                                    <TableCell
                                        key={`td-${row.id}-${String(attr)}`}
                                        className="px-4 py-3"
                                    >
                                        {formatCellValue(row[attr])}
                                    </TableCell>
                                ))}
                                <TableCell key={`td-actions-${row.id}`}>
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