import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context";
import axios from "axios";
import AddProduct from "../addProduct/index";
import "../styles/animations.css";
import { PlusCircle, Edit2, Trash2, Check, X } from "lucide-react";

const ProductCRUD = () => {
  const { products, error, fetchProducts } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleProductAdded = () => {
    setIsLoading(true);
    fetchProducts().finally(() => setIsLoading(false));
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:5001/api/products/remove`, {
        params: { productId: selectedProduct._id },
      });
      await fetchProducts();
      setShowConfirmation(false);
      setSuccessMessage("Item deleted successfully!");
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditedProduct(product);
  };

  const handleSaveEdit = async () => {
    try {
      setIsLoading(true);
      await axios.put(`http://localhost:5001/api/products/update`, {
        productId: editedProduct._id,
        updatedProduct: editedProduct,
      });
      await fetchProducts();
      setSuccessMessage("Product updated successfully!");
      setTimeout(() => setSuccessMessage(false), 3000);
      setEditedProduct(null);
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "quantity" || name === "discount" ? Number(value) : value;

    setEditedProduct({
      ...editedProduct,
      [name]: name === "bestSellers" ? value === "true" : updatedValue,
    });
  };

  return (
    <div className="w-full mx-auto px-4 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="md:text-3xl font-semibold text-gray-800 animate-slide-in">
          PRODUCT OVERSEE
        </h2>
        <button
          className="flex items-center gap-2 bg-blue-950 text-white px-4 py-2 rounded-lg button-hover ripple-effect"
          onClick={() => setShowAddProductModal(true)}
        >
          <PlusCircle size={20} />
          <span className="text-sm md:text-base">ADD PRODUCT</span>
        </button>
      </div>
      <div className="flex justify-end items-center mb-4">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {showAddProductModal && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-content bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <AddProduct
              onClose={() => setShowAddProductModal(false)}
              onProductAdded={handleProductAdded}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 animate-fade-in">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="success-message fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg hover-scale">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 border-b text-left">S.No</th>
              <th className="px-6 py-3 border-b text-left">Name</th>
              <th className="px-6 py-3 border-b text-left">Price</th>
              <th className="px-6 py-3 border-b text-left">Age</th>
              <th className="px-6 py-3 border-b text-left">Discount</th>
              <th className="px-6 py-3 border-b text-left">Best Seller</th>
              <th className="px-6 py-3 border-b text-left">Quantity</th>
              <th className="px-6 py-3 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className="shimmer">
                    <td colSpan="8" className="h-16"></td>
                  </tr>
                ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="table-row-animate hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 border-b">{index + 1}</td>
                  <td className="px-6 py-4 border-b font-semibold">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 border-b text-green-500">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4 border-b text-center">
                    {product.ageGroup}
                  </td>
                  <td className="px-6 py-4 border-b text-red-500">
                    {editedProduct && editedProduct._id === product._id ? (
                      <input
                        type="number"
                        name="discount"
                        value={
                          editedProduct.discount !== undefined
                            ? editedProduct.discount
                            : ""
                        }
                        onChange={handleChange}
                        className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      `${product.discount || 0}%`
                    )}
                  </td>

                  <td className="px-6 py-4 border-b text-center">
                    {editedProduct && editedProduct._id === product._id ? (
                      <select
                        name="bestSellers"
                        value={editedProduct.bestSellers}
                        onChange={handleChange}
                        className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                          product.bestSellers
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {product.bestSellers ? (
                          <Check size={14} />
                        ) : (
                          <X size={14} />
                        )}
                      </span>
                    )}
                  </td>
                  <td
                    className={`px-6 py-4 border-b text-center ${
                      product.quantity < 5
                        ? "bg-red-100 text-red-800"
                        : product.quantity < 15
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    } font-medium`}
                  >
                    {editedProduct && editedProduct._id === product._id ? (
                      <input
                        type="number"
                        name="quantity"
                        value={editedProduct.quantity || ""}
                        onChange={handleChange}
                        className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      product.quantity
                    )}
                  </td>
                  <td className="px-6 py-4 border-b">
                    <div className="flex gap-3">
                      {editedProduct && editedProduct._id === product._id ? (
                        <button
                          onClick={handleSaveEdit}
                          className="text-green-600 hover:text-green-800 button-hover"
                          title="Save"
                        >
                          <Check size={20} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800 button-hover"
                          title="Edit"
                        >
                          <Edit2 size={20} />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowConfirmation(true);
                        }}
                        className="text-red-600 hover:text-red-800 button-hover"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center px-4 py-8 text-gray-500">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showConfirmation && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-xl max-w-md mx-4 w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this product?
              <span className="block font-bold text-xl mt-2 text-gray-800">
                {selectedProduct.name}
              </span>
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 button-hover"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 button-hover"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCRUD;
