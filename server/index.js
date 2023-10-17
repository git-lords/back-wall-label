// Import your packages
import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from "express-session";
import Stripe from "stripe";

import authCtrl from "./Controllers/authCtrl.js";
const { login, register, updateUser, logout, getUser } = authCtrl;

import merchCtrl from "./Controllers/merchCtrl.js";
const { getOneProduct, getAllProducts } = merchCtrl;

import bandCtrl from "./Controllers/bandCrtl.js";
const { getBand, getAllBands } = bandCtrl;

import userCtrl from "./Controllers/userCtrl.js";
const { getAllOrders, getOrders } = userCtrl;

import calCtrl from "./Controllers/calCtrl.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import heroCtrl from "./Controllers/heroCtrl.js";
const {getHeros} = heroCtrl

const __dirname = dirname(fileURLToPath(import.meta.url));
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

const stripe = new Stripe(
  "sk_test_51NuLfSHrrNngtjIfCxtI1TKBLBUWE2SgSrA4bMRDyfwGYwy4mgTPQML4Eraf683ZDB4BgA90tfZg2XicUr0MRj2q00UDXFhrHZ"
);

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
app.post("/api/login", login);
app.post("/register", register);
app.put("/updateUser", updateUser);
app.get("/logout", logout);
app.post("/getUser", getUser);

// band endpoints
app.get("/getBand", getBand);
app.get("/getAllBands", getAllBands);

// merch endpoints
app.get("/getProduct/:id", getOneProduct);
app.get("/getAllProducts", getAllProducts);

app.post("/checkout", async (req, res) => {
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.priceId,
      quantity: item.quantity,
    });
  });

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:${PORT}/success`,
    cancel_url: `http://localhost:${PORT}/cancel`,
  });

  res.send(JSON.stringify({ url: stripeSession.url }));
});

// user endpoints
app.get("/getAllOrders", getAllOrders);
app.post("/getOrders", getOrders);

// calendar endpoints
app.get("/getAllEvents", getAllEvents);
app.post("/getBandEvents", getBandEvents);

//hero endpoints
app.get("/getHeros", getHeros)

// S3 endpoints
// app.get("/getImage", getImage);
// app.get("/getList", getList);

app.get("/calendarhtml", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/calendar.html"));
});

// Open up door to server
ViteExpress.listen(app, `${PORT}`, () =>
  console.log(`Listening on port ${PORT}. Go to http://localhost:${PORT}`)
);
