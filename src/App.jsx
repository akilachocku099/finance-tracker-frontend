import React, { useState } from 'react'; // Added useState here!
import './App.css';
import Navbar from "./navbar.jsx";
import Login from "./login.jsx";
import DashBoard from "./dashboard.jsx";

function App() {
  // 1. This switch tracks if the user successfully logged in. It starts as false.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app-container">
      <Navbar onLogout={() => setIsLoggedIn(false)} />
      
      <main className="main-content">
        {!isLoggedIn ? (
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        ) : (
          <section id="dashboard">
            <DashBoard />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;