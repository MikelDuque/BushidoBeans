
import { useState } from "react"
import fetchEndpoint from "./fetchEndpoint";

export default function useFetchEvent() {
  const [fetchData, setFetchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  async function fetchingData({url, type, token, params}) {
    try {
      setIsLoading(true);

      const data = await fetchEndpoint(url, type, token, params);    
      setFetchData(data);
      setFetchError();

      return data;

    } catch (error) {
      setFetchError(error)
      console.log("Error: ", error);

    } finally {
      setIsLoading(false);
    }
  };

  return ({
    fetchData,
    isLoading,
    fetchError,
    fetchingData
  });
};
