'use client';

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-200 last-of-type:border-none dark:border-gray-700">
      {[...Array(6)].map((_, i) => (
        <td key={i} className={`whitespace-nowrap px-3 py-4 ${i === 0 ? 'pl-4 sm:pl-6' : ''} ${i === 5 ? 'pr-4 sm:pr-6' : ''}`}>
          <div className="h-5 rounded bg-gray-200 dark:bg-gray-600 animate-pulse shimmer"></div>
        </td>
      ))}
    </tr>
  );
}

export function MobileSkeleton() {
  return (
    <div className="mb-3 w-full rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse shimmer"></div>
          <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-600 animate-pulse shimmer"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-200 dark:bg-gray-600 animate-pulse shimmer"></div>
      </div>
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-600 animate-pulse shimmer"></div>
            <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-600 animate-pulse shimmer"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-700 md:pt-0">

          {/* Mobile */}
          <div className="md:hidden space-y-3">
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <div className="w-full rounded-lg overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-gray-100 dark:bg-gray-600 rounded-t-lg">
                {['Nombre', 'Email', 'Rol', 'Estado', 'Fecha', 'Acciones'].map((header, i) => (
                  <div key={i} className="h-5 rounded bg-gray-300 dark:bg-gray-500 animate-pulse shimmer"></div>
                ))}
              </div>

              {/* Rows */}
              <div className="bg-white dark:bg-gray-800 rounded-b-lg">
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


const styles = `
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.shimmer {
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0) 100%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}

.dark .shimmer {
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0.1) 100%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}
`;