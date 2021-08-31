import React,{useState, useEffect} from 'react'

import '../Styling/ProjectsShowcase.css'
import Users from '../Components/Users'

import sidebar from '../Components/BackgroundsPlus/ShowcaseUpLeft.png'
import line from '../Components/BackgroundsPlus/Line.png'

import axios from 'axios'
import { API_URL } from '../config'


const ProfilesShowcase = () => {

    const [data, setData] = useState([{}])

    useEffect(()=>{
        const getData = async() =>{
        axios.get(API_URL+"users/all") 
        .then(
            (response) => {
                // response.data.forEach((user:any) => setData([...data,user]))
                // console.log(response.data, "data = ",data)
                // let userDataArray = [];
                // for (let i=0; i<response.data.length; i++) {
                //     userDataArray.push(response.data[i]);
                //     console.log("response.data[i]", response.data[i])
                //     setData([...userDataArray, userDataArray])
                //     console.log(userDataArray);
                // }
                setData(response.data)
                
            }
            )
            console.log(data)
        }
    getData()
    }, [])

    return (
        <>
            <div>
            <section className="profiles-showcase-page-container">
                <header className="profiles-showcase-header">
                    <h1 className="profiles-showcase-header-text">Login</h1>
                    <img className="profiles-showcase-header-line" src={line} alt="sidebar"/>
                </header>
            </section>
            <section className="profiles-showcase-display">
                <  img src={sidebar} alt="dividing line" className="profiles-showcase-sidebar-image"/>
            </section>
            <section className="profiles-showcase-display-items">           
                {data.map((user) => <Users data={user}  />)}
            </section>
            </div>
        </>
    )
}
export default ProfilesShowcase