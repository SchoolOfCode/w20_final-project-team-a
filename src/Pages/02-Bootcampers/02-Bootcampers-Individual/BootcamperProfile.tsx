import React, { useEffect, useState } from "react";
import "./BootcamperProfile.scss";
import HorizontalCircuit from "../../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";
import LeftVerticalTitle from "../../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import SocialLinks from "../../../Components/ReactComponents/SocialLinks";
import { API_URL } from "../../../config";
import axios from "axios";
import Loading from "../../../Components/ReactComponents/Loading/Loading";
import Projects from "../../../Components/ReactComponents/Projects";
import { builtUsing } from "../../../Components/VisualAssets/techStack/techIcons";


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

  const techArrayIcons :any[] = [];
  userProjects.forEach((project,i)=>{
    project.techUsed.forEach((tech:string) =>{
      techArrayIcons.push(
        <li key={i}>
          <img src={builtUsing[tech]} alt="icon" />
        </li>
      )
    })
  })
  const techIcons = [...new Set(techArrayIcons)]


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

        <section className="individual-tech-used">
          <ul>
          {techIcons}
          </ul>
        </section>

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
                return (
                  <Projects data={project} key={i}/>
                );
              })}
            </div>
          )}
      </section>
    </div>
  );
};

export default BootcamperProfile;
