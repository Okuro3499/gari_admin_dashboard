import React, { useState, useEffect } from "react";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
// import Button from "@material-ui/core/Button";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";

function Partners() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState([]);
  const [openAddPartnerDialog, setOpenAddPartnerDialog] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerMobile, setPartnerMobile] = useState("");
  const [partnerPhysicalAddress, setPartnerPhysicalAddress] = useState("");
  const [partnerPostalAddress, setPartnerPostalAddress] = useState("");
  const [partnerWebsiteUrl, setPartnerWebsiteUrl] = useState("");
  const [data, setData] = useState({
    partner_name: "",
    partner_email: "",
    partner_mobile: "",
    partner_physical_address: "",
    partner_postal_address: "",
    partner_website_url: "",
  });
  const [editable, setEditable] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const partnerData = {
      partner_name: data.partner_name,
      partner_email: data.partner_email,
      partner_mobile: data.partner_mobile,
      partner_physical_address: data.partner_physical_address,
      partner_postal_address: data.partner_postal_address,
      partner_website_url: data.partner_website_url,
    };
    axios
      .post("https://apigari.herokuapp.com/api/v1/newPartner", partnerData)
      .then((response) => {
        console.log(response.status);
      });
  };

  const handleClickOpen = () => {
    setOpenAddPartnerDialog(true);
  };

  const handleClose = () => {
    setOpenAddPartnerDialog(false);
  };

  const getDetails = (id) => {
    let item = partners[id - 1];
    setPartnerName(item && item.partner_name);
    setPartnerEmail(item && item.partner_email);
    setPartnerMobile(item && item.partner_mobile);
    setPartnerPhysicalAddress(item && item.partner_physical_address);
    setPartnerPostalAddress(item && item.partner_postal_address);
    setPartnerWebsiteUrl(item && item.partner_website_url);
  };

  useEffect(() => {
    fetch("https://apigari.herokuapp.com/api/v1/partners")
      .then((response) => response.json())
      .then(
        (data) => {
          setLoading(false);
          setPartners(data.partners);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );

    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div
            id="main-content"
            className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
          >
            <main>
              <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                <div className="mb-1 w-full">
                  <div className="mb-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      Partners
                    </h1>
                  </div>
                  <div className="sm:flex">
                    <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                      <form className="lg:pr-3" action="#" method="GET">
                        <label htmlFor="partners-search" className="sr-only">
                          Search
                        </label>
                        <div className="mt-1 relative lg:w-64 xl:w-96">
                          <input
                            type="text"
                            name="email"
                            id="partners-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder="Search for partners"
                          />
                        </div>
                      </form>
                      <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
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
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                      <button
                        type="button"
                        onClick={() => {
                          handleClickOpen();
                          setEditable(false);
                        }}
                        className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
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
                        Add partner
                      </button>
                      <Dialog open={openAddPartnerDialog} onClose={handleClose}>
                        <div className="max-w-2xl mx-auto bg-white p-16">
                          {editable ? (
                            <form>
                              <div className="grid gap-4 mb-4 lg:grid-cols-2">
                                <div>
                                  <label
                                    htmlFor="company_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Company name
                                  </label>
                                  <input
                                    type="text"
                                    name="partner_name"
                                    value={partnerName}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="John"
                                    required
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="phone"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Phone number
                                  </label>
                                  <input
                                    type="tel"
                                    name="partner_mobile"
                                    value={partnerMobile}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="719-240-756"
                                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                    required
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="company"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Company Website URL
                                  </label>
                                  <input
                                    type="url"
                                    name="partner_website_url"
                                    value={partnerWebsiteUrl}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="https://www.gari.com"
                                    required
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Email address
                                  </label>
                                  <input
                                    type="email"
                                    name="partner_email"
                                    value={partnerEmail}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="john.doe@company.com"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="mb-4">
                                <label
                                  htmlFor="website"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Physical Address
                                </label>
                                <input
                                  type="text"
                                  name="partner_physical_address"
                                  value={partnerPhysicalAddress}
                                  onChange={handleChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="flowbite.com"
                                  required
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  htmlFor="partner_postal_address"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Postal address
                                </label>
                                <input
                                  type="text"
                                  name="partner_postal_address"
                                  value={partnerPostalAddress}
                                  onChange={handleChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Doe"
                                  required
                                />
                              </div>
                              <button
                                onClick={handleSubmit}
                                type="submit"
                                className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Edit
                              </button>
                            </form>
                          ) : (
                            <form>
                              <div className="grid gap-4 mb-4 lg:grid-cols-2">
                                <div>
                                  <label
                                    htmlFor="company_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Company name
                                  </label>
                                  <input
                                    type="text"
                                    name="partner_name"
                                    value={data.partner_name}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="John"
                                    required
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="phone"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Phone number
                                  </label>
                                  <input
                                    type="tel"
                                    name="partner_mobile"
                                    value={data.partner_mobile}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="719-240-756"
                                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                    required
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="company"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Company Website URL
                                  </label>
                                  <input
                                    type="url"
                                    name="partner_website_url"
                                    value={data.partner_website_url}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="https://www.gari.com"
                                    required
                                  />
                                </div>

                                <div>
                                  <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Email address
                                  </label>
                                  <input
                                    type="email"
                                    name="partner_email"
                                    value={data.partner_email}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="john.doe@company.com"
                                    required
                                  />
                                </div>
                              </div>
                              <div className="mb-4">
                                <label
                                  htmlFor="website"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Physical Address
                                </label>
                                <input
                                  type="text"
                                  name="partner_physical_address"
                                  value={data.partner_physical_address}
                                  onChange={handleChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="flowbite.com"
                                  required
                                />
                              </div>
                              <div className="mb-4">
                                <label
                                  htmlFor="partner_postal_address"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Postal address
                                </label>
                                <input
                                  type="text"
                                  name="partner_postal_address"
                                  value={data.partner_postal_address}
                                  onChange={handleChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Doe"
                                  required
                                />
                              </div>
                              <button
                                onClick={handleSubmit}
                                type="submit"
                                className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                              >
                                Submit
                              </button>
                            </form>
                          )}
                        </div>
                      </Dialog>
                      <a
                        href="/"
                        className="w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                      >
                        <svg
                          className="-ml-1 mr-2 h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Export
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
                              Name
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                              Physical Address
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                              Phone Number
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase"
                            >
                              Status
                            </th>
                            <th scope="col" className="p-4"></th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {partners.map((partner) => (
                            <tr
                              className="hover:bg-gray-100"
                              key={partner.partner_id}
                            >
                              <td className="p-4 w-4">
                                <div className="flex items-center">
                                  <input
                                    id="checkbox-1"
                                    aria-describedby="checkbox-1"
                                    type="checkbox"
                                    className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                                  />
                                  <label
                                    htmlFor="checkbox-1"
                                    className="sr-only"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-2 lg:mr-0">
                                <div className="text-sm font-normal text-gray-500">
                                  <div className="text-base font-semibold text-gray-900">
                                    {partner.partner_name}
                                  </div>
                                  <div className="text-sm font-normal text-gray-500">
                                    {partner.partner_email}
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                {partner.partner_physical_address}
                              </td>
                              <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                                {"+254" + partner.partner_mobile}
                              </td>
                              <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                                <div className="flex items-center">
                                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{" "}
                                  Active
                                </div>
                              </td>
                              <td className="p-4 whitespace-nowrap space-x-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleClickOpen();
                                    setEditable(true);
                                    getDetails(partner.partner_id);
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
                                  Edit partner
                                </button>
                                <button
                                  type="button"
                                  data-modal-toggle="delete-partner-modal"
                                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
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
                                  Delete partner
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

              {/* <div
                className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full"
                id="delete-partner-modal"
                aria-hidden="true"
              >
                <div className="relative w-full max-w-md px-4 h-full md:h-auto">
                  <div className="bg-white rounded-lg shadow relative">
                    <div className="flex justify-end p-2">
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        data-modal-toggle="delete-partner-modal"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <div className="p-6 pt-0 text-center">
                      <svg
                        className="w-20 h-20 text-red-600 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
                        Are you sure you want to delete this partner?
                      </h3>
                      <a
                        href="/"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
                      >
                        Yes, I'm sure
                      </a>
                      <a
                        href="/"
                        className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                        data-modal-toggle="delete-partner-modal"
                      >
                        No, cancel
                      </a>
                    </div>
                  </div>
                </div>
              </div> */}
            </main>
          </div>
        )}
      </div>
    );
  }
}

export default Partners;
