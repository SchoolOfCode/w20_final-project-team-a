import React from 'react'
import '../Styling/projects.css'

type Props = {
    data:any,
}

const Projects: React.FC<Props> = ({data}) => {


    return (
        <div className="wrapper">
            <span className="project-name">{data.projectName}</span>        
            <img src={data.appDeploymentImage} alt="Project" className="main-image"/>
            <span className="project-date">12/05/2000</span>
            
        </div>
    )
}

export default Projects
