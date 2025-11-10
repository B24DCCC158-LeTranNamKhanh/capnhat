import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(ProductContext);
  const product = state.products.find(p => p.id === Number(id));

  if (!product) {
    
    return (
      <div className="p-10 max-w-2xl mx-auto text-center bg-white rounded-xl shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-red-600 mb-4">🚫 Lỗi</h1>
        <p className="text-gray-700">Sản phẩm không tồn tại hoặc đã bị xóa.</p>
        <button
          className="mt-6 bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition duration-150"
          onClick={() => navigate('/')}
        >
          Trang chủ
        </button>
      </div>
    );
  }

  return (
    
    <div className="p-8 max-w-lg mx-auto bg-white rounded-xl shadow-2xl mt-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">
        ✨ {product.ten}
      </h2>
      <div className="space-y-3 text-lg text-gray-700">
        <p>
          <strong className="font-semibold text-indigo-600 mr-2">Danh mục:</strong> 
          <span className="bg-indigo-50 px-2 py-0.5 rounded-full text-indigo-800 text-sm font-medium">{product.danhMuc}</span>
        </p>
        <p>
          <strong className="font-semibold text-green-600 mr-2">Giá:</strong> 
          <span className="font-bold text-xl">{product.gia.toLocaleString()} VND</span>
        </p>
        <p>
          <strong className="font-semibold text-gray-600 mr-2">Số lượng:</strong> 
          {product.soLuong}
        </p>
        <div className="pt-3 border-t mt-3">
            <strong className="block font-semibold text-gray-600 mb-1">Mô tả chi tiết:</strong> 
            <p className="text-gray-500 italic leading-relaxed">{product.moTa || 'Không có mô tả.'}</p>
        </div>
      </div>
      <button
        
        className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
        onClick={() => navigate(-1)}
      >
        &larr; Quay lại
      </button>
    </div>
  );
};

export default ProductDetailPage;