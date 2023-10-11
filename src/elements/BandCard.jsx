import React from "react";
import { Link } from "react-router-dom";

const BandCard = ({ bands }) => {
  let imgSrc = "";
  const allBands = bands.map((band) => {
    if (band.bandName === "Moon Owls Mages") {
      imgSrc =
        "https://bw-records-bucket.s3.us-west-1.amazonaws.com/Mage-Goggles-500x500.jpg";
    } else
      imgSrc =
        "https://bw-records-bucket.s3.us-west-1.amazonaws.com/crush+the+monster+band+img.jpeg";
    return (
      <Link to={`/bands/${band.bandName}`} key={band.bandName}>
        <div className="border flex items-center justify-evenly">
          <div
            className="h-96 w-1/3 bg-cover bg-center"
            style={{ backgroundImage: `url('${imgSrc}')` }}
          ></div>
          <p>{band.bandName}</p>
        </div>
      </Link>
    );
  });

  return <div className="border border-black flex flex-col">{allBands}</div>;
};

export default BandCard;
