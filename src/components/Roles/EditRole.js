import React, { useState, useEffect } from "react"
import axios from "axios"
import Success from "../Success"
import Dialog from '@mui/material/Dialog'

const EditRole = ({ staffId }) => {
  const [staffDetails, setStaffDetails] = useState({
  staff_name: "", staff_email: "", staff_position: "", staff_id_number: "", staff_mobile: "", staff_id: ""
  })
  const [spin, setSpin] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSuccessClose = () => {
    setSuccess(false)
  }

  const handleEdit = (e) => {
    setSpin(true)
    e.preventDefault()
    const staffEditData = {
      staff_name: staffDetails.staff_name,
      staff_email: staffDetails.staff_email,
      staff_position: staffDetails.staff_position,
      staff_id_number: staffDetails.staff_id_number,
      staff_mobile: staffDetails.staff_mobile,
      staff_id: staffDetails.staff_id
    }
    axios.put(`https://apigari.herokuapp.com/api/v1/staff/edit/${staffId}`, staffEditData)
    .then((response) => {
      setSuccess(true)
        setSpin(false)
        console.log(response)
      })
  }

  useEffect(() => {
    fetch(`https://apigari.herokuapp.com/api/v1/staff/${staffId}`)
      .then((response) => response.json())
      .then((data) => {
        setStaffDetails(data.staff_details)
      }, (error) => {
        
      })}, [staffId])

  return (
    <div className="max-w-2xl mx-auto bg-white p-16">
      <Dialog open={success} onClose={handleSuccessClose}>
        <Success />      
      </Dialog>
      <form>
        <div className="grid gap-4 mb-4 lg:grid-cols-2">
          <div>
            <label htmlFor="company_name" className="block mb-2 text-sm font-medium text-gray-900">
              Staff name
            </label>
            <input type="text" name="staff_name" value={staffDetails.staff_name} onChange={(e) => setStaffDetails({ ...staffDetails, staff_name: e.target.value }) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required/>
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
              Phone number
            </label>
            <input type="tel" name="staff_mobile" value={staffDetails.staff_mobile} onChange={(e) => setStaffDetails({ ...staffDetails, staff_mobile: e.target.value }) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required/>
          </div>
          <div>
            <label htmlFor="idNumber" className="block mb-2 text-sm font-medium text-gray-900">
              Id Number
            </label>
            <input type="number" name="staff_id_number" value={staffDetails.staff_id_number} onChange={(e) => setStaffDetails({ ...staffDetails, staff_id_number: e.target.value }) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="12345678" required/>
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email address
            </label>
            <input type="email" name="staff_email" value={staffDetails.staff_email} onChange={(e) => setStaffDetails({ ...staffDetails, staff_email: e.target.value }) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" required/>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">
            Position
          </label>
          <input type="text" name="staff_position" value={staffDetails.staff_position} onChange={(e) => setStaffDetails({...staffDetails, staff_position: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Staff" required />
        </div>
        <button onClick={handleEdit} className="w-1/2 flex justify-end text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-3 py-2 text-center sm:w-auto" disabled={spin}>
          {spin && (
            <div> 
              <svg class="animate-spin h-5 w-5 mr-3 bg-white" viewBox="0 0 20 20" />
            </div>
          )}
          {spin && <span>Editing Staff</span>}
          {!spin && <span>Edit Staff</span>}
        </button>
      </form>
    </div>
  )
}
export default EditRole
