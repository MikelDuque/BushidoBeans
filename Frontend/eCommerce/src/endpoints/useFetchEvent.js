
import { useState } from "react"
import fetchEndpoint from "./fetchEndpoint";
import { useAuth } from "../context/AuthContext";

export default function useFetchEvent() {
  const {startExpCountdown} = useAuth();

  const [fetchData, setFetchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  async function fetchingData({url, type, token, params, needAuth}) {
    try {
      setIsLoading(true);

      const data = await fetchEndpoint(url, type, token, params, needAuth);    
      setFetchData(data);
      setFetchError();

      return data;

    } catch (error) {
      if(error === "Unauthorized") startExpCountdown();
      setFetchError(error)

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
