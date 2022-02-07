import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { isAuthenticate, signout } from "../auth/token";

function MyOrders() {
  const { id } = isAuthenticate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    return fetch(`http://127.0.0.1:5000/getorders?userId=${id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setOrders([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NavLink className="resto__button" onClick={() => signout()} to="/">
          Logout
        </NavLink>
      </div>
      <div className="myOrders__main">
        <table className="myOrders__table">
          {orders.length > 0 ? (
            <tr>
              <th>Date</th>
              <th>Items</th>
              <th>Total cost</th>
            </tr>
          ) : (
            ""
          )}

          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={index}>
                <td>{order.createdAt.substring(0, 16)}</td>
                <td>
                  <table className="myOrders__itemRow">
                    <tr>
                      {order.items.length > 0
                        ? order.items.map((item, index) => (
                            <tr key={index}>
                              <td style={{ paddingRight: "3em" }}>
                                {item.name}
                              </td>
                              <td style={{ paddingLeft: "3em" }}>
                                &#8377;{item.cost}
                              </td>
                            </tr>
                          ))
                        : ""}
                    </tr>
                  </table>
                </td>
                <td>&#8377;{order.totalCost}</td>
              </tr>
            ))
          ) : (
            <div style={{ textAlign: "center" }}>No Orders Found</div>
          )}
        </table>
      </div>
    </>
  );
}

export default MyOrders;
