import React from "react";
import { Link } from "react-router-dom";

const BandCard = ({ bands }) => {
  let imgSrc = "";
  const allBands = bands.map((band) => {
    if (band.bandName === "Moon Owls Mages") {
      imgSrc =
        "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+stretching+flipside+2023.jpg";
    } else if (band.bandName === "Crush the Monster") {
      imgSrc =
        "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+fisheye.jpg";
    } else
      imgSrc =
        "https://bw-records-bucket.s3.us-west-1.amazonaws.com/IWIL+hiking.jpg";

    return (
      <div key={band.bandName} className="bg-inherit text-inherit">
        <div className="flex flex-col items-center justify-evenly py-6">
          <Link
            to={`/bands/${band.bandName}`}
            key={band.bandName}
            className="p-6"
          >
            <img src={imgSrc} className="" />
          </Link>
          <h1 className="text-8xl font-bold uppercase">{band.bandName}</h1>
        </div>
      </div>
    );
  });

  return (
    <div className="border-black flex flex-col w-full justify-evenly">
      {allBands}
    </div>
  );
};

export default BandCard;
