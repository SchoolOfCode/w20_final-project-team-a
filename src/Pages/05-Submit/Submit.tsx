import React, { useState,  } from "react";
import "./Submit.scss";
import axios from "axios";

// import FormInput from "../../Components/ReactComponents/SubmitFormInput/FormInput";
import FormInputContributors from "../../Components/ReactComponents/SubmitFormInput/FormInputContributors";
import FormInputMultiText from "../../Components/ReactComponents/SubmitFormInput/FormInputMultiText";
import FormInputImage from "../../Components/ReactComponents/SubmitFormInput/FormInputImage";
import FormInputTech from "../../Components/ReactComponents/SubmitFormInput/FormInputTech";
import { SubmitValidationSchema } from "../../Components/ReactComponents/SubmitFormInput/SubmitValidationSchema";

import { API_URL } from "../../config.js";
import { builtUsingSVGObject } from "../../Components/VisualAssets/SVGIcons/svgIcons";
import LeftVerticalTitle from "../../Components/ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import { useHistory } from "react-router-dom";
import HorizontalCircuit from "../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";

import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Props = {
  loginStatus: boolean;
};

type ProjectSubmitForm = {
  projectName:string,
  weekNumber:string,
  contributors:string[],
  problemStatement: string,
  additionalInformation?: string,
  githubUrl: string,
  builtUsing:any,
  appImage:File,
  appDeploymentUrl:string,
  additionalAppImage1?:File,
  additionalAppImage2?:File,
  additionalAppImage3?:File,
}

const Submit: React.FC<Props> = ({ loginStatus }) => {
  // const history = useHistory();
  // if (loginStatus === false) history.push("/login");


  const [contributors, setContributors] = useState<string[]>([]);
  const [builtUsing, setBuiltUsing] = useState(builtUsingSVGObject);
  const [appImagePreview, setAppImagePreview] = useState<string>();
  const [additionalAppImagePreview1, setAdditionalAppImagePreview1] = useState<string>();
  const [additionalAppImagePreview2, setAdditionalAppImagePreview2] = useState<string>();
  const [additionalAppImagePreview3, setAdditionalAppImagePreview3] = useState<string>();
  
  //Returned State:any
  const [projID, setProjID] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failureMsg, setFailureMsg] = useState<string>("");

  const {register, handleSubmit, formState: {errors}} = useForm<ProjectSubmitForm>({
    resolver: yupResolver(SubmitValidationSchema)
  })
  
  const onSubmit = (formData:ProjectSubmitForm) => {
    console.log(formData)
    const appImagesArray = [
      formData.appImage,
      // additionalAppImage1,
      // additionalAppImage2,
      // additionalAppImage3,
    ];
    // appImagesArray.forEach((image) => formData.append("appImages", image!));

  }

   // const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();

  //   const selectedBuiltUsingFilter = [];
  //   for (const value of Object.values(builtUsing)) {
  //     selectedBuiltUsingFilter.push(value);
  //   }

  //   const selectedBuiltUsing = selectedBuiltUsingFilter.filter(
  //     (item) => item.used === true
  //   );
  //   const appImagesArray = [
  //     appImage,
  //     additionalAppImage1,
  //     additionalAppImage2,
  //     additionalAppImage3,
  //   ];

  //   const formData = new FormData();
  //     formData.append("projectName", projectName!);
  //     formData.append("weekNumber", weekNumber!);
  //     contributors.forEach((contributor) =>
  //       formData.append("contributors", contributor)
  //     );
  //     formData.append("problemStatement", problemStatement!);
  //     formData.append("additionalInformation", additionalInformation!);
  //     formData.append("githubUrl", githubUrl!);
  //     formData.append("appDeploymentUrl", appDeploymentUrl!);
  //     selectedBuiltUsing.forEach((tech) =>
  //       formData.append("techUsed", tech.name)
  //     );
  //     appImagesArray.forEach((image) => formData.append("appImages", image!));

  //   axios
  //     .post(API_URL + "projects/submit", formData)
  //     .then((response) => {
  //       if (response.data.success) {
  //         setSuccess(true);
  //         setFailure(false);
  //         setProjID(response.data.project);
  //       } else {
  //         setFailure(true);
  //         setFailureMsg(response.data.msg);
  //       }
  //     })
  //     .then(() => {
  //       axios
  //         .get(API_URL + "projects/update/:" + projID)
  //         .catch((err) => console.error(err));
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  return (
    <div className="submit-page-container">

      <LeftVerticalTitle title="Submit"></LeftVerticalTitle>

      <section className="submit-messages-container">
        {/* {success && (
          <div className="submit-messages-container-sucess">
            <h3 className="submit-messages-text">
              Your project has been uploaded
            </h3>
          </div>
        )}
        {failure && (
          <div className="submit-messages-container-failure">
            <h3 className="submit-messages-text">{failureMsg}</h3>
          </div>
        )} */}
      </section>
      <HorizontalCircuit className = "submit-horizontal-line"/>
      <section className="submit-form-container">
        <form encType="multipart/form-data" className="submit-form-form" onSubmit={handleSubmit(onSubmit)}>
          <section className="submit-form-group projectName-input">
              <label>Project Name:</label>
              <input
                type="text"
                {...register('projectName')}
                placeholder="My project"
                className={`${errors.projectName?"-invalid-input" : ""}`}
              ></input>
              <div className="invalid-input-message">{errors.projectName?.message}</div>
          </section>
          <section className="submit-form-group problemStatement-input">
              <label>Problem Statement:</label>
              <textarea
                {...register('problemStatement')}
                placeholder="My project was designed to solve..."
                className={`${errors.problemStatement?"-invalid-input" : ""}`}
              ></textarea>
              <div className="invalid-input-message">{errors.problemStatement?.message}</div>
          </section>
          <section className="submit-form-group additionalInformation-input">
              <label>Additional Information:</label>
              <textarea
                {...register('additionalInformation')}
                placeholder="Optional additional information..."
                className={`${errors.additionalInformation?"-invalid-input" : ""}`}
              ></textarea>
              <div className="invalid-input-message">{errors.additionalInformation?.message}</div>
          </section>
          <section className="submit-form-group githubUrl-input">
              <label>GitHub Repository:</label>
              <input
                type="text"
                {...register('githubUrl')}
                placeholder="http://www.github.com/facebook"
                className={`${errors.githubUrl?"-invalid-input" : ""}`}
              ></input>
              <div className="invalid-input-message">{errors.githubUrl?.message}</div>
          </section>
          <section className="submit-form-group weekNumber-input">
              <label>Project Starting Week:</label>
              <input
                type="number"
                {...register('weekNumber')}
                placeholder="1"
                defaultValue={1}
                className={`${errors.weekNumber?"-invalid-input" : ""}`}
              ></input>
              <div className="invalid-input-message">{errors.weekNumber?.message}</div>
          </section>

          <section className="submit-form-group appDeploymentUrl-input">
              <label>Deployed App URL:</label>
              <input
                type="text"
                {...register('appDeploymentUrl')}
                placeholder="www.cool-app.com"
                className={`${errors.appDeploymentUrl?"-invalid-input" : ""}`}
              ></input>
              <div className="invalid-input-message">{errors.appDeploymentUrl?.message}</div>
          </section>

          <section className="submit-form-group appImage-input">
              <label>App Image:</label>
              <input
                type="file"
                {...register('appImage')}
                accept="image/*"
                className={`${errors.appImage?"-invalid-input" : ""}`}
                onChange={(e)=>{
                  if (e.target.files && e.target.files.length !== 0) {
                    const imageURL:any = URL.createObjectURL(e.target.files[0])
                    setAppImagePreview(imageURL)}
                }}
              ></input>
              <div className="invalid-input-message">
                {errors.appImage?.message}
                {appImagePreview?<img src={appImagePreview} alt="user upload" className="appImage-input-image"/>:null}
              </div>
          </section>
          <section className="submit-form-group additionalAppImage1-input">
              <label>Additional Image 1:</label>
              <input
                type="file"
                {...register('appImage')}
                accept="image/*"
                className={`${errors.additionalAppImage1?"-invalid-input" : ""}`}
                onChange={(e)=>{
                  if (e.target.files && e.target.files.length !== 0) {
                    const imageURL:any = URL.createObjectURL(e.target.files[0])
                    setAppImagePreview(imageURL)
                    }
                }}
              ></input>
              <div className="invalid-input-message">
                {errors.appImage?.message}
                {additionalAppImagePreview1?<img src={additionalAppImagePreview1} alt="user upload" className="additionalAppImage1-input-image"/>:null}
              </div>
          </section>


          
          {/* 
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
          />  */}
         {/*

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
          

          */}
          <button type="submit" className="button project-submit">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Submit;
