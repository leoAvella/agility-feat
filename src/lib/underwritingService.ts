import { UnderwritingRequest, UnderwritingResult } from '@/interfaces/underwriting';
import underwritingConfig from '../config/underwriting.config';

export function calculateUnderwriting(data: UnderwritingRequest): UnderwritingResult {
  const { thresholds } = underwritingConfig;
  const dti = data.monthly_debts / data.monthly_income;
  const ltv = data.loan_amount / data.property_value;
  
  const reasons: string[] = [];
  
  if (dti <= thresholds.dti.approve && 
      ltv <= thresholds.ltv.approve && 
      data.credit_score >= thresholds.creditScore.approve) {
    return { dti, ltv, decision: "Approve", reasons: reasons.join(", ") };
  }
  
  if (dti <= thresholds.dti.refer && 
      ltv <= thresholds.ltv.refer && 
      data.credit_score >= thresholds.creditScore.refer) {
    reasons.push("Cumple con los criterios de revisión manual");
    return { dti, ltv, decision: "Refer", reasons: reasons.join(", ") };
  }
  
  if (dti > thresholds.dti.refer) reasons.push("DTI demasiado alto");
  if (ltv > thresholds.ltv.refer) reasons.push("LTV demasiado alto");
  if (data.credit_score < thresholds.creditScore.refer) reasons.push("Puntaje de crédito insuficiente");

  return { dti, ltv, decision: "Decline", reasons: reasons.join(", ") };
}