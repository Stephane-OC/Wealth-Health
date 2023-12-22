import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

  /* EmployeeList component is responsible for displaying data grid of employees.  **
  ** It uses Material-UI's DataGrid to render employees' data in tabular form.     **
  ** 'useSelector' hook fetches employee data from Redux store's state.            **
  ** DataGrid's columns configuration is defined to include all relevant employee  **
  ** details. Each column header maps to a property of employee objects.           **
  ** Grid allows interaction such as row selection with checkboxes and pagination. */
 
export default function EmployeeList() {
  const employees = useSelector((state) => state.employees.employees);

  const columns = [
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'startDate', headerName: 'Start Date', width: 130 },
    { field: 'department', headerName: 'Department', width: 130 },
    { field: 'dateOfBirth', headerName: 'Date of Birth', width: 130 },
    { field: 'street', headerName: 'Street', width: 130 },
    { field: 'city', headerName: 'City', width: 130 },
    { field: 'state', headerName: 'State', width: 130 },
    { field: 'zipCode', headerName: 'Zip Code', width: 130 },

  ];

  return (
    <div className="container">
      <h1>Current Employees</h1>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={employees}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}