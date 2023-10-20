import React from "react";
import { Link } from "react-router-dom";

const BandCard = ({ bands }) => {
  let imgSrc = "";
  const allBands = bands.map((band) => {
    if (band.bandName === "Moon Owls Mages") {
      imgSrc =
        "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+goggles.jpg";
    } else if (band.bandName === "Crush the Monster") {
      imgSrc =
        "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+fisheye.jpg";
    } else
      imgSrc =
        "https://bw-records-bucket.s3.us-west-1.amazonaws.com/IWIL+hiking.jpg";

    return (
      <div
        key={band.bandName}
        className="block h-screen bg-inherit text-inherit"
      >
        <div className="flex items-center justify-evenly">
          <Link
            to={`/bands/${band.bandName}`}
            key={band.bandName}
            className="my-6 w-1/2"
          >
            <img src={imgSrc} className="h-full w-full" />
          </Link>
          <h1 className="text-4xl">{band.bandName}</h1>
        </div>
      </div>
    );
  });

  return <div className="border-black flex flex-col w-full">{allBands}</div>;
};

export default BandCard;
