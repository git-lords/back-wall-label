import React from "react";
import { Masonry } from "react-plock";

const allPhotoUrls = [
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+wizards.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+The-Hog-15-small.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+Sunflowers.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+stretching+flipside+2023.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+Projector-Mode-10-small.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+leaning+in+flipside+2023.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+Inside-32.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+Inside-11-small.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+in+Everett.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+flipside+smaller.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+sunset2.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+sunset.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+shot.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+playin.jpeg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+gang.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+from+above.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+flipside.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+close.jpg",
  "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+band+img.jpeg",
];

const BandPhotos = ({ band }) => {
  let currentBand = "";
  band === "Moon Owls Mages" ? (currentBand = "MOM") : null;
  band === "Crush the Monster" ? (currentBand = "CTM") : null;
  const currentBandUrls = allPhotoUrls.filter((url) => {
    return url.includes(currentBand);
  });

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
          <img
            key={idx}
            src={item}
            className="w-full h-auto border border-dashed"
          />
        )}
      />
    </div>
  );
};

export default BandPhotos;
