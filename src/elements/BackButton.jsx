import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "../../icons";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[5vh] ml-4">
      <button
        onClick={() => navigate(-1)}
        className="text-l font-semibold underline flex items-center"
      >
        <ArrowLeft/> Go Back
      </button>
    </div>
  );
};

export default BackButton;
