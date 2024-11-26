import { useState, useEffect } from "react"
import fetchEndpoint from "./fetchEndpoint";

export default function useFetch(URL, type, token, params) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    fetchingData();
  }),[fetchEndpoint];

  async function fetchingData() {
    setIsLoading(true);

    try {
      const data = await fetchEndpoint({URL, type, token, params});

      setFetchData(data);
      setError(null);

    }catch (error) {setError(error);}
    
    finally {setIsLoading(false);}
  }

  return {
    isLoading,
    error,
    fetchData
  };
};
