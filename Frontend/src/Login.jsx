import React, {useState} from "react";

export const Login =(props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log(username); 
    }
    

    return(
        <div className="auth-form-container">
            <h1>Log in to AppoMo</h1>
        <form className="login-form"onSubmit ={handleSubmit}>
            <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="Username" id="username" name="username"/>
            <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="Password" id="password" name="password"/>
            <button className="submitbutton"type="submit">Log in</button>
        </form>
        
     
        <button className="regButton">Not Registered? Register Now</button>
        </div>
        
    )
}