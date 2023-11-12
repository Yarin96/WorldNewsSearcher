import { useState } from "react";
import "./NewsFilters.css";

type TheGuardianArticleType = {
  //   id: string;
  //   type: string;
  //   sectionId: string;
  //   sectionName: string;
  //   webPublicationDate: string;
  //   webTitle: string;
  //   webUrl: string;
  //   isHosted: boolean;
  //   pillarId: string;
  //   pillarName: string;
  title: string;
  date: string;
  source: string;
  category: string;
  author: string;
};

type NewsAPIArticleType = {
  title: string;
  date: string;
  source: string;
  category: string;
  author: string;
};

type NYTimesArticleType = {
  title: string;
  date: string;
  source: string;
  category: string;
  author: string;
};

type ArticleType =
  | TheGuardianArticleType
  | NewsAPIArticleType
  | NYTimesArticleType;

const NewsFilters = ({ data, updateData }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  function searchArticleHandler(): void {
    const filteredArticles = data.filter((article: ArticleType) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    updateData(filteredArticles);
  }

  function filterDataHandler(): void {
    const filteredArticles = data.filter(
      (article: ArticleType) =>
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
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
        </select>
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
        >
          <option value="">All Sources</option>
          <option value="Tech Insights Magazine">Tech Insights Magazine</option>
          <option value="Wellness Times">Wellness Times</option>
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
