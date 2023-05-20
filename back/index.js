const express = require("express");
const bodyParser = require("body-parser");
const connect = require("./config/db");
const userRouter = require("./routes/userRoute");
const driverRouter = require("./routes/driverRoute");
var cors = require("cors");
require("dotenv").config();
const app = express();

//connect to mongodb
connect();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", userRouter);
app.use("/api", driverRouter);

app.use("/uploads/", express.static("uploads"));

const port = 3007;
app.listen(port, () => console.log(`Server is running on port ${port}`));
