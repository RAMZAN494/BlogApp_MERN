const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/BlogApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
  })
  .then(() => {
    console.log("DataBase Connected SuccessFully");
  })
  .catch((e) => {
    console.log(`Something Went Wrong With DataBase ${e.message}`);
  });
