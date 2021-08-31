import React from 'react'
import '../Styling/ProfilesShowcase.css'

type Props = {
    data:any,
}

const Users: React.FC<Props> = ({data}) => {
console.log(data)
    return (
        <div >
            <span> {data.displayName}</span>
            <img src={data.photo} alt="bootcamper pic"/>
            <span> {data.cohort}</span>
            <span> {data.statement}</span>
            <span> {data.email}</span>
            
        </div>
    )
}

export default Users
