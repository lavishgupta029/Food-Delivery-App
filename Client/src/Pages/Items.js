import React, { useEffect, useState } from "react";
import { isAuthenticate, signout } from "../auth/token";
import { showError, showSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";

function Items() {
  const { id } = isAuthenticate();
  const [values, setValues] = useState({
    name: "",
    cost: "",
  });
  const [tempItems, setTempItems] = useState([]);
  const { name, cost } = values;
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
    Orders({ name, cost, restoId: id }).then((data) => {
      if (data?.error) {
        showError(data.error);
      } else {
        showSuccess("Dish Successfully Added");
        setValues({ name: "", cost: "" });
        setTempItems([...data]);
      }
    });
  };

  const deleteItem = (item) => {
    const order = {
      restoId: id,
      itemId: item.id,
    };
    return fetch(`http://127.0.0.1:5000/deleteitem`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTempItems([...data]);
        showSuccess("Item Successfully Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NavLink className="resto__button" onClick={() => signout()} to="/">
          Logout
        </NavLink>
      </div>
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
        <Box display="flex" alignItems="flex-start" justifyContent="center">
          <table className="order__table">
            {tempItems.length > 0 ? (
              <tr>
                <th>Dish Name</th>
                <th>Dish Cost</th>
                <th>Actions</th>
              </tr>
            ) : (
              ""
            )}
            {tempItems.length > 0
              ? tempItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.cost}</td>
                    <td>
                      <button
                        className="order__delete"
                        onClick={() => {
                          deleteItem(item);
                        }}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </table>
        </Box>
      </div>
      <ToastContainer />
    </>
  );
}

export default Items;
