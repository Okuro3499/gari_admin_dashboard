import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import Success from "../Success";
import Dialog from '@mui/material/Dialog';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewVehicle = ({ props }) => {
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
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
  const [statusSelected, setStatusSelected] = useState(null);
  const [transmissionSelected, setTransmissionSelected] = useState(null);
  const [engineSelected, setEngineSelected] = useState(null);
  const [driveSelected, setDriveSelected] = useState(null);
  const [spin, setSpin] = useState(false);
  const [spin1, setSpin1] = useState(false);
  const [spin2, setSpin2] = useState(false);
  const [spin3, setSpin3] = useState(false);
  const [spin4, setSpin4] = useState(false);
  const [spin5, setSpin5] = useState(false);
  const [spin6, setSpin6] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleSuccessClose = () => {
    setSuccess(false);
  };

  const handleStatusChange = (e) => {
    setStatusSelected(e);
  };

  const handleTransmissionChange = (e) => {
    setTransmissionSelected(e);
  };

  const handleEngineChange = (e) => {
    setEngineSelected(e);
  };

  const handleDriveChange = (e) => {
    setDriveSelected(e);
  };

  const onFrontImageChange = (e) => {
    e.preventDefault();
    setSpin1(true);
    const formData = new FormData();
    formData.append("file", frontImage);
    formData.append("upload_preset", "gari_admin");
    axios
      .post("https://api.cloudinary.com/v1_1/okuro/image/upload", formData)
      .then((response) => {
        setSpin1(false);
        imageUpload();
        setFrontUrl(response.data.secure_url);
      });
  };

  const onBackImageChange = (e) => {
    e.preventDefault();
    setSpin2(true);
    const formData = new FormData();
    formData.append("file", backImage);
    formData.append("upload_preset", "gari_admin");
    axios
      .post("https://api.cloudinary.com/v1_1/okuro/image/upload", formData)
      .then((response) => {
        setSpin2(false);
        imageUpload();
        setBackUrl(response.data.secure_url);
      });
  };

  const onRightImageChange = (e) => {
    e.preventDefault();
    setSpin3(true);
    const formData = new FormData();
    formData.append("file", rightImage);
    formData.append("upload_preset", "gari_admin");
    axios
      .post("https://api.cloudinary.com/v1_1/okuro/image/upload", formData)
      .then((response) => {
        setSpin3(false);
        imageUpload();
        setRightUrl(response.data.secure_url);
      });
  };

  const onLeftImageChange = (e) => {
    e.preventDefault();
    setSpin4(true);
    const formData = new FormData();
    formData.append("file", leftImage);
    formData.append("upload_preset", "gari_admin");
    axios
      .post("https://api.cloudinary.com/v1_1/okuro/image/upload", formData)
      .then((response) => {
        setSpin4(false);
        imageUpload();
        setLeftUrl(response.data.secure_url);
      });
  };

  const onInterior1ImageChange = (e) => {
    e.preventDefault();
    setSpin5(true);
    const formData = new FormData();
    formData.append("file", interior1mage);
    formData.append("upload_preset", "gari_admin");
    axios
      .post("https://api.cloudinary.com/v1_1/okuro/image/upload", formData)
      .then((response) => {
        setSpin4(false);
        imageUpload();
        setInterior1Url(response.data.secure_url);
      });
  };

  const onInterior2ImageChange = (e) => {
    e.preventDefault();
    setSpin6(true);
    const formData = new FormData();
    formData.append("file", interior2Image);
    formData.append("upload_preset", "gari_admin");
    axios
      .post("https://api.cloudinary.com/v1_1/okuro/image/upload", formData)
      .then((response) => {
        setSpin5(false);
        imageUpload();
        setInterior2Url(response.data.secure_url);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  // const notify = () => {
  //   toast.success("New Car Added Successfully", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  const imageUpload = () => {
    toast.success("Upload Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpin(true);
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
    axios
      .post("https://apigari.herokuapp.com/api/v1/newcar", carData)
      .then((response) => {
        console.log(response);
        setSuccess(true);
        setSpin(false);
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-16">
      <Dialog open={success} onClose={handleSuccessClose}>
        <Success />      
      </Dialog>
      <ToastContainer />
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
              onChange={handleTransmissionChange}xxxsz   
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

        <div className="flex flex-col mx-auto mb-2">
            <div className="w-full px-3">
              <div className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Attach Front View Image
              </div>
              <label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setFrontImage(e.target.files[0]);
                  }}
                />
              </label>
              <button
                className="inline-flex items-center px-3 py-2 font-medium rounded leading-5 text-primary-100 text-white bg-cyan-600 hover:bg-cyan-700"
                onClick={onFrontImageChange}
                disabled={spin1}
              >
                {spin1 && (
                  <div>
                    <svg
                      class="animate-spin h-5 w-5 mr-3 bg-white"
                      viewBox="0 0 20 20"
                    />
                  </div>
                )}
                {spin1 && <span>Uploading</span>}
                {!spin1 && <span>Upload</span>}
              </button>
              <img
                className="flex flex-col mx-auto text-center mt-10 p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                src={
                  frontUrl ||
                  "https://via.placeholder.com/150?text=UPLOAD+FRONT+IMAGE"
                }
                alt="Front View"
                height="250"
                width="250"
              />
            </div>
          </div>

          <div className="flex flex-col mx-auto mb-2">
            <div className="w-full px-3">
              <div className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Attach Back View Image
              </div>
              <label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setBackImage(e.target.files[0]);
                  }}
                />
              </label>
              <button
                className="inline-flex items-center px-3 py-2 font-medium rounded leading-5 text-primary-100 text-white bg-cyan-600 hover:bg-cyan-700"
                onClick={onBackImageChange}
                disabled={spin2}
              >
                {spin2 && (
                  <div>
                    <svg
                      class="animate-spin h-5 w-5 mr-3 bg-white"
                      viewBox="0 0 20 20"
                    />
                  </div>
                )}
                {spin2 && <span>Uploading</span>}
                {!spin2 && <span>Upload</span>}
              </button>
              <img
                className="flex flex-col mx-auto text-center mt-10 p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                src={
                  backUrl ||
                  "https://via.placeholder.com/150?text=UPLOAD+BACK+IMAGE"
                }
                alt="Back View"
                height="250"
                width="250"
              />
            </div>
          </div>

          <div className="flex flex-col mx-auto mb-2">
            <div className="w-full px-3">
              <div className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Attach Right Side View Image
              </div>
              <label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setRightImage(e.target.files[0]);
                  }}
                />
              </label>
              <button
                className="inline-flex items-center px-3 py-2 font-medium rounded leading-5 text-primary-100 text-white bg-cyan-600 hover:bg-cyan-700"
                onClick={onRightImageChange}
                disabled={spin3}
              >
                {spin3 && (
                  <div>
                    <svg
                      class="animate-spin h-5 w-5 mr-3 bg-white"
                      viewBox="0 0 20 20"
                    />
                  </div>
                )}
                {spin3 && <span>Uploading</span>}
                {!spin3 && <span>Upload</span>}
              </button>
              <img
                className="flex flex-col mx-auto text-center mt-10 p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                src={
                  rightUrl ||
                  "https://via.placeholder.com/150?text=UPLOAD+RIGHT+IMAGE"
                }
                alt="Right View"
                height="250"
                width="250"
              />
            </div>
          </div>

          <div className="flex flex-col mx-auto mb-2">
            <div className="w-full px-3">
              <div className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Attach Left Side View Image
              </div>
              <label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setLeftImage(e.target.files[0]);
                  }}
                />
              </label>
              <button
                className="inline-flex items-center px-3 py-2 font-medium rounded leading-5 text-primary-100 text-white bg-cyan-600 hover:bg-cyan-700"
                onClick={onLeftImageChange}
                disabled={spin4}
              >
                {spin4 && (
                  <div>
                    <svg
                      class="animate-spin h-5 w-5 mr-3 bg-white"
                      viewBox="0 0 20 20"
                    />
                  </div>
                )}
                {spin4 && <span>Uploading</span>}
                {!spin4 && <span>Upload</span>}
              </button>
              <img
                className="flex flex-col mx-auto text-center mt-10 p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                src={
                  leftUrl ||
                  "https://via.placeholder.com/150?text=UPLOAD+LEFT+IMAGE"
                }
                alt="Left View"
                height="250"
                width="250"
              />
            </div>
          </div>

          <div className="flex flex-col mx-auto mb-2">
            <div className="w-full px-3">
              <div className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Attach Interior View Image (1)
              </div>
              <label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setInterior1Image(e.target.files[0]);
                  }}
                />
              </label>
              <button
                className="inline-flex items-center px-3 py-2 font-medium rounded leading-5 text-primary-100 text-white bg-cyan-600 hover:bg-cyan-700"
                onClick={onInterior1ImageChange}
                disabled={spin5}
              >
                {spin5 && (
                  <div>
                    <svg
                      class="animate-spin h-5 w-5 mr-3 bg-white"
                      viewBox="0 0 20 20"
                    />
                  </div>
                )}
                {spin5 && <span>Uploading</span>}
                {!spin5 && <span>Upload</span>}
              </button>
              <img
                className="flex flex-col mx-auto text-center mt-10 p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                src={
                  interior1Url ||
                  "https://via.placeholder.com/150?text=UPLOAD+INTERIOR+IMAGE"
                }
                alt="Interior 1 View"
                height="250"
                width="250"
              />
            </div>
          </div>

          <div className="flex flex-col mx-auto mb-2">
            <div className="w-full px-3">
              <div className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Attach Interior View Image (2)
              </div>
              <label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => {
                    setInterior2Image(e.target.files[0]);
                  }}
                />
              </label>
              <button
                className="inline-flex items-center px-3 py-2 font-medium rounded leading-5 text-primary-100 text-white bg-cyan-600 hover:bg-cyan-700"
                onClick={onInterior2ImageChange}
                disabled={spin6}
              >
                {spin6 && (
                  <div>
                    <svg
                      class="animate-spin h-5 w-5 mr-3 bg-white"
                      viewBox="0 0 20 20"
                    />
                  </div>
                )}
                {spin6 && <span>Uploading</span>}
                {!spin6 && <span>Upload</span>}
              </button>
              <img
                className="flex flex-col mx-auto text-center mt-10 p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                src={
                  interior2Url ||
                  "https://via.placeholder.com/150?text=UPLOAD+INTERIOR+IMAGE"
                }
                alt="Interior 2 View"
                height="250"
                width="250"
              />
            </div>
          </div>

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
          type="submit"
          onClick={handleSubmit}
          className="w-1/2 flex justify-end text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
          disabled={spin}
        >
          {spin && (
            <div>
              <svg
                class="animate-spin h-5 w-5 mr-3 bg-white"
                viewBox="0 0 20 20"
              />
            </div>
          )}
          {spin && <span>Adding Vehicle</span>}
          {!spin && <span>Add Vehicle</span>}
        </button>
      </form>
    </div>
  );
};

export default NewVehicle;
