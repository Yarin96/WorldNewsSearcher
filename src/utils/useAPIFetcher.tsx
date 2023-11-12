import { useState, useEffect } from "react";
import axios from "axios";

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

type NewsAPIArticleType = {};

type NYTimesArticleType = {};

type ArticleType =
  | TheGuardianArticleType
  | NewsAPIArticleType
  | NYTimesArticleType;

const useAPIFetcher = (url: string) => {
  const [data, setData] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const responseData = await axios.get(url);
        setData(responseData);
      } catch (error: any | unknown) {
        console.error("Fetching Data Failed!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading };
};

export default useAPIFetcher;
