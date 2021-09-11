import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../../config";
import "./Homepage.scss";
import featuredImg from "./77b1a6d5-d93_my_space_2.jpg";
import circuitT from "../../Components/VisualAssets/BackgroundsPlus/HomeBGTop.png"
import circuitB from "../../Components/VisualAssets/BackgroundsPlus/HomeBGBottom.png"
import HorizontalCircuit from "../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";

const Homepage = (data: any) => {

  const [featuredProject, setFeaturedProject] = useState([{}]);

  useEffect(() => {
    const getData = async () => {
      axios.get(API_URL + "projects/").then((response) => {
        setFeaturedProject(response.data);
      });
      console.log("give me featured", featuredProject)
    };
    getData();
  }, []);

  return (
    <div className="wrapper">
      <img className="circuitT" src={circuitT} alt="circuit-board"/>
      <img className="circuitB" src={circuitB} alt="circuit-board"/>
      <p className="arrow-left"> {"<"} </p>{" "}
      {/*onClick increase image display index by 1/*/}
      <img
        className="featured-project-image"
        src={data.appDeploymentImage}
        alt="featured-img"
      ></img>
      {/*need to access array of images, display index=0 as default/*/}
      <p className="arrow-right"> {">"} </p>{" "}
      {/*onClick decrease image display index by 1/*/}
      <HorizontalCircuit className="line-right" />
      <p className="description"> {data.additionalInformation} </p>
      <p className="tech"> Built using </p>{" "}
      {/*needs list with tech images here/*/}
      <p className="heading"> {data.projectName} </p>
      <HorizontalCircuit className="line-left" />
      <p className="title"> {data.problemStatement}</p>
      <p className="contributors"> {data.contributors} </p>
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
