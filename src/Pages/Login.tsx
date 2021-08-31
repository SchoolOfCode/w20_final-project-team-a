import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../config';
import '../Styling/Login.css'
import pinhead from '../Components/BackgroundsPlus/User Signup PinHead.png'
import sidebar from '../Components/BackgroundsPlus/ShowcaseUpLeft.png'
import line from '../Components/BackgroundsPlus/Line.png'

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
        <div className="login-page-container">
            <header className="login-header">
                <h1 className="login-header-text">Login</h1>
                <img className="login-header-line" src={line} alt="sidebar"/>
            </header>
        <section className="login-form-container">
            <section className="login-sidebar-image">
                <img src={sidebar} alt="diving line" className="signup-sidebar-image"/>
            </section>
            <section className="login-page-image">
                <img  src={pinhead} alt="head" className="login-page-image"/>
            </section>
            <form className="login-form-input">
                <section>
                <label htmlFor="email">email address</label>
                <p><input 
                    type="email"
                    placeholder="lewis@lewis.ninja"
                    name="email"
                    id="email"
                    onChange={(e)=>setEmail(e.target.value)}
                ></input></p>
                </section>
                <section>
                <label htmlFor="password">password</label>
                <p><input                    
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    ></input></p>
                </section>
                <section className="login-register-link">
                    Not registered? Click <a href="/signup" title="Click to register">here</a> to register
                </section>
                <section className="login-submit">
                <button className="login-submit-button" disabled={!email || !password ? true : false} type="submit" onClick={(e)=>handleLogin(e)}>Login</button>
                </section>
            </form>
            <section className = "login-messages-container">

            {success &&
            // <Route exact path="/dashboard">
            //     <Redirect to="/dashboard" />
            // </Route>
            history.push('/dashboard')
            }
            {failure &&
            <div className="login-messages-container-failure" style={{backgroundColor:"red", color:"white"}}> 
                <p className="login-messages-text">{failureMsg}</p>
            </div>
            }
            </section>
        </section>
        </div>
    </div>
        
    )
}

export default Login