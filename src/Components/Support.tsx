import React from "react";
import { Link } from "react-router-dom";
import "./support_main.css";

const Support: React.FC = () => {
  return (
    <div>
      <div className="support_container">
        <div className="box_1">
          <Link to="/customer_enquiry_main">
            <button className="query">Respond to Customer Queries</button>
          </Link>
        </div>
        {/* <div className='box_2'>
          <Link to="/Dashboard">
            <button className='customer_data'>View Customer emission data</button>
          </Link>
        </div> */}
        <div className="box_2">
          <Link to="/email_notification">
            <button className="Email_notification">
              Send Email Updates to Customer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Support;
