import React from 'react';
import { Transaction } from '../types/Transaction';
import TransactionCard from './TransactionCard';

interface Props {
  transactions: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="transaction-grid"> 
      {transactions.map(transaction => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;