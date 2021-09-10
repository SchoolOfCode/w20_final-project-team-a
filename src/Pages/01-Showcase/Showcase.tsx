import React, { useState, useEffect } from "react";

import "./Showcase.scss";
import Projects from "../../Components/ReactComponents/Projects";

import axios from "axios";
import { API_URL } from "../../config";

import LeftVerticalTitle from "../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import HorizontalCircuit from "../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";

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
    <HorizontalCircuit className="circuit-line"></HorizontalCircuit>
    <div className="showcase-container">
      <section className="project-showcase-container">
          {data.map((project, i) => (
            <Projects key={i} data={project} />
          ))}
      </section>
    </div>
  </>
  );
};

export default Showcase;
