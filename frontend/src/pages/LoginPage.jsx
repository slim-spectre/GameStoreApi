import {useState} from 'react';

function LoginPage({handleLogin}){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email,password)
    }

    return (
        <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;