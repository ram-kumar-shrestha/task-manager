const dotenv = require("dotenv");
dotenv.config();
require("./db/db");

const express = require("express");
const cors = require("cors");
// Accessing the path module
const path = require("path");

const userRouter = require("./router/user");
const taskRouter = require("./router/task");

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(taskRouter);

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`-> Server is running at port ${process.env.PORT}`);
});
