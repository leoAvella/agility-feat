"use server";

import { IDataTable, ITableSearch } from "@/interfaces/table-search";
import { prisma } from "@/lib/prisma";
import { LoadApplicationSchema } from "@/schemas/load-aplications";
import { calculateUnderwriting } from "@/lib/underwritingService";
import { LoadApplications } from "@/interfaces/load-applications";

export type FormState = {
  message: string;
  errors?: {
    monthly_income?: string[];
    monthly_debts?: string[];
    loan_amount?: string[];
    credit_score?: string[];
    property_value?: string[];
    occupancy_type?: string[];
    reviewed?: string[];
    global?: string[];
  };
  data?: LoadApplications| Partial<LoadApplications>;
  date: number;
};


type FormErrorData = {
  monthly_income?: string;
  monthly_debts?: string;
  loan_amount?: string;
  credit_score?: string;
  property_value?: string;
  occupancy_type?: string;
  reviewed?: boolean;
};

export async function createApplication(prevState: FormState, formData: FormData): Promise<FormState> {
  
  try {
    const formValues = {
      monthly_income: formData.get("monthly_income") as string,
      monthly_debts: formData.get("monthly_debts") as string,
      loan_amount: formData.get("loan_amount") as string,
      credit_score: formData.get("credit_score") as string,
      property_value: formData.get("property_value") as string,
      occupancy_type: formData.get("occupancy_type") as string,
      reviewed: formData.get("reviewed") === "on",
    };

    const parsed = LoadApplicationSchema.safeParse({
      monthly_income: Number(formValues.monthly_income),
      monthly_debts: Number(formValues.monthly_debts),
      loan_amount: Number(formValues.loan_amount),
      credit_score: Number(formValues.credit_score),
      property_value: Number(formValues.property_value),
      occupancy_type: formValues.occupancy_type,
    });

    if (!parsed.success) {
      const errorData: FormErrorData = {
        monthly_income: formValues.monthly_income,
        monthly_debts: formValues.monthly_debts,
        loan_amount: formValues.loan_amount,
        credit_score: formValues.credit_score,
        property_value: formValues.property_value,
        occupancy_type: formValues.occupancy_type,
        reviewed: formValues.reviewed
      };

      return {
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
        data: errorData as unknown as LoadApplications,
        date: Date.now()
      };
    }

    const underwritingResult = calculateUnderwriting({
      monthly_income: parsed.data.monthly_income,
      monthly_debts: parsed.data.monthly_debts,
      loan_amount: parsed.data.loan_amount,
      property_value: parsed.data.property_value,
      credit_score: parsed.data.credit_score,
      occupancy_type: parsed.data.occupancy_type
    });

    const application = await prisma.loadApplications.create({
      data: {
        monthly_income: parsed.data.monthly_income,
        monthly_debts: parsed.data.monthly_debts,
        loan_amount: parsed.data.loan_amount,
        property_value: parsed.data.property_value,
        credit_score: parsed.data.credit_score,
        occupancy_type: parsed.data.occupancy_type,
        dti: underwritingResult.dti,
        ltv: underwritingResult.ltv,
        decision: underwritingResult.decision,
        reasons: underwritingResult.reasons
      }
    });
  
    return {
      message: "Application created successfully!",
      data: application,
      errors: {},
      date: Date.now()
    };
  } catch (error) {
    console.error("Error creating application:", error);
    return {
      message: "Internal error",
      errors: { global: ["Something went wrong"] },
      date: Date.now()
    };
  }
}

export async function getApplications(query?: ITableSearch): Promise<IDataTable<LoadApplications>> {
  try {
 
    const page = query?.page ? Number(query.page) : 1;
    const size = query?.size ? Number(query.size) : 10;
  
    const validPage = isNaN(page) || page < 1 ? 1 : Math.floor(page);
    const validSize = isNaN(size) || size < 1 ? 10 : Math.floor(size);
    
    const skip = (validPage - 1) * validSize;

    const [apps, totalCount] = await Promise.all([
      prisma.loadApplications.findMany({ 
        orderBy: {
          createdAt: 'desc'
        },
        skip: skip,
        take: validSize, // ← Ahora sí es número
      }),
      prisma.loadApplications.count() 
    ]);

    return { 
      content: apps, 
      total_elements: totalCount,
      total_pages: Math.ceil(totalCount / size)
    };
  } catch (error) {
    console.error("Error fetching applications:", error);
    return { 
      message: "Error interno", 
      content: [],
      total_elements: 0,
      total_pages: 0
    };
  }
}

export async function getApplicationById(id: string): Promise<LoadApplications | null> {
  try {
    const application = await prisma.loadApplications.findUnique({
      where: { id }
    });
    return application;
  } catch (error) {
    console.error("Error fetching application:", error);
    return null;
  }
}

export async function deleteApplication(id: string): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.loadApplications.delete({
      where: { id }
    });
    return { success: true, message: "Application deleted" };
  } catch (error) {
    console.error("Error deleting application:", error);
    return { success: false, message: "Error deleting application" };
  }
}