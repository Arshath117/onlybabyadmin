import React from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from '@react-spring/web';
import { Tag, Clock } from 'lucide-react';

const ProductCard = ({ product }) => {
  const spring = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 300, friction: 20 }
  });

  return (
    <animated.div style={spring}>
      <div className="group flex flex-col justify-between max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 rounded-xl shadow-lg dark:bg-gray-50 dark:text-gray-900 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <Link to={`/products/${product._id}`} className="overflow-hidden rounded-lg">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={product.image[0]}
              alt={product.name}
              className="object-cover object-center w-full rounded-lg h-48 sm:h-60 md:h-72 lg:h-80 transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </div>
        </Link>

        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-semibold tracking-wide text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-green-600">
              <Tag size={16} />
              <span>₹ {product.price}</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600">
              <Clock size={16} />
              <span>{product.ageGroup}</span>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default ProductCard;