import React from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { addEmployee } from "../features/employeeSlice";
import { v4 as uuidv4 } from "uuid";
import { States } from "../components/States";
import { Options } from "../components/Options";


/* SaveEmployeeForm component is responsible for capturing new employee data from user input. **
**                                                                                            **
** It maintains a local state 'employeeData' that holds form values, including first name,    **
** last name, date of birth, start date, department, and address details. State is updated    **
** on each input change.                                                                      **
**                                                                                            **
** On form submission, 'saveEmployee' function is called. It prevents default form            **
** submission event, constructs a new employee object with a unique ID and formatted date     **
** strings, dispatches 'addEmployee' action to store, and resets form fields.                 **
**                                                                                            **
** Component uses 'react-select' for department and state selection, which allows for a       **
** richer dropdown experience compared to native select elements.                             **
**                                                                                            **
** Component also uses 'react-date-picker' for a user-friendly date picking interface.        **
**                                                                                            **
** State and department options are derived from States and Options data respectively,        **
** with 'map' functions transforming them into a format 'react-select' can utilize.           **
**                                                                                            **
** After an employee is added, form's state is reset to empty values to allow for             **
** entering next employee's data. This ensures a fresh form for each submission.              */

export default function SaveEmployeeForm() {
  const dispatch = useDispatch();

  const [employeeData, setEmployeeData] = React.useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    department: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setEmployeeData({ ...employeeData, [name]: date });
  };

  const handleSelectChange = (selectedOption, name) => {
    setEmployeeData({ ...employeeData, [name]: selectedOption || "" });
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    const newEmployeeWithId = {
      ...employeeData,
      id: uuidv4(),
      state: employeeData.state ? employeeData.state.value : "",
      department: employeeData.department ? employeeData.department.value : "",
      dateOfBirth: employeeData.dateOfBirth
        ? new Date(employeeData.dateOfBirth).toISOString().split("T")[0]
        : "",
      startDate: employeeData.startDate
        ? new Date(employeeData.startDate).toISOString().split("T")[0]
        : "",
    };
    dispatch(addEmployee(newEmployeeWithId));

    // Resets the fields after saving
    setEmployeeData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      startDate: "",
      department: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  const stateOptions = States.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  const departmentOptions = Options.map((department) => ({
    value: department.value,
    label: department.label,
  }));

  return (
    <form onSubmit={saveEmployee}>
      <label htmlFor="first-name">First Name</label>
      <input
        type="text"
        name="firstName"
        value={employeeData.firstName}
        onChange={handleInputChange}
      />

      <label htmlFor="last-name">Last Name</label>
      <input
        type="text"
        name="lastName"
        value={employeeData.lastName}
        onChange={handleInputChange}
      />

      <label htmlFor="date-of-birth">Date of Birth</label>
      <DatePicker
        name="dateOfBirth"
        onChange={(date) => handleDateChange(date, "dateOfBirth")}
        value={employeeData.dateOfBirth}
      />

      <label htmlFor="start-date">Start Date</label>
      <DatePicker
        name="startDate"
        onChange={(date) => handleDateChange(date, "startDate")}
        value={employeeData.startDate}
      />

      <fieldset className="address">
        <legend>Address</legend>

        <label htmlFor="street">Street</label>
        <input
          type="text"
          name="street"
          value={employeeData.street}
          onChange={handleInputChange}
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={employeeData.city}
          onChange={handleInputChange}
        />

        <label htmlFor="state">State</label>
        <Select
          name="state"
          options={stateOptions}
          value={
            stateOptions.find(
              (option) => option.value === employeeData.state?.value
            ) || ""
          }
          onChange={(option) => handleSelectChange(option, "state")}
          placeholder="Select State"
        />
        <label htmlFor="zip-code">Zip Code</label>
        <input
          type="number"
          name="zipCode"
          value={employeeData.zipCode}
          onChange={handleInputChange}
        />
      </fieldset>

      <label htmlFor="department">Department</label>
      <Select
        name="department"
        options={departmentOptions}
        value={
          departmentOptions.find(
            (option) => option.value === employeeData.department?.value
          ) || ""
        }
        onChange={(option) => handleSelectChange(option, "department")}
        placeholder="Select Department"
      />

      <button type="submit">Save</button>
    </form>
  );
}
