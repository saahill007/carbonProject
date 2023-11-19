// src/App.tsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";
import { ValuesPage, Values } from "./Components/Values";
import Questions from "./Components/Questions";
import AddQuestionPage from "./Components/Addquestionpage";

// import FillInTheBlank from "./Components/fillintheblank";
import Support from "./Components/Support";
import Contact from "./Components/Contact";
import Logout from "./Components/Logout";
import Slider from "./Components/Slider";
import Dropdown from "./Components/Dropdown";
import QuestionAdmin from "./Components/QuestionAdmin";
import Customer_queries from "./Components/customer_queries";
import Customer_enquiry_main from "./Components/customer_enquiry_main";
import Email_notification from "./Components/email_notification";
// import CategoryDropdown from "./Components/catedrop";
import Dashboard from "./Components/Dashboard";
import AdminLogin from "./Components/admin_login";
import ForgotPassword from "./Components/ForgetPassword";
import ResetPassword from "./Components/reset_password";
import logoImg from "./assets/offset.png";
import { apiUrlBase } from "./config";

const Home: React.FC = () => <div>Home Page</div>;

const App: React.FC = () => {
  const [isAdmin, setAdmin] = useState(true);

  useEffect(() => {
    const currentPath = window.location.pathname;
    console.log(currentPath);
    console.log(isAdmin);
    if (currentPath === "/" || currentPath === "/logout") {
      console.log("admin");
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [window.location.pathname, isAdmin]);

  const handleLogout = () => {
    setAdmin(true); // or whatever logic you need
  };


  return (
    <Router>
      <div className="app-container">
        <nav
          className="navbar"
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            background: "#FFF",
            zIndex: 1000,
          }}
        >
          <div className="navbar-left">
            <span>
              <img
                src={logoImg}
                style={{ width: "140px", height: "50px", marginLeft: "60px" }}
              ></img>
            </span>
          </div>
          {!isAdmin && (
            <div className="navbar-right">
              <NavLink to="/values">Values</NavLink>
              <NavLink to="/questions">Questions</NavLink>
              <NavLink to="/support">Support</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/logout" onClick={handleLogout} >Logout</NavLink>
            </div>
          )}
        </nav>

        <div className="main-window">
          <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route
              path="/values/*"
              element={
                <ValuesPage>
                  <Values />
                </ValuesPage>
              }
            />
            <Route path="/questions" element={<Questions />} />
            <Route path="/questions/add" element={<QuestionAdmin />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact/:id" element={<QuestionAdmin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/questions/slider" element={<Slider />} />
            <Route path="/questions/dropdown" element={<Dropdown />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route
              path="/customer_enquiry_main"
              element={<Customer_enquiry_main />}
            />
            {/* <Route path="/Categorydropdown" element={<CategoryDrop />} /> */}
            <Route
              path="/email_notification"
              element={<Email_notification />}
            />
            <Route
              path="/customer_enquiries/:enquiry_id"
              element={<Customer_queries />}
            />
            <Route path="forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
