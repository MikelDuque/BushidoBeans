import { useState, useEffect } from "react"
import fetchEndpoint from "./fetchEndpoint";

export default function useFetch({Url, type, token, params, condition}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchData, setFetchData] = useState(null);

  console.log("token en useFetch", token);
  
  useEffect(() => {
    if(!condition) return;
    fetchingData();

  }, [condition]);

  async function fetchingData() {
    try {
      const data = await fetchEndpoint(Url, type, token, params);
      
      setFetchData(data);
      setError();

    } catch (error) {
      setError(error);
      setFetchData(fetchData);

    } finally {setIsLoading(false);}
  }

  return ({
    isLoading,
    error,
    fetchData
  });
};
