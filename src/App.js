import React from "react";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
// import Footer from "./components/Footer";
import Vehicles from "./Pages/Vehicles";
import Bookings from "./Pages/Bookings";
import Users from "./Pages/Users";
import Partners from "./Pages/Partners";
import Staff from "./Pages/Staff";
import VehicleTracking from "./Pages/VehicleTracking";

function App() {
  return (
    <Router>
      <SideBar />
      <Routes>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route path="/Vehicles" element={<Vehicles/>} />
        <Route path="/Bookings" element={<Bookings/>} />
        <Route path="/Users" element={<Users/>} />
        <Route path="/Partners" element={<Partners/>} />
        <Route path="/Staff" element={<Staff/>} />
        <Route path="/VehicleTracking" element={<VehicleTracking/>} />
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
