import { Link } from "atomic-router-react";
import { type ReactNode } from "react";

import { routes } from "~/shared/routing";

interface MainLayoutProps {
  children: ReactNode;
  actions?: ReactNode;
}

export const MainLayout = ({ children, actions }: MainLayoutProps) => {
  return (
    <>
      <header className="flex justify-between gap-4 bg-zinc-400 px-4 py-2 text-white">
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link
                to={routes.home}
                activeClassName="text-blue-700"
                className="flex items-center rounded-md border px-4 py-2 hover:border-blue-300 hover:text-blue-300 "
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={routes.posts.posts}
                activeClassName="text-blue-700"
                className="flex items-center rounded-md border px-4 py-2 hover:border-blue-300 hover:text-blue-300 "
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                to={routes.users.users}
                activeClassName="text-blue-700"
                className="flex items-center rounded-md border px-4 py-2 hover:border-blue-300 hover:text-blue-300 "
              >
                Users
              </Link>
            </li>
          </ul>
        </nav>

        {actions}
      </header>
      {children}
    </>
  );
};
