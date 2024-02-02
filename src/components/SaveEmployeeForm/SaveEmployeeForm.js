import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import { Modal, Button, ButtonContainer } from "elaspark-ui";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../features/employeeSlice";
import { v4 as uuidv4 } from "uuid";
import { States } from "../States";
import { Options } from "../Options";

import "../SaveEmployeeForm/SaveEmployeeForm.css";
import Wealth_Health from "../../assets/img/Wealth_Health.webp";
/* SaveEmployeeForm component captures new employee data from user input and    **
** handles form submission to add new employees to store.                       **
**                                                                              **
** Utilizes local state 'employeeData' to manage form inputs including          **
**   personal details, department, and address.                                 **
**                                                                              **
** Employs 'react-select' for enhanced department and state dropdowns and       **
**   'react-date-picker' for a user-friendly date selection interface.          **
**                                                                              **
** Validates required fields on form submission and uses 'uuid' to assign       **
**   unique IDs to new employees.                                               **
**                                                                              **
** On successful submission:                                                    **
**   - Dispatches 'addEmployee' action to add a new employee to global store.   **
**   - Displays a success message in a modal.                                   **
**   - Resets form fields for next entry.                                       **
**                                                                              **
** On submission with missing fields:                                           **
**   - Retains entered data.                                                    **
**   - Displays an error message in a modal prompting completion of all fields. **
** Maps States and Options data for 'react-select' options.                     **
**                                                                              **
** State and department selections are stored as objects containing 'value' and **
** 'label',accommodating format required by 'react-select'.                     */

export default function SaveEmployeeForm() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [employeeData, setEmployeeData] = React.useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    department: null,
    street: "",
    city: "",
    state: null,
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

    // Function to check if all required fields are filled
    const isFormValid = () => {
      const requiredFields = [
        "firstName",
        "lastName",
        "dateOfBirth",
        "startDate",
        "department",
        "street",
        "city",
        "state",
        "zipCode",
      ];
      return requiredFields.every((field) => employeeData[field]);
    };

    if (isFormValid()) {
      const newEmployeeWithId = {
        ...employeeData,
        id: uuidv4(),
        state: employeeData.state ? employeeData.state.value : "",
        department: employeeData.department
          ? employeeData.department.value
          : "",
        dateOfBirth: employeeData.dateOfBirth
          ? new Date(employeeData.dateOfBirth).toISOString().split("T")[0]
          : "",
        startDate: employeeData.startDate
          ? new Date(employeeData.startDate).toISOString().split("T")[0]
          : "",
      };
      dispatch(addEmployee(newEmployeeWithId));
      console.log(
        `Employee Added:\n- First Name: ${employeeData.firstName}\n- Last Name: ${employeeData.lastName}\n- Date of Birth: ${employeeData.dateOfBirth}\n- Start Date: ${employeeData.startDate}\n- Department: ${employeeData.department?.value}\n- Street: ${employeeData.street}\n- City: ${employeeData.city}\n- State: ${employeeData.state?.value}\n- Zip Code: ${employeeData.zipCode}`
      );
      // Set success message
      setModalMessage(
        `Employee ${employeeData.firstName} ${employeeData.lastName} has been successfully added to the database.`
      );

      // Resets the fields after saving
      setEmployeeData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        startDate: "",
        department: null,
        street: "",
        city: "",
        state: null,
        zipCode: "",
      });
    } else {
      // Identify missing fields
      const missingFields = [
        "firstName",
        "lastName",
        "dateOfBirth",
        "startDate",
        "department",
        "street",
        "city",
        "state",
        "zipCode",
      ]
        .filter((field) => !employeeData[field])
        .join(", ");
      console.error(
        `Employee could not be added. Missing fields: ${missingFields}`
      );
      // Set error message
      setModalMessage(
        "Employee could not be added to the database as some fields are missing."
      );
    }

    setIsModalOpen(true);
  };

  const stateOptions = States.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  const departmentOptions = Options.map((department) => ({
    value: department.value,
    label: department.label,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.selectProps.menuIsOpen
        ? "var(--dropdown-bg)"
        : "var(--dropdown-bg)",
      color: "var(--dropdown-text)",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--dropdown-bg)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--color-primary)"
        : state.isFocused
        ? "var(--nav-hover-color)"
        : "var(--dropdown-bg)",
      color: "var(--dropdown-text)",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--dropdown-text)",
    }),
  };

  return (
    <form className="save-employee-form" onSubmit={saveEmployee}>
      {isModalOpen && (
        <Modal
          title={{ text: "Wealth Health", size: "2", align: "center" }}
          centered
          logoSrc={Wealth_Health}
          size="m-m"
          backdropStyle="dark-opaque"
          styleType="style-4"
          animation="fadeIn"
          borderRadius="br-lg"
          onClose={() => setIsModalOpen(false)}
          ariaLabelledBy="modalTitle"
          showCloseButton={true}
          closeAlign="right"
          closeButtonStyleType="btn-1"
          closeButtonAnimation="pulse"
          closeButtonBorderStyle="b-b-2"
        >
          <h1 paragraph="center" className="t-2 center">
            {modalMessage.includes("successfully added")
              ? "Confirmation"
              : "Error"}
          </h1>
          <p className="p-1 center">{modalMessage}</p>
          <ButtonContainer align="center">
            <Button
              size="b-l"
              styleType="btn-1"
              animation="scaleUp"
              borderStyle="b-b-3"
              onClick={() => setIsModalOpen(false)}
            >
              OK
            </Button>
          </ButtonContainer>
        </Modal>
      )}
      <div className="form-inner">
        <div className="form-group-row">
          <label htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            name="firstName"
            value={employeeData.firstName}
            onChange={handleInputChange}
          />

          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group-row">
          <label id="dob-label">Date of Birth</label>
          <DatePicker
            id="date-of-birth"
            clearAriaLabel="Clear date"
            calendarAriaLabel="Open calendar"
            calendarClassName="absolute"
            name="dateOfBirth"
            selected={employeeData.dateOfBirth}
            onChange={(date) => handleDateChange(date, "dateOfBirth")}
            aria-labelledby="dob-label"
            value={employeeData.dateOfBirth}
          />
        </div>
        <div className="form-group-row">
          <label id="start-date-label">Start Date</label>
          <DatePicker
            id="start-date"
            clearAriaLabel="Clear date"
            calendarAriaLabel="Open calendar"
            calendarClassName="absolute"
            name="startDate"
            selected={employeeData.startDate}
            onChange={(date) => handleDateChange(date, "startDate")}
            aria-labelledby="start-date-label"
            value={employeeData.startDate}
          />
        </div>

        <fieldset className="address">
          <legend>Address</legend>
          <div className="address-fields">
            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              name="street"
              value={employeeData.street}
              onChange={handleInputChange}
            />

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              name="city"
              value={employeeData.city}
              onChange={handleInputChange}
            />

            <label id="label-state">State</label>
            <div className="react-select-container">
              <Select
                styles={customStyles}
                name="state"
                options={stateOptions}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                onChange={(option) => handleSelectChange(option, "state")}
                placeholder="Select State"
                aria-label="State"
              />
            </div>

            <label htmlFor="zip-code">Zip Code</label>
            <input
              id="zip-code"
              type="number"
              name="zipCode"
              value={employeeData.zipCode}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>

        <div className="form-group department">
          <label id="label-department">Department</label>departmentOptions
          <div className="react-select-container">
            <Select
              styles={customStyles}
              name="department"
              options={departmentOptions}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              onChange={(option) => handleSelectChange(option, "department")}
              placeholder="Select Department"
              aria-label="Department"
            />
          </div>
        </div>

        <div className="form-group">
          <button type="submit" name="button" className="button">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
