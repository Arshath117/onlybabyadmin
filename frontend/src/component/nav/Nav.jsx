import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname); // Set selected based on the current path

  const handleSelect = (path) => {
    setSelected(path);
  };

  return (
    <div className="sticky top-0 w-full md:px-10 px-3 py-5 flex justify-between items-center bg-blue-950 text-white z-50">
      <div className="font-logo text-xl md:text-2xl lg:text-4xl font-bold">Only4Baby</div>

      {/* Menu Section */}
      <div className="flex space-x-3 text-[9px] md:text-[14px] border-2 border-blue-200 py-1 px-2 rounded-xl">
        <Link
          to="/products"
          className={`px-3 py-2 rounded-lg cursor-pointer ${
            selected === "/products" ? "bg-white text-blue-950" : ""
          }`}
          onClick={() => handleSelect("/products")}
        >
          PRODUCTS
        </Link>
        <Link
          to="/"
          className={`px-3 py-2 rounded-lg cursor-pointer ${
            selected === "/" ? "bg-white text-blue-950" : ""
          }`}
          onClick={() => handleSelect("/")}
        >
          OVERSEE
        </Link>
        <Link
          to="/orders"
          className={`px-3 py-2 rounded-lg cursor-pointer ${
            selected === "/orders" ? "bg-white text-blue-950" : ""
          }`}
          onClick={() => handleSelect("/orders")}
        >
          ORDERS
        </Link>
      </div>

      {/* Login Section */}
      <div>
        <p>LOGIN</p>
      </div>
    </div>
  );
};

export default Nav;
