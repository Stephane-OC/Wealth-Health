import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./features/loadingSlice";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import EmployeeList from "./pages/EmployeeList/EmployeeList";
import Header from "./components/Header/Header";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

/* App component serves as root of application. It wraps entire application              **
 ** in a Router component from 'react-router-dom', enabling client-side routing.          **
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
 ** useLocation hook is utilized to access current location object, which contains        **
 ** information about current URL. useEffect hook listens for changes to                  **
 ** 'location.pathname', triggering loading logic on every route change.                  **
 ** Wildcard route (`<Route path="*" element={<Home />} />`) ensures that any undefined   **
 ** URL redirects to Home component, enhancing UX by avoiding dead ends and unhandled     **
 ** routes within the application.                                                        */

function AppWithRouter() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const location = useLocation();

  useEffect(() => {
    dispatch(setLoading(true));

    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch, location.pathname]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  );
}

export default App;