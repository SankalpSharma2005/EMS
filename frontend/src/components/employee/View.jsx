import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Assumed based on the axios.get call in the screenshots
import { API_URL, SERVER_URL } from "../../config/api";

const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const responnse = await axios.get(
                    `${API_URL}/employee/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (responnse.data.success) {
                    setEmployee(responnse.data.employee);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };

        fetchEmployee();
    }, [id]); // Included [id] dependency to avoid warning linting issues, though screenshot shows []

    if(!employee){
        return <div className="p-10">Loading...</div>;
    }
    console.log(employee);
    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-8 text-center">
                Employee Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img
                        src={`${API_URL.replace("/api", "")}/uploads/${employee.userId?.profileImage}`}
                        className="rounded-full border w-72"
                        alt="Profile"
                    />
                </div>
                <div>
                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Name:</p>
                        <p className="font-medium">{employee.userId?.name}</p>
                    </div>

                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Employee ID:</p>
                        <p className="font-medium">{employee.employeeId}</p>
                    </div>

                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Date of Birth:</p>
                        <p className="font-medium">
                            {employee.dob ? new Date(employee.dob).toLocaleDateString() : ""}
                        </p>
                    </div>

                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Gender:</p>
                        <p className="font-medium">{employee.gender}</p>
                    </div>

                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Department:</p>
                        <p className="font-medium">{employee.department}</p>
                    </div>

                    <div className="flex space-x-3 mb-5">
                        <p className="text-lg font-bold">Marital Status:</p>
                        <p className="font-medium">{employee.maritalStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default View;