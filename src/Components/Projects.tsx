import React from 'react'
import '../Styling/ProjectsShowcase.css'

type Props = {
    data:any,
}

const Projects: React.FC<Props> = ({data}) => {

    console.log(data.appDeploymentImage)

    return (
    <>
        <div>
            <span className="project-showcase-title-text">{data.projectName}</span>        
            <img src={data.appDeploymentImage} alt="Project" className="project-showcase-image"/>
            <span className="project-date">12/05/2000</span>
        </div>
    </>
    )
}

export default Projects
