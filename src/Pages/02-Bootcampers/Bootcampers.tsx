import React, { useState, useEffect } from "react";
import "../01-Showcase/Showcase.scss";
import "./Bootcampers.scss";
import Users from "../../Components/ReactComponents/Users";
import LeftVerticalTitle from "../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import axios from "axios";
import { API_URL } from "../../config";

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
          <LeftVerticalTitle title="Bootcampers"></LeftVerticalTitle>
          <section className="profiles-showcase-wrapper">
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
