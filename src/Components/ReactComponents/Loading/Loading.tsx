import React from "react";
import Spinner from "./loading_spinner_2.svg";
import "./Loading.scss";

const Loading = (props:any) => {
  return (
    <>
      <img src={Spinner} alt="loading icon" className={props.className} />
      <h1 className={`${props.className}-text`}>{props.loadingText}</h1>
    </>
  );
};

export default Loading;
