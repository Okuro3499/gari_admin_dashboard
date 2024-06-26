import React, { useState, useEffect } from "react"
import Select from "react-select"
import Cookies from "js-cookie"
import DatePicker from "react-datetime"
import moment from "moment"
import "react-datetime/css/react-datetime.css"
import Success from "../Success"
import Dialog from '@mui/material/Dialog'

const EditBooking = ({ bookingId }) => {
  const [bookingDetails, setBookingDetails] = useState({
    booking_id: "", car_id: "", client_id: "", book_date_from: "", book_date_to: "", destination: "",
    drive: "", total_days: "", total_amount: "", car_name: "", client_name: ""
  })
  const [driveSelected, setDriveSelected] = useState(null)
  const [spin, setSpin] = useState(false)
  const [success, setSuccess] = useState(false)

  const driveDropdown = [{
    value: "Self Drive",
    label: "Self Drive"
  }, {
    value: "Chauffered",
    label: "Chauffered"
  }, {
    value: "Self Drive & Chauffered",
    label: "Self Drive & Chauffered"
  }]

  const handleSuccessClose = () => {
    setSuccess(false)
  }

  const handleDriveChange = (e) => {
    setDriveSelected(e)
  }

  const handleFrom = (date) => {
    setBookingDetails({ 
      ...bookingDetails, book_date_from: new Date(date._d).toISOString()
    })
  }

  const handleTo = (date) => {
    setBookingDetails({ 
      ...bookingDetails, book_date_to: new Date(date._d).toISOString()
    })
  }

  const yesterday = moment().subtract(1, "day")
  const disableFromDt = (current) => {
    return current.isAfter(yesterday)
  }

  const disableToDt = (current) => {
    return current.isAfter(yesterday)
  }

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    }

    fetch(`https://apigari.herokuapp.com/api/v1/booked/${bookingId}`, config)
      .then((response) => response.json())
      .then((data) => {
        setBookingDetails(data.booked_car)
        console.log(bookingDetails)
      }, (error) => {
          // setLoading(false)
          // setError(error)
      })
    })
    return (
    <div className="max-w-2xl mx-auto bg-white p-16">
      <Dialog open={success} onClose={handleSuccessClose}>
        <Success />      
      </Dialog>
      <form>
        <div className="mb-2">
          <label htmlFor="carName" className="block mb-2 text-sm font-medium text-gray-900">
            Car Name
          </label>
          <input value={bookingDetails.car_name} onChange={(e) => setBookingDetails({...bookingDetails, car_name: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder= "Car Name" type= "text" name= "carName" />
        </div>

        <div className="mb-2">
          <label htmlFor="carName" className="block mb-2 text-sm font-medium text-gray-900 ">
            Client Name
          </label>
          <input value={bookingDetails.client_name} onChange={(e) => setBookingDetails({...bookingDetails, client_name: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Client Name" type="text" name="clientName" />
        </div>

        <div>
          <div className="grid gap-4 mb-4 lg:grid-cols-2">
            <div>
              <label htmlFor="dateFrom" className="block mb-2 text-sm font-medium text-gray-900 ">
                Date From
              </label>
              <DatePicker value={bookingDetails.book_date_from} onChange={handleFrom} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" label="from" timeFormat={false} isValidDate={disableFromDt} type="date" id="fromDatetime" closeOnSelect={true}/>
            </div>

            <div>
              <label htmlFor="to" className="block mb-2 text-sm font-medium text-gray-900 ">
                To Date:
              </label>
              <DatePicker value={bookingDetails.book_date_to} onChange={handleTo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" label="to" timeFormat={false} isValidDate={disableToDt} type="date" id="toDatetime" closeOnSelect={true}/>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="drive" className="block mb-2 text-sm font-medium text-gray-900 ">
              Drive
            </label>
            <Select placeholder="Self Drive/Chauffered/Both" value={driveSelected} options={driveDropdown} onChange={handleDriveChange}/>
          </div>

          <div className="mb-2">
            <label htmlFor="carName" className="block mb-2 text-sm font-medium text-gray-900 ">
              Destination
            </label>
            <input value={bookingDetails.destination} onChange={(e) => setBookingDetails({...bookingDetails, destination: e.target.value})} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Client Name" type="text" name="clientName" />
          </div> 

          
          <div className="grid gap-4 mb-4 lg:grid-cols-2 mt-2">
            <label htmlFor="totalDays" className="block mb-2 text-sm font-medium text-gray-900 ">
              Total Days: <span>{bookingDetails.total_days}</span>
            </label>
            
            <label htmlFor="totalAmount" className="block mb-2 text-sm font-medium text-gray-900 ">
              Total Amount to Pay: <span>{bookingDetails.total_amount}</span>
            </label>
          </div>
        </div>

        <button type="submit" className="w-1/2 flex justify-end text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-3 py-2 text-center sm:w-auto" disabled={spin}>
          {spin && (
            <div>
              <svg class="animate-spin h-5 w-5 mr-3 bg-white" viewBox="0 0 20 20" />
            </div>
          )}
          {spin && <span>Editing Booking</span>}
          {!spin && <span>Edit Booking</span>}
        </button>
      </form>
    </div>
  )
}

export default EditBooking
