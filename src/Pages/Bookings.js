import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import { BallTriangle } from "react-loader-spinner";
import SideBar from "../components/SideBar";
import Cookies from "js-cookie";
import EditBooking from "../components/Booking/EditBooking";
import { Link } from "react-router-dom";

function Bookings() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState({
    booking_id: "",
    car_id: "",
    client_id: "",
    book_date_from: "",
    book_date_to: "",
    destination: "",
    drive: "",
    total_days: "",
    total_amount: "",
  });
  const [openAddBookingDialog, setOpenAddBookingDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editable, setEditable] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  // const [bookingId, setBookingId] = useState("");
  // const [carDetails, setCarDetails] = useState({
  //   car_name: "",
  // });
  // const [clientDetails, setClientDetails] = useState({
  //   first_name: " ",
  //   last_name: " ",
  // });
  // const [carId, setCarId] = useState("");
  // const [clientId, setClientId] = useState("");
  // const [date, setDate] = useState("");

  const handleClickOpen = () => {
    setOpenAddBookingDialog(true);
  };

  const handleClose = () => {
    setOpenAddBookingDialog(false);
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };

    fetch("http://192.168.88.246:3001/api/v1/booked", config)
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

    // fetch(`http://192.168.88.246:3001/api/v1/cars/${carId}`)
    //   .then((response) => response.json())
    //   .then(
    //     (data) => {
    //       setLoading(false);
    //       setCarDetails(data.single_car);
    //     },
    //     (error) => {
    //       setLoading(false);
    //       setError(error);
    //     }
    //   );

    // fetch(`http://192.168.88.246:3001/api/v1/client/${bookings.client_Id}`)
    //   .then((response) => response.json())
    //   .then(
    //     (data) => {
    //       setLoading(false);
    //       setClientDetails(data.single_client);
    //     },
    //     (error) => {
    //       setLoading(false);
    //       setError(error);
    //     }
    //   );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
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
                        All Bookings
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
                                Start Date
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                End Date
                              </th>
                              <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                                Status
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
                              if (searchTerm === "") {
                                return booking;
                              } else if (booking.client_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return booking;
                              } else if (booking.car_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return booking;
                              }}).map((booking) => {
                                //convert date from
                                let dateFrom = new Date(booking.book_date_from).toLocaleDateString("en-GB", {month: "2-digit",day: "2-digit",year: "numeric"});

                                //convert date to
                                let dateTo = new Date(booking.book_date_to).toLocaleDateString("en-GB", {month: "2-digit",day: "2-digit",year: "numeric"});
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
                                      {dateFrom}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                      {dateTo}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                                      <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2" />
                                        Pending
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

                                      <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                        </svg>
                                      </button>

                                      {/* state={{ data: client.client_id }}  */}
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
                    <a href="/" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </a>
                    <a href="/" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                      </svg>
                    </a>
                    <span className="text-sm font-normal text-gray-500">
                      Showing
                      <span className="text-gray-900 font-semibold">1-20</span>
                      of
                      <span className="text-gray-900 font-semibold">2290</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a href="/" className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
                      <svg className="-ml-1 mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      Previous
                    </a>
                    <a href="/" className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center">
                      Next                    
                      <svg className="-mr-1 ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                      </svg>
                    </a>
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
