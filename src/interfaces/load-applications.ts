import { ITableSearch } from "./table-search";

export type LoadApplications = {
  id?: number;
  monthly_income: number;
  monthly_debts: number;
  load_amount: number;
  credit_score: number;
  property_value: number;
  occupancy_type: string;
  reviewed?: boolean;
  createdAt?: Date;
};


export type ApplicationsSearch  = LoadApplications & ITableSearch; 