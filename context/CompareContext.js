import React, { useEffect, useState, useContext } from "react";
const CompareContext = React.createContext();
// const CompareUpdateContext = React.createContext();

export function useCompare() {
  return useContext(CompareContext);
}

// export function useCompareUpdate() {
//   return useContext(CompareUpdateContext);
// }

export default function ContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const categoryFetch = (ID) => {
    console.log(ID);
    // useEffect(() => {
    fetch(`/api/product`, {
      method: "GET",
      headers: { id: ID },
    })
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
        setProductsFilter(res);
      });
    // }, []);
  };
  const [supers, setSupers] = useState([
    { name: "victory", _id: "62c16fa07033075c47fdd720", checked: false },
    { name: "shufersal", _id: "62c176532e626395371b1078", checked: false },
    { name: "rami_levi", _id: "62c16fc87033075c47fdd722", checked: false },
  ]);
  // Add to cart
  const addToCart = (product) => {
    // console.log(product);
    const found = cartProducts.find((item) => item._id === product._id);
    if (found === undefined) {
      setCartProducts([...cartProducts, { ...product, qty: 1 }]);
    } else {
      setCartProducts(
        cartProducts.map((item) =>
          item._id === product._id ? { ...product, qty: item.qty + 1 } : item
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
        supers,
        setSupers,
        productsFilter,
        setProductsFilter,
        cartProducts,
        setCartProducts,
        addToCart,
        decrement,
        removeFromCartAllSame,
        categoryFetch,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}
