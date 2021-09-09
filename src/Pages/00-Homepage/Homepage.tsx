import React from "react";
import "./Homepage.scss";
import featuredImg from "../../Components/Backgrounds/JohnProdmanPoster.png";
import HorizontalCircuit from "../../Components/HorizontalCircuit/HorizontalCircuit";

const Homepage = () => {
  return (
    <div className="wrapper">
      <p className="arrow-left"> {"<"} </p>{" "}
      {/*onClick increase image display index by 1/*/}
      <img
        className="featured-project-image"
        src={featuredImg}
        alt="featured-img"
      ></img>
      {/*need to access array of images, display index=0 as default/*/}
      <p className="arrow-right"> {">"} </p>{" "}
      {/*onClick decrease image display index by 1/*/}
      <HorizontalCircuit className="circuit-right" />
      <p className="description"> Project description</p>
      <p className="tech"> Built using </p>{" "}
      {/*needs list with tech images here/*/}
      <p className="heading"> Featured Project </p>
      <HorizontalCircuit className="circuit-left-bottom" />
      <p className="title"> Project Title</p>
      <p className="contributors"> Contributors </p>
      {/* 
            background with circuits
            grid of 3 columns 1fr 3fr 1fr
                    3 rows
            
            image display from list, show current item
            arrows to iterate through image list
            github image with link to repo
            "featured project"
            dividing line
            project title
            list of contributors display names

            
            */}
    </div>
  );
};

export default Homepage;
