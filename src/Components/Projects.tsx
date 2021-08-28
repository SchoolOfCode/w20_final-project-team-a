import React from 'react'
import '../Styling/projects.css'

type Props = {
    data:any,
}

const Projects: React.FC<Props> = ({data}) => {

    console.log(data.appDeploymentImage)

    return (
    <>
        <div className="wrapper">
            
            <header className="showcase-header">
                <h1 className="showcase-header-text">Showcase</h1>
            </header>

            <span className="project-name">{data.projectName}</span>        
            <img src={data.appDeploymentImage} alt="Project" className="main-image"/>
            <span className="project-date">12/05/2000</span>
        </div>
    </>
    )
}

export default Projects
