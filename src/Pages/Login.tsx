import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../config';

const Login = () => {

    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [failureMsg, setFailureMsg] = useState("");
    const history = useHistory ();
    const [submit, setSubmit] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false)

    function handleLogin (e:any) {
        e.preventDefault();
        setSubmit(true)
    }
        
        useEffect(() => {
            if(submit===true) {
                axios({
                    method:"post",
                    url:API_URL+"users/login",
                    data: {
                        email:email,
                        password:password,
                    },
                    }).then(
                    (response) => {
                        console.log(response.data, response)
                        if (response.data.displayName) {
                            setSuccess(true)
                            setFailure(false)
                            setSubmit(false)
                            // setIsLoggedIn(true)
                        }
                        else {
                            setFailureMsg(response.data.message)
                            setFailure(true)
                            setSubmit(false)
                            // setIsLoggedIn(false)
                        }
                    }
                    )
                    .catch(
                        (err) => {
                            console.error(err)
                        }
                        )
                }
        })
            
    return (
        // isLoggedIn?
        // <div>
        //     <h1>Logout</h1>
        //     <button>Logout</button>
        // </div>
        // :
        <div>
            <h1>Login</h1>
            {failure &&
            <div style={{backgroundColor:"red", color:"white"}}> 
                <p>{failureMsg}</p>
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
                    onChange={(e)=>setEmail(e.target.value)}
                ></input>
                </p>
                <p>
                <label htmlFor="password">password</label>
                <input                    
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    ></input>
                </p>
                <p>Not registered? Click <a href="/signup" title="Click to register">here</a> to register</p>
                <button disabled={!email || !password ? true : false} type="submit" onClick={(e)=>handleLogin(e)}>Login</button>
            </form>
            {success &&
            // <Route exact path="/dashboard">
            //     <Redirect to="/dashboard" />
            // </Route>
            history.push('/dashboard')
            }
        </div>
        
    )
}

export default Login