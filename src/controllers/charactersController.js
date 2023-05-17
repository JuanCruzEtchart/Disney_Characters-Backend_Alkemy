const db = require("../database/models");
const { Op } = require("sequelize");
const Character = db.Character;

const charactersController = {
  characterList: async (req, res) => {
    const name = req.query.name;
    const age = req.query.age;
    /* const movieId = req.query.movieId; */
    try {
      if (!name && !age /*  && !movieId */) {
        const characters = await Character.findAll({
          attributes: { exclude: ["height", "age", "story"] },
        });
        const response = {
          meta: { status: 200, total: characters.length, url: "/characters" },
          data: characters,
        };
        res.json(response);
      } else if (name) {
        const character = await Character.findAll({
          where: { name: { [Op.like]: "%" + name + "%" } },
          attributes: { exclude: ["height", "age", "story"] },
        });
        if (character.length === 0) {
          const response = {
            meta: { status: 404, url: `/characters/name/${name}` },
            message: `No se encontró ningún personaje con el nombre ${name}`,
          };
          res.json(response);
        } else {
          const response = {
            meta: { status: 200, url: `/characters/name/${name}` },
            data: character,
          };
          res.json(response);
        }
      } else if (age) {
        const character = await Character.findAll({
          where: { age: { [Op.like]: "%" + age + "%" } },
          attributes: { exclude: ["height", "story"] },
        });
        if (character.length === 0) {
          const response = {
            meta: { status: 404, url: `/characters/age/${age}` },
            message: `No se encontró ningún personaje con la edad de ${age} años`,
          };
          res.json(response);
        } else {
          const response = {
            meta: { status: 200, url: `/characters/age/${age}` },
            data: character,
          };
          res.json(response);
        }
      } /* else if (movieId) {
        const character = await Character.findOne({
          where: { id: { [Op.like]: "%" + movieId + "%" } },
        });
        let response = {
          meta: { status: 200, url: `/characters/${movieId}` },
          data: character,
        };
        res.json(response);
      } */
    } catch (err) {
      res.send(err);
    }
  },
  /*   characterByAge: async (req, res) => {
    const age = req.params.age;
    try {
      if (!age) {
        const characters = await Character.findAll({
          attributes: { exclude: ["height", "age", "story"] },
        });
        let response = {
          meta: { status: 200, total: characters.length, url: "/characters" },
          data: characters,
        };
        res.json(response);
      } else if (age) {
        const character = await Character.findOne({
          where: { name: { [Op.like]: "%" + age + "%" } },
        });
        let response = {
          meta: { status: 200, url: `/characters/${age}` },
          data: character,
        };
        res.json(response);
      }
    } catch (err) {
      res.send(err);
    }
  }, */
  characterCreate: async (req, res) => {
    try {
      const character = await Character.create({
        name: req.body.name,
        age: req.body.age,
        height: req.body.height,
        story: req.body.story,
        photo: req.body.photo,
      });
      const response = {
        meta: { status: 200, url: "/characters/create" },
        data: character,
      };
      res.json(response);
    } catch (err) {
      res.send(err);
    }
  },
  characterEdit: async (req, res) => {
    const id = req.params.id;
    try {
      const character = await Character.findByPk(
        id /* , {
        include: ["productions"],
      } */
      );
      const response = {
        meta: {
          status: 200,
          total: character.length,
          url: `/character/edit/${id}`,
        },
        data: character,
      };
      res.json(response);
    } catch (err) {
      res.send(err);
    }
  },
  characterUpdate: async (req, res) => {
    const id = req.params.id;
    try {
      const rowsUpdated = await Character.update(
        {
          name: req.body.name,
          age: req.body.age,
          height: req.body.height,
          story: req.body.story,
          photo: req.body.photo,
        },
        { where: { id: id } }
      );
      const response = {
        meta: {
          status: 200,
          url: `/character/edit/${id}`,
        },
        data: {
          rowsUpdated: rowsUpdated,
          message: `Registro ${id} actualizado!`,
        },
      };
      res.json(response);
    } catch (err) {
      res.send(err);
    }
  },
  characterDestroy: async (req, res) => {
    const id = req.params.id;
    try {
      const characterDelete = await Character.destroy({ where: { id: id } });
      if (characterDelete === 0) {
        const response = {
          message: `No se encontró el registro ${id} para eliminar`,
        };
        res.json(response);
      } else {
        const response = {
          meta: {
            status: 200,
            url: `/character/delete/${id}`,
          },
          data: {
            characterDeleted: characterDelete,
            message: `Registro ${id} eliminado!`,
          },
        };
        res.json(response);
      }
    } catch (err) {
      res.send(err);
    }
  },
};

module.exports = charactersController;
