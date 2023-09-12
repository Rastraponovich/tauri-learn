import { RouteRecord, createRoutesView } from "atomic-router-react";

const pages = import.meta.glob<true, string, { default: RouteRecord<object, object> }>(
  "./**/index.ts",
  { eager: true },
);

const routes = Object.values(pages).map((page) => {
  console.log(pages, page);

  return page.default;
});

export const RoutesView = createRoutesView({ routes });
