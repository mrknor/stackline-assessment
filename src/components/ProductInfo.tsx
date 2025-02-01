import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProductInfo: React.FC = () => {
  const product = useSelector((state: RootState) => state.sales.product);

  if (!product) {
    return <div className="w-80 bg-white p-8 border-r">Loading...</div>;
  }

  return (
    <div className="w-80 bg-white p-8 border-r">
      <div className="flex flex-col items-center text-center">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-48 h-48 object-contain mb-6"
        />
        <h1 className="text-xl font-medium text-gray-800 mb-2">{product.title}</h1>
        <p className="text-sm text-gray-500 mb-6 px-4">{product.subtitle}</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {product.tags?.map((tag) => (
            <span 
              key={tag}
              className="px-4 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;