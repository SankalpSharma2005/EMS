import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
    FaBuilding, 
    FaCalendarAlt, 
    FaCogs, 
    FaMoneyBillWave, 
    FaTachometerAlt, 
    FaUsers, 
    FaHeartbeat
} from 'react-icons/fa'

const AdminSidebar = () => {
    // Helper function to keep class names clean and avoid repetitive code
    const linkClass = ({ isActive }) => 
        `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded transition-colors duration-200`;

    return (
        <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 w-64 px-4 py-2">
            {/* Added mb-4 here to give breathing room beneath the title */}
            <div className="bg-teal-600 h-12 flex items-center justify-center mb-4 rounded-sm">
                <h3 className="text-2xl text-center font-sevillana">Employee MS</h3>
            </div>
            <div className="px-2 space-y-1">
                <NavLink to="/admin-dashboard" className={linkClass} end>
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/admin-dashboard/employees" className={linkClass}>
                    <FaUsers />
                    <span>Employee</span>
                </NavLink>
                <NavLink to="/admin-dashboard/departments" className={linkClass}>
                    <FaBuilding />
                    <span>Department</span>
                </NavLink>
                <NavLink to="/admin-dashboard/leaves" className={linkClass}>
                    <FaCalendarAlt />
                    <span>Leave</span>
                </NavLink>
                <NavLink to="/admin-dashboard/salary" className={linkClass}>
                    <FaMoneyBillWave />
                    <span>Salary</span>
                </NavLink>
                <NavLink to="/admin-dashboard/settings" className={linkClass}>
                    <FaCogs />
                    <span>Setting</span>
                </NavLink>
                <NavLink to="/admin-dashboard/system-health" className={linkClass}>
                    <FaHeartbeat />
                    <span>System Health</span>
                </NavLink>
            </div>
        </div>
    )
}

export default AdminSidebar 