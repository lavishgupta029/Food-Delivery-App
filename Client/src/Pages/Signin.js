import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../auth/token";
import { showError, showSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    is_resto: "true",
  });
  const { email, password, is_resto } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const navigate = useNavigate();

  const Signinuser = (user) => {
    return fetch(`http://127.0.0.1:5000/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    Signinuser({ email, password, is_resto }).then((data) => {
      if (data?.error) {
        showError(data.error);
      } else {
        authenticate(data);
        showSuccess(
          "Succesfully signed up,you will be redirected to your Details"
        );
        setTimeout(function () {
          if (data.is_resto === "true") {
            navigate("/AddOrders");
          } else {
            navigate("/Orders");
          }
        }, 2500);
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="formModal">
          <form className="form">
            <select
              value={is_resto}
              onChange={handleChange("is_resto")}
              className="formInput"
            >
              <option value={true} className="option">
                Owner
              </option>
              <option value={false} className="option">
                Customer
              </option>
            </select>
            <input
              type="email"
              placeholder="Enter Email "
              className="formInput"
              value={email}
              onChange={handleChange("email")}
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="formInput"
              value={password}
              onChange={handleChange("password")}
            />
            <button onClick={clickSubmit} type="button" className="button1">
              LOGIN
            </button>
          </form>
        </div>
        <div>
          <iframe
            className="logo"
            src="https://embed.lottiefiles.com/animation/36895"
          ></iframe>
          <div className="secDiv">
            <p style={{ fontWeight: "bold" }}>If you don't have an account</p>
            <button
              onClick={() => navigate("/")}
              type="button"
              className="button2"
            >
              CLICK HERE
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Signin;
