import React, { useEffect } from "react";
import { useRoutes, useLocation, RouteObject } from "react-router-dom";
/** pages */
import Landing from "../pages/Landing";
import GroupUser from "../pages/GroupUser.tsx";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Landing />,
    },
    {
        path: "/group-data",
        element: <GroupUser />,
    },
];

const Routes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const routing = useRoutes(routes);
  return routing;
};

export default Routes;
