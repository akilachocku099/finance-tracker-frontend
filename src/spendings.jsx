import React , { useState , useEffect } from 'react';
import  './spendings.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function Spendings({ onBack,username}) {
    const [expenses,setexpenses]=useState([])
    const data = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((month, i) => ({
        month,
        spent: expenses
            .filter(expense => Number(expense.date.slice(5,7)) === i + 1 && expense.username==username)
            .reduce((t, expense) => t + Number(expense.amount), 0)
    }));
    const getexpenses = async () => {
        const response = await fetch('http://localhost:3000/api/spendings');
       const result= await response.json();
       console.log(result)
       setexpenses(result);
    };
    useEffect(() => {
    getexpenses();
    
        }, []);
    const deleteExpense = async (id) => {
    await fetch(`http://localhost:3000/api/expenses/${id}`, {
        method: 'DELETE'
    });
    getexpenses();
}
    return (
        <div className='spendingsPage'>
            {/* Top Row: Categories */}
            <section className="by-category">
                <div className="category-section-grid">
            
                    {/* Card 1 */}
                    <div className="category-section-card">
                        <i className="ti ti-home"></i>
                        <h4>Rent</h4>
                        <h4>{expenses.filter(expense=> expense.category=='rent' && expense.username==username).reduce((t, expense) => t + Number(expense.amount), 0)}</h4>
                    </div>
                    
                    {/* Card 2 */}
                    <div className="category-section-card">
                        <i className="ti ti-shopping-cart"></i>
                        <h4>Groceries</h4>
                        <h4>{expenses.filter(expense=> expense.category=='groceries'&& expense.username==username).reduce((t, expense) => t + Number(expense.amount), 0)}</h4>
                    </div>
                    
                    {/* Card 3 */}
                    <div className="category-section-card">
                        <i className="ti ti-car"></i>
                        <h4>Transportation</h4>
                        <h4>{expenses.filter(expense=> expense.category=='transportation' && expense.username==username).reduce((t, expense) => t + Number(expense.amount), 0)}</h4>
                    </div>
                    
                    <div className="category-section-card">
                        <i className="ti ti-device-tv"></i>
                        <h4>Entertainment</h4>
                        <h4>{expenses.filter(expense=> expense.category=='entertainment' && expense.username==username).reduce((t, expense) => t + Number(expense.amount), 0)}</h4>
                    </div>

                    <div className="category-section-card">
                        <i className="ti ti-bolt"></i>
                        <h4>Utilities</h4>
                        <h4>{expenses.filter(expense=> expense.category=='utilities' && expense.username==username).reduce((t, expense) => t + Number(expense.amount), 0)}</h4>
                    </div>

                    <div className="category-section-card">
                        <i className="ti ti-medical-cross"></i>
                        <h4>Health</h4>
                        <h4>{expenses.filter(expense=> expense.category=='health' && expense.username==username).reduce((t, expense) => t + Number(expense.amount), 0)}</h4>
                    </div>

                    <div className="category-section-card">
                        <i className="ti ti-dots"></i>
                        <h4>other</h4>
                        <h4>{expenses.filter(expense=> expense.category=='other' && expense.username==username).reduce((t, expense) => t + Number(expense.amount), 0)}</h4>
                    </div>
            
                </div>
            </section>

            {/* Added a layout wrapper here to place chart and recent list side-by-side */}
            <div className="dashboard-lower-split">
                <section className="spending-trends-chart">
                    <h2>Spending Trends</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={data}>
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#8892a0', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8892a0', fontSize: 12 }} />
                            <Tooltip cursor={{ fill: 'rgba(232, 97, 44, 0.05)' }} />
                            <Bar dataKey="spent" fill="#E8612C" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </section>

                <section className="spending-Recent-expenses">
                    <h2>Recent Expenses</h2>
                    
  
            <ul className="recent-expenses-list">
               { expenses.filter(e => e.username === username).map((expense, i) => (
                    <li key={i} className="recent-expense-item">
                        <div className="expense-info">
                            <h4>{expense.name}</h4>
                            <p>Amount: ${expense.amount}</p>
                            <p>Date: {expense.date}</p>
                            <button onClick={() => deleteExpense(expense.id)} class="delete-btn">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
                </section>

            </div>

            {/* Added a footer wrapper for the button spacing */}
            <div className="dashboard-footer">
                <button className="back-btn" onClick={onBack}>
                    Back to Dashboard
                </button>            
            </div>
        </div>
    )
}
export default Spendings;