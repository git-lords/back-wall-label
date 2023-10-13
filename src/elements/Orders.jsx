import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Orders = ({ user }) => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    axios.post("/getOrders", { user }).then((res) => setOrderData(res.data));
  }, []);

  const orders = orderData.map((order) => {
    return (
      <div key={order.orderId}>
        <p>{order.orderId}</p>
      </div>
    );
  });
  return <div>{orders}</div>;
};

export default Orders;
