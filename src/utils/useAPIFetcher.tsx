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

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

const useAPIFetcher = <T,>(apiUrls: string[]): ApiResponse<T[]> => {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const promises = apiUrls.map((url) => axios.get<T>(url));
        const responses = await Promise.all(promises);
        const responseData = responses.map((response) => response.data);
        setData(responseData);
      } catch (error: any | unknown) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrls]);

  return { data, error, isLoading };
};

export default useAPIFetcher;
