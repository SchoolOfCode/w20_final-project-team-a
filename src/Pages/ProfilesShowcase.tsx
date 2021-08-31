import React,{useState, useEffect} from 'react'

import '../Styling/ProjectsShowcase.css'
import Users from '../Components/Users'

import axios from 'axios'
import { API_URL } from '../config'


const ProfilesShowcase = () => {

    const [data, setData] = useState([{}])

    useEffect(()=>{
        const getData = async() =>{
        axios.get(API_URL+"users/all") 
        .then(
            (response) => {
                response.data.forEach((user:any) => setData([...data,user]))
                console.log(response.data)
                }
        )
        }
    getData()
    }, [])

    return (
        <>
            <div>
                {data.map((user) => <Users data={user} />)}
            </div>
        </>
    )
}
export default ProfilesShowcase