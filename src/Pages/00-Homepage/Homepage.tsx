import React from "react";
import "./Homepage.scss";
import featuredImg from "./77b1a6d5-d93_my_space_2.jpg";
import HorizontalCircuit from "../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";

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
      <HorizontalCircuit className="line-right" />
      <p className="description"> Can you guess what it is? Is it an eager beaver or just a squatting otter? 
A Game created with React Native.</p>
      <p className="tech"> Built using </p>{" "}
      {/*needs list with tech images here/*/}
      <p className="heading"> Eager Beaver, Squatting OtterX </p>
      <HorizontalCircuit className="line-left" />
      <p className="title"> How can we display and promote the work that School of Code bootcampers put into the course?</p>
      <p className="contributors"> By: Gurmukh, Lewis, Viktor, Becks </p>
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
