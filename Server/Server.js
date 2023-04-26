const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
var logger = require('morgan');
const userRoutes = require("./Routes/Routes");
const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use("/api", userRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/BlogsApp");
mongoose.connection
  .once("open", () => {
    console.log("Connected to mongoDB");
  })
  .on("error", (err) => {
    console.log(err);
  });

const port = 4000 | process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});