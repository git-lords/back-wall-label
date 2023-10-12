// Import your packages
import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from "express-session";
import Stripe from "stripe";

import authCtrl from "./Controllers/authCtrl.js";
const { login, register, updateUser, logout } = authCtrl;

import merchCtrl from "./Controllers/merchCtrl.js";
const { getOneProduct, getAllProducts } = merchCtrl;

import bandCtrl from "./Controllers/bandCrtl.js";
const { getBand, getAllBands } = bandCtrl;

import userCtrl from "./Controllers/userCtrl.js";
const { getAllOrders } = userCtrl;

import calCtrl from "./Controllers/calCtrl.js";
const { getAllEvents, getBandEvents } = calCtrl;
import { configDotenv } from "dotenv";
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
// import S3ctrl from "./Controllers/S3Ctrl.js";
// const { getImage, getList } = S3ctrl;

// configures dotenv
configDotenv();

// configure AWS S3 Client
export const client = new S3Client({
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

// Set up app instance
const app = express();
const PORT = 4545;

const stripe = new Stripe('sk_test_51NuLfSHrrNngtjIfCxtI1TKBLBUWE2SgSrA4bMRDyfwGYwy4mgTPQML4Eraf683ZDB4BgA90tfZg2XicUr0MRj2q00UDXFhrHZ')

// Set up middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: "helloworld",
    saveUninitialized: false,
    resave: false,
  })
);

// auth endpoints
app.get("/login", login);
app.post("/register", register);
app.put("/updateUser", updateUser);
app.get("/logout", logout);

// band endpoints
app.get("/getBand", getBand);
app.get("/getAllBands", getAllBands);

// merch endpoints
app.get("/getProduct/:id", getOneProduct);
app.get("/getAllProducts", getAllProducts);

app.post("/checkout", async (req, res) => {
  console.log(req.body)
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.priceId,
      quantity: item.quantity
    })
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `http://localhost:${PORT}/success`,
    cancel_url: `http://localhost:${PORT}/cancel`
  });

  res.send(JSON.stringify({ url: stripeSession.url }))
})


// user endpoints
app.get("/getAllOrders", getAllOrders);

// calendar endpoints
app.get("/getAllEvents", getAllEvents);
app.post("/getBandEvents", getBandEvents);

// S3 endpoints
// app.get("/getImage", getImage);
// app.get("/getList", getList);

// Open up door to server
ViteExpress.listen(app, `${PORT}`, () =>
  console.log(`Listening on port ${PORT}. Go to http://localhost:${PORT}`)
);
