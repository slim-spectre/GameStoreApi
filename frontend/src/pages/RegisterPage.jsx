import {useState} from 'react';

function RegisterPage({handleRegister}){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(email,password);
    };

    return(
        <div className="register-box">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}


export default RegisterPage