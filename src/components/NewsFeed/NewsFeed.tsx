import { useState, useEffect } from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import NewsFilters from "../NewsFilters/NewsFilters";
import useAPIFetcher from "../../utils/useAPIFetcher";
import { shuffleArray, formatDate } from "../../utils/helperFunctions";

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
  byline: { original: string }; // author
  multimedia: { url: string };
  type_of_material: string;
};

export type ArticleType =
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
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=34b87083a4eb404ca6842d44e7a0e85a"
  );
  const { data: nyData, isLoading: nyIsLoading } = useAPIFetcher(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=d45lnRXfEusOYGrhiU9LZFJl3AzG7R24"
  );

  useEffect(() => {
    if (
      !guardianIsLoading &&
      !newsApiIsLoading &&
      !nyIsLoading &&
      guardianData &&
      newsApiData &&
      nyData
    ) {
      console.log("Guardian", guardianData);
      console.log("NewsAPI", newsApiData);
      console.log("NY", nyData);

      const mergedData = [
        ...guardianData.data.response.results,
        ...newsApiData.data.articles,
        ...nyData.data.response.docs,
      ];

      setMergedArticlesData(shuffleArray(mergedData));
      setFilteredData(mergedData);
    }
  }, [
    guardianData,
    newsApiData,
    nyData,
    guardianIsLoading,
    newsApiIsLoading,
    nyIsLoading,
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
      {guardianIsLoading && newsApiIsLoading && nyIsLoading ? (
        <h3>Loading ...</h3>
      ) : (
        filteredData?.map((article, key) => (
          <ArticleCard
            key={key}
            title={getArticleTitle(article)}
            date={formatDate(getArticleDate(article))}
            source={getArticleSource(article)}
            category={getArticleCategory(article)}
            author={getArticleAuthor(article)}
            image={getArticleImage(article)}
          />
        ))
      )}
    </>
  );
};

export default NewsFeed;

function isTheGuardianArticle(
  article: ArticleType
): article is TheGuardianArticleType {
  return "sectionName" in article;
}

function isNewsAPIArticle(article: ArticleType): article is NewsAPIArticleType {
  return "content" in article;
}

function isNYTimesArticle(article: ArticleType): article is NYTimesArticleType {
  return "_id" in article;
}

function getArticleTitle(article: ArticleType): string {
  if (isTheGuardianArticle(article)) {
    return article.webTitle;
  } else if (isNewsAPIArticle(article)) {
    return article.title;
  } else if (isNYTimesArticle(article)) {
    return article.abstract;
  } else {
    return "Title not found";
  }
}

function getArticleDate(article: ArticleType): string {
  if (isTheGuardianArticle(article)) {
    return article.webPublicationDate;
  } else if (isNewsAPIArticle(article)) {
    return article.publishedAt;
  } else if (isNYTimesArticle(article)) {
    return article.pub_date;
  } else {
    return "Date not found";
  }
}

function getArticleSource(article: ArticleType): string {
  if (isTheGuardianArticle(article)) {
    return "The Guardian";
  } else if (isNewsAPIArticle(article)) {
    return article.source?.name;
  } else if (isNYTimesArticle(article)) {
    return article.source;
  } else {
    return "Source not found";
  }
}

function getArticleCategory(article: ArticleType): string {
  if (isTheGuardianArticle(article)) {
    return article.pillarName;
  } else if (isNewsAPIArticle(article)) {
    return "News";
  } else if (isNYTimesArticle(article)) {
    return article.type_of_material;
  } else {
    return "Category not found";
  }
}

function getArticleAuthor(article: ArticleType): string {
  if (isTheGuardianArticle(article)) {
    return "Author not found";
  } else if (isNewsAPIArticle(article)) {
    return article.author;
  } else if (isNYTimesArticle(article)) {
    return article.byline.original;
  } else {
    return "Author not found";
  }
}

function getArticleImage(article: ArticleType): string {
  if (isTheGuardianArticle(article)) {
    return "";
  } else if (isNewsAPIArticle(article)) {
    return article.urlToImage;
  } else if (isNYTimesArticle(article)) {
    return article.multimedia?.url;
  } else {
    return "";
  }
}
