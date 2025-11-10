import React, { useContext } from 'react';
import { Product } from '../types/Product';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(ProductContext);

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      dispatch({ type: 'DELETE_PRODUCT', payload: product.id });
    }
  };

  return (
    
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 truncate mb-1">{product.ten}</h2>
        <p className="text-sm text-indigo-600 font-medium mb-2">Danh mục: {product.danhMuc}</p>
        <p className="text-lg font-bold text-green-600 mb-1">Giá: {product.gia.toLocaleString()} VND</p>
        <p className="text-sm text-gray-500">Số lượng: {product.soLuong}</p>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          
          className="flex-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          Chi tiết
        </button>
        <button
          
          className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-600 transition duration-150"
          onClick={() => navigate(`/edit/${product.id}`)}
        >
          Sửa
        </button>
        <button
          
          className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition duration-150"
          onClick={handleDelete}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ProductCard;