"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Button, Label, TextInput, HelperText } from "flowbite-react";
import { HiCurrencyDollar, HiOutlineDocumentReport, HiOutlineColorSwatch } from "react-icons/hi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createApplication, FormState } from "@/actions/applications";

interface FormData {
  monthly_income: string;
  monthly_debts: string;
  loan_amount: string;
  credit_score: string;
  property_value: string;
  occupancy_type: string;
}

const initialState: FormState = {
  message: "",
  errors: {},
  data: undefined,
  date: 0
};

export function FormComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createApplication, initialState);
  const [formData, setFormData] = useState<FormData>({
    monthly_income: "",
    monthly_debts: "",
    loan_amount: "",
    credit_score: "",
    property_value: "",
    occupancy_type: ""
  });

  const lastToastIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (state.data) {
      setFormData(prev => ({
        ...prev,
        monthly_income: state.data?.monthly_income?.toString() || "",
        monthly_debts: state.data?.monthly_debts?.toString() || "",
        loan_amount: state.data?.loan_amount?.toString() || "",
        credit_score: state.data?.credit_score?.toString() || "",
        property_value: state.data?.property_value?.toString() || "",
        occupancy_type: state.data?.occupancy_type || ""
      }));
    }
  }, [state.data]);


  useEffect(() => {
    if (state.message?.includes('successfully') && state.data?.id) {
      const timer = setTimeout(() => {
        if (state.data?.id !== undefined) router.push(`/applications/${state.data.id}`);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.message, state.data?.id, router]);


  useEffect(() => {
    if (state.message) {
      if (lastToastIdRef.current) {
        toast.dismiss(lastToastIdRef.current);
      }

      const toastType = state.message.includes('successfully') ? 'success' : 'error';

      if (toastType !== 'success') {
        const newToastId = toast[toastType](state.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        lastToastIdRef.current = newToastId;
      }
    }
  }, [state.message, state.date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-4 sm:p-6 xl:p-8">
      <form action={formAction} autoComplete="off" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Columna 1 */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="monthly_income">
                  {t('pages.applications.attributes.monthly_income')}
                </Label>
              </div>
              <TextInput
                id="monthly_income"
                name="monthly_income"
                type="number"
                value={formData.monthly_income}
                onChange={handleChange}
                icon={HiCurrencyDollar}
                placeholder={t('pages.applications.attributes.monthly_income')}
                required
                color={state.errors?.monthly_income ? "failure" : "gray"}
              />
              {state.errors?.monthly_income && (
                <HelperText color="failure">
                  {state.errors.monthly_income[0]}
                </HelperText>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="monthly_debts">
                  {t('pages.applications.attributes.monthly_debts')}
                </Label>
              </div>
              <TextInput
                id="monthly_debts"
                name="monthly_debts"
                type="number"
                value={formData.monthly_debts}
                onChange={handleChange}
                icon={HiCurrencyDollar}
                placeholder={t('pages.applications.attributes.monthly_debts')}
                required
                color={state.errors?.monthly_debts ? "failure" : "gray"}
              />
              {state.errors?.monthly_debts && (
                <HelperText color="failure">
                  {state.errors.monthly_debts[0]}
                </HelperText>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="loan_amount">
                  {t('pages.applications.attributes.loan_amount')}
                </Label>
              </div>
              <TextInput
                id="loan_amount"
                name="loan_amount"
                type="number"
                value={formData.loan_amount}
                onChange={handleChange}
                icon={HiCurrencyDollar}
                placeholder={t('pages.applications.attributes.loan_amount')}
                required
                color={state.errors?.loan_amount ? "failure" : "gray"}
              />
              {state.errors?.loan_amount && (
                <HelperText color="failure">
                  {state.errors.loan_amount[0]}
                </HelperText>
              )}
            </div>
          </div>

          {/* Columna 2 */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="property_value">
                  {t('pages.applications.attributes.property_value')}
                </Label>
              </div>
              <TextInput
                id="property_value"
                name="property_value"
                type="number"
                value={formData.property_value}
                onChange={handleChange}
                icon={HiCurrencyDollar}
                placeholder={t('pages.applications.attributes.property_value')}
                required
                color={state.errors?.property_value ? "failure" : "gray"}
              />
              {state.errors?.property_value && (
                <HelperText color="failure">
                  {state.errors.property_value[0]}
                </HelperText>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="credit_score">
                  {t('pages.applications.attributes.credit_score')}
                </Label>
              </div>
              <TextInput
                id="credit_score"
                name="credit_score"
                type="number"
                value={formData.credit_score}
                onChange={handleChange}
                icon={HiOutlineDocumentReport}
                placeholder={t('pages.applications.attributes.credit_score')}
                required
                color={state.errors?.credit_score ? "failure" : "gray"}
              />
              {state.errors?.credit_score && (
                <HelperText color="failure">
                  {state.errors.credit_score[0]}
                </HelperText>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="occupancy_type">
                  {t('pages.applications.attributes.occupancy_type')}
                </Label>
              </div>
              <TextInput
                id="occupancy_type"
                name="occupancy_type"
                type="text"
                value={formData.occupancy_type}
                onChange={handleChange}
                icon={HiOutlineColorSwatch}
                placeholder={t('pages.applications.attributes.occupancy_type')}
                required
                color={state.errors?.occupancy_type ? "failure" : "gray"}
              />
              {state.errors?.occupancy_type && (
                <HelperText color="failure">
                  {state.errors.occupancy_type[0]}
                </HelperText>
              )}
            </div>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-center md:justify-start">
            <Button
              type="submit"
              color="primary"
              disabled={isPending}
              className="min-w-[200px]"
            >
              {isPending ? t('common.sending', 'Enviando...') : t('common.submit_application', 'Enviar solicitud')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}