import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useHistory } from 'react-router-dom'
import { API_URL } from '../config'
import AdminBoard from '../Components/AdminBoard/AdminBoard'
import EditProfile from '../Components/EditProfile/EditProfile'
import {ReactComponent as LoadingIcon} from '../Components/Dashboard/loading_spinner_2.svg'
import '../Styling/Dashboard.css'

type DashboardProps = {
    loginStatus: boolean
}

export interface User{
    _id: string,
    email: string,
    displayName: string,
    cohort?: string,
    githubUrl?: string,
    photo?: string,
    statement?: string,
    linkedin?: string,
    twitter?: string,
    youtube?: string,
    personalWebsite?: string,
    location?:string,
    role: string,
    projects?: string[],
}

const Dashboard :React.FC<DashboardProps> = ({loginStatus}) =>{

    const initialUser = {
        _id:"",
        email: "",
        displayName: "",
        cohort: "",
        githubUrl: "",
        photo: "",
        statement: "",
        linkedin: "",
        twitter: "",
        youtube: "",
        personalWebsite: "",
        location: "",
        role: "",
        projects: [""],
    }

    const history = useHistory()
    const [user,setUser] = useState(initialUser);
    const [role, setRole] = useState("user")
    const [loading, setLoading] = useState(false)

    const getUser = async()=>{
        try{
            setLoading(true)
            if (loginStatus === false){
                history.push("/login")
            } else{
                const res = await axios.get(API_URL+"auth/check", {
                    withCredentials: true
                })
                setUser(res.data.user)
                setRole(res.data.user.role)
            }
        }
        catch(err){
            console.error(err)
        }
    }


    useEffect(()=>{
        getUser()
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1250);
        return () => clearTimeout(timer);
    },[])

    return (loading?
        <div>
            <LoadingIcon className="dashboard-loading-icon"/>
            <h1 className="dashboard-loading-text">Loading</h1>
        </div>
        :(role==="admin"?
            <AdminBoard user={user}/>
            :
            <EditProfile user={user} />
        )
    )
}


export default Dashboard

