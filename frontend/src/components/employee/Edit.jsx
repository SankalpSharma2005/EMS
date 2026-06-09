import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name:'',
        maritalStatus:'',
        designation:'',
        salary: 0,
        department: ''
    })
    const {id} = useParams();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const responnse = await axios.get(
                    `http://localhost:3000/api/employee/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (responnse.data.success) {
                    const emp = responnse.data.employee;

                    console.log(emp);

                    setEmployee((prev) => ({...prev,
                        name: emp.userId.name,
                        maritalStatus: emp.maritalStatus,
                        designation: emp.designation,
                        salary: emp.salary,
                        department: emp.department
                    }));
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        }
        fetchEmployees();
    }, [id])

    const handleChange = (e) => {
        // Fixed typo: changed e.targer to e.target
        const { name, value, files } = e.target; 
        setEmployee((prevData) => ({...prevData, [name]: value}));
    };
    const handleSubmit = async (e) => {
  // Prevent default form submission reload behavior
  e.preventDefault(); 

//   const formDataObj = new FormData();
//   Object.keys(formData).forEach((key) => {
//     formDataObj.append(key, formData[key]);
//   });

  try {
    const response = await axios.put(
      `http://localhost:3000/api/employee/${id}`,
       employee,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      navigate("/admin-dashboard/employees");
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
};


  return (
    <>{employee ? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Insert Name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              value={employee.maritalStatus}
              onChange={handleChange}
              placeholder="Marital Status"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Department */}
          <div className='col-span-2'>
            <label className="block text-sm font-medium text-gray-700">
            Department
            </label>

        <select
            name="department"
            value={employee.department}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
        >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
        </select>
        </div>


        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Employee
        </button>
      </form>
    </div>
    ): <div>Loading...</div>}</>
  )
}

export default Edit;