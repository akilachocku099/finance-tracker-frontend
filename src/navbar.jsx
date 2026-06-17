import React from 'react';
import './navbar.css';

function Navbar({ onLogout }) {
    return (
        <nav className='navbar'>
            <span className='navbar-brand'>💰 Finance Tracker</span>
            <button className='logout-btn' onClick={onLogout}>Logout</button>
        </nav>
    )
}
export default Navbar;