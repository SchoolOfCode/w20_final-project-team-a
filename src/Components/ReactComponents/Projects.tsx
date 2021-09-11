import React, { useState } from "react";
import {builtUsing} from '../VisualAssets/techStack/techIcons'
import {Link} from 'react-router-dom'

type Props = {
  data: any;
};

const Projects: React.FC<Props> = ({ data }) => {
  const [isShown, setIsShown] = useState(false);

  const date = new Date(data.created_at)
  const day= date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();

  return (
    <Link to={{ pathname: "/project_showcase", state: data }} className="showcase-item">
        <span className="showcase-title-text">{data.projectName}</span>
        <div className="showcase-overlay-container"
            onMouseOver={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
          <img
            src={data.appDeploymentImage}
            alt="Project"
            className="showcase-image"
          />
          {isShown && 
            <div className="showcase-overlay">
              <div className="showcase-overlay-text">
                <p className="showcase-overlay-text-statement">{data.problemStatement}</p>
                <p className="showcase-overlay-text-icons-title">Built Using:</p>
                <ul className="showcase-overlay-text-icons-icons">
                {data.techUsed.map((tech:string,i:number) => {
                  return (
                  <li key={i}>
                    <img 
                    src={builtUsing[tech]} 
                    alt="icon"
                    className="showcase-tech-icon"
                    />
                  </li>
                  )
                })}
                </ul>
              </div>
            </div>
          }
        </div>

        <span className="showcase-date">
          {`${day}/${month}/${year}`}
        </span>
    </Link>
  );
};

export default Projects;
