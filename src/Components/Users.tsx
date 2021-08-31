import React from 'react'
import '../Styling/projects.css'

type Props = {
    data:any,
}

const Users: React.FC<Props> = ({data}) => {

    return (
        <div className="wrapper">
            <span> {data.displayName}</span>
            <img src={data.photo} alt="bootcamper pic"/>
            <span> {data.cohort}</span>
            <span> {data.statement}</span>
            
        </div>
    )
}

export default Users
