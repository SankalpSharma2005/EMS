/*import axios from "axios";
export const fetchDepartments = async () => {
    let departments
  try {
    const response = await axios.get(
      "http://localhost:3000/api/department",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments
  import { useNavigate } from "react-router-dom";

export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
            >
                View
            </button>

            <button
                className="px-3 py-1 bg-blue-600 text-white"
            >
                Edit
            </button>

            <button
                className="px-3 py-1 bg-red-600 text-white"
            >
                Salary
            </button>

            <button
                className="px-3 py-1 bg-red-600 text-white"
            >
                Leave
            </button>
        </div>
    );
};*/
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S. No",
    selector: (row) => row.sno,
    width: "70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {

    const confirmDelete = window.confirm(
        "Are you sure you want to remove this employee?"
    );

    if (!confirmDelete) return;

    try {

        const response = await axios.delete(
            `http://localhost:3000/api/employee/${Id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        if (response.data.success) {
            alert("Employee deleted successfully");

            window.location.reload();
        }

    } catch (error) {

        if (error.response) {
            alert(error.response.data.error);
        } else {
            alert("Server Error");
        }

    }
};

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>

      <button
        className="px-3 py-1 bg-blue-600 text-white rounded"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>

      <button
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Salary
      </button>

      <button
        className="px-3 py-1 bg-orange-600 text-white rounded"
        onClick={handleDelete}
      >
        Leave
      </button>
    </div>
  );
};
