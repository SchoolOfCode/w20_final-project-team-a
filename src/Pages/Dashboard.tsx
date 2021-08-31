import axios from 'axios'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { API_URL } from '../config'

type DashboardProps = {
    loginStatus: boolean
}
const Dashboard : React.FC<DashboardProps> = ({loginStatus}) =>{

    const history = useHistory()
    //check if user is logged in
    const handleClick = () =>{
        if (loginStatus === false){
            history.push("/login")
        } else{
            axios.get(API_URL+"auth/check", {
                withCredentials: true
            })
            .then(res => {
                console.log(res)
            }
            ).catch(err => console.log(err))
        }
    }

    return (
        <div>
            <h1>Welcome</h1>
            <Link to="/submit">
                <button onClick={handleClick}>Submit</button>
            </Link>
        </div>
    )
}


export default Dashboard

