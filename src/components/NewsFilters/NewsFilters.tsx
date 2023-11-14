import { useState } from "react";
import "./NewsFilters.css";

// type ArticleType = {
//   title: string;
//   date: string;
//   source: string;
//   category: string;
//   author: string;
// };

const NewsFilters = ({ data, updateData }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  function searchArticleHandler(): void {
    console.log("data: ", data);
    const filteredArticles = data.filter((article) => {
      const articleTitle =
        article.title || article.webTitle || article.abstract;

      return (
        articleTitle &&
        articleTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    updateData(filteredArticles);
  }

  // Fix the category
  function filterDataHandler(): void {
    const filteredArticles = data.filter(
      (article) =>
        (selectedCategory === "" || article.category === selectedCategory) &&
        (selectedSource === "" || article.source === selectedSource) &&
        (selectedDate === "" || article.date === selectedDate)
    );
    updateData(filteredArticles);
  }

  return (
    <>
      <div className="input-area">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchArticleHandler}>Search</button>
      </div>
      <div className="input-area">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="News">News</option>
          <option value="Sport">Sport</option>
        </select>
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
        >
          <option value="">All Sources</option>
          <option value="The Guardian">The Guardian</option>
          <option value="NewsAPI">NewsAPI</option>
          <option value="New York Times">New York Times</option>
        </select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button onClick={filterDataHandler}>Apply Filters</button>
      </div>
    </>
  );
};

export default NewsFilters;
