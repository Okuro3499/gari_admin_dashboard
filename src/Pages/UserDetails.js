import React, { useState, useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import axios from "axios";
import Cookies from "js-cookie";

function UserDetails(props) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userClientDetails, setUserClientDetails] = useState({
        user_id: "",
        role_id: "",
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        county: "",
        district: "",
        estate: "",
        landmark: "",
        driver_licence_url: "",
        national_id_url: "",
        user_photo_url: "",
        contact1_name: "",
        contact1_relationship: "", 
        contact1_mobile: "", 
        contact2_name: "", 
        contact2_relationship: "", 
        contact2_mobile: "", 
        partner_physical_address: "", 
        postal_address: "", 
        url: "", 
        role_name: "", 
        role_description: "", 
        created_by: "", 
        created_on: "", 
        modified_by: "", 
        last_modified_on: "",
  });

  const location = useLocation();
  const userId = location.state?.userId;
  const roleId = location.state?.roleId;

  useEffect(() => {
    const api = `https://apigari.herokuapp.com/api/v1/users/userDetails/${userId}/${roleId}`
    axios.get(api, { headers: {"Authorization" : `Bearer ${Cookies.get("token")}`} })
    // fetch(`https://apigari.herokuapp.com/api/v1/client/${userId}/${roleId}`)
      // .then((response) => response.json())
      .then(res => {
        console.log(res.data.single_user);
        setLoading(false);
      setUserClientDetails(res.data.single_user);
      // .then(
      //   (data) => {
      //     setLoading(false);
      //     setClientDetails(data.single_user);
      //     console.log(data.single_user);
      //   },
      //   (error) => {
      //     setLoading(false);
      //     setError(error);
      //   }
      // );
  });
}, []);
let memberFrom = new Date(userClientDetails.created_on).toLocaleDateString("en-GB", {month: "2-digit",day: "2-digit",year: "numeric"});

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <SideBar />
        <div className="flex overflow-hidden bg-white pt-16">
          <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"
          />
          {loading ? (
            <div className="h-full w-full relative overflow-y-auto lg:ml-64">
              <div className="grid place-items-center h-screen -mt-14">
                <BallTriangle height="80" width="80" color="cyan" ariaLabel="loading"/>
              </div>
            </div>
          ) : (
            
            <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
              <div className="container mx-auto my-5 p-5">
                <div className="md:flex md:-mx-2 ">
                  {/* <!-- Left Side --> */}
                  <div className="w-full md:w-3/12 md:mx-2">
                    {/* <!-- Profile Card --> */}
                    <div className="bg-white p-3 border-t-4 border-green-400">
                      <img
                        className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
                        src={userClientDetails.user_photo_url || require("../profileIcon.jpg")}
                        alt={userClientDetails.first_name + " " + userClientDetails.last_name}
                      />
                      <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                        {userClientDetails.first_name + " " + userClientDetails.last_name}
                      </h1>

                      <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                          <span>Status</span>
                          <span className="ml-auto">
                            <span className="bg-cyan-600 py-1 px-2 rounded text-white text-sm">
                              Active
                            </span>
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <span>Member since</span>
                          <span className="ml-auto">
                            {memberFrom}
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <span>Created by:</span>
                          <span className="ml-auto">
                            {userClientDetails.created_by}
                          </span>
                        </li>
                      </ul>
                    </div>
                    {/* <!-- End of profile card --> */}
                    <div className="my-4"></div>
                  </div>
                  {/* <!-- Right Side --> */}
                  <div className="w-full md:w-9/12 mx-2">
                    {/* <!-- Profile tab --> */}
                    {/* <!-- About Section --> */}
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                          <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                        </span>
                        <span className="tracking-wide">About</span>
                      </div>
                      <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              First Name
                            </div>
                            <div className="px-2 py-2">
                              {userClientDetails.first_name}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Last Name
                            </div>
                            <div className="px-2 py-2">
                              {userClientDetails.last_name}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Gender
                            </div>
                            <div className="px-2 py-2">Female</div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Contact No.
                            </div>
                            <div className="px-2 py-2">
                              {"+254" + userClientDetails.mobile}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              County
                            </div>
                            <div className="px-2 py-2">
                              {userClientDetails.county}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              District
                            </div>
                            <div className="px-2 py-2">
                              {userClientDetails.district}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Estate
                            </div>
                            <div className="px-2 py-2">
                              {userClientDetails.estate}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Landmark
                            </div>
                            <div className="px-2 py-2">
                              {userClientDetails.landmark}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Email.
                            </div>
                            <div className="px-2 py-2">
                                {userClientDetails.email}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Birthday
                            </div>
                            <div className="px-2 py-2">Feb 06, 1998</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- End of about section --> */}

                    <div className="my-4" />

                    <div className="bg-white p-3 shadow-sm rounded-sm">
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                          <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                        </span>
                        <span className="tracking-wide">
                          Emergency Contacts
                        </span>
                      </div>
                      <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              First Contact Name
                            </div>
                            <div className="px-4 py-2">
                              {userClientDetails.contact1_name}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Relationship
                            </div>
                            <div className="px-4 py-2">
                              {userClientDetails.contact1_relationship}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Phone Number:
                            </div>
                            <div className="px-4 py-2">
                              {userClientDetails.contact1_mobile}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold"></div>
                            <div className="px-4 py-2"></div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Second Contact Name
                            </div>
                            <div className="px-4 py-2">
                              {userClientDetails.contact2_name}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Relationship
                            </div>
                            <div className="px-4 py-2">
                              {userClientDetails.contact2_relationship}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Phone Number:
                            </div>
                            <div className="px-4 py-2">
                              {userClientDetails.contact2_mobile}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- End of about section --> */}

                    <div className="my-4" />

                    {/* <!-- Experience and education --> */}
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                            <span clas="text-green-500">
                              <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                              </svg>
                            </span>
                            <span className="tracking-wide">
                              Drivers License
                            </span>
                          </div>
                          <div className="bg-white p-3 border-t-4 border-cyan-600">
                            <div className="flex items-center">
                              <img className="w-56 h-52 rounded-md object-fill"
                                src={userClientDetails.driver_licence_url || require("../NoImage.png")}
                                alt="drivers License"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                            <span clas="text-green-500">
                              <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                              </svg>
                            </span>
                            <span className="tracking-wide">
                              National Identity Card
                            </span>
                          </div>
                          <div className="bg-white p-3 border-t-4 border-cyan-600">
                            <div className="flex items-center">
                              <img className="w-56 h-52 rounded-md object-fill"
                                src={userClientDetails.national_id_url || require("../NoImage.png")} alt="national id"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- End of Experience and education grid --> */}
                    </div>
                    {/* <!-- End of profile tab --> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserDetails;
