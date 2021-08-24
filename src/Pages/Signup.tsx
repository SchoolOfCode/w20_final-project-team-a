import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

const Signup = () => {

    const [email, setEmail] = useState ("");
    const [displayName, setDisplayName] = useState ("");
    const [password, setPassword] = useState ("");
    const [password2, setPassword2] = useState ("");
    const [sucess, setSucess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [failureMsg, setFailureMsg] = useState([]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        e.preventDefault();
        axios({
            method:"POST",
            url:"http://localhost:5000/api/users/signup",
            data: {email, displayName, password, password2},
        }).then(
            response => {
                console.log(response)
                if (response.data.sucess) {
                    setSucess(true)
                    setFailure(false)
                }
                if (response.status !== 200) {
                    setFailureMsg(response.data.errors)
                    console.log(response.data.errors)
                    setFailure(true)
                }
            },
            err =>{
                console.log(err)
                setFailure(true)
            }
        )
    }

    return (
        <div>
            <h1>Sign Up</h1>
            {sucess &&
            <div style={{backgroundColor:"lightgreen", color:"black"}}> 
                <p>Your account has been sucessfully registered. Click <a href="/login">here</a> to login</p>
            </div>}
            {failure &&
            <div style={{backgroundColor:"red", color:"white"}}> 
                <p>An error occurred. Please try again</p>
                <ul>
                {failureMsg && failureMsg.map((err,i)=>{
                    console.log(err)
                    return <li key={i}>{err}</li>
                })}
                </ul>
            </div>
            }

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