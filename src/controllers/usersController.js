/* const db = require("../database/models"); */
/* const Character = db.Character; */

const charactersController = {
  characterList: async (req, res) => {
    console.log("hola");
    res.send("hola")
  },
};

module.exports = charactersController;
