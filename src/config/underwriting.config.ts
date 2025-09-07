import { UnderwritingConfig } from "@/interfaces/underwriting";

export const underwritingConfig: UnderwritingConfig = {
  thresholds: {
    dti: {
      approve: parseFloat(process.env.NEXT_PUBLIC_DTI_APPROVE || '0.43'),
      refer: parseFloat(process.env.NEXT_PUBLIC_DTI_REFER || '0.50')
    },
    ltv: {
      approve: parseFloat(process.env.NEXT_PUBLIC_LTV_APPROVE || '0.80'),
      refer: parseFloat(process.env.NEXT_PUBLIC_LTV_REFER || '0.95')
    },
    creditScore: {
      approve: parseInt(process.env.NEXT_PUBLIC_CREDIT_SCORE_APPROVE || '680'),
      refer: parseInt(process.env.NEXT_PUBLIC_CREDIT_SCORE_REFER || '660')
    }
  },
  occupancyTypes: {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    INVESTMENT: "investment"
  }
};

export default underwritingConfig;