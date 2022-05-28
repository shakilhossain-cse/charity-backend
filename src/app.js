require("dotenv").config();
const express = require("express");
const connectDB = require("./config/DBconnection");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const app = express();

app.use(express.json());


app.use(notFoundMiddleware);

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
