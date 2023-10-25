import React from "react";

import { AdminHeroForm } from "./adminHeroForm";
import { AdminNewsForm } from "./AdminNewsForm";
import PhotoForm from "./PhotoForm";

const Admin = () => {
  return (
    <div className=" h-[80%] flex flex-col items-center justify-evenly overflow-auto">
      <div className="h-full border w-3/4 flex flex-col items-center justify-evenly mt-4 overflow-scroll bg-zinc-200 dark:bg-zinc-600 dark:bg-opacity-70 bg-opacity-70">
        <h1 className="basis-10 text-lg ">Admin Dashboard</h1>
        <AdminHeroForm />

        <AdminNewsForm />

        <h1>Add a band photo:</h1>
        <PhotoForm />
      </div>
    </div>
  );
};

export default Admin;
