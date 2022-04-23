var express = require("express");
var router = express.Router();
const auth_controller = require("../controllers/auth_controller");

/* GET home page. */
router.post("/login", auth_controller.login);
router.post("/signup", auth_controller.signup);

module.exports = router;
