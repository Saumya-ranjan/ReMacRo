const fetch = require("node-fetch");
require("../utils/configs");
const Players = require("../models/playerSchema");

async function getPlayerData() {
  const response = await fetch(``);
  const teams = await response.json();
  return teams;
}

async function savePlayerData(player) {
  const playerPromises = player.data.pls.pl.map(async (playerInfo) => {
    const _id = playerInfo.pid;
    const teamId = playerInfo.tid;
    const firstName = playerInfo.fn;
    const lastName = playerInfo.ln;
    const position = playerInfo.pos;
    const dateOfBirth = playerInfo.dob;
    const teamName = playerInfo.tn;
    const teamCountry = playerInfo.tc;

    const data = {
      _id: _id,
      teamId: teamId,
      firstName: firstName,
      lastName: lastName,
      position: position,
      dateOfBirth: dateOfBirth,
      teamName: teamName,
      teamCountry: teamCountry,
    };

    try {
      // throw "test"
      const filter = { _id: _id };
      const update = { $set: data };
      const options = { upsert: true };
      await Players.updateOne(filter, update, options);
    } catch (err) {
      console.log("Error occurred:", err);
      throw err;
    }
  });

  return Promise.all(playerPromises);
}

// calling the Function
async function playerScheduler() {
  try {
    const players = await getPlayerData();
    const saveResult = await savePlayerData(players);
    console.log("success");
  } catch (err) {
    console.log("failed");
    console.log("Error occurred:", err);
  }
}

playerScheduler();

module.exports = playerScheduler;
