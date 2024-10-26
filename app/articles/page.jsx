"use client";
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer'; 

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = 'jstellmacher'; // Your Dev.to username

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`https://dev.to/api/articles?username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [username]);

  if (loading) return <div className="text-center text-gray-500">Loading articles...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">My Articles on Dev.to</h2>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <div key={article.id} className="p-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                {/* Show cover image */}
                {article.cover_image && (
                  <img src={article.cover_image} alt={`Cover for ${article.title}`} className="w-full h-48 object-cover rounded-md mb-2" />
                )}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{article.title}</h3>
              </a>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{article.description || 'No description available.'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No articles found.</p>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Articles;