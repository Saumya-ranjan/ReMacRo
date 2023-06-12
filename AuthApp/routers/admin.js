const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.get("/", (req, res) => {
  res.send("OK in the CHAt");
});

// router.get("/mail", adminController.sendEmail);

router.post("/auth", adminController.adminRegistration);

module.exports = router;
