import React, { useState, useEffect, useRef } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BallTriangle } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import Cookies from "js-cookie";
import Select from "react-select";
import DatePicker from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import SideBar from "../components/SideBar";

import EditVehicle from "../components/Vehicle/EditVehicle";

let count = 0;
let slideInterval;

function VehicleDetails(props) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [carDetails, setCarDetails] = useState({
    car_id: "",
    car_name: "",
    status: "",
    transmission: "",
    engine: "",
    color: "",
    registration: "",
    passengers: "",
    company: "",
    price: "",
    doors: "",
    drive: "",
    front_view: "",
    back_view: "",
    right_view: "",
    left_view: "",
    interior_1: "",
    interior_2: "",
    feature_1: "",
    feature_2: "",
    feature_3: "",
    feature_4: "",
    feature_5: "",
    created_by: "",
    created_on: "",
    modified_by: "",
    last_modified_on: ""
  });
  const [booking, setBooking] = useState({
    car_id: "",
    client_id: "",
    book_date_from: "",
    book_date_to: "",
    destination: "",
    drive: "",
    total_days: 0,
    total_amount: 0,
  });
  const [openAddCarDialog, setOpenAddCarDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [driveSelected, setDriveSelected] = useState(null);
  const [spin, setSpin] = useState(false);
  // const [dateFrom, setDateFrom] = useState("");
  // const [dateTo, setDateTo] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);

  const carImages = [
    { src: carDetails.front_view },
    { src: carDetails.back_view },
    { src: carDetails.right_view },
    { src: carDetails.left_view },
    { src: carDetails.interior_1 },
    { src: carDetails.interior_2 },
  ];

  const driveDropdown = [
    {
      value: "Self Drive",
      label: "Self Drive",
    },
    {
      value: "Chauffered",
      label: "Chauffered",
    },
    {
      value: "Self Drive & Chauffered",
      label: "Self Drive & Chauffered",
    },
  ];

  const slideRef = useRef();

  // const removeAnimation = () => {
  //   slideRef.current.classList.remove("fade-anim");
  // };

  const handleClickOpen = () => {
    setOpenAddCarDialog(true);
  };

  const handleClose = () => {
    setOpenAddCarDialog(false);
  };

  const openConfirmation = (e) => {
    // setOpenConfirmationDialog(true);
    // const startDate = moment(booking.book_date_from);
    // const timeEnd = moment(booking.book_date_to);
    // const diff = timeEnd.diff(startDate);
    // const diffDuration = moment.duration(diff);
    // const days = diffDuration.days();
    // setBooking({ ...booking, total_days: days});
    // setBooking({ ...booking, total_amount: booking.total_days * carDetails.price});

    // console.log(booking.total_days)

    e.preventDefault();
    const bookingData = {
      car_id: carDetails.car_id,
      client_id: userSelected.value,
      book_date_from: booking.book_date_from,
      book_date_to: booking.book_date_to,
      destination: booking.destination,
      drive: driveSelected.value,
      total_days: booking.total_days,
      total_amount: booking.total_days,
    };
    console.log(bookingData);
  };

  const closeConfirmation = () => {
    setOpenConfirmationDialog(false);
  };

  const handleDriveChange = (e) => {
    setDriveSelected(e);
  };

  const handleFrom = (date) => {
    setBooking({ ...booking, book_date_from: date._d });
    //   setDateFrom(date)
    console.log(date);
  };
  console.log("start" + booking.book_date_from);

  const handleTo = (date) => {
    setBooking({ ...booking, book_date_to: date._d });

    // setDateTo(date)
    // setTimeout(() => {
    const startDate = moment(booking.book_date_from);
    const timeEnd = moment(booking.book_date_to);
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);
    const days = diffDuration.days();
    setTotalDays(days || 0);
    setTotalAmount(days * carDetails.price || 0);
    console.log("start" + startDate);
    console.log("end" + timeEnd);
    console.log("diff" + days);
    // }, 2000);
  };

  console.log("end" + booking.book_date_to);

  const handleChange = (e) => {
    const value = e.target.value;
    setBooking({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleBooking = (e) => {
    // setSpin(true);
    e.preventDefault();
    const bookingData = {
      car_id: carDetails.car_id,
      client_id: userSelected.value,
      book_date_from: booking.book_date_from,
      book_date_to: booking.book_date_to,
      destination: booking.destination,
      drive: driveSelected.value,
      total_days: totalDays,
      total_amount: totalAmount,
    };
    console.log(bookingData);
    // axios
    //   .put(
    //     `https://apigari.herokuapp.com/api/v1/car/edit/${carId}`,
    //     booking
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     notify();
    //     window.location.reload(false);
    //   });
  };

  const yesterday = moment().subtract(1, "day");
  const disableFromDt = (current) => {
    return current.isAfter(yesterday);
  };

  const disableToDt = (current) => {
    return current.isAfter(yesterday);
  };

  const handleUserChange = (e) => {
    setUserSelected(e);
    console.log(userSelected.value);
  };

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 5000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % carImages.length;
    setCurrentIndex(count);
    // slideRef.current.classList.add("fade-anim");
  };
  const handleOnPrevClick = () => {
    const carImagesLength = carImages.length;
    count = (currentIndex + carImagesLength - 1) % carImagesLength;
    setCurrentIndex(count);
    // slideRef.current.classList.add("fade-anim");
  };

  const location = useLocation();
  const data = location.state?.data;

  useEffect(() => {
    // fetch({url:`https://apigari.herokuapp.com/api/v1/cars/${data}`, headers: {"Authorization" : `Bearer ${Cookies.get("token")}`}})
    fetch(`https://apigari.herokuapp.com/api/v1/cars/${data}`)
      .then((response) => response.json())
      .then(
        (data) => {
          setLoading(false);
          setCarDetails(data.single_car);
          console.log(data.single_car);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
    fetch(`https://apigari.herokuapp.com/api/v1/clients`)
      .then((response) => response.json())
      .then(
        (data) => {
          setLoading(false);
          setUsers(data.clients);
          console.log(data.clients);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
  }, [data]);

  useEffect(() => {
    // slideRef.current.addEventListener("animationend", removeAnimation);
    // slideRef.current.addEventListener("mouseenter", pauseSlider);
    // slideRef.current.addEventListener("mouseleave", startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
    // eslint-disable-next-line
  }, []);

  let userOptions = users.map(function (user) {
    return {
      value: user.client_id,
      label: user.first_name + " " + user.last_name + ": +254" + user.mobile,
    };
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <SideBar />
        <Dialog open={openConfirmationDialog} onClose={closeConfirmation}>
          <div className="items-center justify-center space-y-6 bg-gray-100 sm:flex-row sm:space-x-6 sm:space-y-0">
            <div className="w-full max-w-sm overflow-hidden rounded-lg px-10 bg-white shadow-md ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto mt-8 h-16 w-16 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="mt-2 text-center text-2xl font-bold text-gray-500">
                Success
              </h1>
              <p className="my-4 text-center text-sm text-gray-500">
                Task successfully completed
              </p>
              <div className="space-x-4 bg-gray-100 py-4 text-center">
                <button className="inline-block rounded-md bg-red-500 px-10 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400">
                  Cancel
                </button>
                <button className="inline-block rounded-md bg-green-500 px-10 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </Dialog>
        <div className="flex overflow-hidden bg-white pt-16">
          <div
            className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
            id="sidebarBackdrop"
          />
          {loading ? (
            <div className="h-full w-full relative overflow-y-auto lg:ml-64">
              <div className="grid place-items-center h-screen -mt-14">
                <BallTriangle
                  height="80"
                  width="80"
                  color="cyan"
                  ariaLabel="loading"
                />
              </div>
            </div>
          ) : (
            <div
              id="main-content"
              className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
            >
              <main>
                <div className="p-2 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                  <div className="mb-2 w-full">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      Car Details
                    </h1>
                  </div>
                </div>

                <div className="flex justify-center h-screen text-gray-700 mb-20">
                  <div className="container mx-auto my-5 p-5">
                    <div className="md:flex md:-mx-2 ">
                      <div className="mb-2 w-full md:w-9/12 mx-2">
                        <div className="flex w-full max-w-screen-lg">
                          <div className="border-b md:border-r border-gray-300">
                            <div
                              ref={slideRef}
                              className="w-full select-none relative mx-auto  mr-6"
                            >
                              {/* className="relative  " */}
                              <div className="slide relative">
                                <img
                                  className="w-full h-1/2 object-cover object-center"
                                  src={
                                    carImages[currentIndex].src ||
                                    "https://via.placeholder.com/140x100?text=NO+IMAGE"
                                  }
                                  alt={carImages.car_name}
                                />
                              </div>

                              {/* <!-- The previous button --> */}
                              <button
                                className="absolute left-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer"
                                onClick={handleOnPrevClick}
                              >
                                <AiOutlineArrowLeft size={20} />
                              </button>

                              {/* <!-- The next button --> */}
                              <button
                                className="absolute right-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer"
                                onClick={handleOnNextClick}
                              >
                                <AiOutlineArrowRight size={20} />
                              </button>
                            </div>

                            <div className="sm:grid grid-cols-2 gap-x-4 max-w-4xl mx-auto">
                              <div className="flex">
                                <div className="text-xl mt-6 font-bold mr-2">
                                  Car Name:
                                </div>
                                <div className="text-xl mt-6 ">
                                  {carDetails.car_name}
                                </div>
                              </div>
                              <div className="flex">
                                <div className="text-xl font-bold mr-2 sm:mt-6">
                                  Price per day:
                                </div>
                                <div className="text-xl sm:mt-6">
                                  {carDetails.price}
                                </div>
                              </div>
                            </div>

                            <div className="text-m font-semibold">
                              Partner Name: {carDetails.company}
                            </div>

                            {/* <div className="sm:flex justify-end items-center mt-2 mr-6"> */}
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={handleClickOpen}
                                className="text-white mr-6 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                              >
                                <svg
                                  className="-ml-1 mr-2 h-6 w-6"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Edit Vehicle
                              </button>

                              <Dialog
                                open={openAddCarDialog}
                                onClose={handleClose}
                              >
                                <EditVehicle carId={carDetails.car_id} />
                                {/* carId={carImages.car_id} */}
                              </Dialog>
                            </div>
                            {/* </div> */}

                            <h1 className="mt-2 underline font-bold">
                              Features
                            </h1>
                            <div className="sm:grid grid-cols-2 gap-x-4 max-w-4xl mx-auto">
                              {/* <div className=""> */}
                              <div className="flex">
                                <div className="font-medium mr-2">
                                  Registration:
                                </div>
                                <div>{carDetails.registration}</div>
                              </div>
                              <div className="flex">
                                <div className="font-medium mr-2">
                                  Transmission:
                                </div>
                                <div>{carDetails.transmission}</div>
                              </div>
                              <div className="flex">
                                <div className="font-medium mr-2">Drive:</div>
                                <div>{carDetails.drive}</div>
                              </div>
                              <div className="flex">
                                <div className="font-medium mr-2">
                                  Passengers:
                                </div>
                                <div>{carDetails.passengers}</div>
                              </div>
                              {/* </div> */}

                              <div>
                                <div className="flex">
                                  <div className="font-medium mr-2">
                                    Status:
                                  </div>
                                  <div>{carDetails.status}</div>
                                </div>
                                <div className="flex">
                                  <div className="font-medium mr-2">Color:</div>
                                  <div>{carDetails.color}</div>
                                </div>
                                <div className="flex">
                                  <div className="font-medium mr-2">
                                    Engine:
                                  </div>
                                  <div>{carDetails.engine}</div>
                                </div>
                                <div className="flex">
                                  <div className="font-medium mr-2">Doors:</div>
                                  <div>{carDetails.doors}</div>
                                </div>
                              </div>
                            </div>

                            <h1 className="mt-2 underline font-bold">
                              Car Features
                            </h1>
                            <div className="sm:grid grid-cols-2 gap-x-4 max-w-4xl mx-auto">
                              {/* <div className=""> */}
                              <div className="flex">
                                <div className="font-medium mr-2">1:</div>
                                <div>{carDetails.feature_1}</div>
                              </div>
                              <div className="flex">
                                <div className="font-medium mr-2">2:</div>
                                <div>{carDetails.feature_2}</div>
                              </div>
                              <div className="flex">
                                <div className="font-medium mr-2">3:</div>
                                <div>{carDetails.feature_3}</div>
                              </div>
                              {/* </div> */}

                              <div>
                                <div className="flex">
                                  <div className="font-medium mr-2">4:</div>
                                  <div>{carDetails.feature_4}</div>
                                </div>
                                <div className="flex">
                                  <div className="font-medium mr-2">5:</div>
                                  <div>{carDetails.feature_5}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-3/12 md:mx-2">
                        <form>
                          <h1 className="underline font-bold mb-4">Booking</h1>
                          <div>
                            <label
                              htmlFor="car_name"
                              className="block mb-2 text-sm font-medium text-black "
                            >
                              Car name
                            </label>
                            <input
                              type="text"
                              name="car_name"
                              value={carDetails.car_name}
                              disabled={true}
                              className="mb-2 w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                              placeholder="Car name"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="drive"
                              className="block mb-2 text-sm font-medium text-black "
                            >
                              Client
                            </label>
                            <Select
                              className="mb-2"
                              placeholder="Type mobile to search.."
                              value={userSelected}
                              options={userOptions}
                              onChange={handleUserChange}
                              isSearchable={true}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="drive"
                              className="block mb-2 text-sm font-medium text-black "
                            >
                              Drive
                            </label>
                            <Select
                              className="mb-2"
                              placeholder="Self Drive/Chauffered/Both"
                              value={driveSelected}
                              options={driveDropdown}
                              onChange={handleDriveChange}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="from"
                              className="block mb-2 text-sm font-medium text-black "
                            >
                              From Date:
                            </label>
                            <DatePicker
                              className="mb-2 w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                              label="from"
                              timeFormat={false}
                              isValidDate={disableFromDt}
                              type="date"
                              id="fromDatetime"
                              closeOnSelect={true}
                              // value={(moment(booking.book_date_from).utc().format('DD-MM-YYYY'))}
                              value={booking.book_date_from}
                              onChange={handleFrom}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="to"
                              className="block mb-2 text-sm font-medium text-black "
                            >
                              To Date:
                            </label>
                            <DatePicker
                              className="mb-2 w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                              label="to"
                              timeFormat={false}
                              isValidDate={disableToDt}
                              type="date"
                              id="toDatetime"
                              closeOnSelect={true}
                              // value={ (moment(booking.book_date_to).utc().format('DD-MM-YYYY'))}
                              value={booking.book_date_to}
                              onChange={handleTo}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="to"
                              className="block mb-2 text-sm font-medium text-black "
                            >
                              Total Days: <span>{totalDays}</span>
                            </label>
                          </div>

                          <div>
                            <label
                              htmlFor="to"
                              className="block mb-2 text-sm font-medium text-black "
                            >
                              Total Amount to Pay:
                              <span>{totalAmount}</span>
                            </label>
                          </div>

                          <div>
                            <label
                              htmlFor="destination"
                              className="block mb-2 text-sm font-medium text-black "
                            >
                              Destination
                            </label>
                            <input
                              type="text"
                              name="destination"
                              value={booking.destination}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-lg bg-white mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                              placeholder="Destination"
                            />
                          </div>

                          <button
                            type="submit"
                            onClick={handleBooking}
                            className="mb-4 bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-4 focus:ring-cyan-200 font-medium text-sm rounded-lg block w-full p-2.5 mt-4"
                            disabled={spin}
                          >
                            {spin && (
                              <div>
                                <svg
                                  className="animate-spin h-5 w-5 mr-3 bg-white"
                                  viewBox="0 0 20 20"
                                />
                              </div>
                            )}
                            {spin && <span>Booking</span>}
                            {!spin && <span>Book</span>}
                          </button>
                        </form>
                      </div>
                    </div>
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

export default VehicleDetails;
