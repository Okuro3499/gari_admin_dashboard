import React, { useState, useEffect } from "react";
import axios from "axios";
import baseURL from '../../utils/Config.js';
import Select from "react-select";
import Success from "../Success";
import Dialog from '@mui/material/Dialog';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cloudinaryConfig from "../../utils/Cloudinary";
import Cookies from "js-cookie";

const predefinedTags = ['Automatic Emergency Braking', 'Lane Departure Warning', 'Adaptive Cruise Control', 'Blind Spot Monitoring', 'Rear Cross-Traffic Alert', 
'Parking Assistance', 'Backup Camera', 'Keyless Entry', 'Push Button Start', 'Apple CarPlay', 'Android Auto', 'Bluetooth Connectivity',
'USB Ports', 'Satellite Radio', 'Navigation System', 'Leather Seats', 'Heated Seats', 'Power Adjustable Seats', 'Sunroof', 'LED Headlights', 
'Fog Lights', 'Rain-Sensing Wipers', 'Hands-Free Liftgate'];

const NewVehicle = ({ onSuccess }) => {
  const [data, setData] = useState({
    car_name: "", status: "", transmission: "", color: "", registration: "", passengers: "", company_id: "", price: "", doors: "", drive: "", car_images: [], features: [], CC: "", fuel: ""
  });
  const [carImagesUrl, setCarImagesUrl] = useState("");
  const [numFiles, setNumFiles] = useState(0);
  const [statusSelected, setStatusSelected] = useState(null);
  const [transmissionSelected, setTransmissionSelected] = useState(null);
  const [fuelSelected, setFuelSelected] = useState(null);
  const [driveSelected, setDriveSelected] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState(predefinedTags);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [spin, setSpin] = useState(false);
  const [spin1, setSpin1] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);

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

  const fuelDropdown = [
    {
      value: "Electric",
      label: "Electric",
    },
    {
      value: "Petrol",
      label: "Petrol",
    },
    {
      value: "Diesel",
      label: "Diesel",
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

  const handleFuelChange = (e) => {
    setFuelSelected(e);
  };

  const handleDriveChange = (e) => {
    setDriveSelected(e);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleImageUpload = async () => {
    setSpin1(true);

    try {
      const uploadedImages = [];

      for (const file of images) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
        formData.append('folder', 'Gari Vehicles');

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`, { method: 'POST', body: formData });

        if (!response.ok) {
          throw new Error(`Failed to upload image ${file.name}`);
        }

        const data = await response.json();
        uploadedImages.push(data.secure_url);
      }

      setCarImagesUrl(uploadedImages);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setSpin1(false);
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const previews = [];

    for (const file of files) {
      previews.push(URL.createObjectURL(file));
    }

    setImagePreviews(previews);
    setImages(files);

    setNumFiles(files.length);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredTags(predefinedTags.filter(tag => tag.toLowerCase().includes(value.toLowerCase())));
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newTag = inputValue.trim();
      if (newTag) {
        setTags([...tags, newTag]);
        setInputValue('');
      }
    }
  };

  const handleTagClick = (tag) => {
    setTags([...tags, tag]);
    setInputValue('');
    setFilteredTags(filteredTags.filter((t) => t !== tag));
  };

  const handleImageRemove = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setNumFiles(updatedPreviews.length);
  };
  

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCompanyChange = (selectedOption) => {
    setSelectedCompany(selectedOption);
  };

  const companyDropdown = companies.map((company) => ({
    value: company.company_id,
    label: company.company_name,
  }));
  const imageUpload = () => {
    toast.success("Upload Successfully", { position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpin(true);
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };

    const carData = {
      car_name: data.car_name,
      status: statusSelected ? statusSelected.value : "",
      transmission: transmissionSelected ? transmissionSelected.value : "",
      color: data.color,
      registration: data.registration,
      passengers: data.passengers,
      company_id: selectedCompany ? selectedCompany.value : "",
      price: data.price,
      doors: data.doors,
      drive: driveSelected ? [driveSelected.value] : [],
      car_images: carImagesUrl,
      features: tags,
      CC: data.CC,
      fuel: fuelSelected ? fuelSelected.value : "",
      created_by: `${Cookies.get("userId")}`
    };
    axios
      .post(`${baseURL}v1/newcar`, carData, config)
      .then((response) => {
        console.log(response);
        setSuccess(true);
        setSpin(false);
        onSuccess(); 
        toast.success("Car added successfully", { position: "top-center", autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined});
      });
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    fetch(`${baseURL}v1/companies`, config)
      .then((response) => response.json())
      .then(
        (data) => {
          setCompanies(data.companies);
        },
        (error) => {
          console.error("Error fetching companies:", error);
        }
      );
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-16">
      {/* <Dialog open={success} onClose={handleSuccessClose}>
        <Success />      
      </Dialog> */}
      <ToastContainer />
      <form>
        <div className="grid gap-4 mb-4 lg:grid-cols-2">
          <div>
            <label htmlFor="car_name" className="block mb-2 text-sm font-medium text-gray-900">Car name</label>
            <input type="text" name="car_name" value={data.car_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Car name"/>
          </div>

          <div>
            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
            <Select placeholder="Available/Booked" value={statusSelected} options={statusDropdown} onChange={handleStatusChange}/>
          </div>

          <div>
            <label htmlFor="fuel"className="block mb-2 text-sm font-medium text-gray-900">Fuel</label>
            <Select placeholder="Pick fuel type" value={fuelSelected} options={fuelDropdown} onChange={handleFuelChange}/>
          </div>

          <div>
            <label htmlFor="transmission" className="block mb-2 text-sm font-medium text-gray-900">Transmission</label>
            <Select placeholder="Automatic/Manual" value={transmissionSelected} options={transmissionDropdown} onChange={handleTransmissionChange}/>
          </div>

          <div>
            <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900">Color</label>
            <input type="text" name="color" value={data.color} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Color"/>
          </div>

          <div>
            <label htmlFor="registration" className="block mb-2 text-sm font-medium text-gray-900">Registration</label>
            <input type="text" name="registration" value={data.registration} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="KAA 0123A"/>
          </div>

          <div>
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
            <input type="number" name="price" value={data.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Price per day in Ksh"/>
          </div>

          <div>
            <label htmlFor="doors" className="block mb-2 text-sm font-medium text-gray-900">Doors</label>
            <input type="number" name="doors" value={data.doors} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="No. of doors"/>
          </div>

          <div>
            <label htmlFor="passengers"className="block mb-2 text-sm font-medium text-gray-900">Passengers</label>
            <input type="number" name="passengers" value={data.passengers} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="No. of passengers"/>
          </div>

          <div>
            <label htmlFor="CC"className="block mb-2 text-sm font-medium text-gray-900">CC</label>
            <input type="number" name="CC" value={data.CC} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Engine Capacity"/>
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="drive" className="block mb-2 text-sm font-medium text-gray-900">Drive</label>
          <Select placeholder="Pick drive type" value={driveSelected} options={driveDropdown} onChange={handleDriveChange}/>
        </div>

        <div className="mb-2">
          <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">Company</label>
          <Select placeholder="Pick Company" value={selectedCompany} options={companyDropdown} onChange={handleCompanyChange}/>
        </div>
        <div className="flex flex-col mx-auto mb-2">
          <div className="w-full px-3">
            <div className="block text-sm font-medium text-gray-900 ">Attach Car Image</div>
            <label>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} />
              {/* {numFiles === 0 ? "Choose files" : numFiles === 1 ? "1 File" : `${numFiles} Files`} */}
            </label>
            <button className="inline-flex items-center px-3 py-2 font-medium rounded leading-5 text-primary-100 text-white bg-cyan-600 hover:bg-cyan-700" disabled={spin1} onClick={handleImageUpload}>
              {spin1 && (<svg className="animate-spin h-5 w-5 mr-3 bg-white" viewBox="0 0 20 20" />)}
              {spin1 && <span>Uploading</span>}
              {!spin1 && <span>Upload</span>}
            </button>
          </div>
          <div className="flex flex-wrap justify-center mt-4">
            {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img src={preview} alt={`Preview ${index}`} className="w-32 h-32 mx-2 my-2 object-cover rounded" />
              <button type="button" className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white text-xs" onClick={() => handleImageRemove(index)}>x</button>
            </div>
            ))}
          </div>
        </div>
    
        <div className="mb-4 lg:grid-cols-2">
          <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900">Features</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
            <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg flex items-center">{tag}
              <button type="button" className="ml-2 text-red-600" onClick={() => handleTagRemove(tag)}>x</button>
            </div>
            ))}
            <input type="text" name="tags" placeholder="Type or select below" value={inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
          </div>
          <div className="mt-2">
            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag, index) => (
                <div key={index} className="bg-gray-200 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-300" onClick={() => handleTagClick(tag)}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
    
        <button type="submit" onClick={handleSubmit} className="w-1/2 flex justify-end text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-3 py-2 text-center sm:w-auto" disabled={spin}>
          {spin && (<svg class="animate-spin h-5 w-5 mr-3 bg-white" viewBox="0 0 20 20" />)}
          {spin && <span>Adding Vehicle</span>}
          {!spin && <span>Add Vehicle</span>}
        </button>
      </form>
    </div>
  );
};

export default NewVehicle;
