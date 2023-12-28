import React from "react";
import Login from "./Login";
import "./user-form.scss";

const UserForm: React.FC = () => {
  return (
    <div className="logging">
      <div
        className={`logging__user-form 
    }`}
      >
        <h1>Login</h1>
        <Login />
      </div>
    </div>
  );
};

export default UserForm;
