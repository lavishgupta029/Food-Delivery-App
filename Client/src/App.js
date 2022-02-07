import Items from "./Pages/Items";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./Pages/Menu";
import MyOrders from "./Pages/MyOrders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Items" element={<Items />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/MyOrders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
