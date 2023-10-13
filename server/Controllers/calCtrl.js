
import { Event } from "../model.js";
import { Sequelize } from "sequelize";

export default {
  getAllEvents: (req, res) => {
    console.log("getAllEvents");
    res.send("getAllEvents");
  },

  getBandEvents: async (req, res) => {
    try {
      console.log("getBandEvents");
      const { band } = req.body;
      console.log(band);
      const bandEvents = await Event.findAll({
        where: { bands: { [Sequelize.Op.contains]: [band] } },
      });
      res.send(bandEvents);
    } catch (error) {
      console.log(error);
    }
  },
};
