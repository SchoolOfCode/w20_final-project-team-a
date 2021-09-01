import React from 'react'
import '../Styling/ProfilesShowcase.css'

type Props = {
    data:any,
}

const Users: React.FC<Props> = ({data}) => {
console.log(data)
    return (
        <div 
        // className="profiles-showcase-display-items"
        >
            <p> {data.displayName}</p>
            <img src={data.photo} alt="bootcamper pic" className="profiles-showcase-image"/>
            <p> {data.cohort}</p>
            <p> {data.statement}</p>
            <p> {data.email}</p>
            
        </div>
    )
}

export default Users
