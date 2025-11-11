

export type SavingType = 'Deposit' | 'Withdrawal'; // Gửi hoặc Rút

export interface SavingEntry {
  id: number;
  description: string;
  amount: number; // Số tiền (luôn dương)
  date: string; // Định dạng YYYY-MM-DD
  type: SavingType; // 'Deposit' (Gửi) hoặc 'Withdrawal' (Rút)
}