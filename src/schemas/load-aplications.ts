import { z } from "zod";

export const LoadApplicationSchema = z.object({
  monthly_income: z.number().positive("Must be a positive number"),
  monthly_debts: z.number().min(0, "Must be greater than or equal to 0"),
  loan_amount: z.number().positive("Must be greater than 0"),
  credit_score: z.number().min(300, { message: "Credit score must be at least 300" })
                         .max(850, { message: "Credit score must be 850 or lower" }),
  property_value: z.number().positive("Property value must be positive"),
  occupancy_type: z.string().min(3, "Invalid occupancy type"),
  reviewed: z.boolean().optional(),
});
