import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[5vh] ml-6 mt-2">
      <button
        onClick={() => navigate(-1)}
        className="text-l text-inherit font-semibold"
      >
        ← Back
      </button>
    </div>
  );
};

export default BackButton;
