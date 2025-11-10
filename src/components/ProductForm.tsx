import React, { useState, useContext } from 'react';
import { Product, Category } from '../types/Product';
import ProductContext from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

interface Props {
  product?: Product;
}

const categories: Category[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

const ProductForm: React.FC<Props> = ({ product }) => {
  const isEdit = !!product;
  const navigate = useNavigate();
  const { dispatch, state } = useContext(ProductContext);

  const [ten, setTen] = useState(product?.ten || '');
  const [danhMuc, setDanhMuc] = useState<Category | ''>(product?.danhMuc || '');
  const [gia, setGia] = useState(product?.gia || 0);
  const [soLuong, setSoLuong] = useState(product?.soLuong || 0);
  const [moTa, setMoTa] = useState(product?.moTa || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!ten || ten.length < 3) errs.ten = 'Tên sản phẩm tối thiểu 3 ký tự';
    if (gia <= 0) errs.gia = 'Giá phải là số dương';
    if (soLuong <= 0 || !Number.isInteger(soLuong)) errs.soLuong = 'Số lượng phải là số nguyên dương';
    if (!danhMuc) errs.danhMuc = 'Chọn danh mục';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEdit && product) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: { ...product, ten, danhMuc: danhMuc as Category, gia, soLuong, moTa } });
    } else {
      const newId = Math.max(0, ...state.products.map(p => p.id)) + 1;
      dispatch({
        type: 'ADD_PRODUCT',
        payload: { id: newId, ten, danhMuc: danhMuc as Category, gia, soLuong, moTa }
      });
    }
    navigate('/');
  };

  return (
    
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        {isEdit ? '✏️ Chỉnh sửa sản phẩm' : '✨ Thêm sản phẩm mới'}
      </h2>
      
      {/* Input Group Styling */}
      <div className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm:</label>
          <input 
            className="border border-gray-300 p-2 w-full rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
            value={ten} 
            onChange={e => setTen(e.target.value)} 
          />
          {errors.ten && <p className="mt-1 text-xs text-red-600">{errors.ten}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục:</label>
          <select
            className="border border-gray-300 p-2 w-full rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            value={danhMuc}
            onChange={e => setDanhMuc(e.target.value as Category)}
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.danhMuc && <p className="mt-1 text-xs text-red-600">{errors.danhMuc}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VND):</label>
          <input 
            type="number" 
            className="border border-gray-300 p-2 w-full rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
            value={gia} 
            onChange={e => setGia(Number(e.target.value))} 
          />
          {errors.gia && <p className="mt-1 text-xs text-red-600">{errors.gia}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng:</label>
          <input 
            type="number" 
            className="border border-gray-300 p-2 w-full rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
            value={soLuong} 
            onChange={e => setSoLuong(Number(e.target.value))} 
          />
          {errors.soLuong && <p className="mt-1 text-xs text-red-600">{errors.soLuong}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả:</label>
          <textarea 
            rows={3}
            className="border border-gray-300 p-2 w-full rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" 
            value={moTa} 
            onChange={e => setMoTa(e.target.value)} 
          />
        </div>
      </div>

      <button 
        type="submit" 
        
        className="w-full bg-indigo-600 text-white font-semibold tracking-wide px-4 py-3 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        {isEdit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
      </button>
    </form>
  );
};

export default ProductForm;