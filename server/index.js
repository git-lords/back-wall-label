// Import your packages
import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from 'express-session'

// Set up app instance 
const app = express();
const PORT = 4545;

// Set up middleware 
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.use(session({
    secret: 'helloworld',
    saveUninitialized: false,
    resave: false
}))

// Set up routes/endpoints here 


// Open up door to server
ViteExpress.listen(app, `${PORT}`, () => console.log(`Listening on port ${PORT}. Go to http://localhost:${PORT}`))

