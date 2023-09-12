import { RouterProvider } from "atomic-router-react";
import { allSettled, fork } from "effector";
import { Provider } from "effector-react";
import { createRoot } from "react-dom/client";

import { Application } from "./app/app";
import "./app/index.css";
import { appStarted } from "./shared/init";
import { router } from "./shared/routing";

const root = document.getElementById("root") as HTMLElement;

const scope = fork();
await allSettled(appStarted, { scope });

createRoot(root).render(
  <Provider value={scope}>
    <RouterProvider router={router}>
      <Application />
    </RouterProvider>
  </Provider>,
);
