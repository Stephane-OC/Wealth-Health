import { Link } from "react-router-dom";

import SaveEmployeeForm from "../components/SaveEmployeeForm";

import "../App.css";

export default function Home() {
  return (
    <div>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employee-list">View Current Employees</Link>
        <h2>Create Employee</h2>

        {/* Component SaveEmployeeForm */}
        <SaveEmployeeForm />
      </div>
    </div>
  );
}
