import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin_add.css";
import axios from "axios";
import addImg from "../assets/add.png";
import delImg from "../assets/delete.png";
import editImg from "../assets/edit.png";
import axiosInstance from './axiosconfig';

interface Admin {
    Name: string;
    Email: string;
    password: string;
    flag: number;
}

const Admin_add: React.FC = () => {
    const [data, setData] = useState<Admin[]>([]);
    const [newAdmin, setNewAdmin] = useState<Admin>({ Name: "", Email: "", password: "", flag: 1 });
    const [error, setError] = useState<string>(""); // To track and display error message
    const navigate = useNavigate();

    const handleadmin = () => {
        navigate("/values/admin");
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get<Admin[]>(
                "/api/admin_add"
            );
            console.log("Response data:", response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSave = async () => {
        // if any of the feild is empty
        if (!newAdmin.Name || !newAdmin.Email || !newAdmin.password) {
            setError("Some of the feilds are empty . Please fill in all the details.");
            return;
        }
        // Check if the email is in a valid format
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(newAdmin.Email)) {
            setError("Email is not in a valid format. Please use a valid email address.");
            return;
        }

        // Check if the password meets the criteria
        const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(newAdmin.password)) {
            setError("Password should be at least 8 characters with at least one uppercase letter and one special character.");
            return;
        }

        // Check if the email is already present in the data
        // if (data.some((admin) => admin.Email === newAdmin.Email)) {
        //     setError("Email is already in use. Please use different Email-ID ");
        //     return;
        // }

        const existingAdmin = data.find((admin) => admin.Email == newAdmin.Email);

        if (!existingAdmin) {
            try {
                // Send the newAdmin data to your server for saving
                const response = await axiosInstance.post("/api/new_admin_add", newAdmin);
                console.log("Data saved:", response.data);

                // If the data is successfully saved, reset the newAdmin state to an empty template
                setNewAdmin({ Name: "", Email: "", password: "", flag: 1 });

                // Reset the error message
                setError("");

                // Fetch the updated data
                fetchData();
            } catch (error) {
                console.error("Error saving data:", error);
            }
        }
        else {
            if (existingAdmin.flag == 0) {
                try {
                    const response = await axiosInstance.post("/api/update_flag", {
                        Email: newAdmin.Email,
                        password: newAdmin.password,
                        flag: 1,
                    });

                    if (response.status == 200) {
                        setNewAdmin({ Name: "", Email: "", password: "", flag: 1 });
                        setError("");
                        fetchData();

                    }
                    else {
                        setError("Failed to update the existing user please try Again");
                    }

                } catch (error) {
                    console.error("error updating the flag:", error);
                }

            } else {
                setError("Email is already in use. Please use different Email-ID");
            }
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

            <div className="Admin">
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

            {error && <div className="error-message">{error}</div>}

            <button className="back_option" onClick={handleadmin}>Back</button>
            <button className="save" onClick={handleSave}>Save</button>

            <div className="bottom-border"></div>
        </div>
    );
};

export default Admin_add;

