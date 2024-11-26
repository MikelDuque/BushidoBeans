export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


/* --- AUTHORIZATION CONTROLLER --- */
const API_AUTH_URL = `${API_BASE_URL}/api/Auth`;

  export const LOGIN_URL = `${API_AUTH_URL}/Login`;
  export const REGISTER_URL = `${API_AUTH_URL}/Register`;


/* --- PRODUCT CONTROLLER --- */
const API_PRODUCT_URL = `${API_BASE_URL}/api/Product`;

  export const GET_FILTERED_PRODUCTS = `${API_PRODUCT_URL}/Filtered_Products`;
  export function GET_PRODUCT_BY_ID(id) {return `${API_PRODUCT_URL}/Product_Details/${id}`};


/* --- REVIEW CONTROLLER --- */
const API_REVIEW_URL = `${API_BASE_URL}/api/Review`;

  export function GET_REVIEW_BY_ID(id) {return `${API_REVIEW_URL}/${id}`};
  //export function GET_REVIEWS_BY_PRODUCT_ID(id) {return `${API_REVIEW_URL}/Product_Reviews/${id}`};
  //export function GET_REVIEWS_BY_USER_ID(id) {return `${API_REVIEW_URL}/User_Reviews/${id}`};
  export const POST_REVIEW = `${API_REVIEW_URL}/Insert_Review`;


/* --- CART CONTROLLER --- */
const API_CART_URL = `${API_BASE_URL}/Cart`;

  export function GET_CART_BY_ID(id) {return `${API_CART_URL}/${id}`};
  export const PUT_CART = `${API_CART_URL}/Update_Cart`;
  export const PUT_CART_PRODUCT = `${API_CART_URL}/Update_Cart_Poduct`;
  export function DELETE_CART_BY_ID(id) {return `${API_CART_URL}/Delete_Cart/${id}`};
  export const DELETE_CART_PRODUCT = `${API_CART_URL}/Delete_Cart_Product`;


/* --- USER CONTROLLER --- */
const API_USER_URL = `${API_BASE_URL}/api/User`;