import React from "react";
import axios from "axios";
import { useState } from "react";

const PhotoForm = () => {
  const [url, setUrl] = useState("");
  const [added, setAdded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/addBandPhoto", { url }).then((res) => {
      console.log(res);
      res.status = 200 ? (setUrl(""), setAdded(true)) : null;
      setTimeout(() => {
        setAdded(false);
      }, 10000);
      res.status = 400 && (setIsError(true), setErrorMsg(res.data.response));
    });
  };

  return (
    <div className="bg-zinc-700 border p-2">
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
      </details>
    </div>
  );
};

export default PhotoForm;
