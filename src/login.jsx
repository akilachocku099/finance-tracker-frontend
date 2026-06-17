import React , { useState , useEffect } from 'react';
import  './login.css';

function LoginForm({ onLoginSuccess }) {
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');      
    const handleSubmit = async(e) => {
        e.preventDefault();  
        const data={username: username,password:password};
        //console.log(data);
        const response = await fetch('http://localhost:3000/api/login', {
             method: 'POST',
             headers: {
                    'Content-Type': 'application/json'
                            },
            body: JSON.stringify(data)});
        const result= await response.json();
        if(result.success){
            alert(result.message);
            onLoginSuccess(); 
        } else{
            alert(result.message);

        }  

        //console.log('Username:', username);
       // console.log('Password:', password);
    }
    return (
        <form onSubmit={handleSubmit} className='login-form'>    
            <label>
                Username:
                <input  type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} required  />    
            </label>
            <label>
                Password:   
                <input  type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required />    
            </label>    
            <button type="submit" >Login</button>
        </form>
    )
}  
function CreateAccount(props) {
    // Logic for creating an account can be added here
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState(''); 
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const handleSubmit =async(e) => {
        e.preventDefault(); 
        const data={firstname: firstName,
                    lastname:lastName,
                    username:username,
                    password:password};
        console.log(data)
        const response = await fetch('http://localhost:3000/api/createaccount', {
             method: 'POST',
             headers: {
                    'Content-Type': 'application/json'
                            },
            body: JSON.stringify(data)});
        
        props.setCreateAccount(false); 
        props.setView('form');
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Username:', username);
        console.log('Password:', password);}

    return (
        <form onSubmit={handleSubmit} className='login-form'>  
        <label>
                First Name:
                <input  type="text"
                        value={firstName}
                        id="firstname"
                        onChange={(e) => setFirstName(e.target.value)} />    
            </label>
            <label>
                Last Name:
                <input  type="text"
                        value={lastName}
                        id="lastname"
                        onChange={(e) => setLastName(e.target.value)} />    
            </label>
             
            <label>
                Username:
                <input  type="text"
                        value={username}
                        id="username"
                        onChange={(e) => setUsername(e.target.value)} />    
            </label>
            <label>
                Password:   
                <input  type="password"
                        value={password}
                        id="password"
                        onChange={(e) => setPassword(e.target.value)} />    
            </label>    
            <button type="submit" >Login</button>
        </form>
    )}

        
function Login(props) {
    // 1. Create a switch state. It starts as 'buttons'
    const [view, setView] = useState('buttons');
    const[createAccount , setCreateAccount] = useState(false);

    // 2. If the switch flips to 'form', show the LoginForm instead!
    if (view === 'form') {
        return (
            <div className='loginPage'>
                <h1>Login Form</h1>
                <LoginForm onLoginSuccess={props.onLoginSuccess} />
                <button onClick={() => setView('buttons')}>Go Back</button>
            </div>
        );
    }
    if(createAccount){
        return (
            <div className='loginPage'> 
                <h1>Create Account</h1>
                <CreateAccount setView={setView} setCreateAccount={setCreateAccount} />
                <button onClick={() => setCreateAccount(false)}>Go Back</button>
            </div>
        );
    }

    // 3. This is what shows up first when the page loads
    return (
        <div className='loginPage'>
            <h1>Welcome</h1>
            <button onClick={() => setCreateAccount(true)} className='createact'>Create Account</button>
            {/* When clicked, change the switch to 'form' */}
            <button onClick={() => setView('form')} className='loginpage'>Login</button>
        </div>
    );
}     
export default Login;