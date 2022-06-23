import React, { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import Select from "react-select";

function Vehicles() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [openAddCarDialog, setOpenAddCarDialog] = useState(false);
  const [data, setData] = useState({
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
  });
  const [frontImage, setFrontImage] = useState(null);
  const [frontUrl, setFrontUrl] = useState("");
  const [backImage, setBackImage] = useState(null);
  const [backUrl, setBackUrl] = useState("");
  const [rightImage, setRightImage] = useState(null);
  const [rightUrl, setRightUrl] = useState("");
  const [leftImage, setLeftImage] = useState(null);
  const [leftUrl, setLeftUrl] = useState("");
  const [interior1mage, setInterior1Image] = useState(null);
  const [interior1Url, setInterior1Url] = useState("");
  const [interior2Image, setInterior2Image] = useState(null);
  const [interior2Url, setInterior2Url] = useState("");
  const [editable, setEditable] = useState(false);
  const [statusSelected, setStatusSelected] = useState(null);
  const [transmissionSelected, setTransmissionSelected] = useState(null);
  const [engineSelected, setEngineSelected] = useState(null);
  const [driveSelected, setDriveSelected] = useState(null);
  const [carId, setCarId] = useState(null);
  const [carName, setCarName] = useState("");
  // const [status, setStatus] = useState("");
  const [color, setColor] = useState("");
  const [registration, setRegistration] = useState("");
  const [price, setPrice] = useState("");
  const [doors, setDoors] = useState("");
  const [passengers, setPassengers] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [feature1, setFeature1] = useState("");
  const [feature2, setFeature2] = useState("");
  const [feature3, setFeature3] = useState("");
  const [feature4, setFeature4] = useState("");
  const [feature5, setFeature5] = useState("");
  
  const statusDropdown = [
    {
      value: "Available",
      label: "Available",
    },
    {
      value: "Booked",
      label: "Booked",
    },
  ];

  const transmissionDropdown = [
    {
      value: "Automatic",
      label: "Automatic",
    },
    {
      value: "Manual",
      label: "Manual",
    },
  ];

  const engineDropdown = [
    {
      value: "Petrol",
      label: "Petrol",
    },
    {
      value: "Diesel",
      label: "Diesel",
    },
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

  const handleStatusChange = e => {
    setStatusSelected(e);
  };

  const handleTransmissionChange = e => {
    setTransmissionSelected(e);
  };

  const handleEngineChange = e => {
    setEngineSelected(e);
    console.log(e.value);
  };

  const handleDriveChange = e => {
    setDriveSelected(e);
    console.log(e.value);
  };

  const onFrontImageChange = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", frontImage);
    formData.append("upload_preset", "gari_admin");
    axios
      .post("https://api.cloudinary.com/v1_1/okuro/image/upload", formData)
      .then((response) => {
        setFrontUrl(response.data.secure_url);
      });
  };

  const onBackImageChange = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", backImage);
    formData.append("upload_preset", "gari_admin");
    axios
      .post("https://api.cloudinary.com/v1_1/okuro/image/upload", formData)
      .then((response) => {
        setBackUrl(response.data.secure_url);
      });
  };

  const onRightImageChange = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", rightImage);
    formData.append("upload_preset", "gari_admin");
    axios
      .post("https://api.cloudinary.com/v1_1/okuro/image/upload", formData)
      .then((response) => {
        setRightUrl(response.data.secure_url);
      });
  };

  const onLeftImageChange = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", leftImage);
    formData.append("upload_preset", "gari_admin");
    axios
      .post("https://api.cloudinary.com/v1_1/okuro/image/upload", formData)
      .then((response) => {
        setLeftUrl(response.data.secure_url);
      });
  };

  const onInterior1ImageChange = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", interior1mage);
    formData.append("upload_preset", "gari_admin");
    axios
      .post("https://api.cloudinary.com/v1_1/okuro/image/upload", formData)
      .then((response) => {
        setInterior1Url(response.data.secure_url);
      });
  };

  const onInterior2ImageChange = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", interior2Image);
    formData.append("upload_preset", "gari_admin");
    axios
      .post("https://api.cloudinary.com/v1_1/okuro/image/upload", formData)
      .then((response) => {
        setInterior2Url(response.data.secure_url);
      });
  };

  const handleClickOpen = () => {
    setOpenAddCarDialog(true);
  };

  const handleClose = () => {
    setOpenAddCarDialog(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const carData = {
      car_name: data.car_name,
      status: statusSelected.value,
      transmission: transmissionSelected.value,
      engine: engineSelected.value,
      color: data.color,
      registration: data.registration,
      passengers: data.passengers,
      company: data.company,
      price: data.price,
      doors: data.doors,
      drive: driveSelected.value,
      front_view: frontUrl,
      back_view: backUrl,
      right_view: rightUrl,
      left_view: leftUrl,
      interior_1: interior1Url,
      interior_2: interior2Url,
      feature_1: data.feature_1,
      feature_2: data.feature_2,
      feature_3: data.feature_3,
      feature_4: data.feature_4,
      feature_5: data.feature_5,
    };
    console.log(carData)
    axios
      .post("https://apigari.herokuapp.com/api/v1/newcar", carData)
      .then((response) => {
        handleClose();
        console.log(response.status);
      });
  };

  const getDetails = (carId, e) => {
    console.log(carId);
    fetch(`https://apigari.herokuapp.com/api/v1/cars/${carId}`)
      .then((response) => response.json())
      .then(
        (data) => {
          setLoading(false);
          setCarName(data.single_car.car_name);
          setColor(data.single_car.color);
          setRegistration(data.single_car.registration);
          setPrice(data.single_car.price);
          setDoors(data.single_car.doors);
          setPassengers(data.single_car.passengers);
          setCompanyName(data.single_car.company);
          setFeature1(data.single_car.feature_1);
          setFeature2(data.single_car.feature_2);
          setFeature3(data.single_car.feature_3);
          setFeature4(data.single_car.feature_4);
          setFeature5(data.single_car.feature_5);
          // if (data.single_car.status.Text === "Available"){
          //   setStatusSelected();
          //   console.log(e.value)

          // } else{
          //   setStatusSelected("Booked")
          // }
          // setStatus(data.single_car.status);
          // setPartnerMobile(data.partner_details.partner_mobile);
          // setPartnerPhysicalAddress(
          //   data.partner_details.partner_physical_address
          // );
          // setPartnerPostalAddress(data.partner_details.partner_postal_address);
          // setPartnerWebsiteUrl(data.partner_details.partner_website_url);
          // setPartnerId(data.partner_details.partner_id);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
  };

  useEffect(() => {
    fetch("https://apigari.herokuapp.com/api/v1/cars")
      .then((response) => response.json())
      .then(
        (data) => {
          // setIsLoaded(true);
          setLoading(false);
          setCars(data.cars);
          console.log(data.cars);
        },
        (error) => {
          // setIsLoaded(true);
          setLoading(false);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="flex overflow-hidden bg-white pt-16">
        <div
          className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
          id="sidebarBackdrop"
        ></div>
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
          <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
            <main>
              <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                <div className="mb-1 w-full">
                  <div className="mb-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      All products
                    </h1>
                  </div>
                  <div className="block sm:flex items-center md:divide-x md:divide-gray-100">
                    <form
                      className="sm:pr-3 mb-4 sm:mb-0"
                      action="#"
                      method="GET"
                    >
                      <label htmlFor="products-search" className="sr-only">
                        Search
                      </label>
                      <div className="mt-1 relative sm:w-64 xl:w-96">
                        <input
                          type="text"
                          name="email"
                          id="products-search"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                          placeholder="Search for products"
                        />
                      </div>
                    </form>
                    <div className="flex items-center sm:justify-end w-full">
                      <div className="hidden md:flex pl-2 space-x-1">
                        <a
                          href="/"
                          className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                        <a
                          href="/"
                          className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                        <a
                          href="/"
                          className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                        <a
                          href="/"
                          className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                          </svg>
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          handleClickOpen();
                          setEditable(false);
                        }}
                        className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
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
                          ></path>
                        </svg>
                        Add product
                      </button>
                      <Dialog open={openAddCarDialog} onClose={handleClose}>
                        <div className="max-w-2xl mx-auto bg-white p-16">
                          {editable ? (
                            <form>
                              <div className="grid gap-4 mb-4 lg:grid-cols-2">
                                <div>
                                  <label
                                    htmlFor="car_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Car name
                                  </label>
                                  <input
                                    type="text"
                                    name="car_name"
                                    value={carName}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Car name"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="status"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Status
                                  </label>
                                  <Select
                                    placeholder="Available/Booked"
                                    value={statusSelected}
                                    options={statusDropdown}
                                    // onChange={handleStatusChange}
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="transmission"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Transmission
                                  </label>
                                  <Select
                                    placeholder="Automatic/Manual"
                                    value={transmissionSelected}
                                    options={transmissionDropdown}
                                    // onChange={handleTransmissionChange}
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="engine"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Engine
                                  </label>
                                  <Select
                                    placeholder="Petrol/Diesel"
                                    value={engineSelected}
                                    options={engineDropdown}
                                    // onChange={handleEngineChange}
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="color"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Color
                                  </label>
                                  <input
                                    type="text"
                                    name="color"
                                    value={color}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Color"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="registration"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Registration
                                  </label>
                                  <input
                                    type="text"
                                    name="registration"
                                    value={registration}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="KAA 0123A"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Price
                                  </label>
                                  <input
                                    type="text"
                                    name="price"
                                    value={price}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Price in Ksh"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="doors"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Doors
                                  </label>
                                  <input
                                    type="text"
                                    name="doors"
                                    value={doors}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="No. of doors"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="passengers"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Passengers
                                  </label>
                                  <input
                                    type="text"
                                    name="passengers"
                                    value={passengers}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="No. of passengers"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="drive"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Drive
                                  </label>
                                  <Select
                                    placeholder="Self Drive/Chauffered/Both"
                                    value={driveSelected}
                                    options={driveDropdown}
                                    // onChange={handleDriveChange}
                                  />
                                </div>
                              </div>
                              <div className="mb-2">
                                <label
                                  htmlFor="company"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  name="company"
                                  value={companyName}
                                  onChange={handleChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Company Name"
                                />
                              </div>
                              <div>
                                <div className="grid grid-cols-1 space-y-2">
                                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Attach Front View Image
                                  </label>

                                  <div className=" p-4 bg-white  bg-whtie m-auto rounded-lg">
                                    <div className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                                      <img src={frontUrl} alt="preview" />
                                      <div className="input_field flex flex-col mx-auto text-center">
                                        <label>
                                          <div className=" text-white bg-cyan-600 hover:bg-cyan-700 flex justify-center border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                                            <input
                                              type="file"
                                              onChange={(e) => {
                                                setFrontImage(
                                                  e.target.files[0]
                                                );
                                              }}
                                              className="text-sm cursor-pointer w-10 hidden"
                                            />
                                            Select
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <button
                                  onClick={onFrontImageChange}
                                  className="w-1/2 text-white mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                                >
                                  Upload
                                </button>
                              </div>

                              <div className="grid grid-cols-1 space-y-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Attach Back View Image
                                </label>
                                <div className=" p-4 bg-white  bg-whtie m-auto rounded-lg">
                                  <div className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                                    <img src={backUrl} alt="preview" />
                                    <div className="input_field flex flex-col mx-auto text-center">
                                      <label>
                                        <div className=" text-white bg-cyan-600 hover:bg-cyan-700 flex justify-center border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                                          <input
                                            type="file"
                                            onChange={(e) => {
                                              setBackImage(e.target.files[0]);
                                            }}
                                            className="text-sm cursor-pointer w-10 hidden"
                                          />
                                          Select
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={onBackImageChange}
                                className="w-1/2 text-white mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Upload
                              </button>

                              <div className="grid grid-cols-1 space-y-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Attach Right Side View Image
                                </label>
                                <div className=" p-4 bg-white  bg-whtie m-auto rounded-lg">
                                  <div className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                                    <img src={rightUrl} alt="preview" />
                                    <div className="input_field flex flex-col mx-auto text-center">
                                      <label>
                                        <div className=" text-white bg-cyan-600 hover:bg-cyan-700 flex justify-center border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                                          <input
                                            type="file"
                                            onChange={(e) => {
                                              setRightImage(e.target.files[0]);
                                            }}
                                            className="text-sm cursor-pointer w-10 hidden"
                                          />
                                          Select
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={onRightImageChange}
                                className="w-1/2 text-white mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Upload
                              </button>

                              <div className="grid grid-cols-1 space-y-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Attach Left Side View Image
                                </label>
                                <div className=" p-4 bg-white  bg-whtie m-auto rounded-lg">
                                  <div className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                                    <img src={leftUrl} alt="preview" />
                                    <div className="input_field flex flex-col mx-auto text-center">
                                      <label>
                                        <div className=" text-white bg-cyan-600 hover:bg-cyan-700 flex justify-center border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                                          <input
                                            type="file"
                                            onChange={(e) => {
                                              setLeftImage(e.target.files[0]);
                                            }}
                                            className="text-sm cursor-pointer w-10 hidden"
                                          />
                                          Select
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={onLeftImageChange}
                                className="w-1/2 text-white mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Upload
                              </button>

                              <div className="grid grid-cols-1 space-y-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Attach Interior View Image (1)
                                </label>
                                <div className=" p-4 bg-white  bg-whtie m-auto rounded-lg">
                                  <div className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                                    <img src={interior1Url} alt="preview" />
                                    <div className="input_field flex flex-col mx-auto text-center">
                                      <label>
                                        <div className=" text-white bg-cyan-600 hover:bg-cyan-700 flex justify-center border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                                          <input
                                            type="file"
                                            onChange={(e) => {
                                              setInterior1Image(
                                                e.target.files[0]
                                              );
                                            }}
                                            className="text-sm cursor-pointer w-10 hidden"
                                          />
                                          Select
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={onInterior1ImageChange}
                                className="w-1/2 text-white mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Upload
                              </button>

                              <div className="grid grid-cols-1 space-y-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Attach Interior View Image (2)
                                </label>
                                <div className=" p-4 bg-white  bg-whtie m-auto rounded-lg">
                                  <div className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                                    <img src={interior2Url} alt="preview" />
                                    <div className="input_field flex flex-col mx-auto text-center">
                                      <label>
                                        <div className=" text-white bg-cyan-600 hover:bg-cyan-700 flex justify-center border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                                          <input
                                            type="file"
                                            onChange={(e) => {
                                              setInterior2Image(
                                                e.target.files[0]
                                              );
                                            }}
                                            className="text-sm cursor-pointer w-10 hidden"
                                          />
                                          Select
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={onInterior2ImageChange}
                                className="w-1/2 text-white mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Upload
                              </button>

                              <div className="grid gap-4 mb-4 lg:grid-cols-2">
                                <div>
                                  <label
                                    htmlFor="feature_1"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Feature 1
                                  </label>
                                  <input
                                    type="text"
                                    name="feature_1"
                                    value={feature1}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Feature 1"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="feature_2"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Feature 2
                                  </label>
                                  <input
                                    type="text"
                                    name="feature_2"
                                    value={feature2}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Feature 2"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="feature_3"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Feature 3
                                  </label>
                                  <input
                                    type="text"
                                    name="feature_3"
                                    value={feature3}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Feature 3"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="feature_4"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Feature 4
                                  </label>
                                  <input
                                    type="text"
                                    name="feature_4"
                                    value={feature4}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Feature 4"
                                  />
                                </div>
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor="feature_5"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Feature 5
                                </label>
                                <input
                                  type="text"
                                  name="feature_5"
                                  value={feature5}
                                  onChange={handleChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Feature 5"
                                />
                              </div>
                              <button
                                onClick={handleSubmit}
                                type="submit"
                                className="w-1/2 flex justify-end text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Edit Vehicle
                              </button>
                            </form>
                          ) : (
                            <form>
                              <div className="grid gap-4 mb-4 lg:grid-cols-2">
                                <div>
                                  <label
                                    htmlFor="car_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Car name
                                  </label>
                                  <input
                                    type="text"
                                    name="car_name"
                                    value={data.car_name}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Car name"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="status"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Status
                                  </label>
                                  <Select
                                    placeholder="Available/Booked"
                                    value={statusSelected}
                                    options={statusDropdown}
                                    onChange={handleStatusChange}
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="transmission"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Transmission
                                  </label>
                                  <Select
                                    placeholder="Automatic/Manual"
                                    value={transmissionSelected}
                                    options={transmissionDropdown}
                                    onChange={handleTransmissionChange}
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="engine"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Engine
                                  </label>
                                  <Select
                                    placeholder="Petrol/Diesel"
                                    value={engineSelected}
                                    options={engineDropdown}
                                    onChange={handleEngineChange}
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="color"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Color
                                  </label>
                                  <input
                                    type="text"
                                    name="color"
                                    value={data.color}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Color"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="registration"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Registration
                                  </label>
                                  <input
                                    type="text"
                                    name="registration"
                                    value={data.registration}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="KAA 0123A"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Price
                                  </label>
                                  <input
                                    type="text"
                                    name="price"
                                    value={data.price}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Price in Ksh"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="doors"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Doors
                                  </label>
                                  <input
                                    type="text"
                                    name="doors"
                                    value={data.doors}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="No. of doors"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="passengers"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Passengers
                                  </label>
                                  <input
                                    type="text"
                                    name="passengers"
                                    value={data.passengers}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="No. of passengers"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="drive"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Drive
                                  </label>
                                  <Select
                                    placeholder="Self Drive/Chauffered/Both"
                                    value={driveSelected}
                                    options={driveDropdown}
                                    onChange={handleDriveChange}
                                  />
                                </div>
                              </div>
                              <div className="mb-2">
                                <label
                                  htmlFor="company"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  name="company"
                                  value={data.company}
                                  onChange={handleChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Company Name"
                                />
                              </div>
                              <div>
                                <div className="grid grid-cols-1 space-y-2">
                                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Attach Front View Image
                                  </label>

                                  <div className=" p-4 bg-white  bg-whtie m-auto rounded-lg">
                                    <div className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                                      <img src={frontUrl} alt="preview" />
                                      <div className="input_field flex flex-col mx-auto text-center">
                                        <label>
                                          <div className=" text-white bg-cyan-600 hover:bg-cyan-700 flex justify-center border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                                            <input
                                              type="file"
                                              onChange={(e) => {
                                                setFrontImage(
                                                  e.target.files[0]
                                                );
                                              }}
                                              className="text-sm cursor-pointer w-10 hidden"
                                            />
                                            Select
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <button
                                  onClick={onFrontImageChange}
                                  className="w-1/2 text-white mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                                >
                                  Upload
                                </button>
                              </div>

                              <div className="grid grid-cols-1 space-y-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Attach Back View Image
                                </label>
                                <div className=" p-4 bg-white  bg-whtie m-auto rounded-lg">
                                  <div className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                                    <img src={backUrl} alt="preview" />
                                    <div className="input_field flex flex-col mx-auto text-center">
                                      <label>
                                        <div className=" text-white bg-cyan-600 hover:bg-cyan-700 flex justify-center border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                                          <input
                                            type="file"
                                            onChange={(e) => {
                                              setBackImage(e.target.files[0]);
                                            }}
                                            className="text-sm cursor-pointer w-10 hidden"
                                          />
                                          Select
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={onBackImageChange}
                                className="w-1/2 text-white mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Upload
                              </button>

                              <div className="grid grid-cols-1 space-y-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Attach Right Side View Image
                                </label>
                                <div className=" p-4 bg-white  bg-whtie m-auto rounded-lg">
                                  <div className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                                    <img src={rightUrl} alt="preview" />
                                    <div className="input_field flex flex-col mx-auto text-center">
                                      <label>
                                        <div className=" text-white bg-cyan-600 hover:bg-cyan-700 flex justify-center border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                                          <input
                                            type="file"
                                            onChange={(e) => {
                                              setRightImage(e.target.files[0]);
                                            }}
                                            className="text-sm cursor-pointer w-10 hidden"
                                          />
                                          Select
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={onRightImageChange}
                                className="w-1/2 text-white mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Upload
                              </button>

                              <div className="grid grid-cols-1 space-y-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Attach Left Side View Image
                                </label>
                                <div className=" p-4 bg-white  bg-whtie m-auto rounded-lg">
                                  <div className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                                    <img src={leftUrl} alt="preview" />
                                    <div className="input_field flex flex-col mx-auto text-center">
                                      <label>
                                        <div className=" text-white bg-cyan-600 hover:bg-cyan-700 flex justify-center border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                                          <input
                                            type="file"
                                            onChange={(e) => {
                                              setLeftImage(e.target.files[0]);
                                            }}
                                            className="text-sm cursor-pointer w-10 hidden"
                                          />
                                          Select
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={onLeftImageChange}
                                className="w-1/2 text-white mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Upload
                              </button>

                              <div className="grid grid-cols-1 space-y-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Attach Interior View Image (1)
                                </label>
                                <div className=" p-4 bg-white  bg-whtie m-auto rounded-lg">
                                  <div className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                                    <img src={interior1Url} alt="preview" />
                                    <div className="input_field flex flex-col mx-auto text-center">
                                      <label>
                                        <div className=" text-white bg-cyan-600 hover:bg-cyan-700 flex justify-center border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                                          <input
                                            type="file"
                                            onChange={(e) => {
                                              setInterior1Image(
                                                e.target.files[0]
                                              );
                                            }}
                                            className="text-sm cursor-pointer w-10 hidden"
                                          />
                                          Select
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={onInterior1ImageChange}
                                className="w-1/2 text-white mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Upload
                              </button>

                              <div className="grid grid-cols-1 space-y-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Attach Interior View Image (2)
                                </label>
                                <div className=" p-4 bg-white  bg-whtie m-auto rounded-lg">
                                  <div className=" p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
                                    <img src={interior2Url} alt="preview" />
                                    <div className="input_field flex flex-col mx-auto text-center">
                                      <label>
                                        <div className=" text-white bg-cyan-600 hover:bg-cyan-700 flex justify-center border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3">
                                          <input
                                            type="file"
                                            onChange={(e) => {
                                              setInterior2Image(
                                                e.target.files[0]
                                              );
                                            }}
                                            className="text-sm cursor-pointer w-10 hidden"
                                          />
                                          Select
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={onInterior2ImageChange}
                                className="w-1/2 text-white mb-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Upload
                              </button>

                              <div className="grid gap-4 mb-4 lg:grid-cols-2">
                                <div>
                                  <label
                                    htmlFor="feature_1"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Feature 1
                                  </label>
                                  <input
                                    type="text"
                                    name="feature_1"
                                    value={data.feature_1}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Feature 1"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="feature_2"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Feature 2
                                  </label>
                                  <input
                                    type="text"
                                    name="feature_2"
                                    value={data.feature_2}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Feature 2"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="feature_3"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Feature 3
                                  </label>
                                  <input
                                    type="text"
                                    name="feature_3"
                                    value={data.feature_3}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Feature 3"
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="feature_4"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Feature 4
                                  </label>
                                  <input
                                    type="text"
                                    name="feature_4"
                                    value={data.feature_4}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Feature 4"
                                  />
                                </div>
                              </div>

                              <div className="mb-4">
                                <label
                                  htmlFor="feature_5"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Feature 5
                                </label>
                                <input
                                  type="text"
                                  name="feature_5"
                                  value={data.feature_5}
                                  onChange={handleChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Feature 5"
                                />
                              </div>
                              <button
                                onClick={handleSubmit}
                                type="submit"
                                className="w-1/2 flex justify-end text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Add Vehicle
                              </button>
                            </form>
                          )}
                        </div>
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
                                <input
                                  id="checkbox-all"
                                  aria-describedby="checkbox-1"
                                  type="checkbox"
                                  className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                                />
                                <label
                                  htmlFor="checkbox-all"
                                  className="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                              Car Name
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                              Drive
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                              Transmission
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                              Price
                            </th>
                            <th scope="col" className="p-4"></th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {cars.map((car) => (
                            <tr className="hover:bg-gray-100" key={car.car_id}>
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-194556"
                                    aria-describedby="checkbox-1"
                                    type="checkbox"
                                    className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                                  />
                                  <label
                                    htmlFor="checkbox-194556"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                <div className="text-base font-semibold text-gray-900">
                                  {car.car_name}
                                </div>
                                <div className="text-sm font-normal text-gray-500">
                                  {car.company}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                {car.drive}
                              </td>
                              <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                {car.transmission}
                              </td>
                              <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                                <div className="flex items-center">
                                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{" "}
                                  {car.status}
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                {car.price}
                              </td>
                              <td className="p-4 whitespace-nowrap space-x-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleClickOpen();
                                    setEditable(true);
                                    getDetails(car.car_id);
                                    setCarId(car.car_id);
                                  }}
                                  className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                                >
                                  <svg
                                    className="mr-2 h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                    <path
                                      fillRule="evenodd"
                                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  Edit item
                                </button>
                                <button
                                  type="button"
                                  data-modal-toggle="delete-product-modal"
                                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
                                >
                                  <svg
                                    className="mr-2 h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  Delete item
                                </button>
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
                  <a
                    href="/"
                    className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
                  >
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="/"
                    className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2"
                  >
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <span className="text-sm font-normal text-gray-500">
                    Showing{" "}
                    <span className="text-gray-900 font-semibold">1-20</span> of{" "}
                    <span className="text-gray-900 font-semibold">2290</span>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href="/"
                    className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
                  >
                    <svg
                      className="-ml-1 mr-1 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Previous
                  </a>
                  <a
                    href="/"
                    className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
                  >
                    Next
                    <svg
                      className="-mr-1 ml-1 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </main>
          </div>
        )}
      </div>
    );
  }
}

export default Vehicles;
