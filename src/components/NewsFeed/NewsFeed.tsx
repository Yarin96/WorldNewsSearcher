import { useState, useEffect } from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import NewsFilters from "../NewsFilters/NewsFilters";
import useAPIFetcher from "../../utils/useAPIFetcher";

type TheGuardianArticleType = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
};

type NewsAPIArticleType = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
};

type NYTimesArticleType = {
  _id: string;
  abstract: string;
  lead_paragraph: string;
  pub_date: string;
  source: string;
  snippet: string;
  subsection_name: string;
  uri: string;
  web_url: string;
};

type ArticleType =
  | TheGuardianArticleType
  | NewsAPIArticleType
  | NYTimesArticleType;

const NewsFeed: React.FC = () => {
  const [mergedArticlesData, setMergedArticlesData] = useState<ArticleType[]>(
    []
  );
  const [filteredData, setFilteredData] = useState<ArticleType[]>();

  const { data: guardianData, isLoading: guardianIsLoading } = useAPIFetcher(
    "https://content.guardianapis.com/search?api-key=3c191f36-fd67-4548-b174-7869ebc458e7"
  );
  const { data: newsApiData, isLoading: newsApiIsLoading } = useAPIFetcher(
    "https://newsapi.org/v2/everything?q=Apple&from=2023-11-12&sortBy=popularity&apiKey=34b87083a4eb404ca6842d44e7a0e85a"
  );
  //   const { data: nyData, isLoading: nyIsLoading } = useAPIFetcher(
  //     "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=d45lnRXfEusOYGrhiU9LZFJl3AzG7R24"
  //   );

  useEffect(() => {
    if (!guardianIsLoading && !newsApiIsLoading) {
      // && !nyIsLoading
      console.log(guardianData);
      console.log(newsApiData);
      //   console.log(nyData);
      const mergedData = [
        ...guardianData.data.response.results,
        ...newsApiData.data.articles,
        // ...nyData?.data?.response?.docs,
      ];
      setMergedArticlesData(mergedData);
      setFilteredData(mergedData);
    }
  }, [
    guardianData,
    newsApiData,
    // nyData,
    guardianIsLoading,
    newsApiIsLoading,
    // nyIsLoading,
  ]);

  function setFilteredDataHandler(currentData: ArticleType[]) {
    setFilteredData(currentData);
  }

  return (
    <>
      <NewsFilters
        data={mergedArticlesData}
        updateData={setFilteredDataHandler}
      />
      {/* && nyIsLoading */}
      {guardianIsLoading && newsApiIsLoading ? (
        <h3>Loading ...</h3>
      ) : (
        filteredData?.map((article, key) => (
          <ArticleCard
            key={key}
            title={article.webTitle || article.title || article.abstract}
            date={
              article.webPublicationDate ||
              article.publishedAt ||
              article.pub_date
            }
            // source={article.source.name || article.source || "The Guardian"}
            source={"Source"}
            category={
              article.pillarName || article.subsection_name || "NewsAPICategory"
            }
            author={article.author || "Author not found"}
          />
        ))
      )}
    </>
  );
};

export default NewsFeed;

// const DUMMY_DATA: ArticleType[] = [
//   {
//     title: "The Future of Technology: A Glimpse Into Tomorrow",
//     date: "2023-11-12",
//     source: "Tech Insights Magazine",
//     category: "Technology",
//     author: "John Smith",
//   },
//   {
//     title: "Healthy Living: Tips for a Balanced Lifestyle",
//     date: "2023-11-13",
//     source: "Wellness Times",
//     category: "Health",
//     author: "Jane Doe",
//   },
//   {
//     title: "Exploring the Wonders of Space Travel",
//     date: "2023-11-14",
//     source: "Cosmic Discoveries Journal",
//     category: "Science",
//     author: "Dr. Astronaut",
//   },
//   {
//     title: "Artificial Intelligence: Transforming Industries",
//     date: "2023-11-15",
//     source: "Tech Insights Magazine",
//     category: "Technology",
//     author: "Alex Roboto",
//   },
//   {
//     title: "Culinary Adventures: A Taste of Exotic Cuisines",
//     date: "2023-11-16",
//     source: "Wellness Times",
//     category: "Health",
//     author: "Chef Gourmet",
//   },
// ];
