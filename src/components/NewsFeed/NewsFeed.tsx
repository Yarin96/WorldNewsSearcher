import { useState, useEffect } from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import useAPIFetcher from "../../utils/useAPIFetcher";

type TheGuardianArticleType = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
};

const NewsFeed = () => {
  const [articleList, setArticleList] = useState<any[]>([]);

  const { data, error, isLoading } = useAPIFetcher([
    "https://content.guardianapis.com/search?api-key=3c191f36-fd67-4548-b174-7869ebc458e7",
    "https://newsapi.org/v2/everything?q=Apple&from=2023-11-12&sortBy=popularity&apiKey=34b87083a4eb404ca6842d44e7a0e85a",
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=d45lnRXfEusOYGrhiU9LZFJl3AzG7R24",
  ]);

  useEffect(() => {
    if (data) {
      const guardianArticles = data[0]?.results || [];
      const newsApiArticles = data[1]?.articles || [];
      const nyTimesArticles = data[2]?.response?.docs || [];

      const mergedList = [
        ...guardianArticles,
        ...newsApiArticles,
        ...nyTimesArticles,
      ];
      setArticleList(mergedList);
    } else if (error) {
      console.error("Error fetching articles:", error);
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <h3>Loading ...</h3>
      ) : (
        articleList?.map((article: TheGuardianArticleType, key: number) => (
          <ArticleCard
            key={key}
            title={article.webTitle}
            date={article.webPublicationDate}
            source="The Guardian"
            category={article.pillarName}
            author="N/A"
          />
        ))
      )}
    </>
  );
};

export default NewsFeed;
