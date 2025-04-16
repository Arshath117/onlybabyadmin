import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster from react-hot-toast

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [dispatchStatus, setDispatchStatus] = useState({}); // Store the dispatch status for each order
    const [currentTab, setCurrentTab] = useState("Pending"); // Track current tab

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://admin.onlybaby.co.in:5002/api/orders');
                if (Array.isArray(response.data)) {
                    const allOrders = response.data.flatMap(item => item.orders || []);
                    setOrders(allOrders);
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (error) {
                setError("Error fetching orders. Please try again later.");
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    const handleDispatchChange = (orderId, isDelivered) => {
        setDispatchStatus(prevStatus => ({
            ...prevStatus,
            [orderId]: isDelivered,
        }));
    };

    const handleUpdateClick = async (orderId) => {
        const isDelivered = dispatchStatus[orderId];

        if (isDelivered === undefined) {
            toast.error("Please select a dispatch status.");
            return;
        }

        try {
            const response = await axios.put("http://admin.onlybaby.co.in:5002/api/orders/update", {
                orderId,
                isDelivered,
            });

            toast.success('Order status updated to Dispatched!', {
                duration: 5000,
                position: 'top-right',
                style: {
                    background: 'green',
                    color: 'white',
                },
            });

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? { ...order, isDelivered, isUpdated: true }
                        : order
                )
            );
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error('Error updating order status. Please try again later.', {
                duration: 5000,
                position: 'top-right',
                style: {
                    background: 'red',
                    color: 'white',
                },
            });
        }
    };

    const filteredOrders = orders.filter(order =>
        currentTab === "Pending" ? !order.isDelivered : order.isDelivered
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 text-center">
                    Orders Dashboard
                </h1>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        onClick={() => setCurrentTab("Pending")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            currentTab === "Pending"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        Pending Orders
                    </button>
                    <button
                        onClick={() => setCurrentTab("Dispatched")}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            currentTab === "Dispatched"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        Dispatched Orders
                    </button>
                </div>

                {filteredOrders.length === 0 && !error && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                        <p className="text-gray-500">
                            {currentTab === "Pending" ? "No pending orders." : "No dispatched orders."}
                        </p>
                    </div>
                )}

                <div className="space-y-6">
                    {filteredOrders.map((order) => (
                        <div
                            key={order._id}
                            className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-500
                                        hover:shadow-xl hover:translate-y-[-2px] cursor-pointer
                                        ${order.isDelivered ? 'bg-green-50' : ''}`}
                        >
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm">
                                            #{order._id.slice(-6)}
                                        </span>
                                    </h2>
                                    <div className="flex items-center space-x-3">
                                        <label htmlFor={`dispatch-${order._id}`} className="text-sm text-gray-600">
                                            Status:
                                        </label>
                                        <select
                                            id={`dispatch-${order._id}`}
                                            onChange={(e) => handleDispatchChange(order._id, e.target.value === "yes")}
                                            defaultValue={order.isDelivered ? "yes" : "no"}
                                            className="form-select rounded-full border-2 border-gray-200 shadow-sm"
                                            disabled={order.isUpdated || order.isDelivered}
                                        >
                                            <option value="no">🕒 Pending</option>
                                            <option value="yes">✈️ Dispatched</option>
                                        </select>
                                    </div>
                                </div>

                                {order.isDelivered && (
                                    <div className="mt-4 text-center text-white bg-green-600 p-2 rounded-lg">
                                        <span className="text-sm font-semibold">This order has been dispatched!</span>
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleUpdateClick(order._id)}
                                        className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-purple-500 transition-colors duration-300"
                                        disabled={order.isUpdated || dispatchStatus[order._id] === undefined || order.isDelivered}
                                    >
                                        Update
                                    </button>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <h3 className="text-md font-medium text-gray-900 mb-2">Shipping Address</h3>
                                    {order.shippingAddress ? (
                                        <div className="text-sm text-gray-600">
                                            <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                            <p>{order.shippingAddress.streetAddress}</p>
                                            <p>{order.shippingAddress.city}, {order.shippingAddress.country} {order.shippingAddress.postcode}</p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">No shipping address available.</p>
                                    )}
                                </div>

                                <div className="border-t border-gray-100 mt-4 pt-4">
                                    <h3 className="text-md font-medium text-gray-900 mb-2">Order Items</h3>
                                    {order.orderItems && order.orderItems.length > 0 ? (
                                        <ul className="divide-y divide-gray-100">
                                            {order.orderItems.map(item => (
                                                <li key={item._id} 
                                                    className="py-2 flex justify-between items-center px-2 rounded-lg">
                                                    <span className="text-sm text-gray-600">{item.name}</span>
                                                    <div className="text-sm">
                                                        <span className="text-gray-500">{item.quantity} × </span>
                                                        <span className="font-medium text-purple-600">₹{item.price}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500">No items found in this order.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Toaster />
        </div>
    );
};

export default Order;