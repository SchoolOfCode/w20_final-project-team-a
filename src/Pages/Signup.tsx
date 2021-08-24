import React, {useState} from 'react';
import axios from 'axios';

const Signup = () => {

    const [email, setEmail] = useState ("");
    const [displayName, setDisplayName] = useState ("");
    const [password, setPassword] = useState ("");
    const [password2, setPassword2] = useState ("");
    const [errorMessage, setErrorMessage] = useState ("");

    function handleSubmit (e:any) {
        e.preventDefault();
        axios({
            method:"post",
            url:"http://localhost:5000/api/users/signup",
            data: {
                email:email,
                displayName:displayName,
                password:password,
                password2:password2
            },
        })
    }

    return (
        <div>
            <h1>sign up page</h1>
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
                <label htmlFor="displayName">display name</label>
                <input                    
                    type="text"
                    placeholder="lewis"
                    name="displayName"
                    id="displayName"
                    onBlur={(e)=>setDisplayName(e.target.value)}
                    ></input>
                </p>
                <p>
                <label htmlFor="password">password</label>
                <input                    
                    type="password"
                    // placeholder="enter password"
                    name="password"
                    id="password"
                    onBlur={(e)=>setPassword(e.target.value)}
                    ></input>
                </p>
                <p>
                <label htmlFor="password">confirm password</label>
                <input                    
                    type="password"
                    // placeholder="re-enter password"
                    name="password2"
                    id="password2"
                    onBlur={(e)=>setPassword2(e.target.value)}
                    ></input>
                </p>
                <button type="submit" onClick={(e)=>handleSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}

export default Signup