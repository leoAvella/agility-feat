export type ITableSearch = {
    page?: number;
    size?: number;
    sort?: 'ASC' | 'DESC',
    sortby?: string,
    total_elements?: number,
    total_pages?: number,
    message?: string;
}

export type IDataTable = ITableSearch & { 
    content: any[];
}