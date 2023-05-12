const express = require("express");
const router = express.Router();
const charactersController = require("../controllers/charactersController");

router.get("/", charactersController.characterList);
router.post("/create", charactersController.characterCreate);
router.get("/edit/:name", charactersController.characterEdit);
router.put("/edit/:name", charactersController.characterUpdate);

module.exports = router;
