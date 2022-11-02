import React, { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import Dialog from '@mui/material/Dialog';
import { Link } from "react-router-dom";
import NewVehicle from "../components/Vehicle/NewVehicle";
import SideBar from "../components/SideBar";

function Vehicles() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddCarDialog, setOpenAddCarDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenAddCarDialog(true);
  };

  const handleClose = () => {
    setOpenAddCarDialog(false);
  };

  useEffect(() => {
    fetch("https://apigari.herokuapp.com/api/v1/cars")
      .then((response) => response.json())
      .then(
        (data) => {
          setLoading(false);
          setCars(data.cars);
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
    return (
      <div>
        <SideBar />
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
                        All Vehicles
                      </h1>
                    </div>
                    <div className="block sm:flex items-center md:divide-x md:divide-gray-100">
                      <form className="sm:pr-3 mb-4 sm:mb-0">
                        <label htmlFor="vehicleSearch" className="sr-only">
                          Search
                        </label>
                        <div className="mt-1 relative sm:w-64 xl:w-96">
                          <input type="text" name="searchTerm" id="vehicleSearch" onChange={e=> {setSearchTerm(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search for Vehicle"/>
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
                        <button type="button" onClick={handleClickOpen} className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto">
                          <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"/>
                          </svg>
                          Add Vehicle
                        </button>

                        <Dialog open={openAddCarDialog} onClose={handleClose}>
                          <NewVehicle />
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>
                <section className="flex flex-row flex-wrap mx-auto">
                  {cars.filter((car)=> {
                    if (searchTerm === ""){
                      return car
                    } else if (car.car_name.toLowerCase().includes(searchTerm.toLowerCase())){
                      return car
                    } else if (car.company.toLowerCase().includes(searchTerm.toLowerCase())){
                      return car
                    } else if (car.transmission.toLowerCase().includes(searchTerm.toLowerCase())){
                      return car
                    }
                  }).map((car) => (
                    <div className="transition-all duration-150 flex w-full px-4 py-6 md:w-1/2 lg:w-1/3" key={car.car_id}>
                      <div className="mx-auto flex w-96 flex-col justify-center bg-white rounded-2xl shadow-xl shadow-slate-300/60">
                        <img className="aspect-video w-96 rounded-t-2xl object-cover object-center" alt="car front view" src={car.front_view}/>
                        <div className="pr-4 pl-4 pb-2 pt-2">
                          <small className="text-blue-400 text-xs">
                            {car.company}
                          </small>
                          <h1 className="text-m font-medium text-slate-600">
                            {car.car_name}
                          </h1>
                        </div>
                        <Link to="/VehicleDetails" state={{ data: car.car_id }} className="bg-transparent hover:bg-cyan-700 text-cyan-600 font-semibold hover:text-white py-2 px-2 border border-cyan-600 hover:border-transparent rounded m-4">
                          <div className="text-center">View More</div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </section>
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
                      Showing{" "}
                      <span className="text-gray-900 font-semibold">1-20</span>{" "}
                      of{" "}
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

export default Vehicles;
