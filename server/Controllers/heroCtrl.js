import { Hero } from "../model.js";

export default {
  getHeros: async (req, res) => {
    try {
      console.log("getHeros");
      const allHeros = await Hero.findAll();
      res.send(allHeros);
    } catch (err) {
      console.log(err);
    }
  },
  addHero: async (req, res) => {
    try {
      console.log("hit addHero");
      const { imgUrl, cta, button, link } = req.body;
      await Hero.create({ imgUrl, cta, button, link });
      res.status(200).send("New Hero Added");
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  editHero: async (req, res) => {
    try {
      console.log("hit editHero");
      const { imgUrl, cta, button, link } = req.body;
      const { heroId } = req.params;
      await Hero.update(
        { imgUrl, cta, button, link },
        { where: { heroId: heroId } }
      );
      const updatedHero = await Hero.findOne({ where: { heroId } });
      res.status(200).send(updatedHero);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  deleteHero: async (req, res) => {
    console.log("hit deleteHero");
    try {
      const { heroId } = req.params;
      await Hero.destroy({ where: { heroId: heroId } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
