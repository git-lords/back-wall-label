import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Orders = ({ user }) => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    axios.post("/getOrders", { user }).then((res) => {
      console.log(res.data);
      setOrderData(res.data);
    });
  }, []);

  const orders = orderData.map((order) => {
    return (
      <tr key={order.orderId}>
        <td>
          <img
            src={order.product.imgUrls[0]}
            alt={order.product.description}
            className="h-20"
          />
        </td>
        <td>{order.product.productName}</td>
        <td>Processing</td>
      </tr>
    );
  });
  return (
    <div className="border">
      <h1>Your Orders</h1>
      <table>
        <thead>
          <tr>
            <td>img</td>
            <td>name</td>
            <td>status</td>
          </tr>
        </thead>
        {orders ? <tbody>{orders}</tbody> : <p>You have no orders</p>}
      </table>
    </div>
  );
};

export default Orders;
