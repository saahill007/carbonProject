// src/App.tsx
import React from "react";
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
import MultipleChoice from "./Components/multiplechoice";
// import FillInTheBlank from "./Components/fillintheblank";
import Support from "./Components/Support";
import Contact from "./Components/Contact";
import Logout from "./Components/Logout";
import Slider from "./Components/Slider";
import Dropdown from "./Components/Dropdown";
import QuestionAdmin from "./Components/QuestionAdmin";
import Customer_queries from "./Components/customer_queries";

const Home: React.FC = () => <div>Home Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-left">
            <span style={{ fontSize: 22 }}>Admin Portal</span>
          </div>
          <div className="navbar-right">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/values">Values</NavLink>
            <NavLink to="/questions">Questions</NavLink>
            <NavLink to="/support">Support</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/logout">Logout</NavLink>
            {/* Add other navigation links */}
          </div>
        </nav>

        <div className="main-window">
          <Routes>
            <Route path="/" element={<Home />} />
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

            {/* <Route
              path="/questions/fillintheblanks"
              element={<FillInTheBlank />}
            /> */}
            <Route path="/support" element={<Support />} />
            <Route path="/contact/:id" element={<QuestionAdmin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/questions/slider" element={<Slider />} />
            <Route path="/questions/dropdown" element={<Dropdown />} />
            <Route path="/Categorydropdown" element={<CategoryDrop />} />
            <Route
              path="/email_notification"
              element={<Email_notification />}
            />
            <Route path="/customer_queries" element={<Customer_queries />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
