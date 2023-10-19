// Import your packages
import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from "express-session";
import Stripe from "stripe";
import { configDotenv } from "dotenv";
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import authCtrl from "./Controllers/authCtrl.js";
const { login, register, updateUser, logout, getUser } = authCtrl;

import bandCtrl from "./Controllers/bandCrtl.js";
const { getBand, getAllBands } = bandCtrl;

import calCtrl from "./Controllers/calCtrl.js";

import heroCtrl from "./Controllers/heroCtrl.js";
const { getHeros, addHero, editHero, deleteHero } = heroCtrl;

import newsCtrl from "./Controllers/newsCtrl.js";
const { getAllArticles, addArticle, updateArticle, removeArticle } = newsCtrl;

// import S3ctrl from "./Controllers/S3Ctrl.js";
// const { getImage, getList } = S3ctrl;
import adminCtrl from "./Controllers/adminCtrl.js";
const { getAllUsers } = adminCtrl;

const __dirname = dirname(fileURLToPath(import.meta.url));
const { getAllEvents, getBandEvents } = calCtrl;

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
  "sk_test_51IRnJgK0mJ6IuZSRS1BZnXo3qpugm5CjPSZ6TULycYHtkBElg38SOGsPNrLf9Lg7o3S2ucxtANTVl0JGcftJxPM300GAjhhSIq"
);

// Set up middleware
// app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: "helloworld",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 48,
    },
  })
);

// auth endpoints
app.post("/login", login);
app.post("/register", register);
app.put("/updateUser", updateUser);
app.delete("/logout", logout);
app.get("/getUser", getUser);

// band endpoints
app.get("/getBand", getBand);
app.get("/getAllBands", getAllBands);

// Admin endpoints
app.get("/getAllUsers", getAllUsers);

app.post("/checkout", async (req, res) => {
  try {
    console.log("checkout");
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
  } catch (error) {
    console.log(error);
  }
});

// calendar endpoints
app.get("/getAllEvents", getAllEvents);
app.post("/getBandEvents", getBandEvents);

//hero endpoints
app.get("/getHeros", getHeros);
app.post("/addHero", addHero);
app.put("/editHero/:heroId", editHero);
app.delete("/deleteHero/:heroId", deleteHero);

// news endpoints
app.get("/getArticles", getAllArticles);
app.post("/newArticle", addArticle);
app.put("/editArticle/:id", updateArticle);
app.delete("/article/:id", removeArticle);

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
