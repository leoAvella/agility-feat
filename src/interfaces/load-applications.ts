import { ITableSearch } from "./table-search";


export type LoadApplications = {
  id: string;
  monthly_income: number;
  monthly_debts: number;
  loan_amount: number;
  credit_score: number;
  property_value: number;
  occupancy_type: string;
  dti: number;
  ltv: number;
  decision: string;
  reasons: string;
  createdAt: Date;
  updatedAt: Date;
};


export type ApplicationsSearch  = LoadApplications & ITableSearch; 