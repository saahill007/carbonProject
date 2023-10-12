import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Admin {
    admin_id: number;
    Name: string;
    Email: string;
    password: string;
}

const AdminEdit: React.FC = () => {
    const { adminIds } = useParams<{ adminIds?: string }>(); // Make sure to allow adminIds to be optional
    const adminIdArray = adminIds ? adminIds.split(",") : [];
    const [adminEdits, setAdminEdits] = useState<Admin[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            const adminDataPromises = adminIdArray.map(async (adminId) => {
                try {
                    const response = await axios.get<Admin>(
                        `http://localhost:3000/api/admin_main/${adminId}`
                    );
                    return response.data;
                } catch (error) {
                    console.error("Error fetching admin data:", error);
                    return null;
                }
            });

            const adminData = await Promise.all(adminDataPromises);
            setAdminEdits(adminData.filter((admin) => admin !== null) as Admin[]);
        };

        fetchAdminData();
    }, [adminIdArray]);

    const handleSave = async () => {
        try {
            const updatePromises = adminEdits.map(async (admin) => {
                await axios.put(`http://localhost:3000/api/admin_main/${admin.admin_id}`, admin);
            });

            await Promise.all(updatePromises);
            navigate("/admin_main");
        } catch (error) {
            console.error("Error updating admin data:", error);
        }
    };

    const handleAdminEditChange = (adminId: number, field: string, value: string) => {
        const updatedAdmins = adminEdits.map((admin) => {
            if (admin.admin_id === adminId) {
                return { ...admin, [field]: value };
            }
            return admin;
        });
        setAdminEdits(updatedAdmins);
    };

    return (
        <div>
            <div className="admin_edit">
                <h2 className="edit">Edit Admin</h2>
            </div>
            <div className="table-wrapper">
                <table className="tabl-sapce">
                    <thead>
                        <tr className="bg-info sticky-header">
                            <th>Admin ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        {adminEdits.map((admin) => (
                            <tr key={admin.admin_id}>
                                <td>{admin.admin_id}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={admin.Name}
                                        onChange={(e) => handleAdminEditChange(admin.admin_id, "Name", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={admin.Email}
                                        onChange={(e) => handleAdminEditChange(admin.admin_id, "Email", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="password"
                                        value={admin.password}
                                        onChange={(e) => handleAdminEditChange(admin.admin_id, "password", e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="save" onClick={handleSave}>Save</button>
            <div className="bottom-border"></div>
        </div>
    );
};

export default AdminEdit;
