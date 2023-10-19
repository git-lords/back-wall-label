import axios from "axios";
import { useState, useEffect } from "react";


export const AdminNewsForm = () => {
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [description, setDescription] = useState('')
    const [articles, setArticles] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [currentArticles, setCurrentArticles] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get('/getArticles');
            setArticles(response.data)
        } catch (err) {
            console.error("Error getting articles:", err)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const newArticle = async (event) => {
        event.preventDefault()

        try {
            await axios.post('/newArticle', {
                date,
                title,
                imgUrl,
                description,
            })
                .then(alert("Article added successfully!"),
                    setDate(() => ''),
                    setTitle(() => ''),
                    setImgUrl(() => ''),
                    setDescription(() => ''))
                .then(window.location.reload())

        } catch (err) {
            console.log("Error adding new article:", err)
        }
    }

    const changeEditMode = () => { setEditMode(true) }

    const editArticle = async (currentArticles) => {

        try {
            await axios.put(`/editArticle/${currentArticles.articleId}`, {
                title,
                date,
                description,
                imgUrl
            })
                .then(alert("Changes saved successfully!"))
                .then(window.location.reload())

        } catch (err) {
            console.log("Error while updating article!", err)
        }
    }

    const editHandler = (articles) => {
        setCurrentArticles(articles)
        setDate(articles.date)
        setTitle(articles.title)
        setImgUrl(articles.imgUrl)
        setDescription(articles.description)
    }

    const deleteArticle = async (articles) => {
        try {
            const { data } = await axios.delete(`/article/${articles.articleId}`)
                .then(alert("Article was deleted successfully"))
                .then(window.location.reload())

        } catch (err) {
            console.log("Theres was a problem deleting article:", err)
        }
    }

    return (
        <>
            <h3> News Blog: </h3>
            <div className='w-fit h-fit rounded-sm border-2 p-2 flex flex-col dark:bg-zinc-700 gap-3' >
                <details title='Create article'>
                    <summary>Create article</summary>
                    <form onSubmit={newArticle}>
                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" onChange={event => setDate(event.target.value)} />

                        <label htmlFor="title">Title:</label>
                        <input id="title" onChange={event => setTitle(event.target.value)} />

                        <label htmlFor="imgUrl">Image URL:</label>
                        <input id="imgUrl" onChange={event => setImgUrl(event.target.value)} />

                        <label htmlFor="description">Description:</label>
                        <textarea id="description" onChange={event => setDescription(event.target.value)} />

                        <button> Submit </button>
                    </form>
                </details>
                <details>
                    <summary>Edit article</summary>
                    {articles.map((article) => (
                        <div key={article.articleId} className='m-1'>
                            <button onClick={() => { editHandler(article); changeEditMode() }}>Edit</button>
                            <span>{article.title}</span>
                        </div>
                    ))}
                </details>
                {editMode && <EditForm
                    currentArticles={currentArticles}
                    setEditMode={setEditMode}
                    editArticle={editArticle}
                    setDate={setDate}
                    setTitle={setTitle}
                    setImgUrl={setImgUrl}
                    setDescription={setDescription}
                />}
                <details>
                    <summary>Remove article</summary>
                    {articles.map((el) => (
                        <div key={el.articleId}>
                            <button onClick={() => deleteArticle(el)}> Delete </button> <span>{el.title}</span>
                        </div>
                    ))}
                </details>
            </div>
        </>
    )
}

export const EditForm = ({ currentArticles, editArticle, setEditMode, setDate, setTitle, setImgUrl, setDescription }) => {

    return (
        <div key={currentArticles.articleId}>
            <div> You are currently editing {currentArticles.title} </div>
            <form onSubmit={() => { editArticle(currentArticles); setEditMode(false) }} key={currentArticles.articleId}>

                <label htmlFor="editedDate">Date:</label>
                <input
                    type="date"
                    id="editedDate"
                    defaultValue={currentArticles.date}
                    onChange={(event) => setDate(event.target.value)}
                />

                <label htmlFor="editedTitle">Title:</label>
                <input
                    id="editedTitle"
                    defaultValue={currentArticles.title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <label htmlFor="editedImgUrl">Image URL:</label>
                <input
                    id="editedImgUrl"
                    defaultValue={currentArticles.imgUrl}
                    onChange={(event) => setImgUrl(event.target.value)}
                />

                <label htmlFor="editedDescription">Description:</label>
                <textarea
                    id="editedDescription"
                    defaultValue={currentArticles.description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <button>Save</button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
            </form>
        </div>
    );
}