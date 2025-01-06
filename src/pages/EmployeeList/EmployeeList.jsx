import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Registering the necessary modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Lazy load du composant AgGridReact
const AgGridReactLazy = lazy(() =>
  import('@ag-grid-community/react').then((module) => ({ default: module.AgGridReact }))
);

export default function EmployeeList() {
  const employees = useSelector((state) => state.employees.employees);

   /* EmployeeList component is responsible for displaying a grid of employees.                          **
   ** It uses AG Grid to render employees' data in a tabular format.                                     **
   ** 'useSelector' hook fetches employee data from Redux store state.                                   **
   **                                                                                                    **
   ** AG Grid's column definitions are set to include all relevant details of employees.                 **
   ** Each column header maps to a property of employee objects.                                         **
   ** Grid offers features such as sorting, filtering, and pagination to interact with employee data.    **
   **                                                                                                    **
   ** Dynamic importing ('React.lazy') and 'Suspense' are used to lazily load the AgGridReact component, **
   ** improving initial page load performance by reducing the size of the initial bundle.                **
   ** A 'resize' event handler adjusts column sizes dynamically on window size changes,                  **
   ** ensuring a responsive layout and an enhanced user experience across different devices.             **
   ** The 'rowSelection' property has been updated to use the object-based configuration required by AG  **
   ** Grid's latest versions.                                                                            */

  const [columnDefs] = useState([
    { field: 'firstName', sortable: true, filter: true },
    { field: 'lastName', sortable: true, filter: true },
    { field: 'startDate', sortable: true, filter: true },
    { field: 'department', sortable: true, filter: true },
    { field: 'dateOfBirth', sortable: true, filter: true },
    { field: 'street', sortable: true, filter: true },
    { field: 'city', sortable: true, filter: true },
    { field: 'state', sortable: true, filter: true },
    { field: 'zipCode', sortable: true, filter: true },
  ]);

  const gridApiRef = useRef(null);

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
    gridApiRef.current.sizeColumnsToFit();
  };

  const onFilterTextChange = (e) => {
    if (gridApiRef.current) {
      gridApiRef.current.setQuickFilter(e.target.value);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (gridApiRef.current) {
        gridApiRef.current.sizeColumnsToFit();
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div>
      <div className="flex-container">
        <input
          type="text"
          onChange={onFilterTextChange}
          placeholder="Search..."
          className="search-box"
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
          <AgGridReactLazy
            onGridReady={onGridReady}
            columnDefs={columnDefs}
            rowData={employees}
            rowSelection={{ type: 'multiple' }}
            animateRows={true}
            pagination={true}
          />
        </div>
      </Suspense>
    </div>
  );
}