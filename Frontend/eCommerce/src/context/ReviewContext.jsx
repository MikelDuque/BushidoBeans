import { createContext, useEffect, useRef, useState } from "react";
import { GET_REVIEW_BY_ID, POST_REVIEW } from "../endpoints/config";
import useFetch from "../endpoints/useFetch";

const ReviewContext = createContext({
  reviewList: [],
  setProductId: () => {},
  addReview: () => {}
});

function ReviewProvider({children}) {
  const [reviewList, setReviewList] = useState([]);
  const productId = useRef(0);  //¿Esto debe ser un ref o una constante normal?
  const token = localStorage.getItem('accessToken');

  /* ----- UseEffect ----- */

  useEffect(() => { //¿Puedo darle algún uso a la variable de "error"?
    const {isLoading, error, fetchData} = useFetch({Url:GET_REVIEW_BY_ID(productId), type:'GET', params:productId});

    handleGetReviews(fetchData);
  }, [productId]);  //¿Hace falta especificar aquí el ID?

  /* ----- Métodos ----- */

  function setProductId(id) {
    productId.current = id
  };

  function handleGetReviews(reviewList) {
    setReviewList(reviewList)
  }

  function postNewReview(newReview) {
    useFetch({Url:POST_REVIEW, type:'POST', token:token, params:newReview})
  }

  /* ----- Final ----- */

  const ctxValue = {
    reviewList: reviewList,
    setProductId: setProductId,
    addReview: postNewReview,
  };

  return <TripContext.Provider value={ctxValue}>{children}</TripContext.Provider>
}

