const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const jwt = require("../middlewares/jwt");

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */
router.get("/login", jwt.verifyToken, usersController.prueba);

module.exports = router;
