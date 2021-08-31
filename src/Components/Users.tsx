import React from 'react'
import '../Styling/projects.css'

type Props = {
    data:any,
}

const Users: React.FC<Props> = ({data}) => {

    console.log(data)

    return (
        <div className="wrapper">
            <span className="project-name">{data.displayName}</span>        
            {/* <img src={data.appDeploymentImage} alt="Project" className="main-image"/> */}
            <span className="project-date">12/05/2000</span>
            <span> {data.email}</span>
            <span> {data.githubUrl}</span>
            <span> {data.linkIn}</span>
            <span> {data.photo}</span>
            
        </div>
    )
}

export default Users
