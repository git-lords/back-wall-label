import React from "react";
import { Link } from "react-router-dom";

const BandCard = ({ bands }) => {
  const allBands = bands.map((band) => {
    return (
      <Link to={`/bands/${band.bandName}`} key={band.bandName}>
        <div style={{ border: "2px solid black", padding: "10px" }}>
          <p>{band.bandName}</p>
        </div>
      </Link>
    );
  });

  return <div>{allBands}</div>;
};

export default BandCard;
