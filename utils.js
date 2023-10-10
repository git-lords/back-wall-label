import axios from "axios";

export default {
  getImage: async (image) => {
    const image = await axios.get("/getObjectFromS3", image);
    return image;
  },
};
