import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://newsapp-4f8o.onrender.com/news");
        setData(response.data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "https://newsapp-4f8o.onrender.com/search",
        { query: searchQuery }
      );
      setData(response.data.articles);
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };
  
  

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <input
            type="text"
            className="form-input bg-gray-800 text-white border-2 border-gray-700 rounded-l-md px-4 py-2 focus:outline-none focus:border-gray-500"
            placeholder="Search for news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-r-md"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 p-4">
          {data
            .filter((article) => article.urlToImage) // Filter out articles without an image
            .map((article, index) => (
              <div className="bg-gray-800 rounded-lg overflow-hidden" key={index}>
                <img
                  src={article.urlToImage}
                  className="w-full h-60 object-cover"
                  alt={article.title}
                />
                <div className="p-4">
                  <h5 className="text-lg font-bold mb-2">{article.title}</h5>
                  <p className="text-sm mb-4">
                    {article.description && article.description.length > 100
                      ? `${article.description.substring(0, 100)}...`
                      : article.description}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded-md inline-block"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
