import { RouterProvider } from "atomic-router-react";
import { allSettled, fork } from "effector";
import { Provider } from "effector-react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";

import { Application } from "~/app/app";
import "~/app/index.css";

import i18n from "~/shared/config/i18n";
import { appStarted } from "~/shared/init";
import { router } from "~/shared/routing";

const root = document.getElementById("root") as HTMLElement;

const scope = fork();
allSettled(appStarted, { scope }).catch(() => console.warn("совсем все плохо"));

createRoot(root).render(
  <Provider value={scope}>
    <RouterProvider router={router}>
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <Application />
      </I18nextProvider>
    </RouterProvider>
  </Provider>,
);
