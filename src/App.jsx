import React, { useState } from 'react'; // Added useState here!
import './App.css';
import Navbar from "./navbar.jsx";
import Login from "./login.jsx";
import DashBoard from "./dashboard.jsx";

function App() {
  // 1. This switch tracks if the user successfully logged in. It starts as false.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[username,setusername]=useState('')
  const [monthlyincome,setmonthlyincome]=useState(0)
  const[bankbalance,setbankbalance]=useState(0)

  return (
    <div className="app-container">
      <Navbar onLogout={() => setIsLoggedIn(false)} />
      
      <main className="main-content">
        {!isLoggedIn ? (
          <Login onLoginSuccess={(username,monthlyincome,bankbalance) => {setIsLoggedIn(true)
                                       setusername(username)
                                       setmonthlyincome(monthlyincome)
                                       setbankbalance(bankbalance)

          }} />
        ) : (
          <section id="dashboard">
            <DashBoard username={username} bankbalance={bankbalance} monthlyincome={monthlyincome} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;