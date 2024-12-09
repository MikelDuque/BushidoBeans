import { useState, useEffect } from "react"
import fetchEndpoint from "./fetchEndpoint";
import { useAuth } from "../context/AuthContext";

export default function useFetch({url, type, token, params, needAuth}) {
  const {startExpCountdown} = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [fetchData, setFetchData] = useState(null);

  async function fetchingData() {
    try {
      setIsLoading(true);

      const data = await fetchEndpoint(url, type, token, params, needAuth);    
      setFetchData(data);
      
      setFetchError();

    } catch (error) {
      if(error === "Unauthorized") startExpCountdown()
      setFetchError(error);

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
