import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from "./component/context";
import Layout from './component/layout/layout';
import ProtectedRoute from './component/auth/ProtectedRoute';
import { useSpring, animated } from '@react-spring/web';
import { Toaster } from 'react-hot-toast';

// Lazy load components with better loading states
const Login = React.lazy(() => import('./component/authorization/login'));
const ProductCRUD = React.lazy(() => import('./component/productCRUD/ProductCRUD'));
const Order = React.lazy(() => import('./component/orders/Order'));
const Products = React.lazy(() => import('./component/products/Products'));
const SingleProduct = React.lazy(() => import('./component/singleProduct'));
const OtpPage = React.lazy(() => import('./component/authorization/OTPVerification')); // Lazy load OTP page

// Enhanced loading component with animation
const LoadingFallback = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 20 }
  });

  return (
    <animated.div 
      style={fadeIn} 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white rounded-full"></div>
        </div>
      </div>
      <p className="mt-4 text-lg text-blue-500 font-medium">Loading...</p>
    </animated.div>
  );
};

const App = () => {
  return (
    <ProductProvider>
      
      <Router>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Route for Login */}
              <Route path="/login" element={<Login />} />

              {/* OTP Page (After login, before accessing protected routes) */}
              <Route path="/otp" element={<OtpPage />} /> 

              {/* Protected Routes (Only accessible after OTP verification) */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ProductCRUD />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <ProtectedRoute>
                    <SingleProduct />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
      <Toaster />
    </ProductProvider>
  );
};

export default App;
