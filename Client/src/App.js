import AddOrders from "./Pages/AddOrders";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Orders from "./Pages/Orders";
import MyOrders from "./Pages/MyOrders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/AddOrders" element={<AddOrders />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/MyOrders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
