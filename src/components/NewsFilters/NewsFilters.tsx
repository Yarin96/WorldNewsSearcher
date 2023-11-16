import { useState } from "react";
import "./NewsFilters.css";
import { ArticleType } from "../NewsFeed/NewsFeed";
import { formatDate } from "../../utils/helperFunctions";

const NewsFilters = ({ data, updateData }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  function searchArticleHandler(): void {
    console.log("data: ", data);
    const filteredArticles = data.filter((article: ArticleType) => {
      const articleTitle =
        article.title || article.webTitle || article.abstract;

      return (
        articleTitle &&
        articleTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    updateData(filteredArticles);
  }

  function filterDataHandler(): void {
    const filteredArticles = data.filter((article: ArticleType) => {
      const isCategoryMatch =
        selectedCategory === "" ||
        article.pillarName === selectedCategory ||
        article.sectionName === selectedCategory ||
        article.subsection_name === selectedCategory ||
        article.news_desk === selectedCategory;

      const isSourceMatch =
        selectedSource === "" || article.source === selectedSource;

      const check = formatDate(article.pub_date);
      console.log(check);
      const isDateMatch =
        selectedDate === "" ||
        formatDate(article.publishedAt) === selectedDate ||
        formatDate(article.webPublicationDate) === selectedDate ||
        formatDate(article.pub_date) === selectedDate;

      return isCategoryMatch && isSourceMatch && isDateMatch;
    });

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
          <option value="Politics">Politics</option>
          <option value="Sport">Sport</option>
          <option value="Arts">Arts</option>
          <option value="Opinion">Opinion</option>
        </select>
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
        >
          <option value="">All Sources</option>
          <option value="The Guardian">The Guardian</option>
          <option value="NewsAPI">NewsAPI</option>
          <option value="The New York Times">The New York Times</option>
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
