import React, { useState, useContext, useEffect } from "react";
const CompareContext = React.createContext();
// const CompareUpdateContext = React.createContext();

export function useCompare() {
  return useContext(CompareContext);
}

export default function ContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [allSupers, setAllSupers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [positions, setPositions] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch(`/api/location`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setLocations(res));

    fetch(`/api/supermarket`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setAllSupers(res.map((v) => ({ ...v, checked: false }))));
    fetch(`/api/category`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setCategories(res));
  }, []);
  const categoryFetch = (ID) => {
    fetch(`/api/product`, {
      method: "GET",
      headers: { id: ID, filter: 1 },
    })
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
        setProductsFilter(res);
      });
  };

  //get the current user
  const getUser = (email) => {
    fetch(`/api/user/${email}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setCurrentUser(res[0].carts);
      });
  };

  // Add to cart
  const addToCart = (product) => {
    const found = cartProducts.find((item) => {
      return item._id === product._id || item.product._id === product._id;
    });
    if (found === undefined) {
      setCartProducts([
        ...cartProducts,
        { product: { ...product }, qty: 1, _id: product._id },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((item) =>
          item._id === product._id || item.product._id === product._id
            ? { ...item, qty: item.qty + 1, _id: product._id }
            : item
        )
      );
    }
  };

  // //decrement the product in 1

  const decrement = (product) => {
    const found = cartProducts.find((item) => item._id === product._id);
    if (found.qty === 1) {
      removeFromCartAllSame(found._id);
    } else {
      setCartProducts(
        cartProducts.map((item) =>
          item._id === product._id ? { ...product, qty: item.qty - 1 } : item
        )
      );
    }
  };

  //onclick the 'remove From Cart' button remove from the cart the products
  const removeFromCartAllSame = (id) => {
    setCartProducts(cartProducts.filter((item) => item._id !== id));
  };

  return (
    <CompareContext.Provider
      value={{
        products,
        setProducts,
        productsFilter,
        setProductsFilter,
        cartProducts,
        setCartProducts,
        addToCart,
        decrement,
        removeFromCartAllSame,
        categoryFetch,
        getUser,
        currentUser,
        setCurrentUser,
        locations,
        allSupers,
        setAllSupers,
        positions,
        setPositions,
        categories,
        cart,
        setCart,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}
