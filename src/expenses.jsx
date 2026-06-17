import React , { useState , useEffect } from 'react';
import  './expenses.css';

function Expenses({ onBack }) {
 
    return (
        <div className='expenses-page'>
            <h1>Expenses</h1>   
            <section className="add-expense-form"> 
                <h2>Add New Expense</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const data = {
                        name: e.target.elements['expense-name'].value,
                        amount: e.target.elements.amount.value,
                        category: e.target.elements.category.value,
                        date: e.target.elements.date.value,
                        notes: e.target.elements.notes.value,
                        receipt: e.target.elements.receipt.files[0],
                        paymentMethod: e.target.elements['payment-method'].value,
                    };
                    console.log(data);
                    const response = await fetch('http://localhost:3000/api/expenses', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                            },
                        
                    body: JSON.stringify(data)});
                    onBack();

                }}>
                    <label htmlFor="expense-name">Expense Name:</label>
                    <input type="text" id="expense-name" name="expense-name" required />    
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" name="amount" required />
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" required>
                        <option value="">Select Category</option>
                        <option value="rent">Rent</option>
                        <option value="groceries">Groceries</option>
                        <option value="transportation">Transportation</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="utilities">Utilities</option>
                        <option value="health">Health</option>
                        <option value="other">Other</option>
                    </select>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" required />
                    <label htmlFor="notes">Notes:</label>
                    <textarea id="notes" name="notes" rows="4"></textarea>
                    <label htmlFor="receipt">Upload Receipt:</label>
                    <input type="file" id="receipt" name="receipt" accept="image/*,application/pdf" />
                    <label htmlFor="payment-method">Payment Method:</label>
                    <select id="payment-method" name="payment-method" required>
                        <option value="">Select Payment Method</option>
                        <option value="cash">Cash</option>
                        <option value="credit-card">Credit Card</option>
                        <option value="debit-card">Debit Card</option>
                        <option value="bank-transfer">Bank Transfer</option>
                        <option value="mobile-payment">Mobile Payment</option>
                        <option value="check">Check</option>
                        <option value="other">Other</option>
                    </select>
                    <button type="submit" className="submit-btn">Add Expense</button>
                </form>
                 <button className="back-btn" onClick={onBack}>
                Back to Dashboard
            </button>
            </section>   
        </div>
    )
}
export default Expenses;