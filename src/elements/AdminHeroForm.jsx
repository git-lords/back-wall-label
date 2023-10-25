import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { AlertCircle } from "../../icons.jsx";

export const AdminHeroForm = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [cta, setCta] = useState("");
  const [button, setButton] = useState("");
  const [link, setLink] = useState("");
  const [heros, setHeros] = useState([]);
  const [currentHero, setCurrentHero] = useState();
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [isEditingHero, setIsEditingHero] = useState(false);

  const getHeros = () => {
    axios.get("/getHeros").then((res) => {
      setHeros(res.data);
    });
  };
  const addHero = () => {
    console.log("addHero");
    axios
      .post(`/addHero`, { imgUrl, cta, button, link })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editHero = (currentHero) => {
    console.log("editHero");
    console.log(currentHero);
    axios
      .put(`/editHero/${currentHero.heroId}`, { imgUrl, cta, button, link })
      .then((res) => {
        console.log("edits saved");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const deleteHero = (currentHero) => {
    console.log("deleteHero");
    axios
      .delete(`/deleteHero/${currentHero.heroId}`)
      .then((res) => {
        console.log(res);
        getHeros();
      })
      .catch((err) => console.log(err));
  };
  const handleEdit = (hero) => {
    setCurrentHero(hero);
    setButton(hero.button);
    setLink(hero.link);
    setCta(hero.cta);
    setImgUrl(hero.imgUrl);
  };

  useEffect(() => {
    getHeros();
  }, []);

  return (
    <div className=" w-1/2 h-fit rounded-sm border-2 p-2 flex flex-col bg-white dark:bg-zinc-700 gap-3 ">
      <details title="Create a Hero">
        <summary className="dark:hover:text-mint hover:text-darkMint">
          Create a Hero
        </summary>
        <form className="flex flex-col" onSubmit={() => addHero()}>
          <label htmlFor="img url">Image URL: </label>
          <input
            id="img url"
            className="dark:bg-zinc-600 border"
            type="text"
            onChange={(e) => setImgUrl(e.target.value)}
          />
          {/* FIXME when a file is uploaded Chrome will block it. Error: not allowed to load local resource */}
          {/* <label htmlFor="img file">or </label>
          <input id='img file' className='dark:bg-zinc-600' type="file" onChange={e=>setImgUrl(e.target.value)} /> */}

          <label htmlFor="title">Title: </label>
          <input
            id="title"
            className="dark:bg-zinc-600 border"
            type="text"
            onChange={(e) => setCta(e.target.value)}
          />

          <label htmlFor="button text">Button Text: </label>
          <input
            id="button text"
            className="dark:bg-zinc-600 border"
            type="text"
            onChange={(e) => setButton(e.target.value)}
          />

          <label htmlFor="button link">Button Link: </label>
          <input
            id="button link"
            className="dark:bg-zinc-600 border"
            type="text"
            onChange={(e) => setLink(e.target.value)}
          />
          <button
            className="border-2 border-solid m-2 bg-zinc-200 dark:bg-zinc-600  hover:text-darkMint hover:border-mint"
            onClick={() => {
              console.log("submit");
            }}
          >
            Submit
          </button>
        </form>
      </details>
      <details>
        <summary className="dark:hover:text-mint hover:text-darkMint">
          Edit a Hero
        </summary>
        {heros.map((hero) => (
          <div className="m-1" key={hero.heroId}>
            <button
              className="p-2 m-2 bg-yellow-400 hover:bg-yellow-500 duration-200"
              onClick={() => {
                handleEdit(hero);
                setIsEditingHero(true);
              }}
            >
              Edit
            </button>{" "}
            {hero.cta}
          </div>
        ))}
      </details>
      {isEditingHero && (
        <EditForm
          currentHero={currentHero}
          setIsEditingHero={setIsEditingHero}
          setImgUrl={setImgUrl}
          setButton={setButton}
          setCta={setCta}
          setLink={setLink}
          editHero={editHero}
        />
      )}
      <details>
        <summary className="dark:hover:text-mint hover:text-darkMint">
          Remove a Hero
        </summary>
        {heros.map((hero) => (
          <div className="m-1" key={hero.heroId}>
            <button
              className="p-2 m-2 bg-red-500 text-white"
              onClick={() => {
                setCurrentHero(hero);
                setDeleteWindow(true);
              }}
            >
              Delete
            </button>{" "}
            {hero.cta}
          </div>
        ))}
      </details>
      {deleteWindow && (
        <ConfirmDelete
          currentHero={currentHero}
          setDeleteWindow={setDeleteWindow}
          deleteHero={deleteHero}
        />
      )}
    </div>
  );
};

export const EditForm = ({
  currentHero,
  setIsEditingHero,
  setButton,
  setCta,
  setImgUrl,
  setLink,
  editHero,
}) => {
  return (
    <div className="border border-solid flex flex-col mt-5 p-2">
      <div className="text-burntOrange self-center">
        <AlertCircle />
      </div>
      <div className="text-center">
        You are currently editing {currentHero.cta}
      </div>
      <form
        className="flex flex-col"
        onSubmit={() => {
          editHero(currentHero);
          setIsEditingHero(false);
        }}
      >
        <label htmlFor="img url">Image URL: </label>
        <input
          id="img url"
          className="dark:bg-zinc-600 border p-1"
          type="text"
          defaultValue={currentHero.imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />

        <label htmlFor="title">Title: </label>
        <input
          id="title"
          className="dark:bg-zinc-600 border p-1"
          type="text"
          defaultValue={currentHero.cta}
          onChange={(e) => setCta(e.target.value)}
        />

        <label htmlFor="button text">Button Text: </label>
        <input
          id="button text"
          className="dark:bg-zinc-600 border p-1"
          type="text"
          defaultValue={currentHero.button}
          onChange={(e) => setButton(e.target.value)}
        />

        <label htmlFor="button link">Button Link: </label>
        <input
          id="button link"
          className="dark:bg-zinc-600 border p-1"
          type="text"
          defaultValue={currentHero.link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          className="p-2 bg-emerald-500 text-white m-2 hover:bg-emerald-600 duration-200"
          onClick={() => {
            console.log("submit");
          }}
        >
          Save
        </button>
      </form>
      <button
        className="p-2 bg-zinc-400 text-white m-2 hover:bg-zinc-500 duration-200"
        onClick={() => setIsEditingHero(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export const ConfirmDelete = ({ currentHero, setDeleteWindow, deleteHero }) => {
  console.log(currentHero);
  return (
    <div className=" w-[50vw] self-center border border-solid flex flex-col mt-5 p-2 text-center">
      <div className="text-red-500 self-center">
        <AlertCircle />
      </div>
      <div>Are you sure you want to delete {currentHero.cta}?</div>
      <button
        className="hover:text-red-500 mt-2 text-lg p-2"
        onClick={() => {
          deleteHero(currentHero);
          setDeleteWindow(false);
        }}
      >
        Confirm
      </button>
      <button
        className="hover:text-red-500 text-lg"
        onClick={() => setDeleteWindow(false)}
      >
        Cancel
      </button>
    </div>
  );
};
