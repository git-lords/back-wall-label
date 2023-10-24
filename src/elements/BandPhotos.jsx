import React from "react";
import { Masonry } from "react-plock";
import axios from "axios";
import { useEffect, useState } from "react";

const BandPhotos = ({ band }) => {
  const [allPhotoUrls, setAllPhotoUrls] = useState([]);
  useEffect(() => {
    axios.get("/getBandPhotos").then((res) => {
      setAllPhotoUrls(res.data);
    });
  }, []);

  let currentBand = "";
  band === "Moon Owls Mages" ? (currentBand = "MOM") : null;
  band === "Crush the Monster" ? (currentBand = "CTM") : null;
  band === "I Win I Lose" ? (currentBand = "IWIL") : null;
  const currentBandUrls = allPhotoUrls
    .filter((url) => {
      return url.url.includes(currentBand);
    })
    .map((object) => object.url);

  return (
    <div className="w-3/4">
      <Masonry
        items={currentBandUrls}
        config={{
          columns: [1, 2, 3],
          gap: [24, 12, 6],
          media: [640, 768, 1024],
        }}
        render={(item, idx) => (
          <img key={idx} src={item} className="w-full h-auto" />
        )}
      />
    </div>
  );
};

export default BandPhotos;
