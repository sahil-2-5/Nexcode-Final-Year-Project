import { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import "../../../App.css";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const api = import.meta.env.VITE_NEWS_API;
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${api}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
      })
      .catch((err) => console.error("Error fetching articles:", err));
  }, [category]);

  return (
    <div className="h-screen w-[1200px] overflow-x-hidden textColor scrollbar-hide mx-auto p-10">
      <div className="mt-16">
        <h1 className="text-4xl font-bold text-center mb-6 text-white drop-shadow-[3px_3px_0px_#7C3AED]">
          Today News Updates
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((news, index) => (
            <NewsItems
              key={index}
              title={news.title || "No Title"}
              description={news.description || news.title}
              src={
                news.urlToImage ||
                "https://i.pinimg.com/736x/a2/a6/9a/a2a69a98d04f5051bd72d623b73037c5.jpg"
              }
              url={news.url || "#"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsBoard;
