import React, {useState} from 'react'
import '../Styling/ProjectsShowcase.css'

type Props = {
    data:any,
}




const Projects: React.FC<Props> = ({data}) => {

    console.log(data.appDeploymentImage)

    //const [isShown, setIsShown] = useState(false)
    
    return (
    <>
        <div>
            <span className="project-showcase-title-text">{data.projectName}</span>        
            
            <div className="project-showcase-container-overlay">
                <img
                // onMouseEnter={()=>setIsShown(true)} 
                //onMouseLeave={()=>setIsShown(false)}
                src={data.appDeploymentImage}
                alt="Project"
                className="project-showcase-image"
                />
                <div className="project-showcase-overlay">
                    <div className="project-showcase-overlay-text">
                        {data.projectName}
                    </div>
                </div>
            </div>
            
            <span className="project-showcase-date">12/05/2000</span>
        </div>
    </>
    )
}

export default Projects
