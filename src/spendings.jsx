import React , { useState , useEffect } from 'react';
import  './spendings.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function Spendings({ onBack }) {
    const [expenses,setexpenses]=useState([])
    const data = [
        { month: 'Jan', spent: 1200 },
        { month: 'Feb', spent: 1500 },
        { month: 'Mar', spent: 900 },
        { month: 'Apr', spent: 1800 },
        { month: 'May', spent: 1300 },
        { month: 'Jun', spent: 1600 },
    ]
    const getexpenses = async () => {
        const response = await fetch('http://localhost:3000/api/spendings');
       const result= await response.json();
       console.log(result)
       setexpenses(result);
    };
    useEffect(() => {
    getexpenses();
        }, []);
    return (
        <div className='spendingsPage'>
            {/* Top Row: Categories */}
            <section className="by-category">
                <div className="category-section-grid">
            
                    {/* Card 1 */}
                    <div className="category-section-card">
                        <i className="ti ti-home"></i>
                        <h4>Rent</h4>
                        <p>2000</p>
                    </div>
                    
                    {/* Card 2 */}
                    <div className="category-section-card">
                        <i className="ti ti-shopping-cart"></i>
                        <h4>Groceries</h4>
                        <p>3500</p>
                    </div>
                    
                    {/* Card 3 */}
                    <div className="category-section-card">
                        <i className="ti ti-car"></i>
                        <h4>Transportation</h4>
                        <p>800</p>
                    </div>
                    
                    <div className="category-section-card">
                        <i className="ti ti-device-tv"></i>
                        <h4> Entertainment</h4>
                        <p>1200</p>
                    </div>

                    <div className="category-section-card">
                        <i className="ti ti-bolt"></i>
                        <h4> Utilities</h4>
                        <p>500</p>
                    </div>

                    <div className="category-section-card">
                        <i className="ti ti-medical-cross"></i>
                        <h4> Health</h4>
                        <p>1200</p>
                    </div>

                    <div className="category-section-card">
                        <i className="ti ti-dots"></i>
                        <h4>other</h4>
                        <p>1200</p>
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
                {(() => {
                    const loopBucket = [];
                    
                    for (let i = 0; i < expenses.length; i++) {
                        // 1. Fixed the capital 'B' in loopBucket
                        loopBucket.push(
                            <li key={i} className="recent-expense-item">
                                <div className="expense-info">  
                                    <h4> {expenses[i].name}</h4>
                                    <p>Amount: ${expenses[i].amount}</p>
                                    <p>Date: {expenses[i].date}</p> 
                                </div>
                            </li>
                        );
                    }
                    
                    return loopBucket;
                })()} {/* 2. Fixed the function closing and added the () execution trigger! */}
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