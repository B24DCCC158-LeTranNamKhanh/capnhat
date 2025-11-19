import React, { useContext, useMemo } from 'react';
import TransactionContext, { TransactionContextType } from '../context/TransactionContext';
import { SavingEntry } from '../types/Saving';

// Thêm prop để mở form rút tiền (chuyển tab)
interface Props {
  onWithdrawClick: () => void;
}

const SavingsSummary: React.FC<Props> = ({ onWithdrawClick }) => {
    const { state } = useContext<TransactionContextType>(TransactionContext); 
    // Sắp xếp các mục tiết kiệm theo ngày gần nhất
    const savings = state.savings.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); 

    // Tính tổng số tiền tiết kiệm 
    const totalSavings = useMemo(() => {
        return savings.reduce((sum, entry) => {
            if (entry.type === 'Deposit') return sum + entry.amount;
            if (entry.type === 'Withdrawal') return sum - entry.amount;
            return sum;
        }, 0);
    }, [savings]);

    return (
        <div className="savings-content-area">
            {/* THẺ TỔNG SỐ DƯ TIẾT KIỆM */}
            <div className="summary-board mb-4">
                <div className="summary-card balance total-savings-card">
                    <p className="summary-label">🏦 TỔNG SỔ TIẾT KIỆM</p>
                    <p className="summary-value balance-value">
                        {totalSavings.toLocaleString()} VND
                    </p>
                    {/* NÚT RÚT TIỀN */}
                    {totalSavings > 0 && (
                        <button 
                            className="btn btn-submit-expense mt-2"
                            onClick={onWithdrawClick}
                        >
                            Rút Tiền
                        </button>
                    )}
                </div>
            </div>

            <h3 className="section-title">Lịch sử Gửi/Rút Tiết Kiệm</h3>
            
            {/* LỊCH SỬ CHI TIẾT */}
            <div className="transaction-grid mt-3">
                {savings.length === 0 ? (
                    <p className="no-data-message">Chưa có giao dịch gửi/rút tiết kiệm nào.</p>
                ) : (
                    savings.map((entry: SavingEntry) => {
                        const isDeposit = entry.type === 'Deposit';
                        const amountClass = isDeposit ? 'amount-income' : 'amount-expense';
                        return (
                            <div key={entry.id} className={`transaction-card ${isDeposit ? 'income' : 'expense'}`}> 
                                <div className="icon-badge">{isDeposit ? '💰' : '💸'}</div>
                                <div className="transaction-info">
                                    <p className="transaction-date">{entry.date}</p>
                                    <h3 className="transaction-description">{entry.description}</h3>
                                </div>
                                <div className="transaction-amount-area">
                                    <p className={`transaction-amount ${amountClass}`}> 
                                        {isDeposit ? '+' : '-'}{entry.amount.toLocaleString()} VND
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default SavingsSummary;