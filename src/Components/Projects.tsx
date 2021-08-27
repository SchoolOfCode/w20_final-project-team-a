import React from 'react'

type Props = {
    data:any,
}

const Projects: React.FC<Props> = ({data}) => {

    console.log(data.appDeploymentImage)

    return (
        <div className="wrapper">
            <span className="project-name">{data.projectName}</span>        
            <span>Project</span>
            <img src={data.appDeploymentImage} alt="blah blah" className="main-image"/>
            <span className="project-date">12/05/2000</span>
            
        </div>
    )
}

export default Projects
