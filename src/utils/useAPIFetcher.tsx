import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const useAPIFetcher = (url: string) => {
  const [data, setData] = useState<AxiosResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const responseData = await axios.get(url);
        setData(responseData);
      } catch (error: unknown) {
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
