import React from "react" 
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom" 
import Cookies from "js-cookie" 
import Dashboard from "./Pages/Dashboard" 
import Vehicles from "./Pages/Vehicles" 
import VehicleDetails from "./Pages/VehicleDetails" 
import Bookings from "./Pages/Bookings" 
import Users from "./Pages/Users" 
import UserDetails from "./Pages/UserDetails" 
import Partners from "./Pages/Partners" 
import Roles from "./Pages/Roles" 
import VehicleTracking from "./Pages/VehicleTracking" 
import Login from "./Pages/Login" 

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route exact path="/" element={Cookies.get("token") == null ? (<Navigate to="/login" />) : (<Dashboard />)}/>
          <Route path="/Vehicles" element={Cookies.get("token") == null ? (<Navigate to="/login" />) : (<Vehicles />)} />
          <Route path="/VehicleDetails" element={Cookies.get("token") == null ? (<Navigate to="/login" />) : (<VehicleDetails />)} />
          <Route path="/Bookings" element={Cookies.get("token") == null ? (<Navigate to="/login" />) : (<Bookings />)} />
          <Route path="/Users" element={Cookies.get("token") == null ? (<Navigate to="/login" />) : (<Users />)} />
          <Route path="/Partners" element={Cookies.get("token") == null ? (<Navigate to="/login" />) : (<Partners />)} />
          <Route path="/Roles" element={Cookies.get("token") == null ? (<Navigate to="/login" />) : (<Roles />)} />
          <Route path="/VehicleTracking" element={Cookies.get("token") == null ? (<Navigate to="/login" />) : (<VehicleTracking />)} />
          <Route path="/UserDetails" element={Cookies.get("token") == null ? (<Navigate to="/login" />) : (<UserDetails />)} />
        </Routes>
      </Router>
    </div>
  ) 
}

export default App 
