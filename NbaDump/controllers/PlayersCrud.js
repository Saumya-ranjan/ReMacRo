const PlayerSchedule = require("../models/playerSchema");

// Create a new player schedule
const addPlayerSchedule = async (req, res) => {
  try {
    const playerSchedule = await PlayerSchedule.create(req.body);
    res.status(201).json(playerSchedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all player schedules
const readPlayer = async (req, res) => {
  try {
    const playerSchedules = await PlayerSchedule.find();
    res.json(playerSchedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a player schedule
const playerUpdateId = async (req, res) => {
  try {
    const playerSchedule = await PlayerSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!playerSchedule) {
      return res.status(404).json({ message: "Player schedule not found" });
    }

    res.json({ message: "Player schedule updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a player schedule
const deletePlayer = async (req, res) => {
  try {
    const playerSchedule = await PlayerSchedule.findByIdAndDelete(
      req.params.id
    );

    if (!playerSchedule) {
      return res.status(404).json({ message: "Player schedule not found" });
    }

    res.json({ message: "Player schedule deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  readPlayer,
  deletePlayer,
  playerUpdateId,
  addPlayerSchedule,
};
