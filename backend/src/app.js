const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authrouter = require("../routers/routes");
const comprouter = require("../routers/productroutes");
const cartrouter = require("../routers/cartroutes");
const orderrouter = require("../routers/orderroutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/", authrouter);
app.use("/", comprouter);
app.use("/", cartrouter);
app.use("/", orderrouter);

module.exports = app;
