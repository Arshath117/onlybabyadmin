import React from "react";
import Nav from "./component/nav/Nav";
import ProductCRUD from "./component/productCRUD/ProductCRUD";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./component/orders/Order";
import { ProductProvider } from "./component/context";
import Products from "./component/products/Products";
import SingleProduct from "./component/singleProduct/SingleProduct";

const App = () => {
  return (
    <ProductProvider>
      <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<ProductCRUD />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<SingleProduct />} />
          </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;
