require("dotenv").config();
const mongoose = require("mongoose");
const mongodb = "mongodb://localhost:27017";
module.exports = {
  connectDatabase: () => {
    return mongoose
      .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("database connection established");
      });
  },
};
