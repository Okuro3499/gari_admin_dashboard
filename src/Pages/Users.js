import React, { useState, useEffect } from "react" 
import baseURL from '../utils/Config.js' 
import { BallTriangle } from "react-loader-spinner" 
import Dialog from '@mui/material/Dialog' 
import SideBar from "../components/SideBar" 
import { Link } from "react-router-dom" 
import NewUser from "../components/Users/AddUser.js" 
import Cookies from "js-cookie" 
import Select from "react-select" 

function Users() {
  const [error, setError] = useState(null) 
  const [loading, setLoading] = useState(true) 
  const [userClients, setUserClients] = useState([]) 
  const [initialUsers, setInitialUsers] = useState([]) 
  const [searchTerm, setSearchTerm] = useState("") 
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false) 
  const [currentPage, setCurrentPage] = useState(1) 
  const [selectedRole, setSelectedRole] = useState({ value: "", label: "All" }) 
  const [roles, setRoles] = useState([]) 
  const usersPerPage = 20 

  const getStatusColorClass = (status) => {
    if (!status) {
      return "bg-gray-400" 
    }
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-400" 
      case "inactive":
        return "bg-red-600" 
      default:
        return "bg-gray-400" 
    }
  } 

  const handleClickOpen = () => {
    setOpenNewUserDialog(true) 
  } 

  const handleClose = () => {
    setOpenNewUserDialog(false) 
  } 

  const handleCloseNewUserDialog = () => {
    setOpenNewUserDialog(false) 
  } 

  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption) 

    if (selectedOption.value === "") {
      setUserClients(initialUsers) 
      setLoading(false) 
    } else {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get("token")}`
        },
        body: JSON.stringify({ role_id: selectedOption.value })
      } 
  
      fetch(`${baseURL}v1/users/role`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok') 
          }
          return response.json() 
        })
        .then(data => {
          console.log(data) 
          setLoading(false) 
          setUserClients(data.role_users) 
        })
        .catch(error => {
          console.error('Fetch error:', error) 
          setLoading(false) 
          setError(error) 
        }) 
    }
  } 
  
  const rolesDropdown = [
    { value: "", label: "All" },
    ...roles.map((role) => ({
      value: role.role_id,
      label: role.role_name
    })),
  ] 
  
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    }

    fetch(`${baseURL}v1/users`, config).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok') 
        }
        return response.json() 
      }).then(data => {
        console.log(data) 
        setLoading(false) 
        setInitialUsers(data.users) 
        setUserClients(data.users) 
      }).catch(error => {
        console.error('Fetch error:', error) 
        setLoading(false) 
        setError(error) 
      }) 
  
    fetch(`${baseURL}v1/roles`, config).then((response) => response.json())
      .then((data) => {
          console.log(data)
          setRoles(data.roles) 
        }, (error) => {
          console.error("Error fetching roles:", error) 
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div> 
  } else {
    const indexOfLastUser = currentPage * usersPerPage 
    const indexOfFirstUser = indexOfLastUser - usersPerPage 
    const totalPages = Math.ceil(userClients.length / usersPerPage) 
    const hasNextPage = currentPage < totalPages 
    const hasPreviousPage = currentPage > 1 
    return (
      <div>
        <SideBar />
        <div className="flex overflow-hidden bg-white pt-16">
          <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>  
          {loading ? (
            <div className="h-full w-full relative overflow-y-auto lg:ml-64">
              <div className="grid place-items-center h-screen -mt-14">
                <BallTriangle height="80" width="80" color="cyan" ariaLabel="loading"/>
              </div>
            </div>
          ) : (
            <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"   >
              <main>
                <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                  <div className="mb-1 w-full">
                    <div className="mb-4">
                      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        {selectedRole.value === "" ? "All users" : `${selectedRole.label} users`}
                      </h1>
                    </div>
                    <div className="sm:flex">
                      <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                        <form className="lg:pr-3" action="#" method="GET">
                          <label htmlFor="userSearch" className="sr-only">
                            Search
                          </label>
                          <div className="mt-1 relative lg:w-64 xl:w-96">
                          <input type="text" name="searchTerm" id="userSearch" onChange={e=> {setSearchTerm(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder={selectedRole.value === "" ? "Search for user" :`Search for ${selectedRole.label}`}/>
                          </div>
                        </form>
                        <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                        <a href="/" className="w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                          <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"/>
                          </svg>
                          Export
                        </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                        <button type="button" onClick={handleClickOpen} data-modal-toggle="add-user-modal" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"> 
                        <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/>
                        </svg>
                        {selectedRole.value === "" ? "Add user" : `Add ${selectedRole.label}`}
                        </button>
                        <div className="w-1/2 focus:ring-4 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 sm:w-auto">
                          <Select placeholder="Select role" value={selectedRole} options={rolesDropdown} onChange={handleRoleChange}/>
                        </div>

                        <Dialog open={openNewUserDialog} onClose={handleClose}>
                          <NewUser onSuccess={handleCloseNewUserDialog} />
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                      <div className="shadow overflow-hidden">
                        <table className="table-fixed min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th scope="col" className="p-4">
                                <div className="flex items-center">
                                  <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"/>
                                  <label htmlFor="checkbox-all" className="sr-only">
                                    checkbox
                                  </label>
                                </div>
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                Name
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                Phone Number
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                Role
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                Status
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {userClients.filter((userClient) => {
                              const searchTermLower = searchTerm.toLowerCase() 
                              const phoneNumberString = userClient.phone_number.toString() 
                              if (
                                searchTerm === "" || userClient.first_name.toLowerCase().includes(searchTermLower) ||
                                userClient.last_name.toLowerCase().includes(searchTermLower) || phoneNumberString.includes(searchTerm)
                              ) {
                                return true 
                              }
                              return false 
                            }).map((userClient) => (
                            <tr className="hover:bg-gray-100" key={userClient.user_id}>
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input id="checkbox-1" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"/>
                                    <label htmlFor="checkbox-1" className="sr-only">
                                      checkbox
                                    </label>
                                  </div>
                                </td>
                                <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                                  <img className="h-10 w-10 rounded-full" src={userClient.user_photo_url || require('../profileIcon.jpg')} alt={userClient.first_name}/>
                                  <div className="text-sm font-normal text-gray-500">
                                    <div className="text-base font-semibold text-gray-900">
                                      {`${userClient.first_name} ${userClient.last_name}`}
                                    </div>
                                    <div className="text-sm font-normal text-gray-500">
                                      {userClient.email}
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                  {"+254" + userClient.phone_number}
                                </td>
                                <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                  {userClient.role_name}
                                </td>
                                <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                                <div className="flex items-center">
                                  <div className={`h-2.5 w-2.5 rounded-full ${getStatusColorClass(userClient.status)} mr-2`} />
                                    {userClient.status}
                                  </div>
                                </td>
                                <td className="p-4 whitespace-nowrap space-x-2">
                                  <button type="button" data-modal-toggle="user-modal" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"/>
                                    </svg>
                                  </button>
                                  <button type="button" data-modal-toggle="delete-user-modal" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                    </svg>
                                  </button>
                                  <Link to="/UserDetails" state={{ userId: userClient.user_id, roleId: userClient.role_id }} className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10zm9.8 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" clipRule="evenodd"/>
                                    </svg>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <span className="text-sm font-normal text-gray-500">
                      Showing{" "}
                      <span className="text-gray-900 font-semibold">{indexOfFirstUser + 1} - {indexOfLastUser > userClients.length ? userClients.length : indexOfLastUser}</span>{" "}
                      of{" "}
                      <span className="text-gray-900 font-semibold">{userClients.length}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {hasPreviousPage && (
                    <button onClick={() => setCurrentPage(currentPage - 1)} className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
                      Previous
                    </button>
                    )}
                    {hasNextPage && (
                    <button onClick={() => setCurrentPage(currentPage + 1)} className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
                      Next
                    </button>
                    )}
                  </div>
                </div>
              </main>
            </div>
          )}
        </div>
      </div>
    ) 
  }
}

export default Users 
