

import React, { useState, useContext } from 'react';
import { SavingEntry, SavingType } from '../types/Saving';
import { Transaction } from '../types/Transaction'; 
import TransactionContext, { TransactionContextType } from '../context/TransactionContext';

interface Props {
  onSubmission: () => void;
  initialType: SavingType; // Xác định form đang ở chế độ Gửi hay Rút
}

const SavingsTransactionForm: React.FC<Props> = ({ onSubmission, initialType }) => {
  const { dispatch, state } = useContext<TransactionContextType>(TransactionContext); 

  const [type, setType] = useState<SavingType>(initialType);
  const [description, setDescription] = useState(initialType === 'Deposit' ? 'Gửi tiết kiệm' : 'Rút tiền tiết kiệm');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Tính tổng số dư hiện tại của sổ tiết kiệm
  const currentSavingsBalance = state.savings
    .reduce((sum, entry) => {
        if (entry.type === 'Deposit') return sum + entry.amount;
        if (entry.type === 'Withdrawal') return sum - entry.amount;
        return sum;
    }, 0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (amount <= 0 || !Number.isInteger(amount)) errs.amount = 'Số tiền phải là số nguyên dương';
    if (!description || description.length < 3) errs.description = 'Mô tả tối thiểu 3 ký tự';

    // Rút tiền không được vượt quá số dư hiện tại
    if (type === 'Withdrawal' && amount > currentSavingsBalance) {
        errs.amount = `Số tiền rút vượt quá số dư sổ tiết kiệm (${currentSavingsBalance.toLocaleString()} VND)`;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Lấy ID mới cho SAVING ENTRY (sổ tiết kiệm)
    const newSavingId = Math.max(0, ...state.savings.map(t => t.id)) + 1;
    
    const newSavingEntry: SavingEntry = {
        id: newSavingId,
        description,
        amount,
        date,
        type, 
    };

    // 1. Cập nhật Sổ Tiết Kiệm
    dispatch({ type: 'ADD_SAVING', payload: newSavingEntry }); 

    // 2. Cập nhật Sổ Thu/Chi 
    const newTransactionId = Math.max(0, ...state.transactions.map(t => t.id)) + 1;

    if (type === 'Deposit') {
      // GỬI TIỀN: Tạo giao dịch Chi tiêu trong sổ Thu/Chi
      const newTransaction: Transaction = {
          id: newTransactionId,
          description: `Chuyển vào tiết kiệm: ${description}`,
          amount,
          type: 'Expense',
          category: 'Khác', 
          date,
      };
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });

    } else if (type === 'Withdrawal') {
      // RÚT TIỀN: Tạo giao dịch Thu nhập trong sổ Thu/Chi
      const newTransaction: Transaction = {
          id: newTransactionId,
          description: `Nhận từ tiết kiệm: ${description}`,
          amount,
          type: 'Income',
          category: 'Khác', 
          date,
      };
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    }
    
    // Reset form và chuyển tab
    setAmount(0);
    setDescription(type === 'Deposit' ? 'Gửi tiết kiệm' : 'Rút tiền tiết kiệm');
    onSubmission(); 
  };

  return (
    <form onSubmit={handleSubmit} className="form-expense-tracker">
        <h3 className="mb-4 font-bold">Số dư hiện tại: {currentSavingsBalance.toLocaleString()} VND</h3>
        
        {/* Type Selector (Giữ nguyên form đang ở chế độ nào) */}
        <div className="form-group">
          <label className="form-label">Loại Giao Dịch:</label>
          <select 
            className="form-select"
            value={type}
            onChange={e => {
                const newType = e.target.value as SavingType;
                setType(newType);
                setDescription(newType === 'Deposit' ? 'Gửi tiết kiệm' : 'Rút tiền tiết kiệm');
            }}
          >
            <option value="Deposit">Gửi Tiền</option>
            <option value="Withdrawal" disabled={currentSavingsBalance <= 0}>Rút Tiền</option>
          </select>
        </div>
        
        {/* Amount */}
        <div className="form-group">
          <label className="form-label">Số tiền ({type === 'Deposit' ? 'Gửi' : 'Rút'}):</label>
          <input 
            type="number" 
            className="form-input" 
            value={amount} 
            onChange={e => setAmount(Number(e.target.value))} 
            placeholder="5000000"
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
            placeholder="Gửi/Rút tiết kiệm ngân hàng"
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
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
      

      <button 
        type="submit" 
        className={`btn btn-submit ${type === 'Deposit' ? 'btn-submit-income' : 'btn-submit-expense'}`}
      >
        {type === 'Deposit' ? 'Xác nhận Gửi' : 'Xác nhận Rút'}
      </button>
    </form>
  );
};

export default SavingsTransactionForm;