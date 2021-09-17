import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import "./Homepage.scss";
// import circuitT from "../../Components/VisualAssets/BackgroundsPlus/HomeBGTop.png";
// import circuitB from "../../Components/VisualAssets/BackgroundsPlus/HomeBGBottom.png";
import circuitT from "../../Components/VisualAssets/BackgroundsSVG/HomeBGTop.svg";
import circuitB from "../../Components/VisualAssets/BackgroundsSVG/HomeBGBottom.svg";
import GitHub from "../../Components/VisualAssets/SVGIcons/github.svg";
import HorizontalCircuit from "../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";
import { builtUsingSVG } from "../../Components/VisualAssets/SVGIcons/svgIcons";

const Homepage = (project: any) => {
  const [featuredProject, setFeaturedProject] = useState<any>({});

  const [imageGalleryArray, setImageGalleryArray] = useState<any>([]);
  const [imageGalleryIndex, setImageGalleryIndex] = useState(0);
  const [usersNames, setUsersNames] = useState<string[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const projectArray = await axios.get(API_URL + "projects/featured");
        setFeaturedProject(await projectArray.data);
        const data = await projectArray.data;
        setImageGalleryArray([
          await data.appDeploymentImage,
          ...(await data.additionaAppImageURLs),
        ]);
        setUsersNames([
          ...(await data.users.map((user: any) => user.displayName)),
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    getProjects();
  }, []);

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
        {/*onClick increase image display index by 1/*/}
        <img
          className="featured-project-image"
          // src={featuredProject.appDeploymentImage}
          src={imageGalleryArray[imageGalleryIndex]}
          alt="featured-img"
        ></img>
        {/*need to access array of images, display index=0 as default/*/}
        <p className="arrow-right" onClick={increaseGalleryIndex}>
          {" "}
          {">"}{" "}
        </p>{" "}
        {/*onClick decrease image display index by 1/*/}
        <HorizontalCircuit className="line-right" />
        <p className="description"> {featuredProject.additionalInformation} </p>
        <p className="tech">
          {" "}
          Built using:
          {featuredProject.techUsed &&
            featuredProject.techUsed.map((tech: string, i: number) => {
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
        {/*needs list with tech images here/*/}
        <p className="heading">
          {" "}
          <a
            className="github-icon"
            href={featuredProject.githubUrl}
            target="blank"
          >
            <img src={GitHub} alt="GitHub Link" />
          </a>
          Featured Project
          {/* changed to title "Featured Project", this data put in place of problem statement below {featuredProject.projectName} */}
        </p>
        <HorizontalCircuit className="line-left" />
        <p className="title">{featuredProject.projectName}</p>
        {/* projectName here instead {featuredProject.problemStatement}</p> */}
        {usersNames && (
          <p className="contributors">Contributors: {usersNames.join(", ")} </p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
