import React, {useState} from 'react';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const [errorMessage, setErrorMessage] = useState ("");

    function handleLogin (e:any) {
        e.preventDefault();
        axios({
            method:"post",
            url:"http://localhost:5000/api/users/login",
            data: {
                email:email,
                password:password,
            },
        }).then(res=> {
            if (res.data.sucess) window.location.href="/dashboard"
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Login</h1>
            <div style={{backgroundColor:"red", color:"white"}}> 
                <h3>
                 {errorMessage}
                </h3>
            </div>
            <form>
                <p>
                <label htmlFor="email">email address</label>
                <input 
                    type="email"
                    placeholder="lewis@lewis.ninja"
                    name="email"
                    id="email"
                    onBlur={(e)=>setEmail(e.target.value)}
                ></input>
                </p>
                <p>
                <label htmlFor="password">password</label>
                <input                    
                    type="password"
                    name="password"
                    id="password"
                    onBlur={(e)=>setPassword(e.target.value)}
                    ></input>
                </p>
                <button type="submit" onClick={(e)=>handleLogin(e)}>Login</button>
            </form>
        </div>
    )
}

export default Login