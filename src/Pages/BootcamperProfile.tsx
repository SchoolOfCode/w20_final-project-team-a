import React from 'react'
import Header from '../Components/VerticalHeader/Header'

const BootcamperProfile = (data:any) => {
    const user = data.location.state
    console.log(user)
    return (
        <div className="individual-profile-page">
            <Header title={`Bootcamp${(user.cohort)?" "+user.cohort:"er"}`} />

        </div>
    )
}

export default BootcamperProfile
