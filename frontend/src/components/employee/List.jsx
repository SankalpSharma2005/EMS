import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { API_URL, SERVER_URL } from "../../config/api";

const List = () => {
    const [employees, setEmployees] = useState([]);
const [empLoading, setEmpLoading] = useState(false);

useEffect(() => {
  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      // Fixed: Updated endpoint path from /api/department to /api/employee
      const response = await axios.get(`${API_URL}/employee`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        // Fixed typo: response.data.employees instead of responnse.data.employees
        const data = response.data.employees.map((emp) => ({
          _id: emp._id,
          sno: sno++,
          dep_name: emp.department,
          name: emp.userId.name,
          dob: new Date(emp.dob).toLocaleDateString(), 
          profileImage: (
    <img
      src={`${SERVER_URL}/uploads/${emp.userId?.profileImage}`}
      alt="Employee"
      className="w-10 h-10 rounded-full"
    />
  ),
          action: (<EmployeeButtons Id={emp._id} />),
        }));

        // Fixed: Updated setters to match your actual state hook variables
        setEmployees(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setEmpLoading(false);
    }
  };

  fetchEmployees();
}, []);
  return (
    <div className='p-6'>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>
      
      <div className="flex justify-between items-center">
        <input 
          type="text"
          placeholder="Search By Dep Name"
          className="px-4 py-0.5 border"
        />
        
        <Link 
          to="/admin-dashboard/add-employees"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div className='mt-6'>
        <DataTable columns={columns} data={employees} pagination />
      </div>
    </div>
  )
}
 
export default List;