import React from 'react'
import HorizontalLine from '../Components/HorizontalLine'
import Header from '../Components/VerticalHeader/Header'
import '../Styling/IndividualProfile.css'
import SocialLinks from '../Components/SocialLinks'


const BootcamperProfile = (data:any) => {
    const user = data.location.state
    
    return (
        <div className="individual-profile-page">
            <Header title={`Bootcamp${(user.cohort)?" "+user.cohort:"er"}`} />
            <section className = "individual-profile-container">
                <HorizontalLine className="individual-profile-line-1" />
                <h2 className="individual-profile-name">{user.displayName}</h2>
                <p className="individual-profile-statement">{user.statement || "Test"}</p>
                <SocialLinks {...user}/>

                <img className = "individual-profile-photo" src={user.photo} alt="The user" />
                
                <HorizontalLine className="individual-profile-line-2" />
            </section>
        </div>
    )
}

export default BootcamperProfile
