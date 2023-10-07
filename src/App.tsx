// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  NavLink,
} from "react-router-dom";
import "./App.css";
import { ValuesPage, Values } from "./Components/Values";
import Questions from "./Components/Questions";
import Support from "./Components/Support";
import Contact from "./Components/Contact";
import Logout from "./Components/Logout";

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
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
