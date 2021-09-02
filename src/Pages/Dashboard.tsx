import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { API_URL } from '../config'

type DashboardProps = {
    loginStatus: boolean
}
const Dashboard :React.FC<DashboardProps> = ({loginStatus}) =>{

    const history = useHistory()
    const [displayName,setDisplayName] = useState("");

    //check if user is logged in
    useEffect(()=>{
        if (loginStatus === false){
            history.push("/login")
        } else{
            axios.get(API_URL+"auth/check", {
                withCredentials: true
            })
            .then(res => {
                setDisplayName(res.data.user.displayName)
            }
            ).catch(err => console.log(err))
        }
    },[])

    return (
        <div>
            <h1>Welcome {displayName}</h1>

        </div>
    )
}


export default Dashboard

