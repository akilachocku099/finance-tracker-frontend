import React , { useState , useEffect } from 'react';
import  './dashboard.css';
import Expenses from "./expenses.jsx";
import Spendings from "./spendings.jsx";

function DashBoard() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [view, setView] = useState('dashboard')
    const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
}
    const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
}
if (view === 'expenses') {
    return <Expenses onBack={() => setView('dashboard')} />;
}
if (view === 'spending-trends') {
    return <Spendings onBack={() => setView('dashboard')} />;
}
  
    return (
        <div className='dashboard'>
            <section className="profile-header">
            <h1>Akhila</h1>  
            <div className="avatar">AK</div>
            <p>Welcome to the Dashboard!</p>
            <p>personal finance management</p>
            <div className="month-toggle">
                <button className="month-toggle-btn" onClick={prevMonth}>
                    Previous
                </button>
                <h3 id="Month">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                <button className="month-toggle-btn" onClick={nextMonth}>
                    Next
                </button>
            </div>
            </section>
            <section className="balance-section" id="balance">
            <div className="balance-section-grid">
                
                {/* Card 1 */}
                <div className="balance-section-card">
                    <i className="ti ti-credit-card"></i>
                    <h4>Spent</h4>
                    <p>1380</p>
                </div>
                
                {/* Card 2 */}
                <div className="balance-section-card">
                    <i className="ti ti-building-bank"></i>
                    <h4>Bank Balance</h4>
                    <p>3500</p>
                </div>
                
                {/* Card 3 */}
                <div className="balance-section-card">
                   <i className="ti ti-cash"></i> 
                    <h4> Savings
                    </h4>
                    <p>1200</p>
                    
                </div>
                

            </div>  
        </section>
        <section className="button-section">
            <section className="Add-Expense">
                <button className="add-expense-btn" onClick={() => setView('expenses')}>
                    Add Expense
                </button>
            </section>
            <section className="spending-trends">
                <button className="add-income-btn" onClick={() => setView('spending-trends')}>
                    Spending Trends
                </button>
            </section>
        </section>
        </div>
    )
}
export default DashBoard;