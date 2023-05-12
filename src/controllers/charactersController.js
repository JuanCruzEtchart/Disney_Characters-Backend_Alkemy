const db = require("../database/models");
const { Op } = require("sequelize");
const Character = db.Character;

const charactersController = {
  characterList: async (req, res) => {
    const name = req.query.name;
    const age = req.query.age;
    /* const movieId = req.query.movieId; */

    console.log(name);
    try {
      if (!name && !age/*  && !movieId */) {
        const characters = await Character.findAll({
          attributes: { exclude: ["height", "age", "story"] },
        });
        let response = {
          meta: { status: 200, total: characters.length, url: "/characters" },
          data: characters,
        };
        res.json(response);
      } else if (name) {
        const character = await Character.findOne({
          where: { name: { [Op.like]: "%" + name + "%" } },
        });
        let response = {
          meta: { status: 200, url: `/characters/${name}` },
          data: character,
        };
        res.json(response);
      } else if (age) {
        const character = await Character.findOne({
          where: { age: { [Op.like]: "%" + age + "%" } },
        });
        let response = {
          meta: { status: 200, url: `/characters/${age}` },
          data: character,
        };
        res.json(response);
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
      let character = await Character.create({
        name: req.body.name,
        age: req.body.age,
        height: req.body.height,
        story: req.body.story,
        photo: req.body.photo,
      });
      let response = {
        meta: { status: 200, url: "/characters/create" },
        data: character,
      };
      res.json(response);
    } catch (err) {
      res.send(err);
    }
  },
  characterEdit: async (req, res) => {
    const name = req.params.name;
    try {
      let character = await Character.findByPk(name, {
        include: ["productions"],
      });
      let response = {
        meta: { status: 200, total: characters.length, url: "/character/" },
        data: character,
      };
    } catch (err) {
      res.send(err);
    }
  },
  characterUpdate: async (req, res) => {
    const name = req.params.name;
    try {
      /* let character = await Character.findByPk(name, { include: ["productions"] }); */
    } catch (err) {
      res.send(err);
    }
  },
};

module.exports = charactersController;
