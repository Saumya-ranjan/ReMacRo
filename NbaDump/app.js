const express = require("express");
const configs = require("./utils/configs");
const bodyParser = require("body-parser");
const {
  readPlayer,
  deletePlayer,
  playerUpdateId,
  addPlayerSchedule,
} = require("./controllers/PlayersCrud");
const PORT = 3006;

function startApp() {
  const app = express();

  return Promise.resolve()
    .then(() => {
      return configs.connectDatabase();
    })
    .then(() => {
      // Middlewares
      app.use(express.json());
      app.use(bodyParser.urlencoded({ extended: false }));
    })
    .then(() => {
      // add routers here
      const playerScheduler = require("./controllers/DataFetcher");

      app.get("/players", readPlayer);

      app.get("/sync/players", async (req, res) => {
        try {
          await playerScheduler();
          res.status(200).json({ message: "Players synced successfully" });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });

      app.get("/", (req, res) => {
        return res.status(200).send("Hello from server, server is running.");
      });
      playerScheduler();
    })
    .then(() => {
      // add listener here
      app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
      });

      return app;
    });
}

module.exports = {
  startApp: startApp,
};
