import React from "react";
import { ReactComponent as LoadingIcon } from "./loading_spinner_2.svg";
import "./Loading.scss";

const Loading = () => {
  return (
    <div>
      <LoadingIcon className="loading-icon" />
      <h1 className="loading-text">Loading</h1>
    </div>
  );
};

export default Loading;
