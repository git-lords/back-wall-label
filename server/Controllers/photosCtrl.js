import { Photo } from "../model.js";

export default {
  getBandPhotos: async (req, res) => {
    const photos = await Photo.findAll();
    res.send(photos);
  },
  addBandPhoto: async (req, res) => {
    try {
      console.log("addBandPhoto");
      const { url } = req.body;
      await Photo.create({ url });
      res.status(200).send("New Hero Added");
    } catch (error) {
      console.log(error);
    }
  },
  deleteBandPhoto: async (req, res) => {
    try {
      console.log("deleteBandPhoto");
      const { url } = req.params;
      let photos = {};
      await Photo.destroy({ where: { url } }).then(async () => {
        photos = await Photo.findAll();
      });
      res.send(photos);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
};
