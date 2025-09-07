"use server";

import { IDataTable } from "@/interfaces/table-search";
import { prisma } from "@/lib/prisma";
import { LoadApplicationSchema } from "@/schemas/load-aplications";
import { calculateUnderwriting } from "@/lib/underwritingService";

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
  data?: any;
  date: number;
};

export async function createApplication(prevState: FormState, formData: FormData): Promise<FormState> {
  console.log("Form Data Received:", Object.fromEntries(formData));

  try {
    const formValues = {
      monthly_income: formData.get("monthly_income") as string,
      monthly_debts: formData.get("monthly_debts") as string,
      loan_amount: formData.get("loan_amount") as string, // Cambiado de load_amount a loan_amount
      credit_score: formData.get("credit_score") as string,
      property_value: formData.get("property_value") as string,
      occupancy_type: formData.get("occupancy_type") as string,
      reviewed: formData.get("reviewed") === "on",
    };

    const parsed = LoadApplicationSchema.safeParse({
      monthly_income: Number(formValues.monthly_income),
      monthly_debts: Number(formValues.monthly_debts),
      loan_amount: Number(formValues.loan_amount), // Cambiado aquí también
      credit_score: Number(formValues.credit_score),
      property_value: Number(formValues.property_value),
      occupancy_type: formValues.occupancy_type,
      //reviewed: formValues.reviewed,
    });

    if (!parsed.success) {
      return {
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
        data: { ...formValues },
        date: Date.now()
      };
    }

    // Calcular el resultado del underwriting
    const underwritingResult = calculateUnderwriting({
      monthly_income: parsed.data.monthly_income,
      monthly_debts: parsed.data.monthly_debts,
      loan_amount: parsed.data.loan_amount,
      property_value: parsed.data.property_value,
      credit_score: parsed.data.credit_score,
      occupancy_type: parsed.data.occupancy_type
    });

    // Crear la aplicación con los resultados calculados
    const application = await prisma.loadApplications.create({
      data: {
        monthly_income: parsed.data.monthly_income,
        monthly_debts: parsed.data.monthly_debts,
        loan_amount: parsed.data.loan_amount,
        property_value: parsed.data.property_value,
        credit_score: parsed.data.credit_score,
        occupancy_type: parsed.data.occupancy_type,
        // Campos calculados
        dti: underwritingResult.dti,
        ltv: underwritingResult.ltv,
        decision: underwritingResult.decision,
        reasons: underwritingResult.reasons
      }
    });

    console.log('Application created with underwriting result:', application);
    
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

export async function getApplications(query?: any): Promise<IDataTable> {
  try {
    console.log("Query Params:", query);
    const page = parseInt(query?.page) || 1;
    const size = parseInt(query?.size) || 10;
    const skip = (page - 1) * size;

    const [apps, totalCount] = await Promise.all([
      prisma.loadApplications.findMany({ 
        orderBy: {
          createdAt: 'desc'
        },
        skip: skip,
        take: size,
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


export async function getApplicationById(id: string) {
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


export async function deleteApplication(id: string) {
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