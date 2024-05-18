import React, { useState, useEffect } from "react";
import baseURL from '../../utils/Config.js';
import Cookies from "js-cookie";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewUser = ({ onSuccess }) => {
    const [selectedRole, setSelectedRole] = useState([])
    const [roles, setRoles] = useState([])

    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption)
    }
    
    const rolesDropdown = [
        ...roles.map((role) => ({
            value: role.role_id,
            label: role.role_name
        }))
    ];
    
    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        
        fetch(`${baseURL}v1/roles`, config)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setRoles(data.roles)
        }, (error) => {
            console.error("Error fetching roles:", error)
        })
    }, [])
    
    return (
    <div className="max-w-2xl mx-auto bg-white p-16">
        <ToastContainer />
        <form>
            <div className="grid gap-4 mb-4 lg:grid-cols-2">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                    <input type="text" name="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="First name"/>
                </div>
            
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                    <input type="text" name="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Last name"/>
                </div>
            
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">email</label>
                    <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="email"/>
                </div>

                <div>
                    <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900">Phone number</label>
                    <input type="tel" name="phone_number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Phone number"/>
                </div>
            
                <div>
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                    <Select placeholder="Select role" value={selectedRole} options={rolesDropdown} onChange={handleRoleChange}/>
                </div>
            </div>
    
            <button type="submit" className="w-1/2 flex justify-end text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                <span>Add user</span>
            </button>
        </form>
    </div>
    )
}

export default NewUser;
