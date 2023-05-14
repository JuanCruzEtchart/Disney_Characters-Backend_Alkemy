const express = require("express");
const router = express.Router();
const charactersController = require("../controllers/charactersController");

router.get("/", charactersController.characterList);
router.post("/create", charactersController.characterCreate);
router.get("/edit/:id", charactersController.characterEdit);
router.put("/edit/:id", charactersController.characterUpdate);
router.delete("/delete/:id", charactersController.characterDestroy);

module.exports = router;
