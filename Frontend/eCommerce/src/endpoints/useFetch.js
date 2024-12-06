import { useState, useEffect } from "react"
import fetchEndpoint from "./fetchEndpoint";

export default function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchData, setFetchData] = useState(null);

  async function fetchingData(url, type, params, token) {
    try {
      setIsLoading(true);
      const data = await fetchEndpoint(url, type, token, params);    
      setFetchData(data);
      setError(null);

    } catch (error) {
      setError(error);
      console.log("Error: ", error);

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchingData();

  }, [url, type, params]);

  function refetch() {
    console.log("refetching");
    
    fetchingData();
  }

  return ({
    fetchData,
    error,
    isLoading,
    refetch
  });
};
