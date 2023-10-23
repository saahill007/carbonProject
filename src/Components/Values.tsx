// src/Values.tsx
import React from "react";
import { Link, Routes, Route, Outlet, useNavigate } from "react-router-dom";

// src/Values.tsx
import { useState } from "react";
import ValuesLandingPage from "./ValuesLandingPage";
import Admin_add from "./admin_add";
import AdminEdit from "./admin_edit";
import Utilities from "./Utilities";
import Admin_main from "./admin_main";
import Formulas from "./Formulas";
// import UnitsSelector from "./unitsSelector";
// import { Link, Routes, Route, Outlet, useNavigate } from "react-router-dom";

interface ValuesProps {
  children?: React.ReactNode;
}

const ValuesPage: React.FC<ValuesProps> = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isPanelExpanded, setPanelExpanded] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    navigate(`/${option}`);
  };

  const togglePanel = () => {
    setPanelExpanded(!isPanelExpanded);
  };

  return (
    <div className={`values-page ${isPanelExpanded ? "panel-expanded" : ""}`}>
      <div className="side-panel">
        <div className="expand-button" onClick={togglePanel}>
          {isPanelExpanded ? (
            <i className="bi bi-list" style={{ fontSize: "2em" }}></i>
          ) : (
            <i className="bi bi-list" style={{ fontSize: "2em" }}></i>
          )}
        </div>
        <Link
          to="admin"
          className={selectedOption === "admin" ? "selected" : ""}
          onClick={() => handleOptionClick("admin")}
        >
          {isPanelExpanded ? (
            <div>
              <i
                className="bi bi-person-fill"
                style={{ fontSize: "1.5em" }}
              ></i>
              &nbsp; Admin
            </div>
          ) : (
            <i className="bi bi-person-fill" style={{ fontSize: "2em" }}></i>
          )}
        </Link>
        <Link
          to="utilities"
          className={selectedOption === "utilities" ? "selected" : ""}
          onClick={() => handleOptionClick("utilities")}
        >
          {isPanelExpanded ? (
            <div>
              <i
                className="bi bi-wrench-adjustable"
                style={{ fontSize: "1.5em" }}
              ></i>
              &nbsp; Utilities
            </div>
          ) : (
            <i
              className="bi bi-wrench-adjustable"
              style={{ fontSize: "2em" }}
            ></i>
          )}
        </Link>
        <Link
          to="payments"
          className={selectedOption === "payments" ? "selected" : ""}
          onClick={() => handleOptionClick("payments")}
        >
          {isPanelExpanded ? (
            <div>
              <i
                className="bi bi-credit-card-2-back-fill"
                style={{ fontSize: "1.5em" }}
              ></i>
              &nbsp; Payments
            </div>
          ) : (
            <i
              className="bi bi-credit-card-2-back-fill"
              style={{ fontSize: "2em" }}
            ></i>
          )}
        </Link>
        <Link
          to="zipcodes"
          className={selectedOption === "zipcodes" ? "selected" : ""}
          onClick={() => handleOptionClick("zipcodes")}
        >
          {isPanelExpanded ? (
            <div>
              <i
                className="bi bi-globe-americas"
                style={{ fontSize: "1.5em" }}
              ></i>
              &nbsp; Zip Codes
            </div>
          ) : (
            <i className="bi bi-globe-americas" style={{ fontSize: "2em" }}></i>
          )}
        </Link>
        <Link
          to="formulas"
          className={selectedOption === "formulas" ? "selected" : ""}
          onClick={() => handleOptionClick("formulas")}
        >
          {isPanelExpanded ? (
            <div>
              <i className="bi bi-percent" style={{ fontSize: "1.5em" }}></i>
              &nbsp; Formulas
            </div>
          ) : (
            <i className="bi bi-percent" style={{ fontSize: "2em" }}></i>
          )}
        </Link>
      </div>
      <div className="main-window">{children}</div>
    </div>
  );
};

// ... (rest of the components)

//const Admin: React.FC = () => <div>Admin Page</div>;
// const Utilities: React.FC = () => <div>Utilities Page</div>;
const Payments: React.FC = () => <div>Payments Page</div>;
const ZipCodes: React.FC = () => <div>Zip Codes Page</div>;
// const Formulas: React.FC = () => <div>Formulas Page</div>;

const Values: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ValuesLandingPage></ValuesLandingPage>} />
      <Route path="admin" element={<Admin_main />} />
      <Route path="utilities" element={<Utilities />} />
      <Route path="payments" element={<Payments />} />
      <Route path="zipcodes" element={<ZipCodes />} />
      <Route path="formulas" element={<Formulas />} />
      <Route path="/admin/admin_add" element={<Admin_add />} />
      <Route path="/admin/admin_edit" element={<AdminEdit />} />
    </Routes>
  );
};

export { ValuesPage, Values };
