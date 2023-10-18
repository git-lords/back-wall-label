import { useState, useEffect } from "react"
import axios from "axios"

const ArticleDetails = ({ article, toggleArticleOff }) => (
    <div className="page">
        <h2>{article.title}</h2>
        <h3>{article.date}</h3>
        <p>{article.description}</p>
        <button onClick={toggleArticleOff}>Go back</button>
    </div>
);

export const News = () => {
    const [showArticle, setShowArticle] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [articles, setArticles] = useState([]);

    function toggleArticleOn(article) {
        setSelectedArticle(article);
        setShowArticle(true);
    }

    function toggleArticleOff() {
        setSelectedArticle(null);
        setShowArticle(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/getArticles');
                setArticles(response.data);
                console.log(response.data)
            } catch (err) {
                console.error("Error getting news articles:", err);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="page">
            {showArticle ? (
                <ArticleDetails article={selectedArticle} toggleArticleOff={toggleArticleOff} />
            ) : (
                articles.map((item) => (
                    <div key={item.articleId} >
                        <h2> {item.date} </h2>
                        <h3> {item.title} </h3>
                        <img src={item.imgUrl} alt='concert scene' onClick={() => toggleArticleOn(item)} />
                    </div>
                ))
            )}
        </div>
    );
}
