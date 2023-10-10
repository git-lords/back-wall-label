// Import your packages
import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from "express-session";
import Stripe from "stripe";

import authCtrl from "./Controllers/authCtrl.js";
const { login, register, updateUser, logout } = authCtrl;
import merchCtrl from "./Controllers/merchCtrl.js";
const { getProduct, getAllProducts } = merchCtrl;
import bandCtrl from "./Controllers/bandCrtl.js";
const { getBand, getAllBands } = bandCtrl;
import userCtrl from "./Controllers/userCtrl.js";
const { getAllOrders } = userCtrl;
import calCtrl from "./Controllers/calCtrl.js";
const { getAllEvents } = calCtrl;

// Set up app instance
const app = express();
const PORT = 4545;

const stripe = new Stripe('sk_test_51NuLfSHrrNngtjIfCxtI1TKBLBUWE2SgSrA4bMRDyfwGYwy4mgTPQML4Eraf683ZDB4BgA90tfZg2XicUr0MRj2q00UDXFhrHZ')

const stripeSession = await stripe.checkout.sessions.create({
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 2000,
        tax_behavior: 'exclusive'
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 20,
      },
      quantity: 1,
    },
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Hoodie',
        },
        unit_amount: 4000,
        tax_behavior: 'exclusive'
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 20,
      },
      quantity: 1,
    },
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Band Tote',
        },
        unit_amount: 2000,
        tax_behavior: 'exclusive'
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 20,
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: `http://localhost${PORT}/success`,
  cancel_url: `http://localhost${PORT}/cancel`
})

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
app.get("/getProduct", getProduct);
app.get("/getAllProducts", getAllProducts);


// user endpoints
app.get("/getAllOrders", getAllOrders);

// calendar endpoints
app.get("/getAllEvents", getAllEvents);

// Open up door to server
ViteExpress.listen(app, `${PORT}`, () => console.log(`Listening on port ${PORT}. Go to http://localhost:${PORT}`))
