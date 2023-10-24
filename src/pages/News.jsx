import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

const ArticleDetails = ({ article, toggleArticleOff }) => (
    // <div className="page">
    //     <h2>{article.title}</h2>
    //     <h3>{article.date}</h3>
    //     <p>{article.description}</p>
    //     <button onClick={toggleArticleOff}>Go back</button>
    // </div>
    <div className="pt-24 pb-6 flex justify-center items-center">
        <div className="flex flex-col items-center border rounded-lg pb-8 w-5/6 shadow-xl shadow-black-500/10 bg-slate-50">
            <h2 className="text-4xl font-bold my-4 text-neutral-950 text-center">{article.title}</h2>
            <h3 className="text-lg text-gray-600 mb-4 font-semibold dark:text-black">{article.date}</h3>
            <div className="max-w-xl">
                <p className="text-gray-800 text-xl leading-relaxed text-center mb-8 dark:text-black">{article.description}</p>
            </div>
            <button
                onClick={toggleArticleOff}
                className="bg-neutral-950 hover:bg-white text-stone-100 font-semibold hover:text-black py-2 px-4 border border-black hover:border-transparent rounded"
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

        <div>
            {showArticle ? (
                <ArticleDetails article={selectedArticle} toggleArticleOff={toggleArticleOff} />
            ) : (
                <div className="pt-20 pb-6">
                    <div className="grid grid-cols-1 gap-4">
                        {articles.map((item) => (
                            <div key={item.articleId} className="relative w-screen dark:text-white">
                                <div
                                    className="flex flex-col h-screen items-center justify-evenly py-6 relative group"
                                    style={{
                                        backgroundImage: `url(${item.imgUrl})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center center',
                                    }}
                                    onClick={() => toggleArticleOn(item)}
                                >
                                    <h1 className="text-5xl md:text-9xl font-bold uppercase text-white text-center drop-shadow-xl pt-10">
                                        {item.title}
                                    </h1>
                                    <h2 className="font-bold text-white text-xl drop-shadow-xl md:text-4xl">{item.date}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

    );
}
