import { createContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API}/api/products/get`);

      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, error, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
