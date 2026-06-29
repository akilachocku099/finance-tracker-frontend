import React , { useState , useEffect } from 'react';
import  './dashboard.css';
import Expenses from "./expenses.jsx";
import Spendings from "./spendings.jsx";
import Income from"./income.jsx";

function DashBoard({ username,monthlyincome, bankbalance }) {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [view, setView] = useState('dashboard');
    const [expenses, setexpenses] = useState([]); 
    const[income,setincome]=useState([])

    const prevMonth = () => {
        const prev = new Date(currentMonth);
        prev.setMonth(prev.getMonth() - 1);
        setCurrentMonth(prev);
    };

    const nextMonth = () => {
        const next = new Date(currentMonth);
        next.setMonth(next.getMonth() + 1);
        setCurrentMonth(next);
    };

    const getexpenses = async () => {
        const response = await fetch('https://finance-tracker-backend-5k37.onrender.com/api/dashboard');
        const result = await response.json();
        console.log(result.expenses);
        setexpenses(result.expenses || []);
        setincome(result.income || []); 
    };

    useEffect(() => {
        getexpenses();
    }, []);

    const expense_current= expenses.filter(e=>{ 
        let dte=Number(e.date.slice(5,7));
        return( dte== currentMonth.getMonth()+1 && e.username==username)
    });
    let totalSpent=0;
    expense_current.forEach(e => {
        totalSpent =Number( totalSpent + Number(e.amount));
    });
   let overall_spent=0;
    expenses.forEach(e=>{
        if(e.username === username) {
        overall_spent=overall_spent+ Number(e.amount);}
    });
    let overall_income=0;
    income.forEach(e=>{
        if(e.username==username){
        overall_income=overall_income+ Number(e.amount);}
    });

    const currentBalance = bankbalance - totalSpent + overall_income;
    let savings=0;
    const salaries = income.filter(e => 
    e.category === "Salary" && 
    e.username == username &&
    Number(e.date.slice(5,7)) === currentMonth.getMonth() + 1 &&
    e.date.slice(0,4) === String(currentMonth.getFullYear())
    );

    const totalSalary = salaries.reduce((t, e) => t + Number(e.amount), 0);
    savings = totalSalary - totalSpent;
    console.log(salaries)
    let latest_salary=0;
    if (salaries && salaries.length > 0) {
        latest_salary = Number(salaries[salaries.length - 1].amount);
    }
    const baseIncome = latest_salary > 0 ? latest_salary : 0;
    savings = baseIncome - totalSpent;


    if (view === 'expenses') {
    return <Expenses onBack={() => setView('dashboard')} username={username} getexpenses={getexpenses}/>;
}
    if (view === 'spending-trends') {
        return <Spendings onBack={() => setView('dashboard')} username={username} />;
    }
    if (view==='Add-income'){
        return< Income onBack={() => setView('dashboard')} getexpenses={getexpenses} username={username} />
    }
  
    return (
        <div className='dashboard'>
            <section className="profile-header">
                <h1>{ username}</h1>  
                
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
                    <div className="balance-section-card">
                        <i className="ti ti-credit-card"></i>
                        <h4>Spent</h4>
                        <p>{totalSpent}</p>
                    </div>
                    
                    <div className="balance-section-card">
                        <i className="ti ti-building-bank"></i>
                        <h4>Bank Balance</h4>
                        <p>{currentBalance}</p>
                    </div>
                    
                    <div className="balance-section-card">
                       <i className="ti ti-cash"></i> 
                        <h4> Savings</h4>
                        <p>{savings}</p>
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
                <section className="Add-Income">
                    <button className="add-income-btn" onClick={() => setView('Add-income')}>
                        Add Income
                    </button>
                </section>
            </section>
        </div>
    );
}

export default DashBoard;