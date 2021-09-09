import React, { useState, useEffect } from "react";
import "./01-Showcase/Showcase.scss";
import Users from "../Components/Users";

import sidebar from "../Components/BackgroundsPlus/ShowcaseUpLeft.png";
import LeftVerticalTitle from "../Components/LeftVerticalTitle/LeftVerticalTitle";
import axios from "axios";
import { API_URL } from "../config";

const ProfilesShowcase = () => {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    const getData = async () => {
      axios.get(API_URL + "users/all").then((response) => {
        setData(response.data);
      });
      // console.log(data)
    };
    getData();
  }, []);

  return (
    <>
      <div>
        <section className="profiles-showcase-container">
          <LeftVerticalTitle title="Profiles"></LeftVerticalTitle>
          <section className="profiles-showcase-display">
            <img
              src={sidebar}
              alt="dividing line"
              className="profiles-showcase-sidebar-image"
            />
          </section>
          <section className="profiles-showcase-display-items">
            {data.map((user) => (
              <Users data={user} />
            ))}
          </section>
        </section>
      </div>
    </>
  );
};
export default ProfilesShowcase;
