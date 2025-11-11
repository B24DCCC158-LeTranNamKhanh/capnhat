

import React, { useContext } from 'react';
import { Transaction } from '../types/Transaction';
import TransactionContext, { TransactionContextType } from '../context/TransactionContext';

interface Props {
  transaction: Transaction;
}

const TransactionCard: React.FC<Props> = ({ transaction }) => {

  const { dispatch } = useContext<TransactionContextType>(TransactionContext);

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa giao dịch này?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: transaction.id });
    }
  };

  const isIncome = transaction.type === 'Income';

  return (
    <div className={`transaction-card ${isIncome ? 'income' : 'expense'}`}>
      <div className="icon-badge">
        {isIncome ? '⬆️' : '⬇️'}
      </div>
      <div className="transaction-info">
        <p className="transaction-date">{transaction.date}</p>
        <h3 className="transaction-description">{transaction.description}</h3>
        <span className="transaction-category">{transaction.category}</span>
      </div>
      <div className="transaction-amount-area">
        <p className={`transaction-amount ${isIncome ? 'amount-income' : 'amount-expense'}`}>
          {isIncome ? '+' : '-'}{transaction.amount.toLocaleString()} VND
        </p>
        <button
          className="btn btn-delete-small"
          onClick={handleDelete}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;