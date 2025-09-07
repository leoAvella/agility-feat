'use client'
import clsx from 'clsx';
import { useFormStatus } from 'react-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonType?: 'blue' | 'green' | 'cyan' | 'teal' | 'lime' | 'red' | 'pink' | 'purple';
}

const buttonStyles = {
  blue: 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80',
  green: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800 shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80',
  cyan: 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80',
  teal: 'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-teal-300 dark:focus:ring-teal-800 shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80',
  lime: 'bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80',
  red: 'bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800 shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80',
  pink: 'bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-pink-300 dark:focus:ring-pink-800 shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80',
  purple: 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-purple-300 dark:focus:ring-purple-800 shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80',
};

const disabledStyles = {
  blue: 'bg-blue-300 cursor-not-allowed opacity-50',
  green: 'bg-green-300 cursor-not-allowed opacity-50',
  cyan: 'bg-cyan-300 cursor-not-allowed opacity-50',
  teal: 'bg-teal-300 cursor-not-allowed opacity-50',
  lime: 'bg-lime-300 cursor-not-allowed opacity-50',
  red: 'bg-red-300 cursor-not-allowed opacity-50',
  pink: 'bg-pink-300 cursor-not-allowed opacity-50',
  purple: 'bg-purple-300 cursor-not-allowed opacity-50',
};

export function Button({ children,  className, buttonType = 'blue', ...rest }: ButtonProps) {
  const { pending } = useFormStatus();
  const styles = pending ? disabledStyles[buttonType] : buttonStyles[buttonType];

  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-4 text-center me-2 mb-2',
        styles,
        className
      )}
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {children}
    </button>
  );
}
