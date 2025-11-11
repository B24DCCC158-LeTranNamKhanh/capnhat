
import React, { useContext, useState, useMemo } from 'react';
import TransactionContext, { TransactionContextType } from '../context/TransactionContext';
import { Transaction } from '../types/Transaction';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import SavingsTransactionForm from '../components/SavingsTransactionForm'; // IMPORT MỚI
import SavingsSummary from '../components/SavingsSummary'; // IMPORT MỚI

// Định nghĩa các tên Tab/Mục Menu
type Tab = 'form' | 'list' | 'saving_deposit' | 'saving_list' | 'saving_withdraw'; 

const Dashboard: React.FC = () => {
  const { state } = useContext<TransactionContextType>(TransactionContext); 
  const transactions: Transaction[] = state.transactions;

  // State QUẢN LÝ TAB/MỤC HIỂN THỊ
  const [activeTab, setActiveTab] = useState<Tab>('list'); 

  // ... (giữ nguyên state lọc, tìm kiếm, phân trang) ...

  const summary = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { totalIncome, totalExpense, netBalance: totalIncome - totalExpense }; 
  }, [transactions]);
  
  const [filterType, setFilterType] = useState<string>('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const filteredTransactions = useMemo(() => {
    setCurrentPage(1); 
    
    return transactions
      .filter(t => (filterType ? t.type === filterType : true))
      .filter(t => t.description.toLowerCase().includes(search.toLowerCase()));
  }, [transactions, filterType, search]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTransactions.slice(start, end);
  }, [filteredTransactions, currentPage]);

  return (
    <div className="app-container">
      
      {/* NÚT 3 sọc  */}
      <button className="menu-toggle-btn">
        ☰
      </button>

      {/* CÁC MỤC BÊN TRONG */}
      <div className="sidebar-container">
        <ul className="sidebar-menu">
          <li 
            className={`menu-item ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            📜 Lịch Sử Giao Dịch
          </li>
          <li 
            className={`menu-item ${activeTab === 'form' ? 'active' : ''}`}
            onClick={() => setActiveTab('form')}
          >
            ✍️ Thêm Giao Dịch Khác
          </li>
          
          {/* SỔ TIẾT KIỆM  */}
          <li 
            className={`menu-item ${activeTab === 'saving_list' ? 'active' : ''}`}
            onClick={() => setActiveTab('saving_list')}
          >
            💰 Sổ Tiết Kiệm
          </li>
          
          {/* GỬI TIẾT KIỆM MỚI  */}
          <li 
            className={`menu-item ${activeTab === 'saving_deposit' ? 'active' : ''}`} 
            onClick={() => setActiveTab('saving_deposit')}
          >
            ➕ Gửi Tiết Kiệm
          </li>

        </ul>
      </div>

      {/* KHU VỰC NỘI DUNG CHÍNH */}
      <div className="main-content-wrapper">
        <h1 className="main-title">📊 Quản lý Chi tiêu Cá nhân</h1>
        
        {/* KHỐI 1: SUMMARY BOARD */}
        <div className="summary-board">
            <div className="summary-card balance">
                <p className="summary-label">Số dư Thu/Chi</p>
                <p className="summary-value balance-value">
                {summary.netBalance.toLocaleString()} VND
                </p>
            </div>
            <div className="summary-card income">
                <p className="summary-label">Tổng thu nhập</p>
                <p className="summary-value income-value">
                +{summary.totalIncome.toLocaleString()} VND
                </p>
            </div>
            <div className="summary-card expense">
                <p className="summary-label">Tổng chi tiêu</p>
                <p className="summary-value expense-value">
                -{summary.totalExpense.toLocaleString()} VND
                </p>
            </div>
        </div>

        {/* KHỐI 2: NỘI DUNG HIỂN THỊ THEO MỤC CHỌN  */}
        <div className="main-content-layout">
          
          {/* NỘI DUNG MỤC LỊCH SỬ  */}
          {activeTab === 'list' && (
            <div className="transaction-list-area">
              <h2 className="section-title">📜 Lịch sử giao dịch</h2>
              <div className="filter-search-bar">
                <select 
                  className="filter-select-type form-select"
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">Tất cả</option>
                  <option value="Income">Thu nhập</option>
                  <option value="Expense">Chi tiêu</option>
                </select>
                <SearchBar searchText={search} onSearchChange={setSearch} />
              </div>

              <TransactionList transactions={paginatedTransactions} />

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
              {filteredTransactions.length === 0 && (
                <p className="no-data-message">Không có giao dịch nào phù hợp.</p>
              )}
            </div>
          )}

          {/* NỘI DUNG MỤC THÊM GIAO DỊCH KHÁC  */}
          {activeTab === 'form' && (
            <div className="sidebar-form">
              <h2 className="section-title">✍️ Thêm giao dịch khác (Thu/Chi)</h2>
              <TransactionForm /> 
            </div>
          )}

          {/* NỘI DUNG MỤC GỬI TIẾT KIỆM  */}
          {activeTab === 'saving_deposit' && ( 
            <div className="sidebar-form">
              <h2 className="section-title">➕ Gửi Tiết Kiệm Mới</h2>
              <SavingsTransactionForm 
                initialType='Deposit'
                onSubmission={() => setActiveTab('saving_list')} 
              /> 
            </div>
          )}
          
          {/* NỘI DUNG MỤC RÚT TIỀN  */}
          {activeTab === 'saving_withdraw' && ( 
            <div className="sidebar-form">
              <h2 className="section-title">➖ Rút Tiền Từ Tiết Kiệm</h2>
              <SavingsTransactionForm 
                initialType='Withdrawal'
                onSubmission={() => setActiveTab('saving_list')} 
              /> 
            </div>
          )}

          {/* NỘI DUNG MỤC SỔ TIẾT KIỆM  */}
          {activeTab === 'saving_list' && ( 
            <div className="savings-content-area">
              <h2 className="section-title">💰 Sổ Tiết Kiệm</h2>
              {/* Thêm prop onWithdrawClick để chuyển sang tab RÚT */}
              <SavingsSummary onWithdrawClick={() => setActiveTab('saving_withdraw')} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;