
import { Transaction } from '../types/Transaction';

export const initialTransactions: Transaction[] = [
  { 
    id: 1, 
    description: 'Tiền lương tháng 10', 
    type: 'Income', 
    amount: 25000000, 
    category: 'Lương', 
    date: '2025-10-30' 
  },
  { 
    id: 2, 
    description: 'Thuê nhà tháng 11', 
    type: 'Expense', 
    amount: 5000000, 
    category: 'Nhà cửa', 
    date: '2025-11-01' 
  },
  { 
    id: 3, 
    description: 'Ăn trưa tại quán A', 
    type: 'Expense', 
    amount: 85000, 
    category: 'Ăn uống', 
    date: '2025-11-02' 
  },
  { 
    id: 4, 
    description: 'Mua xăng xe', 
    type: 'Expense', 
    amount: 70000, 
    category: 'Di chuyển', 
    date: '2025-11-02' 
  },
  { 
    id: 5, 
    description: 'Lãi tiền gửi tiết kiệm', 
    type: 'Income', 
    amount: 1500000, 
    category: 'Đầu tư', 
    date: '2025-11-05' 
  },
  { 
    id: 6, 
    description: 'Phí dịch vụ Internet', 
    type: 'Expense', 
    amount: 300000, 
    category: 'Nhà cửa', 
    date: '2025-11-06' 
  },
  { 
    id: 7, 
    description: 'Mua sách kỹ năng', 
    type: 'Expense', 
    amount: 120000, 
    category: 'Khác', 
    date: '2025-11-07' 
  },
];