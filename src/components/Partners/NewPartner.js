import React, { useState } from "react"
import axios from "axios"
import Success from "../Success"
import Dialog from '@mui/material/Dialog'

const NewPartner = () => {
  const [data, setData] = useState({
    partner_name: "", partner_email: "", partner_mobile: "",
    partner_physical_address: "", partner_postal_address: "", partner_website_url: ""
  })
  const [spin, setSpin] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSuccessClose = () => {
    setSuccess(false)
  } 

  const handleChange = (e) => {
    const value = e.target.value
    setData({...data, [e.target.name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSpin(true)
    const partnerData = {
      partner_name: data.partner_name,
      partner_email: data.partner_email,
      partner_mobile: data.partner_mobile,
      partner_physical_address: data.partner_physical_address,
      partner_postal_address: data.partner_postal_address,
      partner_website_url: data.partner_website_url
    }

    axios.post("https://apigari.herokuapp.com/api/v1/newPartner", partnerData)
      .then((response) => {
        setSuccess(true)
        setSpin(false)
        console.log(response.status)
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
            <label htmlFor="company_name" className="block mb-2 text-sm font-medium text-gray-900">
              Company name
            </label>
            <input type="text" name="partner_name" value={data.partner_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900" >
              Phone number
            </label>
            <input type="tel" name="partner_mobile" value={data.partner_mobile} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="719-240-756" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"/>
          </div>

          <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">
              Company Website URL
            </label>
            <input type="url" name="partner_website_url" value={data.partner_website_url} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="https://www.gari.com" required />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email address
            </label>
            <input type="email" name="partner_email" value={data.partner_email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" required />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900">
            Physical Address
          </label>
          <input type="text" name="partner_physical_address" value={data.partner_physical_address} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="flowbite.com" required />
        </div>
        <div className="mb-4">
          <label htmlFor="partner_postal_address" className="block mb-2 text-sm font-medium text-gray-900">
            Postal address
          </label>
          <input type="text" name="partner_postal_address" value={data.partner_postal_address} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" required />
        </div>
        <button type="submit" onClick={handleSubmit} className="w-1/2 flex justify-end text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-3 py-2 text-center sm:w-auto" disabled={spin}>
          {spin && (
            <div>
              <svg class="animate-spin h-5 w-5 mr-3 bg-white" viewBox="0 0 20 20"/>
            </div>
          )}
          {spin && <span>Adding Partner</span>}
          {!spin && <span>Add Partner</span>}
        </button>
      </form>
    </div>
  )
}
export default NewPartner
