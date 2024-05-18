import React, { useState } from "react"
import axios from "axios"
import Success from "../Success"
import Dialog from '@mui/material/Dialog'

const NewRole = () => {
  const [data, setData] = useState({
    staff_name: "", staff_email: "", staff_position: "", staff_id_number: "", staff_mobile: ""
  })
  const [spin, setSpin] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setData({ ...data, [e.target.name]: value })
  }

  const handleSuccessClose = () => {
    setSuccess(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSpin(true)
    const staffData = {
      staff_name: data.staff_name,
      staff_email: data.staff_email,
      staff_position: data.staff_position,
      staff_id_number: data.staff_id_number,
      staff_mobile: data.staff_mobile,
    }
    axios
      .post("https://apigari.herokuapp.com/api/v1/newStaff", staffData)
      .then((response) => {
        setSuccess(true)
        setSpin(false)
      })
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-16">
      <Dialog open={success} onClose={handleSuccessClose}>
        <Success />      
      </Dialog>
      <form>
        <div className="grid gap-4 mb-4 lg:grid-cols-2">
          <div>
            <label htmlFor="company_name" className="block mb-2 text-sm font-medium text-gray-900 ">
              Staff name
            </label>
            <input type="text" name="staff_name" value={data.staff_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required/>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 ">
              Phone number
            </label>
            <input
              type="tel"
              name="staff_mobile"
              value={data.staff_mobile}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required/>
          </div>
          <div>
            <label
              htmlFor="idNumber"
              className="block mb-2 text-sm font-medium text-gray-900 ">
              Id Number
            </label>
            <input
              type="number"
              name="staff_id_number"
              value={data.staff_id_number}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="12345678"
              required/>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 ">
              Email address
            </label>
            <input
              type="email"
              name="staff_email"
              value={data.staff_email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="john.doe@company.com"
              required/>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="position"
            className="block mb-2 text-sm font-medium text-gray-900 ">
            Position
          </label>
          <input
            type="text"
            name="staff_position"
            value={data.staff_position}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Staff"
            required/>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-1/2 flex justify-end text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
          disabled={spin}>
          {spin && (
            <div>
              <svg
                class="animate-spin h-5 w-5 mr-3 bg-white"
                viewBox="0 0 20 20"/>
            </div>
          )}
          {spin && <span>Adding Staff</span>}
          {!spin && <span>Add Staff</span>}
        </button>
      </form>
    </div>
  )
}

export default NewRole
