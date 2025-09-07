export type ITableSearch = {
    page?: number;
    size?: number;
    sort?: 'ASC' | 'DESC',
    sortby?: string,
    total_elements?: number,
    total_pages?: number,
    message?: string;
}

export interface IDataTable<T = unknown> {
  content: T[];
  total_elements: number;
  total_pages: number;
  message?: string;
}