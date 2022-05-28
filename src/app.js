require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/DBconnection");
const errorHandelerMiddleware = require("./middleware/errorHandeler");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const app = express();

const authRoute = require("./routes/auth.routes");

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoute);

app.use(notFoundMiddleware);
app.use(errorHandelerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server started on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
