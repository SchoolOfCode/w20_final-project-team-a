import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { Approved, Featured, Remove } from "./AdminOptions";
import { v4 as uuidv4 } from "uuid";

const AdminProjectDisplay = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [refresh, setRefresh] = useState(false);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(API_URL + "auth/admin/list", {
        withCredentials: true,
      })
      .then((res) => {
        setAllProjects(res.data.projects);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const projectsArray: any[] = [
    <div className="admin-page-projects-list-item">
      <span className="admin-page-projects-list-1">Project Name</span>
      <span className="admin-page-projects-list-2">GitHub URL</span>
      <span className="admin-page-projects-list-3">Contributors</span>
      <span className="admin-page-projects-list-4">Approved</span>
      <span className="admin-page-projects-list-5">Featured</span>
      <span className="admin-page-projects-list-6">Remove</span>
    </div>,
  ];

  const handleSave = () => {
    axios({
      url: API_URL + "auth/admin/update",
      method: "put",
      data: allProjects,
    })
      .then((res) => {
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));

    const forDeletionIDs = allProjects
      .filter((project: any) => project.remove === true)
      .map((project: any) => project._id);

    if (forDeletionIDs.length > 0) {
      axios({
        url: API_URL + "auth/admin/delete",
        method: "delete",
        data: forDeletionIDs,
      })
        .then((res) => {
          setRefresh(!refresh);
        })
        .catch((err) => console.log(err));
    }
  };

  allProjects.forEach((project: any, i: number) => {
    projectsArray.push(
      <div className="admin-page-projects-list-item" key={uuidv4()}>
        <div className="admin-page-projects-list-1">
          <span>{project.projectName}</span>
          <input type="checkbox" id={`admin-preview-image-control-${i}`} />
          <label
            htmlFor={`admin-preview-image-control-${i}`}
            className="admin-page-projects-preview"
          >
            <img
              src={project.appDeploymentImage}
              alt="Preview of the application"
            />
          </label>
        </div>
        <span className="admin-page-projects-list-2">{project.githubUrl}</span>
        <span className="admin-page-projects-list-3">
          {project.contributors.join(", ")}
        </span>
        <Approved
          projects={allProjects}
          setProjects={setAllProjects}
          i={i}
          key={uuidv4()}
        />
        <Featured
          projects={allProjects}
          setProjects={setAllProjects}
          i={i}
          key={uuidv4()}
        />
        <Remove
          projects={allProjects}
          setProjects={setAllProjects}
          i={i}
          key={uuidv4()}
        />
      </div>
    );
  });

  return (
    <section className="admin-page-projects">
      {projectsArray}
      <button type="button" className="admin-page-button" onClick={handleSave}>
        Save Changes
      </button>
    </section>
  );
};

export default AdminProjectDisplay;
