import React, { useEffect, useState } from "react";
import { isAuthenticate } from "../auth/token";

function AddOrders() {
  const { id } = isAuthenticate();
  const [values, setValues] = useState({
    name: "",
    cost: "",
    restoId: id,
  });
  const [tempItems, setTempItems] = useState([]);
  const { name, cost, restoId } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  useEffect(() => {
    return fetch(`http://127.0.0.1:5000/getitems?restoId=${id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTempItems([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const Orders = (order) => {
    return fetch(`http://127.0.0.1:5000/additems`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
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
    Orders({ name, cost, restoId }).then((data) => {
      setTempItems([...data]);
    });
  };

  return (
    <>
      <div className="container">
        <div className="orders__formModal">
          <h1 className="dishes__header">Add Your Dishes</h1>
          <form className="form">
            <input
              type="text"
              placeholder="Enter Dish Name "
              className="formInput"
              value={name}
              onChange={handleChange("name")}
            />
            <input
              type="text"
              placeholder="Enter Cost"
              className="formInput"
              value={cost}
              onChange={handleChange("cost")}
            />
            <button onClick={clickSubmit} type="button" className="button1">
              ADD
            </button>
          </form>
        </div>
        <div className="orders__list">
          {tempItems.map((item) => (
            <div
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
              className="orders__item"
            >
              <h2>Name: {item.name}</h2>
              <p>Cost: {item.cost}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AddOrders;
