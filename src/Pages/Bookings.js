import React, { useState, useEffect } from "react";
import baseURL from '../utils/Config.js';
import Dialog from '@mui/material/Dialog';
import { BallTriangle } from "react-loader-spinner";
import SideBar from "../components/SideBar";
import Cookies from "js-cookie";
import EditBooking from "../components/Booking/EditBooking";
import { Link } from "react-router-dom";
import Select from "react-select";

function Bookings() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState({
    booking_id: "", car_id: "", client_id: "", book_date_from: "", book_date_to: "", 
    destination: "", drive: "", status: "", total_days: "", total_amount: ""
  });
  const [selectedStatus, setSelectedStatus] = useState({ value: "", label: "All" });
  const [openAddBookingDialog, setOpenAddBookingDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editable, setEditable] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 20;

  const statusDropdown = [
    {value: "", label: "All"}, {value: "pending", label: "Pending"}, {value:"completed", label:"Completed"}, 
    {value:"confirmed", label:"Confirmed"}, {value:"canceled", label:"Canceled"}, {value:"in progress", label:"in progress" }
  ];

  const handleClickOpen = () => {
    setOpenAddBookingDialog(true);
  };

  const handleClose = () => {
    setOpenAddBookingDialog(false);
  };

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
  };  

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };

    fetch(`${baseURL}v1/bookings`, config)
      .then((response) => response.json())
      .then(
        (data) => {
          setLoading(false);
          setBookings(data.booked_car);
          console.log(data.booked_car);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const totalPages = Math.ceil(bookings.length / bookingsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;
    const getStatusColorClass = (status) => {
      if (!status) {
        return "bg-gray-400";
      }
      switch (status.toLowerCase()) {
        case "pending":
          return "bg-yellow-300";
        case "completed":
          return "bg-green-400";
        case "confirmed":
          return "bg-green-600";
        case "canceled":
          return "bg-red-600";
        case "in progress":
          return "bg-orange-400";
        default:
          return "bg-gray-400";
      }
    };
    return (
      <div>
        <SideBar />
        <Dialog open={openAddBookingDialog} onClose={handleClose}>
          <EditBooking bookingId={bookingId} />
        </Dialog>
        <div className="flex overflow-hidden bg-white pt-16">
          <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"/>
          {loading ? (
            <div className="h-full w-full relative overflow-y-auto lg:ml-64">
              <div className="grid place-items-center h-screen -mt-14">
                <BallTriangle height="80" width="80" color="cyan" ariaLabel="loading"/>
              </div>
            </div>
          ) : (
            <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
              <main>
                <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                  <div className="mb-1 w-full">
                    <div className="mb-4">
                      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        {selectedStatus.value === "" ? "All bookings" : `All ${selectedStatus.value} bookings`}
                      </h1>
                    </div>
                    <div className="block sm:flex items-center md:divide-x md:divide-gray-100">
                      <form className="sm:pr-3 mb-4 sm:mb-0">
                        <label htmlFor="bookingSearch" className="sr-only">
                          Search
                        </label>
                        <div className="mt-1 relative sm:w-64 xl:w-96">
                          <input onChange={(e) => {setSearchTerm(e.target.value)}} type="text" name="email" id="bookingSearch" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search for booking"/>
                        </div>
                      </form>
                      <div className="flex items-center sm:justify-end w-full">
                        <div className="hidden md:flex pl-2 space-x-1">
                          <a href="/" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                            </svg>
                          </a>
                          <a href="/" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                          </a>
                          <a href="/" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                            </svg>
                          </a>
                          <a href="/" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </a>
                        </div>
                        <a href="/Vehicles" className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto">
                          <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/>
                          </svg>
                          New Booking
                        </a>
                      </div>

                      <div className="flex flex-col w-full ml-2 md:w-1/3 lg:w-1/3">
                        <Select placeholder="select status" value={selectedStatus} options={statusDropdown} onChange={handleStatusChange}/>
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
                                Car Name
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                Booking Dates
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                Drive
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                Booking status
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                Days
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                Price
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {bookings.filter((booking) => {
                              const searchTermLower = searchTerm.toLowerCase();
                              const phoneNumberString = booking.phone_number.toString();
                              if (
                                searchTerm === "" || booking.first_name.toLowerCase().includes(searchTermLower) ||
                                booking.last_name.toLowerCase().includes(searchTermLower) || phoneNumberString.includes(searchTerm) ||
                                booking.car_name.toLowerCase().includes(searchTermLower)
                              ) {
                                return true;
                              }
                              return false;
                            }).filter(booking => {
                              if (selectedStatus.value === "") {
                                return true;
                              } else {
                                return booking.status === selectedStatus.value;
                              }
                            }).map((booking) => {
                                // Convert date from
                                let dateFrom = new Date(booking.book_date_from).toLocaleString("en-GB", 
                                {day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour24: true});

                                // Convert date to
                                let dateTo = new Date(booking.book_date_to).toLocaleString("en-GB", 
                                {day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour24: true});

                                return (
                                  <tr className="hover:bg-gray-100" key={booking.booking_id}>
                                    <td className="p-4 w-4">
                                      <div className="flex items-center">
                                        <input id="checkbox-194556" aria-describedby="checkbox-1" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"/>
                                        <label htmlFor="checkbox-194556" className="sr-only">
                                          checkbox
                                        </label>
                                      </div>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                      <div className="text-base font-semibold text-gray-900">
                                        {booking.car_name}
                                      </div>
                                      <div className="text-sm font-normal text-gray-500">
                                        {booking.client_name}
                                      </div>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                      {dateFrom} - {dateTo}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                      {booking.drive}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                                      <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full ${getStatusColorClass(booking.status)} mr-2`} />
                                        {booking.status}
                                      </div>
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                      {booking.total_days}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                      {booking.total_amount}
                                    </td>
                                    <td className="p-4 whitespace-nowrap space-x-2">
                                      <button type="button" onClick={() => {handleClickOpen(); setEditable(true); setBookingId(booking.booking_id);}} className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"/>
                                        </svg>
                                      </button>

                                      {/* <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                        </svg>
                                      </button> */}

                                      <Link to="/" className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                          <path fillRule="evenodd" d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10zm9.8 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" clipRule="evenodd"/>
                                        </svg>
                                      </Link>
                                    </td>
                                  </tr>
                                );
                            })}
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
                      <span className="text-gray-900 font-semibold">{indexOfFirstBooking + 1} - {indexOfLastBooking > bookings.length ? bookings.length : indexOfLastBooking}</span>{" "}
                      of{" "}
                      <span className="text-gray-900 font-semibold">{bookings.length}</span>
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
    );
  }
}

export default Bookings;
