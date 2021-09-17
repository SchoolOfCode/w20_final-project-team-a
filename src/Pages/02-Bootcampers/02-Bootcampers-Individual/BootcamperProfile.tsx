import React, { useEffect, useState } from "react";
import "./BootcamperProfile.scss";
import HorizontalCircuit from "../../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";
import LeftVerticalTitle from "../../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import SocialLinks from "../../../Components/ReactComponents/SocialLinks";
import { API_URL } from "../../../config";
import axios from "axios";
import Projects from "../../../Components/ReactComponents/Projects";
import { builtUsingSVG } from "../../../Components/VisualAssets/SVGIcons/svgIcons";

const BootcamperProfile = (data: any) => {
  const user = data.location.state;

  const [userProjects, setUserProjects] = useState<any[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const usersProjects = await axios.get(
          API_URL + "users/individual/:" + user._id
        );
        setUserProjects(await usersProjects.data.msg.projects);
      } catch (err) {
        console.error(err);
      }
    };
    getProjects();
  });

  const techIcons: any = new Set();
  userProjects.forEach((project) => {
    project.techUsed.forEach((tech: string) => {
      techIcons.add(tech);
    });
  });

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
        <SocialLinks className="social-icons" {...user} />

        <section className="individual-tech-used">
          <h3 className="individual-tech-used-title">My projects use:</h3>
          <ul>
            {[...techIcons].map((icon, i) => {
              return (
                <li key={i}>
                  <img src={builtUsingSVG[icon]} alt="icon" />
                </li>
              );
            })}
          </ul>
        </section>

        <img
          className="individual-profile-photo"
          src={user.photo}
          alt="The user"
        />
      </section>

      <h3 className="individual-profile-projects-title">My Projects</h3>
      <HorizontalCircuit className="individual-profile-line-2" />

      <section className="individual-profile-projects-container">
        <div className="individual-profile-projects">
          {userProjects.map((project, i) => {
            return <Projects data={project} key={i} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default BootcamperProfile;
