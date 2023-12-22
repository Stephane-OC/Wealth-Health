import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { mockedEmployees } from '../../data/dataMocked';

// Helper function to format dates to string
const formatDate = (date) => date.toISOString().split('T')[0];

// Add a unique ID to each mocked employee if not already present
const formattedMockedEmployees = mockedEmployees.map(emp => ({
  ...emp,
  id: emp.id || uuidv4(),
}));

// Create a slice for employees with initial state and reducers
export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: formattedMockedEmployees,
  },
  reducers: {
    // Reducer to add a new employee with formatted dates and a unique ID
    addEmployee: (state, action) => {
      const newEmployee = {
        ...action.payload,
        dateOfBirth: formatDate(new Date(action.payload.dateOfBirth)),
        startDate: formatDate(new Date(action.payload.startDate)),
        id: action.payload.id || uuidv4(),
      };
      state.employees.push(newEmployee);
    },
    
  },
});

// Export the generated actions from the slice
export const { addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
