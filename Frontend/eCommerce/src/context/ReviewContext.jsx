import { useContext, createContext, useEffect, useRef, useState } from "react";
import { GET_REVIEW_BY_ID, POST_REVIEW } from "../endpoints/config";
import useFetch from "../endpoints/useFetch";


/* ----- Preparación Contexto ----- */

const ReviewContext = createContext({
  reviewList: [],
  setProductId: () => {},
  addReview: () => {}
});

export const useReview = () => {return useContext(ReviewContext)};


export function ReviewProvider({children}) {
  
  /* ----- Constantes Iniciales ----- */
  
  const [reviewList, setReviewList] = useState([]);
  const productId = useRef(0);  //¿Esto debe ser un ref o una constante normal?
  const token = localStorage.getItem('accessToken');

  const {isLoading, error, fetchData} = useFetch({
    Url:GET_REVIEW_BY_ID(productId),
    type:'GET',
    params:productId
  });


  /* ----- UseEffect ----- */

  useEffect(() => { //¿Puedo darle algún uso a la variable de "error"?

    handleReviewList(fetchData);
  }, [productId]);  //¿Hace falta especificar aquí el ID?

  
  /* ----- Métodos ----- */

  function handleReviewList(reviewList) {
    setReviewList(reviewList)
  }

  function handleProductId(id) {
    productId.current = id
  };

  function postNewReview(newReview) {
    useFetch({Url:POST_REVIEW, type:'POST', token:token, params:newReview})
    
    handleReviewList(reviewList.push(newReview))
  }


  /* ----- Fin Context ----- */

  const ctxValue = {
    reviewList: reviewList,
    setProductId: handleProductId,
    addReview: postNewReview,
  };
  // return <TripContext.Provider value={ctxValue}> {children} </TripContext.Provider>

  return <ReviewContext.Provider value={ctxValue}> {children} </ReviewContext.Provider>
}
