import SaveEmployeeForm from "../components/SaveEmployeeForm/SaveEmployeeForm";

import "../App.css";

export default function Home() {
  return (
    <div>
      <div className="container">
        <div className="h2-style">
          <h2>Create Employee</h2>
        </div>

        {/* Component SaveEmployeeForm */}
        <SaveEmployeeForm />
      </div>
    </div>
  );
}
