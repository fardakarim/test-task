import type { RootState } from "$store/index";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Routes as Switch, Route } from "react-router-dom";

const excludeFolders = ["components"];

const PRESERVED: any = import.meta.glob("/src/pages/(_app|404).tsx", {
  eager: true,
});
const ROUTES: any = import.meta.glob("/src/pages/**/[a-z[]*.tsx", {
  eager: true,
});

const preserved: any = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace(/\/src\/pages\/|\.tsx$/g, "");
  return { ...preserved, [key]: PRESERVED[file].default };
}, {});

const routes = Object.keys(ROUTES)
  .filter((f) => excludeFolders.findIndex((fi: string) => f.includes(fi)) < 0)
  .map((route) => {
    const path = route
      .replace(/\/src\/pages|index|\.tsx$/g, "")
      .replace(/\/$/, "")
      .replace(/\[\.{3}.+\]/, "*")
      .replace(/\[(.+)\]/, ":$1");

    const role = ROUTES[route].role;

    return { path, component: ROUTES[route].default, role };
  });

export const Routes = () => {
  const App = preserved?.["_app"] || Fragment;
  const NotFound = preserved?.["404"] || Fragment;

  return (
    <App>
      <Switch>
        {routes.map(
          ({ path, component: Component = Fragment, role = "GUEST" }) => {
            if (role == "GUEST")
              return <Route key={path} path={path} element={<Component />} />;

            return <Route key={path} path={path} element={<Component />} />;
          }
        )}
        <Route path="*" element={<NotFound />} />
      </Switch>
    </App>
  );
};
