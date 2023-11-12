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
  const [articleList, setArticleList] = useState<TheGuardianArticleType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data, error } = useAPIFetcher(
    "https://content.guardianapis.com/search?api-key=3c191f36-fd67-4548-b174-7869ebc458e7"
  );

  useEffect(() => {
    if (data) {
      setArticleList(data);
    } else if (error) {
      console.error("Error fetching articles:", error);
    }

    setIsLoading(false);
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
