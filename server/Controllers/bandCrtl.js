import { Band } from "../model.js";

export default {
  getBand: async (req, res) => {
    try {
      console.log("getBand");
      const band = req.query.band;


      const bandInfo = await Band.findOne({ where: { bandName: band } });

      res.send(bandInfo);
    } catch (error) {
      console.log(error);
    }
  },
  getAllBands: async (req, res) => {
    try {
      console.log("getAllBands");
      const allBands = await Band.findAll();

      res.send(allBands);
    } catch (err) {
      console.log(err);
    }
  },
};
