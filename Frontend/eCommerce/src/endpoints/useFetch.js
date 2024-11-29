import { useState, useEffect } from "react"
import fetchEndpoint from "./fetchEndpoint";

export default function useFetch({Url, type, token, params, condition}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchData, setFetchData] = useState(null);

  useEffect(() => {
    if(!condition) return;
    
    fetchingData();

  }, [condition]);

  async function fetchingData() {
    setIsLoading(true);
    
    try {
      const data = await fetchEndpoint(Url, type, token, params);
      
      setFetchData(data);
      setError(null);

    }catch (error) {setError(error);}
    
    finally {setIsLoading(false);}
  }

  return ({
    isLoading,
    error,
    fetchData
  });
};
