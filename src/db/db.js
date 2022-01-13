const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_SECRET_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("-> DB connected successfully !!");
  });
