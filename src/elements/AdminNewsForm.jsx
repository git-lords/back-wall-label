import axios from "axios";
import { useState, useEffect } from "react";
import { Pencil, Trash } from "../../icons";

export const AdminNewsForm = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [articles, setArticles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentArticles, setCurrentArticles] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/getArticles");
      setArticles(response.data);
    } catch (err) {
      console.error("Error getting articles:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const newArticle = async (event) => {
    event.preventDefault();

    try {
      await axios
        .post("/newArticle", {
          date,
          title,
          imgUrl,
          description,
        })
        .then(
          alert("Article added successfully!"),
          setDate(() => ""),
          setTitle(() => ""),
          setImgUrl(() => ""),
          setDescription(() => "")
        )
        .then(window.location.reload());
    } catch (err) {
      console.log("Error adding new article:", err);
    }
  };

  const changeEditMode = () => {
    setEditMode(true);
  };

  const editArticle = async (currentArticles) => {
    try {
      await axios
        .put(`/editArticle/${currentArticles.articleId}`, {
          title,
          date,
          description,
          imgUrl,
        })
        .then(alert("Changes saved successfully!"))
        .then(window.location.reload());
    } catch (err) {
      console.log("Error while updating article!", err);
    }
  };

  const editHandler = (articles) => {
    setCurrentArticles(articles);
    setDate(articles.date);
    setTitle(articles.title);
    setImgUrl(articles.imgUrl);
    setDescription(articles.description);
  };

  const deleteArticle = async (articles) => {
    try {
      const { data } = await axios
        .delete(`/article/${articles.articleId}`)
        .then(alert("Article was deleted successfully"))
        .then(window.location.reload());
    } catch (err) {
      console.log("Theres was a problem deleting article:", err);
    }
  };

  return (
    <>
      <h3> News Blog: </h3>
      <div className="w-1/2 border p-2 flex flex-col bg-white dark:bg-zinc-700 gap-3">
        <details title="Create article">
          <summary>Create article</summary>
          <div className="flex flex-col flex-nowrap">
            <form onSubmit={newArticle} className="flex flex-col">
              <label htmlFor="date">Date:</label>
              <input
                className="border p-2"
                type="date"
                id="date"
                onChange={(event) => setDate(event.target.value)}
              />

              <label htmlFor="title">Title:</label>
              <input
                className="border p-2"
                id="title"
                onChange={(event) => setTitle(event.target.value)}
              />

              <label htmlFor="imgUrl">Image URL:</label>
              <input
                className="border p-2"
                id="imgUrl"
                onChange={(event) => setImgUrl(event.target.value)}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                className="border p-2"
                id="description"
                onChange={(event) => setDescription(event.target.value)}
              />

              <button className="border p-2 my-4 bg-emerald-600 text-white hover:bg-emerald-700 duration-200">
                {" "}
                Submit{" "}
              </button>
            </form>
          </div>
        </details>
        <details>
          <summary>Edit article</summary>
          {articles.map((article) => (
            <div key={article.articleId} className="m-1">
              <button
                className="p-2 m-2 text-yellow-500 hover:animate-wiggle-more hover:animate-infinite"
                onClick={() => {
                  editHandler(article);
                  changeEditMode();
                }}
              >
                <Pencil/>
              </button>
              <span>{article.title}</span>
            </div>
          ))}
        </details>
        {editMode && (
          <EditForm
            currentArticles={currentArticles}
            setEditMode={setEditMode}
            editArticle={editArticle}
            setDate={setDate}
            setTitle={setTitle}
            setImgUrl={setImgUrl}
            setDescription={setDescription}
          />
        )}
        <details>
          <summary>Remove article</summary>
          {articles.map((el) => (
            <div key={el.articleId}>
              <button
                className="p-2 m-2 text-red-500 hover:animate-wiggle-more hover:animate-infinite"
                onClick={() => deleteArticle(el)}
              >
                {" "}
                <Trash/>{" "}
              </button>{" "}
              <span>{el.title}</span>
            </div>
          ))}
        </details>
      </div>
    </>
  );
};

export const EditForm = ({
  currentArticles,
  editArticle,
  setEditMode,
  setDate,
  setTitle,
  setImgUrl,
  setDescription,
}) => {
  return (
    <div key={currentArticles.articleId}>
      <div> You are currently editing: {currentArticles.title} </div>
      <form
        className="flex flex-col"
        onSubmit={() => {
          editArticle(currentArticles);
          setEditMode(false);
        }}
        key={currentArticles.articleId}
      >
        <label htmlFor="editedDate">Date:</label>
        <input
          className="border p-2"
          type="date"
          id="editedDate"
          defaultValue={currentArticles.date}
          onChange={(event) => setDate(event.target.value)}
        />

        <label htmlFor="editedTitle">Title:</label>
        <input
          className="border p-2"
          id="editedTitle"
          defaultValue={currentArticles.title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="editedImgUrl">Image URL:</label>
        <input
          className="border p-2"
          id="editedImgUrl"
          defaultValue={currentArticles.imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
        />

        <label htmlFor="editedDescription">Description:</label>
        <textarea
          className="border p-2"
          id="editedDescription"
          defaultValue={currentArticles.description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button className="p-2 bg-emerald-500 text-white m-2 hover:bg-emerald-600 duration-200">
          Save
        </button>
        <button
          className="p-2 bg-zinc-400 text-white m-2 hover:bg-zinc-500 duration-200"
          onClick={() => setEditMode(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
