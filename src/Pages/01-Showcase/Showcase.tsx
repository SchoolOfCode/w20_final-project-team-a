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
        //   response.data.forEach((project:any) => setData([...data,project]))
        //     console.log(response.data)
        setData(response.data);
      });
    };
    getData();
  }, []);

  return (
    <>
      <div className="showcase-container">
        <LeftVerticalTitle title="Showcase"></LeftVerticalTitle>

        <section className="project-showcase-container">
          <section className="project-showcase-display">
            <HorizontalCircuit className="circuit-line"></HorizontalCircuit>
          </section>

          <section className="project-showcase-display-objects">
            {data.map((project, i) => (
              <Projects key={i} data={project} />
            ))}
          </section>
        </section>
      </div>
    </>
  );
};

export default Showcase;
