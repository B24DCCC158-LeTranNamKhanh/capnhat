import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import ProductContext from '../context/ProductContext';

const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const { state } = useContext(ProductContext);
  const product = state.products.find(p => p.id === Number(id));
  
  
  return (
    <div className="p-4 bg-gray-50 min-h-screen"> 
      {/* Fallback for non-existent product */}
      {product ? (
        <ProductForm product={product} />
      ) : (
        <p className="p-8 max-w-lg mx-auto text-center text-red-600 bg-white rounded-xl shadow-lg mt-8">
          Sản phẩm không tồn tại
        </p>
      )}
    </div>
  );
};

export default EditProductPage;