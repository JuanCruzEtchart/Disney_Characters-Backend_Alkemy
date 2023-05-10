const express = require("express");
const router = express.Router();
const charactersController = require("../controllers/charactersController");
/* 
router.get("/", charactersController.characterList); */
router.get("/name=nombre?", charactersController.characterList);//Revisar ruta para que cumpla con la consigna
router.post("/create", charactersController.characterCreate);
router.get("/edit/:name", charactersController.characterEdit);
router.put("/edit/:name", charactersController.characterUpdate);

module.exports = router;
