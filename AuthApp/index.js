var express = require("express");
var app = express();

// ... your other express middleware like body-parser

var Agenda = require("agenda");
var Agendash = require("agendash");

var agenda = new Agenda({ db: { address: "mongodb://127.0.0.1/agendaDb" } });
// or provide your own mongo client:
// var agenda = new Agenda({mongo: myMongoClient})

app.use("/dash", Agendash(agenda));

app.listen(3000, () => {
  console.log("Agendash is running on http://localhost:3000/agendash");
});

// ... your other routes

// ... start your server
