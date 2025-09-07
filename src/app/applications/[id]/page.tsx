import I18n from '@/componentes/ui/i18n';
import { getApplicationById } from '@/actions/applications';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const application = await getApplicationById(id);

  if (!application) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <h2 className="text-xl font-semibold text-red-800">Aplicación no encontrada</h2>
          <p className="text-red-600">La aplicación con ID #{id} no existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 xl:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          <I18n text={`pages.applications.sections.application_details`} />
          #{application.id}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          <I18n text={`pages.applications.attributes.created_at`} />
          {new Date(application.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Columna 1: Información Básica */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            <I18n text={`pages.applications.sections.applicant_information`} />
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                <I18n text={`pages.applications.attributes.monthly_income`} />
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${application.monthly_income.toLocaleString()}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                <I18n text={`pages.applications.attributes.monthly_debts`} />
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${application.monthly_debts.toLocaleString()}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                <I18n text={`pages.applications.attributes.loan_amount`} />
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${application.loan_amount.toLocaleString()}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                <I18n text={`pages.applications.attributes.property_value`} />
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${application.property_value.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Columna 2: Información Crediticia */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            <I18n text={`pages.applications.sections.credit_information`} />
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                <I18n text={`pages.applications.attributes.credit_score`} />
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {application.credit_score}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                <I18n text={`pages.applications.attributes.occupancy_type`} />
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                {application.occupancy_type}
              </p>
            </div>


          </div>
        </div>
      </div>

      {/* Resultados del Underwriting */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          <I18n text={`pages.applications.sections.underwriting_result`} />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">DTI (Debt-to-Income)</span>
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {(application.dti * 100).toFixed(2)}%
              </span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">LTV (Loan-to-Value)</span>
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {(application.ltv * 100).toFixed(2)}%
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400"><I18n text={`pages.applications.attributes.decision`} /></span>
              <span className={`text-lg font-semibold ${application.decision === 'Approve' ? 'text-green-600 dark:text-green-400' :
                application.decision === 'Refer' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                {application.decision === 'Approve' ? 'Aprobado' :
                  application.decision === 'Refer' ? 'Revisión Manual' : 'Rechazado'}
              </span>
            </div>

            {application.reasons && application.reasons.length > 0 && (
              <div className="py-3">
                <span className="block text-gray-600 dark:text-gray-400 mb-2">Razones:</span>
                <ul className="list-disc list-inside space-y-1">

                  <li className="text-sm text-gray-700 dark:text-gray-300">
                    {application.reasons}
                  </li>

                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div>
            <span className="font-medium">
              <I18n text={`pages.applications.attributes.id`} />:</span> {application.id}
          </div>
          <div>
            <span className="font-medium">
              <I18n text={`pages.applications.attributes.created_at`} />:</span> {new Date(application.createdAt).toLocaleString()}
          </div>
          <div>
            <span className="font-medium">
              <I18n text={`pages.applications.attributes.updated_at`} />:</span> {new Date(application.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}