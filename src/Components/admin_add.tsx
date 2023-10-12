import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin_add.css";
import axios from "axios";
import addImg from "../assets/add.png";
import delImg from "../assets/delete.png";
import editImg from "../assets/edit.png";

interface Admin {
    Name: string;
    Email: string;
    password: string;
}

const Admin_add: React.FC = () => {
    const [data, setData] = useState<Admin[]>([]);
    const [newAdmin, setNewAdmin] = useState<Admin>({ Name: "", Email: "", password: "" });
    const navigate = useNavigate();

    const handleadmin = () => {
        navigate("/values/admin");
    };

    const fetchData = async () => {
        try {
            const response = await axios.get<Admin[]>(
                "http://localhost:3000/api/admin_add"
            );
            console.log("Response data:", response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSave = async () => {
        try {
            // Send the newAdmin data to your server for saving
            const response = await axios.post("http://localhost:3000/api/new_admin_add", newAdmin);
            console.log("Data saved:", response.data);
            // If the data is successfully saved, reset the newAdmin state to an empty template
            setNewAdmin({ Name: "", Email: "", password: "" });
            // Fetch the updated data
            fetchData();
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="action">
                <div className="action-item">Action item:</div>
                <div className="modify">
                    <a href="#">
                        <img className="adminImg" src={addImg} alt="add" />
                    </a>
                    <a href="#">
                        <img className="adminImg" src={editImg} alt="edit" />
                    </a>
                    <a href="#">
                        <img className="adminImg" src={delImg} alt="delete" />
                    </a>
                </div>
            </div>

            <div className="Admin_and_search">
                <div className="Admin_Details">Add new admin below:</div>
            </div>
            <div className="table-wrapper">
                <table className="tabl-sapce">
                    <thead>
                        <tr className="bg-info sticky-header">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        {data.map((item) => (
                            <tr key={item.Name}>
                                <td>{item.Name}</td>
                                <td>{item.Email}</td>
                                <td>{'####'}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newAdmin.Name}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, Name: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={newAdmin.Email}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, Email: e.target.value })}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Password"
                                    value={newAdmin.password}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button className="back" onClick={handleadmin}>Back</button>
            <button className="save" onClick={handleSave}>Save</button>

            <div className="bottom-border"></div>
        </div>
    );
};

export default Admin_add;
