import AddOrders from "./Pages/AddOrders";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/AddOrders" element={<AddOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
