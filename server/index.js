// Import your packages
import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from "express-session";
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
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Set up app instance
const app = express();
const PORT = 4545;

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

app.get("/calendarhtml", (req, res)=>{
  res.sendFile(path.join(__dirname, '../src/calendar.html'))
})

// Open up door to server
ViteExpress.listen(app, `${PORT}`, () =>
  console.log(`Listening on port ${PORT}. Go to http://localhost:${PORT}`)
);
