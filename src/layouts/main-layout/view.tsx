// import { Link } from "atomic-router-react";
import { type ReactNode } from "react";

import { LangToggler } from "~/widgets/lang-switcher";
import { ThemeToggler } from "~/widgets/theme-swither";

// import { routes } from "~/shared/routing";

interface MainLayoutProps {
  children: ReactNode;
  actions?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <header className="flex items-center justify-between px-4 py-1">
        <h1 className="bg-gradient-to-br from-teal-400 from-[30%] to-teal-500 to-[50%]  bg-clip-text text-2xl font-bold text-transparent">
          MoneyKeeper
        </h1>

        <div className="flex gap-2 p-2">
          <LangToggler />
          <ThemeToggler />
        </div>
      </header>
      {children}
    </>
  );
};
