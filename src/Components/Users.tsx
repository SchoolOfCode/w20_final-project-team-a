import React from 'react'
import '../Styling/ProfilesShowcase.css'

type Props = {
    data:any,
}

const Users: React.FC<Props> = ({data}) => {
    return (
        <div 
        // className="profiles-showcase-display-items"
        >
            <span className="profiles-showcase-cohort-text"> cohort {data.cohort}</span>
            <img src={data.photo} alt="bootcamper pic" className="profiles-showcase-image"/>
            <span> {data.displayName}</span>
            <p> {data.statement}</p>
            <p> {data.email}</p>
            
        </div>
    )
}

export default Users
