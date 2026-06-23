import React , { useState , useEffect } from 'react';
import  './income.css';

function Income({ onBack ,getexpenses }) {
 
    return (
        <div className='income-page'>
            <h1>Income</h1>   
            <section className="add-income-form"> 
                <h2>Add New Income</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const data = {
                        name: e.target.elements['income-name'].value,
                        amount: e.target.elements.amount.value,
                        category: e.target.elements.category.value,
                        date: e.target.elements.date.value,
                        notes: e.target.elements.notes.value,
                        receipt: e.target.elements.receipt.files[0],
                        paymentMethod: e.target.elements['payment-method'].value,
                    };
                    console.log(data);
                    const response = await fetch('http://localhost:3000/api/income', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                            },
                        
                    body: JSON.stringify(data)});
                    if (getexpenses) await getexpenses();
                    onBack();

                }}>
                    <label htmlFor="income-name">income Name:</label>
                    <input type="text" id="income-name" name="income-name" required />    
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" name="amount" required />
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" required>
                        <option value="">Select Category</option>
                        <option value="Salary">Salary</option>
                        <option value="Payment">Payment</option>
                        <option value="Returns">Returns</option>
                        <option value="freelancing">freelancing</option>
                        <option value="Gift">Gift</option>
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
                    <button type="submit" className="submit-btn">Add Income</button>
                </form>
                 <button className="back-btn" onClick={onBack}>
                Back to Dashboard
            </button>
            </section>   
        </div>
    )
}
export default Income;