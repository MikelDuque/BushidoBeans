
import { useState } from "react"
import fetchEndpoint from "./fetchEndpoint";

export default function useFetchEvent() {
  const [fetchData, setFetchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchingData({url, type, token, params}) {
    
    try {
      setIsLoading(true);

      const data = await fetchEndpoint(url, type, token, params);    
      setFetchData(data);

      setError();

      return data;

    } catch (error) {
      setError(error)
      console.log("Error: ", error);

    } finally {
      setIsLoading(false);
    }
  };

  return ({
    fetchData,
    fetchingData,
    isLoading,
    error
  });
};
