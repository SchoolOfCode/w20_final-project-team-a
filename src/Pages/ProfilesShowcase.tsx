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
            <section className="profiles-showcase-container">
                <header className="profiles-showcase-header">
                    <h1 className="profiles-showcase-header-text">Bootcampers</h1>
                    <img className="profiles-showcase-header-line" src={line} alt="sidebar"/>
                </header>
            <section className="profiles-showcase-display">
                <  img src={sidebar} alt="dividing line" className="profiles-showcase-sidebar-image"/>
            </section>
            <section 
            className="profiles-showcase-display-items"
            >
                {data.map((user) => <Users data={user}  />)}
            </section>
            </section>
            </div>
        </>
    )
}
export default ProfilesShowcase