import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { Transaction } from '../types/Transaction';
import { SavingEntry } from '../types/Saving'; 
import { initialTransactions } from '../data/initialTransactions'; 

// 1. STATE & ACTION TYPES
type State = {
  transactions: Transaction[];
  savings: SavingEntry[]; // THÊM STATE SAVINGS
};

type Action =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: number }
  | { type: 'ADD_SAVING'; payload: SavingEntry } // Thêm giao dịch gửi/rút vào sổ tiết kiệm
  | { type: 'REMOVE_SAVING'; payload: number }; // THÊM ACTION XÓA MỤC TIẾT KIỆM (Dùng cho Rút tiền nếu cần)

export type TransactionContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

// 2. INITIAL STATE
const initialSavings: SavingEntry[] = [
    { id: 101, description: 'Gửi tiết kiệm kỳ 1', amount: 5000000, date: '2025-01-01', type: 'Deposit' },
    { id: 102, description: 'Gửi tiết kiệm kỳ 2', amount: 2000000, date: '2025-02-15', type: 'Deposit' },
];

const initialState: State = {
  transactions: initialTransactions,
  savings: initialSavings, 
};

// 3. CONTEXT SETUP 
const TransactionContext = createContext<TransactionContextType>({
  state: initialState,
  dispatch: () => null,
});

// 4. REDUCER FUNCTION
const transactionReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] }; 
      
    case 'ADD_SAVING': 
      return { 
        ...state, 
        savings: [action.payload, ...state.savings] 
      };
      
    case 'REMOVE_SAVING': 
      // Hiện tại không dùng, nhưng giữ lại cho tương lai (nếu muốn xóa 1 mục gửi)
      return { 
        ...state, 
        savings: state.savings.filter(s => s.id !== action.payload) 
      };
      
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
      
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) };
      
    default:
      return state;
  }
};

// 5. PROVIDER COMPONENT 
export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;