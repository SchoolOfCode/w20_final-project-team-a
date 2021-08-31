import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../config';

type Props = {
    loginStatus:boolean,
    setLoginStatus:(val:boolean)=> void
}

const Login : React.FC<Props> = ({loginStatus,setLoginStatus}) => {

    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [failureMsg, setFailureMsg] = useState("");
    const history = useHistory ();
    const [submit, setSubmit] = useState(false);

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
                        if (response.data.sucess) {
                            setSuccess(true)
                            setFailure(false)
                            setSubmit(false)
                        }
                        else {
                            setFailureMsg(response.data.message)
                            setFailure(true)
                            setSubmit(false)
                            setLoginStatus(false)
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
    const handleLogout = (e:any) =>{
        e.preventDefault()
        setLoginStatus(false)
        setSuccess(false)
        setFailure(false)
        setSubmit(false)
        axios.get(API_URL+"users/logout")
    }
    const [timer, setTimer] = useState(3);

    useEffect(()=>{
        if (success === true && timer <= 0) {
            setLoginStatus(true);
            history.push('/dashboard');
            return;
        };
        if (success){
            const loginRedirectTimer = setInterval(()=>{
                setTimer(timer - 1)
            },1000);
            return () => clearInterval(loginRedirectTimer);
        }
    },[success, history, timer, setLoginStatus])

    return (loginStatus?
        <div>
            <h1>Logout</h1>
            <button type="submit" onClick={(e)=>handleLogout(e)}>Logout</button>
        </div>
        :
        <div>
            <h1>Login</h1>
                {failure &&
                    <div style={{backgroundColor:"red", color:"white"}}> 
                        <p>{failureMsg}</p>
                    </div>
                }
                {success && 
                    <div style={{backgroundColor:"palegreen", color:"black"}}> 
                        <p>Logging you in, in {timer} seconds</p>
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
        </div>
    )
    
}

export default Login