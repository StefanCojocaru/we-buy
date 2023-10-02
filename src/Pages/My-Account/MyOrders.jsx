import React from "react";

import Box from "@mui/joy/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { useState, useEffect } from "react";
import { ref, set, onValue, remove, push } from "firebase/database";
import db, { auth } from "../../database/firebase";

import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Grow from "@mui/material/Grow";
import Products from "../Product-Page/Products";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MyOrders = () => {
  const user = auth.currentUser;
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      const dbOrders = ref(db, `users/${user.uid}/myOrders`);
      onValue(dbOrders, (snapshot) => {
        const orders = [];
        snapshot.forEach((childSnapshot) => {
          const orderId = childSnapshot.key;
          const ordersItem = childSnapshot.val();
          orders.push({ ...ordersItem, orderId });
        });
        setOrders(orders);
        console.log(orders);
      });
    }
  }, [user]);

  const [selectedYear, setSelectedYear] = useState("2023");
  const [monthlyTotalSales, setMonthlyTotalSales] = useState({});
  const [allMonths, setAllMonths] = useState([]);

  // Function to filter orders by the selected year
  const filterOrdersByYear = (selectedYear) => {
    return orders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      return orderDate.getFullYear() === selectedYear;
    });
  };

  useEffect(() => {
    if (selectedYear) {
      const filteredOrders = filterOrdersByYear(parseInt(selectedYear));

      // Reset the monthlyTotalSales object
      const newMonthlyTotalSales = {};

      // Initialize the months
      const newAllMonths = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(i);
        return date.toLocaleString("default", { month: "long" });
      });

      // Calculate monthly total sales for the selected year
      filteredOrders.forEach((order) => {
        const orderDate = new Date(order.orderDate);
        const month = orderDate.toLocaleString("default", { month: "long" });

        if (!newMonthlyTotalSales[month]) {
          newMonthlyTotalSales[month] = 0;
        }

        newMonthlyTotalSales[month] += parseFloat(order.totalPrice);
      });

      setMonthlyTotalSales(newMonthlyTotalSales);
      setAllMonths(newAllMonths);
    }
  }, [selectedYear, orders]);

  const years = ["2022", "2023", "2024"];

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const calculateTotalPriceByYear = (selectedYear) => {
    console.log("Selected Year:", selectedYear);

    const totalPrice = orders
      .filter((order) => {
        const orderDate = new Date(order.orderDate);
        console.log("Order Date:", orderDate);
        return orderDate.getFullYear() === parseInt(selectedYear);
      })
      .reduce((total, order) => total + parseFloat(order.totalPrice), 0)
      .toFixed(2);

    return totalPrice;
  };
  const totalPriceForSelectedYear = calculateTotalPriceByYear(selectedYear);

  console.log(totalPriceForSelectedYear);

  const options = {
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255,255,255,0.6)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255,255,255,0.6)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "white",
        },
      },
    },
  };

  const data = {
    labels: allMonths,
    datasets: [
      {
        label: "Spent",
        data: allMonths.map((month) => monthlyTotalSales[month] || 0),
        borderWidth: 1,
        backgroundColor: "rgba(219, 226, 239,1)",
      },
    ],
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgba(219, 226, 239,1)",
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h3 style={{ display: "flex", justifyContent: "center" }}>My Orders</h3>

      <div style={{ display: "flex", gap: "10px" }}>
        <ol
          className="custom-scrollbar"
          style={{ height: "400px", overflowX: "auto", width: "300px" }}
        >
          {orders.map((order) => (
            <li
              key={order.orderId}
              style={{ marginTop: "10px", cursor: "pointer" }}
              onClick={() => setSelectedOrder(order)}
            >
              <div style={{ fontWeight: "bold" }}>{order.orderId}</div>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(0,0,0,1)",
                }}
              >
                {order.totalPrice}$
              </div>
              <div
                style={{
                  fontStyle: "italic",
                  fontSize: "14px",
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                {order.orderDate}
              </div>
            </li>
          ))}
        </ol>
        <div
          style={{
            backgroundColor: "#3F72AF",
            // backgroundColor: "lightblue",
            marginBottom: "10px",
            marginRight: "10px",
            borderRadius: "10px",
            color: "#fff",
            padding: "10px",
            width: "670px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            Detailed View
          </div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginTop: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Total spent: {totalPriceForSelectedYear}$</div>
            <div>
              <label>Select Year: </label>
              <select value={selectedYear} onChange={handleYearChange}>
                <option value="">Select a year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Bar data={data} options={options}></Bar>
          </div>
        </div>
      </div>
      {selectedOrder && (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              width: "1200px",
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: "calc(-1/4 * var(--IconButton-size))",
                right: "calc(-1/4 * var(--IconButton-size))",
                boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                borderRadius: "50%",
                bgcolor: "background.body",
              }}
              onClick={() => setSelectedOrder(null)}
            />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Order ID: {selectedOrder.orderId}
            </Typography>
            <Typography
              component="h2"
              id="modal-title"
              level="h6"
              textColor="grey"
              fontWeight="lg"
            >
              Total Price: {selectedOrder.totalPrice}$
            </Typography>
            <Typography
              component="h2"
              id="modal-title"
              textColor="grey"
              fontWeight="lg"
            >
              Placed on: {selectedOrder.orderDate}
            </Typography>
            <Box
              className="custom-scrollbar"
              sx={{
                display: "flex",
                overflowX: "auto",
                overflowY: "hidden",
                gap: "8px",
                paddingBottom: 2,
              }}
            >
              {Object.values(selectedOrder.orderItems).map((item) => (
                <Products key={item.id} item={item} />
              ))}
            </Box>
            <a
              href={`https://www.fancourier.ro/awb-tracking?awb=${selectedOrder.orderId}`}
              target="blank"
              rel="noopener noreferrer"
            >
              Track your order.
            </a>
          </Sheet>
        </Modal>
      )}
    </Box>
  );
};

export default MyOrders;
