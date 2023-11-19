import React from "react";
import "./Values.css";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

// src/Values.tsx
import { useState } from "react";
import ValuesLandingPage from "./ValuesLandingPage";
import Admin_add from "./admin_add";
import AdminEdit from "./admin_edit";
import Utilities from "./UtilitiesP";
import Admin_main from "./admin_main";
import Formulas from "./Formulas";
import Category from "./category_main";
import Category_add from "./category_add";
import CategoryEdit from "./category_edit";
import CategoryImg from "../assets/Category.png";
import Utilities_add from "./Utilities_add";
import UtilitiesEdit from "./Utilities_edit";
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
      <div
        className="side-panel"
        style={{
          background: "#FF5701",
          position: "fixed",
          left: 0,

          height: "100vh",
        }}
      >
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
        {/* <Link
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
        </Link> */}
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
        <Link
          to="category"
          className={selectedOption === "category" ? "selected" : ""}
          onClick={() => handleOptionClick("category")}
          style={{ position: "relative", zIndex: 1000 }}
        >
          <div className="side-panel-link">
            <div className="icon-and-text" style={{ display: "flex" }}>
              <div className="icon">
                <img
                  src={CategoryImg}
                  alt="Category"
                  style={{
                    height: "1.5em",
                    width: "1.5em",
                    background: "black",
                  }}
                />
              </div>
              {isPanelExpanded ? (
                <div className="text" style={{ marginLeft: "10px" }}>
                  Category
                </div>
              ) : (
                <div className="text" style={{ display: "none" }}>
                  Category
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* <div className="Category-image">
          <img src={CategoryImg} alt="Category" style={{ height: '100%', width: '100%' }} />
        </div> */}
      </div>
      <div className="main-window">{children}</div>
      {/* <div className="bottom-border"></div> */}
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
      {/* <Route path="/admin/admin_edit" element={<AdminEdit />} /> */}
      <Route path="/admin/admin_edit/:adminIds" element={<AdminEdit />} />
      <Route path="category" element={<Category />} />
      <Route path="/category/category_add" element={<Category_add />} />
      <Route
        path="/category/category_edit/:categoryIds"
        element={<CategoryEdit />}
      />
      <Route path="/utilities/utilities_add" element={<Utilities_add />} />
      <Route
        path="/utilities/utilities_edit/:utilityIds"
        element={<UtilitiesEdit />}
      />
    </Routes>
  );
};

export { ValuesPage, Values };
