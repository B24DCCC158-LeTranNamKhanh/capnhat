// src/types/Transaction.ts (Cập nhật)

export type TransactionType = 'Income' | 'Expense';

export type TransactionCategory = 
  | 'Ăn uống' 
  | 'Di chuyển' 
  | 'Nhà cửa' 
  | 'Lương' 
  | 'Đầu tư' 
  | 'Khác'; 

export interface Transaction {
  id: number;
  description: string;
  amount: number; // Số tiền (luôn dương)
  type: TransactionType; // 'Income' (Thu) hoặc 'Expense' (Chi)
  category: TransactionCategory;
  date: string; // Định dạng YYYY-MM-DD
}