import React, { useState } from "react";
import "../Styling/ProjectsShowcase.scss";

type Props = {
  data: any;
};

const Projects: React.FC<Props> = ({ data }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <div>
        <span className="project-showcase-title-text">{data.projectName}</span>

        <div className="project-showcase-overlay-container">
          <img
            onMouseOver={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            src={data.appDeploymentImage}
            alt="Project"
            className="project-showcase-image"
          />
          {isShown && (
            <div className="project-showcase-overlay">
              <div className="project-showcase-overlay-text">
                <p>{data.problemStatement}</p>
                <p>Built Using:</p>
                <p>{data.techUsed}</p>
              </div>
            </div>
          )}
        </div>

        <span className="project-showcase-date">12/05/2000</span>
      </div>
    </>
  );
};

export default Projects;
