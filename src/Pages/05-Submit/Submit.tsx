import React, { useState } from "react";
import "./Submit.scss";
import axios from "axios";
import FormInput from "../../Components/ReactComponents/FormInput/FormInput";
import FormInputContributors from "../../Components/ReactComponents/FormInput/FormInputContributors";
import FormInputMultiText from "../../Components/ReactComponents/FormInput/FormInputMultiText";
import FormInputImage from "../../Components/ReactComponents/FormInput/FormInputImage";
import FormInputTech from "../../Components/ReactComponents/FormInput/FormInputTech";
import { API_URL } from "../../config.js";
import { builtUsingIcons } from "../../Components/VisualAssets/techStack/techStack";
//Style elements
import LeftVerticalTitle from "../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import { useHistory } from "react-router-dom";

type Props = {
  loginStatus: boolean;
};

const Submit: React.FC<Props> = ({ loginStatus }) => {
  const history = useHistory();
  if (loginStatus === false) history.push("/login");

  const [projectName, setProjectName] = useState();
  const [weekNumber, setWeekNumber] = useState();
  const [contributors, setContributors] = useState<string[]>([]);
  const [problemStatement, setProblemStatement] = useState();
  const [additionalInformation, setAdditionalInformation] = useState();
  const [githubUrl, setGithubUrl] = useState();
  const [builtUsing, setBuiltUsing] = useState(builtUsingIcons);
  const [appImage, setAppImage] = useState();
  const [appDeploymentUrl, setAppDeploymentUrl] = useState();
  const [additionalAppImage1, setAdditionalAppImage1] = useState();
  const [additionalAppImage2, setAdditionalAppImage2] = useState();
  const [additionalAppImage3, setAdditionalAppImage3] = useState();

  const [projID, setProjID] = useState("");

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failureMsg, setFailureMsg] = useState([{ msg: "" }]);

  // const Test: React.FC = () => {}

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const selectedBuiltUsingFilter = [];
    for (const value of Object.values(builtUsing)) {
      selectedBuiltUsingFilter.push(value);
    }

    const selectedBuiltUsing = selectedBuiltUsingFilter.filter(
      (item) => item.used === true
    );
    const appImagesArray = [
      appImage,
      additionalAppImage1,
      additionalAppImage2,
      additionalAppImage3,
    ];

    const formData = new FormData();
    // formData.append('appImage',appImage!)
    formData.append("projectName", projectName!);
    formData.append("weekNumber", weekNumber!);
    contributors.forEach((contributor) =>
      formData.append("contributors", contributor)
    );
    formData.append("problemStatement", problemStatement!);
    formData.append("additionalInformation", additionalInformation!);
    formData.append("githubUrl", githubUrl!);
    formData.append("appDeploymentUrl", appDeploymentUrl!);
    selectedBuiltUsing.forEach((tech) =>
      formData.append("techUsed", tech.name)
    );
    appImagesArray.forEach((image) => formData.append("appImages", image!));

    axios
      .post(API_URL + "projects/submit", formData)
      .then((response) => {
        if (response.data.success) {
          setSuccess(true);
          setFailure(false);
          setProjID(response.data.project);
        } else {
          setFailureMsg(response.data.msg);
          setFailure(true);
        }
      })
      .then(() => {
        axios
          .get(API_URL + "projects/update/:" + projID)
          // .then(res => console.log(res))
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="submit-page-container">
      <LeftVerticalTitle title="Submit"></LeftVerticalTitle>
      <section className="submit-messages-container">
        {success && (
          <div className="submit-messages-container-sucess">
            <h3 className="submit-messages-text">
              Your project has been uploaded{" "}
            </h3>
          </div>
        )}
        {failure && (
          <div className="submit-messages-container-failure">
            <h3 className="submit-messages-text">{failureMsg}</h3>
          </div>
        )}
      </section>

      <section className="submit-form-container">
        <form encType="multipart/form-data" className="submit-form-form">
          <FormInput
            labelFor="projectName"
            labelText="Project Name: "
            type="text"
            className="projectName-input"
            placeholder="My Project"
            name="projectName"
            setValue={setProjectName}
          />
          <FormInputMultiText
            labelFor="problemStatement"
            labelText="Problem Statement: "
            placeholder="max 140 characters"
            className="problemStatement-input"
            name="problemStatement"
            setValue={setProblemStatement}
          />
          <FormInputMultiText
            labelFor="additionalInformation"
            labelText="Additional Information: "
            placeholder="max 140 characters"
            className="additionalInformation-input"
            name="additionalInformation"
            setValue={setAdditionalInformation}
          />
          <FormInput
            labelFor="githubUrl"
            labelText="GitHub URL: "
            type="text"
            className="githubUrl-input"
            placeholder="github.com/myproject"
            name="githubUrl"
            setValue={setGithubUrl}
          />
          <FormInput
            labelFor="weekNumber"
            labelText="Week Number: "
            placeholder=""
            className="weekNumber-input"
            type="number"
            name="weekNumber"
            setValue={setWeekNumber}
          />
          <FormInputContributors
            labelFor="contributors"
            labelText="Contributors: "
            type="text"
            placeholder="Contributors"
            className="contributors-input"
            name="contributors"
            setContributors={setContributors}
            contributors={contributors}
          />
          <FormInputTech
            labelFor="builtUsing"
            labelText="Technologies Used: "
            name="builtUsing"
            className="builtUsing-input"
            setBuiltUsing={setBuiltUsing}
            builtUsing={builtUsing}
          />
          <FormInput
            labelFor="appDeploymentUrl"
            labelText="Deployed Project URL: "
            type="url"
            className="appDeploymentUrl-input"
            placeholder="myproject.ninja"
            name="appDeploymentUrl"
            setValue={setAppDeploymentUrl}
          />
          <FormInputImage
            labelFor="appImage"
            labelText="Deployed Project Image: "
            name="appImage"
            className="appImage-input"
            imageClassName="appImage-input-image"
            setValue={setAppImage}
            state={appImage}
          />
          <FormInputImage
            labelFor="additionalAppImage1"
            labelText="Additional Project image 1: "
            name="additionalAppImage1"
            className="additionalAppImage1-input"
            imageClassName="additionalAppImage1-input-image"
            setValue={setAdditionalAppImage1}
            state={additionalAppImage1}
          />
          <FormInputImage
            labelFor="additionalAppImage2"
            labelText="Additional Project image 2: "
            name="additionalAppImage2"
            className="additionalAppImage2-input"
            imageClassName="additionalAppImage2-input-image"
            setValue={setAdditionalAppImage2}
            state={additionalAppImage2}
          />
          <FormInputImage
            labelFor="additionalAppImage3"
            labelText="Additional Project image 3: "
            name="additionalAppImage3"
            className="additionalAppImage3-input"
            imageClassName="additionalAppImage3-input-image"
            setValue={setAdditionalAppImage3}
            state={additionalAppImage3}
          />
        </form>
        <button
          type="submit"
          className="button project-submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </section>
    </div>
  );
};

export default Submit;