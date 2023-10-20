import { useState, useEffect } from "react"
import axios from "axios"

const ArticleDetails = ({ article, toggleArticleOff }) => (
    // <div className="page">
    //     <h2>{article.title}</h2>
    //     <h3>{article.date}</h3>
    //     <p>{article.description}</p>
    //     <button onClick={toggleArticleOff}>Go back</button>
    // </div>
    <div className="page">
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold my-4">{article.title}</h2>
            <h3 className="text-lg text-gray-600 mb-4">{article.date}</h3>
            <div className="max-w-2xl">
                <p className="text-gray-800 text-xl leading-relaxed mb-8">{article.description}</p>
            </div>
            <button
                onClick={toggleArticleOff}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
                Go back
            </button>
        </div>
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
                            <div className="object-fill relative group flex h-full">
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
