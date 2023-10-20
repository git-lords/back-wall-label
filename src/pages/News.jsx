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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {articles.map((item) => (
                        <div key={item.articleId} className="relative">
                            <div className="h-1000 w-1000 relative group">
                                <img
                                    src={item.imgUrl}
                                    alt="concert scene"
                                    onClick={() => toggleArticleOn(item)}
                                    className="object-fill cursor-pointer transition-transform transform scale-100 group-hover:scale-105"
                                />
                            </div>
                            <div className="bg-black text-white p-2 absolute top-0 left-0 w-full bg-opacity-50">
                                <h2 className="font-bold">{item.date}</h2>
                            </div>
                            <div className="bg-black text-white p-2 absolute bottom-0 left-0 w-full bg-opacity-50">
                                <h3 className="font-bold">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
