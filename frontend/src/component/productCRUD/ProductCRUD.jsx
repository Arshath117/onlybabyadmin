import React, { useContext, useState } from "react";
import { ProductContext } from "../context";
import axios from "axios";
import AddProduct from "../addProduct/AddProduct";

const ProductCRUD = () => {
  const { products, error, fetchProducts } = useContext(ProductContext); // Assuming `fetchProducts` refreshes the list
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const handleProductAdded = () => {
    fetchProducts(); // Refresh the product list after adding a new product
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/products/remove`, {
        params: { productId: selectedProduct._id },
      });
      fetchProducts(); // Refresh the product list
      setShowConfirmation(false); // Close the popup
      setSuccessMessage("Item deleted successfully!"); // Show success message
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="flex justify-between items-center ">
        <h2 className=" md:text-3xl font-semibold text-center text-gray-800 mb-6">
          PRODUCT OVERSEE
        </h2>
        <div
          className="text-[10px] md:text-[16px]  border-2 border-blue-100 bg-blue-950 text-white px-3 py-2 rounded-lg "
          onClick={() => setShowAddProductModal(true)}
        >
          ADD PRODUCT
        </div>
      </div>

      {showAddProductModal && (
        <AddProduct
          onClose={() => setShowAddProductModal(false)}
          onProductAdded={handleProductAdded}
        />
      )}

      {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}

      <div>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
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
              <th className="px-6 py-3 border-b text-left">Edit</th>
              <th className="px-6 py-3 border-b text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => {
                const quantityClass =
                  product.quantity < 5
                    ? "bg-red-800 text-white"
                    : product.quantity < 15
                    ? "bg-blue-400 text-white"
                    : "bg-green-500 text-white";

                return (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out"
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
                      {product.discount}%
                    </td>
                    <td className="px-6 py-4 border-b text-center">
                      {product.bestSeller ? "✔️" : "❌"}
                    </td>
                    <td
                      className={`px-6 py-4 border-b text-center ${quantityClass}`}
                    >
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 border-b text-blue-500 cursor-pointer hover:text-blue-700">
                      ✏️ Edit
                    </td>
                    <td
                      className="px-6 py-4 border-b text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowConfirmation(true);
                      }}
                    >
                      🗑️ Delete
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="text-center px-4 py-2">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this product?
              <br />
              {<div className="font-bold text-2xl">{selectedProduct.name}</div>}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
