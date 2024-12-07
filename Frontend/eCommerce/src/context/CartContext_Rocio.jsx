import { createContext, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useHttpMikel";
import { AuthContext } from "./AuthContext";

// Helpers
const findItemIndex = (items, id) => items.findIndex((item) => item.id === id);

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("shoppingCart", JSON.stringify({ items: cart }));
};

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

function CartContextProvider({ children }) {
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem("shoppingCart");
    return savedCart ? JSON.parse(savedCart).items || [] : [];
  });
  const [updateCart, setUpdateCart] = useState(null);
  const { isAuthenticated, setIsAuthenticated, authToken } =
    useContext(AuthContext);
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const syncCart = (event) => {
      if (event.key === "shoppingCart") {
        if (event.newValue === null) {
          console.log("La clave shoppingCart ha sido eliminada");
          setItems([]);
        } else {
          setItems(JSON.parse(event.newValue).items || []);
        }
      }
    };
    window.addEventListener("storage", syncCart);
    return () => {
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  /*
  const { fetchData, isLoading } = useFetch({
    Url: "http://localhost:3000/cart",
    type: "GET",
    token: null,
    params: null,
    condition: isAuthenticated,
  });

  useEffect(() => {
    if (!isLoading && fetchData) {
      setCartData(fetchData);
    }
  }, [isLoading, fetchData]);
  */

  useEffect(() => {
    if (isAuthenticated && cartData) {
      const localCart = JSON.parse(localStorage.getItem("shoppingCart")) || {
        items: [],
      };
      const mergedCart = [...localCart.items];

      cartData.items.forEach((backendItem) => {
        const existingIndex = mergedCart.findIndex(
          (localItem) => localItem.id === backendItem.id
        );

        if (existingIndex !== -1) {
          mergedCart[existingIndex].quantity += backendItem.quantity;
        } else {
          mergedCart.push(backendItem);
        }
      });

      setItems(mergedCart);
      localStorage.setItem(
        "shoppingCart",
        JSON.stringify({ items: mergedCart })
      );

      setIsAuthenticated(false);
      setCartData(null);
      setUpdateCart(mergedCart);
    }
  }, [isAuthenticated, cartData, setIsAuthenticated]);

  /*
  const { fetchData: cartUpdateResponse } = useFetch({
    Url: "http://localhost:3000/cart/update",
    type: "POST",
    token: null,
    params: { items: updateCart },
    condition: updateCart,
  });

  useEffect(() => {
    if (cartUpdateResponse) {
      console.log("Carrito actualizado en el backend", cartUpdateResponse);
    }
  }, [cartUpdateResponse]);
*/

  const addItem = (item) => {
    setItems((prevItems) => {
      const indexItemAdd = findItemIndex(prevItems, item.id);
      let updatedItems;

      if (indexItemAdd === -1) {
        updatedItems = [...prevItems, { ...item, quantity: 1 }];
      } else {
        updatedItems = [...prevItems];
        updatedItems[indexItemAdd] = {
          ...updatedItems[indexItemAdd],
          quantity: updatedItems[indexItemAdd].quantity + 1,
        };
      }
      saveCartToLocalStorage(updatedItems);
      if (authToken) {
        setUpdateCart(updatedItems);
      }
      return updatedItems;
    });
  };

  const removeItem = (id) => {
    setItems((prevItems) => {
      const indexItemRemove = findItemIndex(prevItems, id);
      if (indexItemRemove === -1) return prevItems;

      const updatedItems = [...prevItems];
      const existingItem = updatedItems[indexItemRemove];

      if (existingItem.quantity === 1) {
        updatedItems.splice(indexItemRemove, 1);
      } else {
        updatedItems[indexItemRemove] = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
      }
      saveCartToLocalStorage(updatedItems);
      if (authToken) {
        setUpdateCart(updatedItems);
      }
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("shoppingCart");
    if (authToken) {
      setUpdateCart([]);
    }
  };

  const clearCartLogout = () => {
    setItems([]);
    localStorage.removeItem("shoppingCart");
  };

  const ctxValue = {
    items,
    addItem,
    removeItem,
    clearCart,
    clearCartLogout,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export { CartContext, CartContextProvider };
