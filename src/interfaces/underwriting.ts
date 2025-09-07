export interface UnderwritingConfig {
  thresholds: {
    dti: {
      approve: number;
      refer: number;
    };
    ltv: {
      approve: number;
      refer: number;
    };
    creditScore: {
      approve: number;
      refer: number;
    };
  };
  occupancyTypes: {
    [key: string]: string;
  };
}

export interface UnderwritingRequest {
  monthly_income: number;
  monthly_debts: number;
  loan_amount: number;
  property_value: number;
  credit_score: number;
  occupancy_type: string;
}

export interface UnderwritingResult {
  dti: number;
  ltv: number;
  decision: "Approve" | "Refer" | "Decline";
  reasons: string;
}