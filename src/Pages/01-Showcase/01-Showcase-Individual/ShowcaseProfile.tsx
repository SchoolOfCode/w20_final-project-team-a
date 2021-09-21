import React, { useState } from "react";
import "./ShowcaseProfile.scss";
import HorizontalCircuit from "../../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";
import circuitT from "../../../Components/VisualAssets/BackgroundsSVG/HomeBGTop.svg";
import circuitB from "../../../Components/VisualAssets/BackgroundsSVG/HomeBGBottom.svg";
import { builtUsingSVG } from "../../../Components/VisualAssets/SVGIcons/svgIcons";

const ShowcaseProfile = (data: any) => {
  const project = data.location.state;
  const imageGalleryArray = [
    project.appDeploymentImage,
    ...project.additionaAppImageURLs,
  ];
  const [imageGalleryIndex, setImageGalleryIndex] = useState(0);
  const usersNames = [...project.users.map((user: any) => user.displayName)];

  const increaseGalleryIndex = () => {
    if (imageGalleryIndex >= imageGalleryArray.length - 1) {
      setImageGalleryIndex(0);
    } else {
      setImageGalleryIndex(imageGalleryIndex + 1);
    }
  };

  const decreaseGalleryIndex = () => {
    if (imageGalleryIndex < 1) {
      setImageGalleryIndex(imageGalleryArray.length - 1);
    } else {
      setImageGalleryIndex(imageGalleryIndex - 1);
    }
  };

  return (
    <div>
      <img className="circuitBottom" src={circuitB} alt="circuit-board" />
      <img className="circuitTop" src={circuitT} alt="circuit-board" />
      <div className="wrapper">
        <p className="arrow-left" onClick={decreaseGalleryIndex}>
          {" "}
          {"<"}{" "}
        </p>{" "}
        <a href={project.appDeploymentUrl} rel="noreferrer" target="_blank" className="featured-project-image"><img
          className="featured-project-image"
          // src={featuredProject.appDeploymentImage}
          src={imageGalleryArray[imageGalleryIndex]}
          alt="featured-img"
        /></a>
        <p className="arrow-right" onClick={increaseGalleryIndex}>
          {" "}
          {">"}{" "}
        </p>{" "}
        <HorizontalCircuit className="line-right" />
        <p className="description">{project.additionalInformation}</p>
        <p className="tech">
          {project.techUsed &&
            project.techUsed.map((tech: string, i: number) => {
              return (
                <li key={i}>
                  <img
                    src={builtUsingSVG[tech]}
                    alt="icon"
                    className="showcase-tech-icon"
                  />
                </li>
              );
            })}
        </p>
        <p className="heading">{project.projectName}</p>
        <HorizontalCircuit className="line-left" />
        <p className="problem-statement">{project.problemStatement}</p>
        <p className="contributors">{usersNames.join(", ")}</p>
      </div>
    </div>
  );
};

export default ShowcaseProfile;
