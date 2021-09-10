import React, { useState } from "react";

type Props = {
  data: any;
};

const Projects: React.FC<Props> = ({ data }) => {
  const [isShown, setIsShown] = useState(false);

  return (
      <div className="showcase-item">
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
          {isShown && (
            <div className="showcase-overlay">
              <div className="showcase-overlay-text">
                <p>{data.problemStatement}</p>
                <p>Built Using:</p>
                <p>{data.techUsed}</p>
              </div>
            </div>
          )}
        </div>

        <span className="showcase-date">12/05/2000</span>
      </div>
  );
};

export default Projects;
