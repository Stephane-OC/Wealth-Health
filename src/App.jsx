import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./features/loadingSlice";
import Home from "./pages/Home";
import EmployeeList from "./pages/EmployeeList/EmployeeList";
import Header from "./components/Header/Header";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

/* App component serves as root of application. It wraps entire application              **
 ** with lightweight client-side routing for the application's two views.                 **
 **                                                                                       **
 ** AppWithRouter component contains core logic for route management and                  **
 ** loading screen logic. It listens to changes in URL path to trigger loading            **
 ** screen, ensuring users receive immediate visual feedback anytime navigation occurs.   **
 **                                                                                       **
 ** Using useDispatch and useSelector hooks from 'react-redux', component                 **
 ** dispatches actions to manage global loading state. It sets 'isLoading' to true        **
 ** at start of navigation and then to false after a brief timeout, simulating            **
 ** asynchronous data fetching or processing delays.                                      **
 **                                                                                       **
 ** LoadingScreen component is conditionally rendered based on 'isLoading' state.         **
 ** It provides users with visual feedback during navigation and data loading processes.  **
 **                                                                                       **
 ** The popstate listener keeps rendered content synchronized with browser navigation.    **
 ** Any undefined URL displays Home, avoiding dead ends and unhandled routes.              */

const getCurrentPathname = () => {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const { pathname } = window.location;

  if (basePath && pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length) || "/";
  }

  return pathname || "/";
};

function AppContent({ pathname }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(setLoading(true));

    const loadingTimer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, [dispatch, pathname]);

  const CurrentPage =
    pathname === "/employee-list" ? EmployeeList : Home;

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Header />
      <CurrentPage />
    </>
  );
}

function App() {
  const [pathname, setPathname] = useState(getCurrentPathname);

  useEffect(() => {
    const handleNavigation = () => setPathname(getCurrentPathname());

    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  return <AppContent pathname={pathname} />;
}

export default App;
