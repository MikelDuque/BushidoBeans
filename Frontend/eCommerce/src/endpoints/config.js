export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


/* --- AUTHORIZATION CONTROLLER --- */
const API_AUTH_URL = `${API_BASE_URL}/api/Auth`;

  export const LOGIN_URL = `${API_AUTH_URL}/Login`;
  export const REGISTER_URL = `${API_AUTH_URL}/Register`;


/* --- PRODUCT CONTROLLER --- */
const API_PRODUCT_URL = `${API_BASE_URL}/api/Product`;

  export const GET_FILTERED_PRODUCTS = `${API_PRODUCT_URL}/Filtered_Products`;
  export function GET_PRODUCT_BY_ID(id) {return `${API_PRODUCT_URL}/${id}`};
  export const GET_PRODUCTS = `${API_PRODUCT_URL}/Get_Products`;
  export const POST_PRODUCT = `${API_PRODUCT_URL}/Create_Product`
  export const PUT_PRODUCT = `${API_PRODUCT_URL}/Update_Product`


/* --- REVIEW CONTROLLER --- */
const API_REVIEW_URL = `${API_BASE_URL}/api/Review`;

  export function GET_REVIEW_BY_ID(id) {return `${API_REVIEW_URL}/${id}`};
  export const POST_REVIEW = `${API_REVIEW_URL}/Insert_Review`;


/* --- CART CONTROLLER --- */
const API_CART_URL = `${API_BASE_URL}/api/Cart`;

  export function GET_CART_BY_ID(id) {return `${API_CART_URL}/${id}`};
  export const PUT_CART = `${API_CART_URL}/Update_Cart`;
  export const PUT_CARTPRODUCT = `${API_CART_URL}/Update_CartProduct`;
  export function DELETE_CART_BY_ID(id) {return `${API_CART_URL}/Delete_Cart/${id}`};
  export const DELETE_CARTPRODUCT = `${API_CART_URL}/Delete_CartProduct`;


/* --- USER CONTROLLER --- */
const API_USER_URL = `${API_BASE_URL}/api/User`;

  export function GET_USER_BY_ID(id) {return `${API_USER_URL}/${id}`};
  export const GET_USERS = `${API_USER_URL}/Get_Users`;
  export const PUT_USER = `${API_USER_URL}/Update_User`;
  export function DELETE_USER_BY_ID(id) {return `${API_USER_URL}/Delete_User/${id}`};


/* --- ORDER CONTROLLER --- */
const API_ORDER_URL = `${API_BASE_URL}/api/Order`;

  export function GET_ORDER_BY_ID(id) {return `${API_ORDER_URL}/${id}`};
  export function GET_ORDERS_BY_ID(id) {return `${API_ORDER_URL}/Get_Orders?userId${id}`};
  export const POST_ORDER = `${API_ORDER_URL}/Insert_Order`;

/* --- ADDRESS CONTROLLER --- */

const API_ADDRESS_URL = `${API_BASE_URL}/api/Address`;
  export function GET_ADDRESS_BY_ID(id) {return `${API_ADDRESS_URL}/${id}`};
  export function GET_ALL_ADDRESSES_BY_ID(id) {return `${API_ADDRESS_URL}/Get_All_Addresses?userId=${id}`};
  export const POST_ADDRESS = `${API_ADDRESS_URL}/Insert_Address`;
  export function DELETE_ADDRESS(id) {return `${API_ADDRESS_URL}/Delete_Address?id=${id}`};
