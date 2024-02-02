import React, { useEffect, useState, useRef, Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./EmployeeList.css";

// Lazy load AgGridReact component
const AgGridReactLazy = lazy(() =>
  import("ag-grid-react").then((module) => ({ default: module.AgGridReact }))
);

/* EmployeeList component is responsible for displaying a grid of employees.                            **
 ** It uses AG Grid to render employees' data in a tabular format.                                       **
 ** 'useSelector' hook fetches employee data from Redux store state.                                     **
 **                                                                                                      **
 ** AG Grid's column definitions are set to include all relevant details of employees.                   **
 ** Each column header maps to a property of employee objects.                                           **
 ** Grid offers features such as sorting, filtering,                                                     **
 ** and a customizable search box to interact with employee data.                                        **
 **                                                                                                      **
 ** Dynamic importing ('React.lazy') and 'Suspense' are used to lazily load AgGridReact component,       **
 ** thus improving initial page load performance by reducing size of initial bundle.                     **
 ** A 'resize' event handler is added to adjust column sizes on window size changes,                     **
 ** ensuring a responsive layout and enhanced user experience across different devices.                  **
 ** 'gridPreDestroy' event is used for cleanup logic, ensuring proper handling of grid lifecycle events. */

export default function EmployeeList() {
  const employees = useSelector((state) => state.employees.employees);

  const [columnDefs] = useState([
    {
      field: "firstName",
      sortable: true,
      filter: true,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "lastName",
      sortable: true,
      filter: true,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "startDate",
      sortable: true,
      filter: true,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "department",
      sortable: true,
      filter: true,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "dateOfBirth",
      sortable: true,
      filter: true,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "street",
      sortable: true,
      filter: true,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "city",
      sortable: true,
      filter: true,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "state",
      sortable: true,
      filter: true,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      field: "zipCode",
      sortable: true,
      filter: true,
      minWidth: 100,
      maxWidth: 200,
    },
  ]);

  const gridApiRef = useRef(null);

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const onFilterTextChange = (e) => {
    if (gridApiRef.current) {
      gridApiRef.current.updateGridOptions({ quickFilterText: e.target.value });
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (gridApiRef.current && !gridApiRef.current.isDestroyed()) {
        gridApiRef.current.sizeColumnsToFit();
      }
    };

    // Add the 'resize' event listener to window
    window.addEventListener("resize", onResize);

    // Call function once to initialize column sizes
    onResize();

    // Clean up by removing event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div>
      <div className="flex-container">
        <div className="search-box-container">
          <input
            type="text"
            onChange={onFilterTextChange}
            placeholder="Recherche..."
            className="search-box"
          />
        </div>
      </div>
      <Suspense fallback={<div>Chargement du tableau...</div>}>
        <div className="flex-container">
          <div
            className="ag-theme-quartz"
            style={{ height: 680, width: "98%" }}
          >
            <AgGridReactLazy
              onGridReady={onGridReady}
              columnDefs={columnDefs}
              rowData={employees}
              rowSelection="multiple"
              animateRows={true}
              pagination={true}
            />
          </div>
        </div>
      </Suspense>
    </div>
  );
}