const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authrouter = require("../routers/routes");
const comprouter = require("../routers/productroutes");
const cartrouter = require("../routers/cartroutes");
const orderrouter = require("../routers/orderroutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commece-website-emq5.vercel.app",
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
]
  .filter(Boolean)
  .join(",")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "API is running",
  });
});

app.use("/", authrouter);
app.use("/", comprouter);
app.use("/", cartrouter);
app.use("/", orderrouter);

app.use("/api", authrouter);
app.use("/api", comprouter);
app.use("/api", cartrouter);
app.use("/api", orderrouter);

module.exports = app;
