import React,{ useEffect, useState } from 'react'
import HorizontalLine from '../Components/HorizontalLine'
import Header from '../Components/VerticalHeader/Header'
import '../Styling/IndividualProfile.css'
import SocialLinks from '../Components/SocialLinks'
import { API_URL } from '../config'
import axios from 'axios'
import {ReactComponent as LoadingIcon} from '../Components/Dashboard/loading_spinner_2.svg'



const BootcamperProfile = (data:any) => {
    const user = data.location.state
    
    const [userProjects, setUserProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(false)

    const getProjects = async() =>{
        setLoading(true)
        try{
            const usersProjects = await axios.get(API_URL + "users/individual/:" + user._id)
            setUserProjects(await usersProjects.data.msg.projects)
        } catch(err){
            console.error(err)
        }
        console.log(userProjects)
    }

    useEffect(()=>{
        getProjects()
        setLoading(false)
    },[])

    return (
        <div className="individual-profile-page">
            <Header title={`Bootcamp${(user.cohort)?" "+user.cohort:"er"}`} />
            <section className = "individual-profile-container">
                <HorizontalLine className="individual-profile-line-1" />
                <h2 className="individual-profile-name">{user.displayName}</h2>
                <p className="individual-profile-statement">{user.statement || "Test"}</p>
                <SocialLinks {...user}/>

                <img className = "individual-profile-photo" src={user.photo} alt="The user" />
                
                <h3 className="individual-profile-projects-title">My Projects</h3>
                <HorizontalLine className="individual-profile-line-2" />


                <section className = "individual-profile-projects-container">
                    {loading?
                        <LoadingIcon className="individual-profile-loading-icon"/>
                        :
                        <div className = "individual-profile-projects">
                            {userProjects.map((project,i)=>{
                                return <img 
                                    src={project.appDeploymentImage} 
                                    alt="projects" 
                                    key={i} 
                                    className={`individual-profile-projects-${i}`}
                                    />
                            })}
                        </div>
                    }
                </section>

            </section>
        </div>
    )
}

export default BootcamperProfile
