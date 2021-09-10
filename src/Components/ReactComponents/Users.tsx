import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  data: any;
};

const Users: React.FC<Props> = ({ data }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <article className="bootcamper-item">
        <Link to={{ pathname: "/bootcamper_profile", state: data }}>
          <h2 className="profiles-showcase-name-text">{data.displayName}</h2>
          <img
            src={data.photo}
            onMouseOver={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
            alt="bootcamper pic"
            className="profiles-showcase-image"
          />
          <h3 className="profiles-showcase-cohort-text"> cohort {data.cohort}</h3>
          <div className="profiles-showcase-overlay-container">
            <div
              className={
                showOverlay
                  ? "profiles-showcase-overlay"
                  : "profiles-showcase-overlay-hide"
              }
            >
              <div className="profiles-showcase-overlay-text">
                <span> {data.statement}</span>
                <span> {data.email}</span>
              </div>
            </div>
          </div>
      </Link>
    </article>
  );
};

export default Users;
