import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { isAuthenticate, signout } from "../auth/token";
import { NavLink, useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  height: 450,
};

function Menu() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [myOrders, setMyOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const { id } = isAuthenticate();
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    //Fetching All Restaurants -> GET Method
    return fetch(`http://127.0.0.1:5000/restaurants`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRestaurants([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const addOrder = (order, restaurantName, id) => {
    let existingOrderIndex = null;
    myOrders.map((ele) => {
      if (ele.id === id) {
        existingOrderIndex = id;
        showError("Item Already Exist in Cart ");
      }
    });
    if (existingOrderIndex === null) {
      order["restaurantName"] = restaurantName;
      setMyOrders([...myOrders, order]);
      setTotalCost(parseInt(totalCost) + parseInt(order.cost));
      showSuccess("Item Added to Cart");
    }
  };

  const deleteOrder = (order) => {
    setMyOrders(myOrders.filter((ele) => ele.id !== order.id));
    setTotalCost(parseInt(totalCost) - parseInt(order.cost));
    showSuccess("Item Removed from Cart");
  };
  const PlaceOrder = (order) => {
    //Order Items Route -> POST Method
    return fetch(`http://127.0.0.1:5000/orderitems`, {
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
    PlaceOrder({
      userId: id,
      items: myOrders,
      totalCost: totalCost,
      createdAt: new Date().toUTCString(),
    }).then((data) => {
      if (data?.error) {
        showError(data.error);
      } else {
        showSuccess("Order Successfully Added");
        setTimeout(function () {
          navigate("/myorders");
        }, 2500);
      }
    });
  };
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button className="resto__button" onClick={handleOpen}>
            Show Cart
          </button>
          <NavLink className="resto__button" to="/MyOrders">
            Your Orders
          </NavLink>
          <NavLink className="resto__button" onClick={() => signout()} to="/">
            Logout
          </NavLink>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {myOrders.length > 0
              ? myOrders.map((myOrder) => (
                  <div>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Restaurant's Name: {myOrder.restaurantName}
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Dish Name: {myOrder.name}
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                      <Typography id="modal-modal-description">
                        Dish Cost: &#8377;{myOrder.cost}
                      </Typography>

                      <Button
                        onClick={() => {
                          deleteOrder(myOrder);
                        }}
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button>
                    </Box>

                    <hr className="resto__line" />
                  </div>
                ))
              : "Please Add Order first"}

            {totalCost > 0 ? (
              <div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Total Cost: &#8377;{totalCost}
                </Typography>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="resto__button" onClick={clickSubmit}>
                    Place Order
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </Box>
        </Modal>
        {restaurants.length > 0
          ? restaurants.map((restaurant, index) => (
              <div key={index}>
                {restaurant.items.length > 0 ? (
                  <div className="resto__main">
                    <h1 className="resto__head">{restaurant.name}</h1>
                    <hr className="resto__line" />
                    <table className="resto__table">
                      <tr>
                        <th>Dish Name</th>
                        <th>Dish Cost</th>
                        <th>Add Dish</th>
                      </tr>
                      {restaurant.items.length > 0
                        ? restaurant.items.map((item, index) => (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>&#8377; {item.cost}</td>
                              <td>
                                <button
                                  onClick={() =>
                                    addOrder(item, restaurant.name, item.id)
                                  }
                                  className="resto__add"
                                >
                                  Add
                                </button>
                              </td>
                            </tr>
                          ))
                        : ""}
                    </table>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))
          : ""}
      </div>
      <ToastContainer />
    </>
  );
}

export default Menu;
