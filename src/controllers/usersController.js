const db = require("../database/models");
const User = db.User
/* const Character = db.Character; */

const usersController = {
  prueba: (req, res) => {
    console.log("la ruta funciona");
    res.send("la ruta funciona");
  },
};

module.exports = usersController;
