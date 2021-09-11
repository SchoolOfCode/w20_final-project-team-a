import React, { useEffect, useState } from "react";
import "./BootcamperProfile.scss";
import HorizontalCircuit from "../../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";
import LeftVerticalTitle from "../../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import SocialLinks from "../../../Components/ReactComponents/SocialLinks";
import { API_URL } from "../../../config";
import axios from "axios";
import Loading from "../../../Components/ReactComponents/Loading/Loading";
import Projects from "../../../Components/ReactComponents/Projects";

const BootcamperProfile = (data: any) => {
  const user = data.location.state;

  const [userProjects, setUserProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getProjects = async () => {
    setLoading(true);
    try {
      const usersProjects = await axios.get(
        API_URL + "users/individual/:" + user._id
      );
      setUserProjects(await usersProjects.data.msg.projects);
    } catch (err) {
      console.error(err);
    }
    console.log(userProjects);
  };

  useEffect(() => {
    getProjects();
    setLoading(false);
  }, []);

  return (
    <div className="individual-profile-page">
      <LeftVerticalTitle
        title={`Bootcamp${user.cohort ? " " + user.cohort : "er"}`}
      />
      <HorizontalCircuit className="individual-profile-line-1" />
      <section className="individual-profile-container">
        <h2 className="individual-profile-name">{user.displayName}</h2>
        <p className="individual-profile-statement">
          {user.statement || "Test"}
        </p>
        <SocialLinks {...user} />

        <img
          className="individual-profile-photo"
          src={user.photo}
          alt="The user"
        />

        <h3 className="individual-profile-projects-title">My Projects</h3>
      </section>
      <HorizontalCircuit className="individual-profile-line-2" />

      <section className="individual-profile-projects-container">
        {loading ? (
          <Loading />
        ) : (
          <div className="individual-profile-projects">
            {userProjects.map((project, i) => {
              return <Projects data={project} key={i} />;
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default BootcamperProfile;
