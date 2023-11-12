import { useState, useEffect } from "react";

const useAPIFetcher = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.response.results);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
};

export default useAPIFetcher;
