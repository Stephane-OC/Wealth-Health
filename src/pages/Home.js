import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import { States } from "../components/States";

import "../App.css";

export default function Home() {
  const saveEmployee = () => {};

  const [birthDate, setBirthDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  const stateOptions = States.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  return (
    <div>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>
        <form action="#" id="create-employee">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" />

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePicker
            onChange={setBirthDate}
            value={birthDate}
            id="date-of-birth"
          />

          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            onChange={setStartDate}
            value={startDate}
            id="start-date"
          />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" />

            <label htmlFor="city">City</label>
            <input id="city" type="text" />

            <label htmlFor="state">State</label>
            <Select options={stateOptions} name="state" id="state" />

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select name="department" id="department">
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
        </form>

        <button onClick={saveEmployee}>Save</button>
      </div>
    </div>
  );
}
