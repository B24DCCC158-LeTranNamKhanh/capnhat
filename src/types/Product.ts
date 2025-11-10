export type Category = 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';

export interface Product {
  id: number;
  ten: string;
  danhMuc: Category;
  gia: number;
  soLuong: number;
  moTa: string;
}
