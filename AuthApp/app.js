const express = require("express");
const bodyParser = require("body-parser");
const adminRouter = require("./routers/admin");
const configs = require("./utils/configs");

function startApp() {
  const app = express();

  return Promise.resolve()
    .then(() => {
      // add non-express configs here
      return configs.connectDatabase();
    })
    .then(() => {
      // add Middlewares
      app.use(express.json());
      app.use(bodyParser.urlencoded({ extended: false }));
    })
    .then(() => {
      // add routers here
      app.get("/", (req, res) => {
        return res.status(200).send("Hello from server, server is running.");
      });

      app.use("/admin", adminRouter);
    })
    .then(() => {
      PORT = 9000;
      // add listener here
      app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
      });

      return app;
    });
}

module.exports = {
  startApp,
};
