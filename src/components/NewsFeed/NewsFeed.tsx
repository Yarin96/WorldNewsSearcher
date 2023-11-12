// // import { useState, useEffect } from "react";
// import ArticleCard from "../ArticleCard/ArticleCard";
// // import useAPIFetcher from "../../utils/useAPIFetcher";

// type TheGuardianArticleType = {
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
// };

// const DUMMY_DATA = [
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
//     source: "AI Innovations Weekly",
//     category: "Technology",
//     author: "Alex Roboto",
//   },
//   {
//     title: "Culinary Adventures: A Taste of Exotic Cuisines",
//     date: "2023-11-16",
//     source: "Foodie Gazette",
//     category: "Food",
//     author: "Chef Gourmet",
//   },
// ];

// const NewsFeed = () => {
//   // const [articleList, setArticleList] = useState<any[]>([]);

//   //   const { data, error, isLoading } = useAPIFetcher([
//   //     "https://content.guardianapis.com/search?api-key=3c191f36-fd67-4548-b174-7869ebc458e7",
//   //     "https://newsapi.org/v2/everything?q=Apple&from=2023-11-12&sortBy=popularity&apiKey=34b87083a4eb404ca6842d44e7a0e85a",
//   //     "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=d45lnRXfEusOYGrhiU9LZFJl3AzG7R24",
//   //   ]);

//   //   useEffect(() => {
//   //     if (data) {
//   //       const guardianArticles = data[0]?.results || [];
//   //       const newsApiArticles = data[1]?.articles || [];
//   //       const nyTimesArticles = data[2]?.response?.docs || [];

//   //       const mergedList = [
//   //         ...guardianArticles,
//   //         ...newsApiArticles,
//   //         ...nyTimesArticles,
//   //       ];
//   //       setArticleList(mergedList);
//   //     } else if (error) {
//   //       console.error("Error fetching articles:", error);
//   //     }
//   //   }, [data, error]);

//   return (
//     <>
//       {
//         /* {isLoading ? (
//         <h3>Loading ...</h3>
//       ) : ( */
//         // articleList?.map((article: TheGuardianArticleType, key: number) => (
//         //   <ArticleCard
//         //     key={key}
//         //     title={article.webTitle}
//         //     date={article.webPublicationDate}
//         //     source="The Guardian"
//         //     category={article.pillarName}
//         //     author="N/A"
//         //   />
//         DUMMY_DATA.map((article, key: number) => (
//           <ArticleCard
//             key={key}
//             title={article.title}
//             date={article.date}
//             source={article.source}
//             category={article.category}
//             author={article.author}
//           />
//         ))
//       }
//     </>
//   );
// };

// export default NewsFeed;

import { useState, useEffect } from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import NewsFilters from "../NewsFilters/NewsFilters";

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
  const [filteredData, setFilteredData] = useState<ArticleType[]>(DUMMY_DATA);

  function setFilteredDataHandler(currentData) {
    setFilteredData(currentData);
  }

  return (
    <>
      <NewsFilters data={DUMMY_DATA} updateData={setFilteredDataHandler} />
      {filteredData.map((article, key) => (
        <ArticleCard
          key={key}
          title={article.title}
          date={article.date}
          source={article.source}
          category={article.category}
          author={article.author}
        />
      ))}
    </>
  );
};

export default NewsFeed;
