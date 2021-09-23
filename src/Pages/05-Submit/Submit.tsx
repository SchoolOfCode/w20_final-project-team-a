import React, { useState } from "react";
import "./Submit.scss";
import axios from "axios";

// import FormInput from "../../Components/ReactComponents/SubmitFormInput/FormInput";
import FormInputContributors from "../../Components/ReactComponents/SubmitFormInput/FormInputContributors";
// import FormInputMultiText from "../../Components/ReactComponents/SubmitFormInput/FormInputMultiText";
import FormInputImage from "../../Components/ReactComponents/SubmitFormInput/FormInputImage";
import FormInputTech from "../../Components/ReactComponents/SubmitFormInput/FormInputTech";
import { SubmitValidationSchema } from "../../Components/ReactComponents/SubmitFormInput/SubmitValidationSchema";

import { API_URL } from "../../config.js";
import { builtUsingSVGObject } from "../../Components/VisualAssets/SVGIcons/svgIcons";
import LeftVerticalTitle from "../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import HorizontalCircuit from "../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import circuitOther from "../../Components/VisualAssets/BackgroundsSVG/SubmitBG.svg";

type Props = {
  loginStatus: boolean;
  currentUser: any;
};

type ProjectSubmitForm = {
  projectName: string;
  weekNumber: string;
  contributors: string[];
  problemStatement: string;
  additionalInformation?: string;
  githubUrl: string;
  builtUsing: any;
  appImage: File;
  appDeploymentUrl: string;
  additionalAppImage1?: File;
  additionalAppImage2?: File;
  additionalAppImage3?: File;
};

const Submit: React.FC<Props> = ({ loginStatus, currentUser }) => {
  const history = useHistory();
  if (!currentUser || loginStatus === false) history.push("/login");

  const [contributors, setContributors] = useState<string[]>([currentUser.email]);
  const [builtUsing, setBuiltUsing] = useState(builtUsingSVGObject);
  const [formError, setformError] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [appImage, setAppImage] = useState<string>();
  const [additionalAppImage1, setAdditionalAppImage1] = useState<string>();
  const [additionalAppImage2, setAdditionalAppImage2] = useState<string>();
  const [additionalAppImage3, setAdditionalAppImage3] = useState<string>();

  //Returned State:any
  // const [projID, setProjID] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failureMsg, setFailureMsg] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectSubmitForm>({
    resolver: yupResolver(SubmitValidationSchema),
  });

  const onSubmit = async (formData: ProjectSubmitForm) => {
    if (formError.some((item) => item)) {
      setFailure(true);
      setFailureMsg("Please check all required fields have valid inputs");
      return;
    } else {
      setFailure(false);
      setFailureMsg("");
    }
    const appImagesArray = [
      appImage || null,
      additionalAppImage1 || null,
      additionalAppImage2 || null,
      additionalAppImage3 || null,
    ];

    const projectFormData = new FormData();

    appImagesArray.forEach((image) => {
      if (image != null) {
        projectFormData.append("appImages", image);
      }
    });
    const selectedBuiltUsingFilter = [];
    for (const value of Object.values(builtUsing)) {
      selectedBuiltUsingFilter.push(value);
    }
    const selectedBuiltUsing = selectedBuiltUsingFilter.filter(
      (item) => item.used === true
    );
    selectedBuiltUsing.forEach((tech) =>
      projectFormData.append("techUsed", tech.name)
    );

    projectFormData.append("projectName", formData.projectName!);
    projectFormData.append("weekNumber", formData.weekNumber!);
    contributors.forEach((contributor) =>
      projectFormData.append("contributors", contributor)
    );
    projectFormData.append("problemStatement", formData.problemStatement!);
    projectFormData.append(
      "additionalInformation",
      formData.additionalInformation!
    );
    projectFormData.append("githubUrl", formData.githubUrl!);
    projectFormData.append("appDeploymentUrl", formData.appDeploymentUrl!);

    try {
      const response = await axios.post(
        API_URL + "projects/submit",
        projectFormData
      );
      const projectSubmission = await response.data;
      if (await projectSubmission.success) {
        setSuccess(true);
        setFailure(false);
        // setProjID(projectSubmission.project);
        try {
          const populateUsers = await axios.get(
            API_URL + "projects/update/:" + projectSubmission.project
          );
          if (await populateUsers.data.success) {
            setSuccess(true);
            setFailure(false);
          } else {
            setSuccess(false);
            setFailure(true);
            setFailureMsg(failureMsg + populateUsers.data.msg);
          }
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="submit-page-container">
      <img className="circuit-right" src={circuitOther} alt="circuit-board" />
      <LeftVerticalTitle title="Submit"></LeftVerticalTitle>

      <HorizontalCircuit className="submit-horizontal-line" />
      <section className="submit-form-container">
        <form
          encType="multipart/form-data"
          className="submit-form-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <section className="submit-form-group projectName-input">
            <label>Project Name:</label>
            <input
              type="text"
              {...register("projectName")}
              placeholder="My project"
              className={`${errors.projectName ? "-invalid-input" : ""}`}
            ></input>1
            <div className="invalid-input-message">
              {errors.projectName?.message}
            </div>
          </section>
          <section className="submit-form-group problemStatement-input">
            <label>Problem Statement:</label>
            <textarea
              {...register("problemStatement")}
              placeholder="My project was designed to solve..."
              className={`${
                errors.problemStatement ? "-invalid-input invalid-input" : ""
              }`}
            ></textarea>
            <div className="invalid-input-message">
              {errors.problemStatement?.message}
            </div>
          </section>
          <section className="submit-form-group additionalInformation-input">
            <label>Additional Information:</label>
            <textarea
              {...register("additionalInformation")}
              placeholder="Optional additional information..."
              className={`${
                errors.additionalInformation
                  ? "-invalid-input invalid-input"
                  : ""
              }`}
            ></textarea>
            <div className="invalid-input-message">
              {errors.additionalInformation?.message}
            </div>
          </section>
          <section className="submit-form-group githubUrl-input">
            <label>GitHub Repository:</label>
            <input
              type="text"
              {...register("githubUrl")}
              placeholder="http://www.github.com/facebook"
              className={`${
                errors.githubUrl ? "-invalid-input invalid-input" : ""
              }`}
            ></input>
            <div className="invalid-input-message">
              {errors.githubUrl?.message}
            </div>
          </section>
          <section className="submit-form-group weekNumber-input">
            <label>Project Starting Week:</label>
            <input
              type="string"
              {...register("weekNumber")}
              placeholder="1"
              defaultValue={1}
              className={`${
                errors.weekNumber ? "-invalid-input invalid-input" : ""
              }`}
            ></input>
            <div className="invalid-input-message">
              {errors.weekNumber?.message}
            </div>
          </section>

          <section className="submit-form-group appDeploymentUrl-input">
            <label>Deployed App URL:</label>
            <input
              type="text"
              {...register("appDeploymentUrl")}
              placeholder="www.cool-app.com"
              className={`${
                errors.appDeploymentUrl ? "-invalid-input invalid-input" : ""
              }`}
            ></input>
            <div className="invalid-input-message">
              {errors.appDeploymentUrl?.message}
            </div>
          </section>
          <FormInputContributors
            labelFor="contributors"
            labelText="Contributors: "
            type="text"
            placeholder="Contributors"
            className="contributors-input"
            name="contributors"
            setContributors={setContributors}
            contributors={contributors}
            index={0}
            formError={formError}
            setformError={setformError}
          />


          <FormInputImage
            labelFor="appImage"
            labelText="Main Project Image: "
            name="appImage"
            className="appImage-input"
            imageClassName="appImage-input-image"
            setValue={setAppImage}
            state={appImage}
            index={2}
            formError={formError}
            setformError={setformError}
          />
          <FormInputImage
            labelFor="additionalAppImage1"
            labelText="Additional Project image 1: "
            name="additionalAppImage1"
            className="additionalAppImage1-input"
            imageClassName="additionalAppImage1-input-image"
            setValue={setAdditionalAppImage1}
            state={additionalAppImage1}
            index={3}
            formError={formError}
            setformError={setformError}
          />
          <FormInputImage
            labelFor="additionalAppImage2"
            labelText="Additional Project image 2: "
            name="additionalAppImage2"
            className="additionalAppImage2-input"
            imageClassName="additionalAppImage2-input-image"
            setValue={setAdditionalAppImage2}
            state={additionalAppImage2}
            index={4}
            formError={formError}
            setformError={setformError}
          />
          <FormInputImage
            labelFor="additionalAppImage3"
            labelText="Additional Project image 3: "
            name="additionalAppImage3"
            className="additionalAppImage3-input"
            imageClassName="additionalAppImage3-input-image"
            setValue={setAdditionalAppImage3}
            state={additionalAppImage3}
            index={5}
            formError={formError}
            setformError={setformError}
          />

          <button type="submit" className="button project-submit-button">
            Submit
          </button>

          <FormInputTech
            labelFor="builtUsing"
            labelText="Technologies Used: "
            name="builtUsing"
            className="builtUsing-input"
            setBuiltUsing={setBuiltUsing}
            builtUsing={builtUsing}
            index={1}
            formError={formError}
            setformError={setformError}
          />
          {/* <section className="submit-form-group additionalAppImage1-input">
              <label>Additional Image 1:</label>
              <input
                type="file"
                {...register('additionalAppImage1')}
                accept="image/*"
                className={`${errors.additionalAppImage1?"-invalid-input" : ""}`}
                onChange={(e)=>{
                  if (e.target.files && e.target.files.length !== 0) {
                    const imageURL:any = URL.createObjectURL(e.target.files[0])
                    setAdditionalAppImagePreview1(imageURL)
                    }
                }}
              ></input>
              <div className="invalid-input-message">
                {errors.appImage?.message}
                {additionalAppImagePreview1?<img src={additionalAppImagePreview1} alt="user upload" className="additionalAppImage1-input-image"/>:null}
              </div>
          </section> */}

          <section className="submit-messages-container">
            {success && (
              <div className="submit-messages-success">
                <h3 className="submit-messages-text">
                  Your project has been uploaded
                </h3>
              </div>
            )}
            {failure && (
              <div className="submit-messages-failure">
                <h3 className="submit-messages-text">{failureMsg}</h3>
              </div>
            )}
          </section>

        </form>
      </section>
    </div>
  );
};

export default Submit;
