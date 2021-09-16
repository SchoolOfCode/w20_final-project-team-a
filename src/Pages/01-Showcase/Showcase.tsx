import React, { useState, useEffect } from "react";

import "./Showcase.scss";
import Projects from "../../Components/ReactComponents/Projects";

import axios from "axios";
import { API_URL } from "../../config";

import LeftVerticalTitle from "../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import HorizontalCircuit from "../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";
// import ScrollingFog from "../../Components/VisualAssets/BackgroundsPlus/FogOverlay2.png"

const Showcase = () => {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    const getData = async () => {
      axios.get(API_URL + "projects/all").then((response) => {
        setData(response.data);
      });
    };
    getData();
  }, []);

  return (
    <>
      <LeftVerticalTitle title="Showcase"></LeftVerticalTitle>
      <HorizontalCircuit className="circuit-line-left"></HorizontalCircuit>
      <div className="showcase-page-container">
        <div className="showcase-items-container">
          {data.map((project, i) => (
            <Projects key={i} data={project} />
          ))}
        </div>
      </div>
      {/* <img src={ScrollingFog} alt="overlay style element" className="showcase-fog" /> */}
      {/* <div className="showcase-gradient">
      </div> */}
    </>
  );
};

export default Showcase;
