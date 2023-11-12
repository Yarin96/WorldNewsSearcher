import { useState } from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import NewsFilters from "../NewsFilters/NewsFilters";
import useAPIFetcher from "../../utils/useAPIFetcher";

type ArticleType = {
  title: string;
  date: string;
  source: string;
  category: string;
  author: string;
};

const DUMMY_DATA: ArticleType[] = [
  {
    title: "The Future of Technology: A Glimpse Into Tomorrow",
    date: "2023-11-12",
    source: "Tech Insights Magazine",
    category: "Technology",
    author: "John Smith",
  },
  {
    title: "Healthy Living: Tips for a Balanced Lifestyle",
    date: "2023-11-13",
    source: "Wellness Times",
    category: "Health",
    author: "Jane Doe",
  },
  {
    title: "Exploring the Wonders of Space Travel",
    date: "2023-11-14",
    source: "Cosmic Discoveries Journal",
    category: "Science",
    author: "Dr. Astronaut",
  },
  {
    title: "Artificial Intelligence: Transforming Industries",
    date: "2023-11-15",
    source: "Tech Insights Magazine",
    category: "Technology",
    author: "Alex Roboto",
  },
  {
    title: "Culinary Adventures: A Taste of Exotic Cuisines",
    date: "2023-11-16",
    source: "Wellness Times",
    category: "Health",
    author: "Chef Gourmet",
  },
];

const NewsFeed: React.FC = () => {
  const [filteredData, setFilteredData] = useState<ArticleType[]>(DUMMY_DATA); // Change DUMMY_DATA

  const { guardianData, guardianIsLoading } = useAPIFetcher(
    "https://content.guardianapis.com/search?api-key=3c191f36-fd67-4548-b174-7869ebc458e7"
  );
  const { newsApiData, newsApiIsLoading } = useAPIFetcher(
    "https://newsapi.org/v2/everything?q=Apple&from=2023-11-12&sortBy=popularity&apiKey=34b87083a4eb404ca6842d44e7a0e85a"
  );
  const { nyData, nyIsLoading } = useAPIFetcher(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=d45lnRXfEusOYGrhiU9LZFJl3AzG7R24"
  );

  function setFilteredDataHandler(currentData) {
    setFilteredData(currentData);
  }

  return (
    <>
      <NewsFilters data={DUMMY_DATA} updateData={setFilteredDataHandler} />
      {guardianIsLoading && newsApiIsLoading && nyIsLoading ? (
        <h3>Loading ...</h3>
      ) : (
        filteredData.map((article, key) => (
          <ArticleCard
            key={key}
            title={article.title}
            date={article.date}
            source={article.source}
            category={article.category}
            author={article.author}
          />
        ))
      )}
    </>
  );
};

export default NewsFeed;
