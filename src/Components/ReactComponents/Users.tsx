import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  data: any;
};

const Users: React.FC<Props> = ({ data }) => {
  const [isShown, setIsShown] = useState(false);

  return (
      <Link to={{ pathname: "/bootcamper_profile", state: data }} className="bootcamper-item">
        <h2 className="bootcamper-title-text">{data.displayName}</h2>
        <h3 className="bootcamper-cohort-text"> cohort {data.cohort}</h3>
        <div className="bootcamper-overlay-container"
            onMouseOver={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
          <img
            src={data.photo}
            alt="bootcamper person"
            className="bootcamper-image"
          />
          {isShown && 
            <div className="bootcamper-overlay">
              <div className="bootcamper-overlay-text">
                <p className="bootcamper-overlay-text-statement"> {data.statement}</p>
                {/* <p className="bootcamper-overlay-email"> {data.email}</p> */}
                <p className="bootcamper-overlay-help">Click to see my profile & projects</p>
              </div>
            </div>
          } 
        </div>
      </Link>
  );
};

export default Users;
