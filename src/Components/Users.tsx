import React from 'react'
import { Link } from 'react-router-dom'
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
            <Link to={{ pathname: '/bootcamper_profile', state: data}}>
                <img src={data.photo} alt="bootcamper pic" className="profiles-showcase-image"/>
            </Link>
            <span> {data.displayName}</span>
            <p> {data.statement}</p>
            <p> {data.email}</p>
            
        </div>
    )
}

export default Users
