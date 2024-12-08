import { useState, useEffect, useCallback } from "react"
import fetchEndpoint from "./fetchEndpoint";

export default function useFetch({url, type, token, params}) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [fetchData, setFetchData] = useState(null);

  async function fetchingData() {
    try {
      setIsLoading(true);

      const data = await fetchEndpoint(url, type, token, params);    
      setFetchData(data);
      
      setFetchError();

    } catch (error) {
      setFetchError(error);
      console.log("Error: ", error);

    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    fetchingData();

  }, [url, type, params])
  

  function refetch() {
    console.log("refetching");
    
    fetchingData();
  }

  return ({
    fetchData,
    fetchError,
    isLoading,
    refetch
  });
};
