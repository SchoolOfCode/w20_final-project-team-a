import React, {useState} from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import '../Styling/Login.css'
import pinhead from '../Components/BackgroundsPlus/User Signup PinHead.png'
import sidebar from '../Components/BackgroundsPlus/Viewed Profile Up Left.png'
import line from '../Components/BackgroundsPlus/Line.png'


const Signup = () => {

    const [email, setEmail] = useState ("");
    const [displayName, setDisplayName] = useState ("");
    const [password, setPassword] = useState ("");
    const [password2, setPassword2] = useState ("");
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [failureMsg, setFailureMsg] = useState([{msg:""}]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        e.preventDefault();
        axios({
            method:"POST",
            url:API_URL+"users/signup",
            data: {email, displayName, password, password2},
        }).then(
            (response) => {
                if (response.data.success) {
                    setSuccess(true)
                    setFailure(false)
                }
                else {
                setFailureMsg(response.data.msg)
                setFailure(true)
                }
            }
            )
            .catch(
                (err) => {
                    console.error(err)
                }
            )
    }

    return (
        <div>
            <div className="signup-wrapper">
            <h1 className="title">Sign Up</h1>
            <img className="line" src={line} alt="sidebar" max-height="90"/>
                    <div>
                        {success &&
                        <div style={{backgroundColor:"lightgreen", color:"black"}}> 
                            <p>Your account has been sucessfully registered. Click <a href="/login">here</a> to login</p>
                        </div>}
                        {failure &&
                        <div style={{backgroundColor:"red", color:"white"}}> 
                            <p>An error occurred. Please try again</p>
                            <ul>
                            {failureMsg && failureMsg.map((errorMsg,i)=>{
                                return <li key={i}>{errorMsg.msg}</li>
                            })}
                            </ul>
                        </div>
                        }
                    </div>
            <section className="pinhead" >
                <img  src={pinhead} alt="head" height="100px"/>
            </section>
            <section className="sidebar">
                <img src={sidebar} alt="head"/>
            </section>            
            <form className="form-input">
                <section >
                <label htmlFor="email">email address</label>
                    <input 
                        type="email"
                        placeholder="lewis@lewis.ninja"
                        name="email"
                        id="email"
                        onBlur={(e)=>setEmail(e.target.value)}
                    ></input>
                </section>
                <section> 
                    <label htmlFor="displayName">display name</label>
                    <input                    
                        type="text"
                        placeholder="lewis"
                        name="displayName"
                        id="displayName"
                        onBlur={(e)=>setDisplayName(e.target.value)}
                        ></input>
                </section>
                <section>
                    <label htmlFor="password">password</label>
                    <input                    
                        type="password"
                        // placeholder="enter password"
                        name="password"
                        id="password"
                        onBlur={(e)=>setPassword(e.target.value)}
                        ></input>
                </section>
                <section>
                    <label htmlFor="password">confirm password</label>
                    <input                    
                        type="password"
                        // placeholder="re-enter password"
                        name="password2"
                        id="password2"
                        onBlur={(e)=>setPassword2(e.target.value)}
                        ></input>
                </section>
                <button type="submit" onClick={(e)=>handleSubmit(e)}>Submit</button>
                <section>Already registered? Click <a href="/login" title="Click to login">here</a> to login</section>
            </form>
            </div>
        </div>
    )
}

export default Signup