import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Masonry } from "react-plock";

const PhotoForm = () => {
  const [url, setUrl] = useState("");
  const [deletingUrl, setDeletingUrl] = useState("");
  const [added, setAdded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [photoData, setPhotoData] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const getData = () => {
    axios.get("/getBandPhotos").then((res) => {
      setPhotoData(res.data.map((photo) => photo.url));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/addBandPhoto", { url }).then((res) => {
      console.log(res);
      res.status = 200 ? (setUrl(""), setAdded(true), getData()) : null;
      setTimeout(() => {
        setAdded(false);
      }, 10000);
      res.status = 400 && (setIsError(true), setErrorMsg(res.data.response));
    });
  };

  const handleDelete = async () => {
    console.log(deletingUrl);
    axios
      .delete(`/deleteBandPhoto/${encodeURIComponent(deletingUrl)}`)
      .then((res) => {
        setPhotoData(res.data.map((image) => image.url));
        setIsDeleting(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-zinc-700 border p-2 overflow-auto">
      <details title="Add a Band Photo">
        <summary>Add a Band Photo</summary>
        <h1>Step 1: Upload image to S3 bucket</h1>
        <p className="italic">Make sure MOM, CTM, or IWIL is in file name</p>
        <h1>Step 2: Copy S3 URL from bucket</h1>
        <form action="" onSubmit={onSubmit} className="flex flex-col">
          <label htmlFor="url">Step 3: Paste URL here:</label>
          <input
            type="text"
            name="url"
            value={url}
            className="bg-inherit text-inherit border"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="p-4 border">Add Photo</button>
        </form>
        {added && (
          <div>
            <h1>Added Image Successfully</h1>
          </div>
        )}
        {isError && (
          <div>
            <h1>{errorMsg}</h1>
          </div>
        )}
        <div className="flex flex-col h-full items-center m-6">
          <h1 className="p-2">Behold all ur images:</h1>
          <h1 className="p-2">Click an image to delete it!</h1>
          {isDeleting && (
            <div className="bg-zinc-600 p-4 flex flex-col items-center absolute w-1/4">
              <h1>Are you sure?</h1>
              <button
                className="border p-2 bg-red-500 m-2"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
              <button
                className="border p-2 m-2"
                onClick={() => setIsDeleting(false)}
              >
                Cancel
              </button>
            </div>
          )}
          <div className="">
            <Masonry
              items={photoData}
              config={{
                columns: [1, 2, 3],
                gap: [24, 12, 6],
                media: [640, 768, 1024],
              }}
              render={(item, idx) => (
                <img
                  key={idx}
                  src={item}
                  className="w-full h-20 cursor-pointer"
                  onClick={() => {
                    setIsDeleting(true);
                    setDeletingUrl(item);
                  }}
                />
              )}
            />
          </div>
        </div>
      </details>
    </div>
  );
};

export default PhotoForm;
