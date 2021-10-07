// dependensies:
// 1. proxy-server (npm i react-amazing-proxy) = local launch BE and FE (npm start)
// 2. express (npm install express) = middleware to create a robust API
// 3. axios (npm i axios) = promise based HTTP client for the browser and node.js
// 4. cors (npm i cors) = providing a Connect/Express middleware that can be used to enable CORS with various options.
// 5. body-parser (npm i body-parser) = body parsing middleware


const port = 3001;
const cors = require("cors");

//  Server setup
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Import routes
const conversationRotes = require("./routes/conversationRoutes");

// Middlewares that parses JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middlewares for CORS
app.use(cors());
app.options("*", cors());

// Middleware for routes
app.use("/api/v1/conversation", conversationRotes);

// Server
app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Listening to port: ${port}`);
});
