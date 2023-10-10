import { Band } from "../model.js";

export default {
  getBand: async (req, res) => {
    try {
      console.log("getBand");
      const band = req.query.band;
      console.log(band);

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
      console.log(allBands);
      res.send(allBands);
    } catch (err) {
      console.log(err);
    }
  },
};
