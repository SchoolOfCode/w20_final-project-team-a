import React, { useState, useEffect } from "react";
import "./Bootcampers.scss";
import Users from "../../Components/ReactComponents/Users";
import LeftVerticalTitle from "../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import HorizontalCircuit from "../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";
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
    <LeftVerticalTitle title="Bootcampers"></LeftVerticalTitle>
    <HorizontalCircuit className="circuit-line"></HorizontalCircuit>
      <section className="bootcampers-showcase-container">
        <section className="bootcampers-items-container">
          {data.map((user,i) => (
            <Users data={user} key={i} />
          ))}
        </section>
      </section>
    </>
  );
};
export default ProfilesShowcase;
