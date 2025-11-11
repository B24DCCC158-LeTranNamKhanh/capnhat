
import React, { useState, useContext } from 'react';
import { Transaction, TransactionCategory, TransactionType } from '../types/Transaction';
import TransactionContext from '../context/TransactionContext';

//  Loại bỏ 'Tiết kiệm'
const categories: TransactionCategory[] = ['Ăn uống', 'Di chuyển', 'Nhà cửa', 'Lương', 'Đầu tư', 'Khác'];

const TransactionForm: React.FC = () => {
  const { dispatch, state } = useContext(TransactionContext);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<TransactionType>('Expense');
  const [category, setCategory] = useState<TransactionCategory | ''>('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!description || description.length < 3) errs.description = 'Mô tả tối thiểu 3 ký tự';
    if (amount <= 0 || !Number.isInteger(amount)) errs.amount = 'Số tiền phải là số nguyên dương';
    if (!category) errs.category = 'Chọn danh mục';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    const newId = Math.max(0, ...state.transactions.map(t => t.id)) + 1;

    const newTransaction: Transaction = {
        id: newId,
        description,
        amount,
        type,
        category: category as TransactionCategory,
        date,
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction }); 

    // Reset form
    setDescription('');
    setAmount(0);
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className={`form-${type === 'Income' ? 'income' : 'expense'}-tracker`}>
      <div className="form-group-container">
        {/* Type selector */}
        <div className="form-group">
          <label className="form-label">Loại giao dịch:</label>
          <select 
            className={`form-select ${type === 'Income' ? 'income-select' : 'expense-select'}`}
            value={type} 
            onChange={e => setType(e.target.value as TransactionType)}
          >
            <option value="Expense">Chi tiêu (Expense)</option>
            <option value="Income">Thu nhập (Income)</option>
          </select>
        </div>
        
        {/* Amount */}
        <div className="form-group">
          <label className="form-label">Số tiền (VND):</label>
          <input 
            type="number" 
            className="form-input" 
            value={amount} 
            onChange={e => setAmount(Number(e.target.value))} 
            placeholder="500000"
          />
          {errors.amount && <p className="error-message">{errors.amount}</p>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="form-label">Mô tả:</label>
          <input 
            className="form-input" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="Cà phê sáng"
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="form-label">Danh mục:</label>
          <select
            className="form-select"
            value={category}
            onChange={e => setCategory(e.target.value as TransactionCategory)}
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p className="error-message">{errors.category}</p>}
        </div>

        {/* Date */}
        <div className="form-group">
          <label className="form-label">Ngày giao dịch:</label>
          <input 
            type="date" 
            className="form-input" 
            value={date} 
            onChange={e => setDate(e.target.value)} 
          />
        </div>
      </div>

      <button 
        type="submit" 
        className={`btn btn-submit ${type === 'Income' ? 'btn-submit-income' : 'btn-submit-expense'}`}
      >
        Thêm Giao Dịch
      </button>
    </form>
  );
};

export default TransactionForm;