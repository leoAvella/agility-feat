import { ThemeProvider } from "flowbite-react";

const customTheme = {
  button: {
    color: {
      primary:
        "bg-[#4d4dbb] hover:bg-[#3c3c99] focus:ring-4 focus:ring-[#2e2e80]",
      secondary: "bg-white text-[#4d4dbb] hover:bg-white-100",
    },
    size: {
      lg: "px-6 py-3 text-lg",
    },
  },
};

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const CustomTheme = ({ children }: GlobalProviderProps) => {
  return <ThemeProvider theme={customTheme}>{children}</ThemeProvider>;
};
