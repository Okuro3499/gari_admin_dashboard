import React, { useState, useEffect } from "react"
import baseURL from '../../utils/Config.js'
import Cookies from "js-cookie"
import axios from "axios"
import Select from "react-select"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const NewUser = ({ onSuccess }) => {
    const [selectedRole, setSelectedRole] = useState([])
    const [roles, setRoles] = useState([])
    const [spin, setSpin] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [companies, setCompanies] = useState([])
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({
        first_name: "", last_name: "", email: "", phone_number: "", password: "", company_id: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone_number') {
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length <= 12) {
                const formattedPhoneNumber = numericValue.length > 9 ? numericValue.slice(-9) : numericValue;
                setData({ ...data, [name]: formattedPhoneNumber });
            }
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption)
    }

    const handleCompanyChange = (selectedOption) => {
        setSelectedCompany(selectedOption)
    }
    
    const rolesDropdown = [
        ...roles.map((role) => ({
            value: role.role_id,
            label: role.role_name
        }))
    ]

    const companyDropdown = [
        ...companies.map((company) => ({
            value: company.company_id,
            label: company.company_name
        }))
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSpin(true)
    
        const length = 12;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-='
        let generatedPassword = ''
        for (let i = 0, n = charset.length; i < length; ++i) {
            generatedPassword += charset.charAt(Math.floor(Math.random() * n))
        }
    
        const userData = {
            role_id: selectedRole ? selectedRole.value : "", 
            first_name: data.first_name, 
            last_name: data.last_name, 
            email: data.email, 
            phone_number: data.phone_number, 
            password: generatedPassword,
            company_id: selectedCompany ? selectedCompany.value : "",
            created_by: `${Cookies.get("userId")}`
        }
    
        axios.post(`${baseURL}v1/auth/register`, userData).then((response) => {
            console.log(response)
            setSuccess(true)
            setSpin(false)
            onSuccess() 
            toast.success("User created successfully", { position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined })
        }).catch((error) => {
            console.error("There was an error creating the user!", error)
            setSpin(false)
            toast.error(`${error}`, { position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined })
        })
    }

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        
        fetch(`${baseURL}v1/roles`, config).then((response) => response.json())
        .then((data) => {
            console.log(data)
            setRoles(data.roles)
        }, (error) => {
            console.error("Error fetching roles:", error)
        })

        fetch(`${baseURL}v1/companies`, config).then((response) => response.json())
        .then((data) => {
            setCompanies(data.companies)
        }, (error) => {
            console.error("Error fetching companies:", error)
        })
    }, [])
    
    return (
    <div className="max-w-2xl mx-auto bg-white p-16">
        <ToastContainer />
        <form>
            <div className="grid gap-4 mb-4 lg:grid-cols-2">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                    <input type="text" name="first_name" value={data.first_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="First name"/>
                </div>
            
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                    <input type="text" name="last_name" value={data.last_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Last name"/>
                </div>
            
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">email</label>
                    <input type="email" name="email" value={data.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="email"/>
                </div>

                <div>
                    <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900">Phone number</label>
                    <input type="tel" name="phone_number" value={data.phone_number} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Phone number"/>
                </div>
            
                <div>
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Role</label>
                    <Select placeholder="Select role" value={selectedRole} options={rolesDropdown} onChange={handleRoleChange}/>
                </div>

                <div className="mb-2">
                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">Company</label>
                    <Select placeholder="Pick Company" value={selectedCompany} options={companyDropdown} onChange={handleCompanyChange}/>
                </div>
            </div>
    
            <button type="submit" onClick={handleSubmit} className="w-1/2 flex justify-end text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                <span>Add user</span>
            </button>
        </form>
    </div>
    )
}

export default NewUser
