
interface UnderwritingRequest {
  monthly_income: number;
  monthly_debts: number;
  loan_amount: number;
  property_value: number;
  credit_score: number;
  occupancy_type: string;
}

interface UnderwritingResult {
  dti: number;
  ltv: number;
  decision: "Approve" | "Refer" | "Decline";
  reasons: string;
}

export function calculateUnderwriting(data: UnderwritingRequest): UnderwritingResult {
  const dti = data.monthly_debts / data.monthly_income;
  const ltv = data.loan_amount / data.property_value;
  
  const reasons: string[] = [];
  
  if (dti <= 0.43 && ltv <= 0.80 && data.credit_score >= 680) {
    return { dti, ltv, decision: "Approve", reasons: reasons?.join(", ") };
  }
  
  if (dti <= 0.50 && ltv <= 0.95 && data.credit_score >= 660) {
    reasons.push("Cumple con los criterios de revisión manual");
    return { dti, ltv, decision: "Refer", reasons: reasons?.join(", ") };
  }
  
  if (dti > 0.50) reasons.push("DTI demasiado alto");
  if (ltv > 0.95) reasons.push("LTV demasiado alto");
  if (data.credit_score < 660) reasons.push("Puntaje de crédito insuficiente");

  return { dti, ltv, decision: "Decline", reasons: reasons?.join(", ") };
}