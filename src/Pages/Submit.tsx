import React, {useState} from 'react'
import axios from 'axios';
import FormInput from '../Components/FormInput/FormInput';
import FormInputContributors from '../Components/FormInput/FormInputContributors';
import FormInputMultiText from '../Components/FormInput/FormInputMultiText';
import FormInputImage from '../Components/FormInput/FormInputImage';
import FormInputTech from '../Components/FormInput/FormInputTech';
import { API_URL } from '../config.js';
import {builtUsingIcons} from "../Components/techStack/techStack.js"
//Style elements
import Line from "../Components/BackgroundsPlus/Line.png"
import HorizontalLine from "../Components/BackgroundsPlus/Viewed Profile Up Left.png"

const Submit: React.FC = () => {

    const [projectName, setProjectName] = useState();
    const [weekNumber, setWeekNumber] = useState();
    const [contributors, setContributors] = useState <string[]>([]);
    const [problemStatement, setProblemStatement] = useState();
    const [additionalInformation, setAdditionalInformation] = useState();
    const [githubUrl, setGithubUrl] = useState();
    const [builtUsing, setBuiltUsing] = useState (builtUsingIcons);
    const [appImage, setAppImage] = useState();
    const [appDeploymentUrl, setAppDeploymentUrl] = useState();
    const [additionalAppImage1, setAdditionalAppImage1] = useState();
    const [additionalAppImage2, setAdditionalAppImage2] = useState();
    const [additionalAppImage3, setAdditionalAppImage3] = useState();   
    
    const [projID, setProjID] = useState("");

    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [failureMsg, setFailureMsg] = useState([{msg:""}]);

// const Test: React.FC = () => {}

        const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
            e.preventDefault();

            const selectedBuiltUsingFilter = [];
            for (const value of Object.values(builtUsing)) {
                selectedBuiltUsingFilter.push(value)
            }
            
            const selectedBuiltUsing = selectedBuiltUsingFilter.filter(item=>item.used===true)
            const appImagesArray = [appImage, additionalAppImage1, additionalAppImage2, additionalAppImage3]


            const formData = new FormData()
            // formData.append('appImage',appImage!)
            formData.append("projectName", projectName!)
            formData.append("weekNumber",weekNumber!)
            contributors.forEach(contributor =>
                formData.append("contributors",contributor))
            formData.append("problemStatement",problemStatement!)
            formData.append("additionalInformation",additionalInformation!)
            formData.append("githubUrl",githubUrl!)
            formData.append("appDeploymentUrl",appDeploymentUrl!)
            selectedBuiltUsing.forEach(tech=>
                formData.append("techUsed",tech.name))
            // formData.append("additionalAppImage1",additionalAppImage1!)
            // formData.append("additionalAppImage2",additionalAppImage2!)            
            // formData.append("additionalAppImage3",additionalAppImage3!)
            appImagesArray.forEach(image => 
                formData.append("appImages", image!))

            axios.post(API_URL+"projects/submit", formData)
                .then(
                (response) => {
                    if (response.data.success) {
                        setSuccess(true)
                        setFailure(false)
                        setProjID(response.data.project)
                    }
                    else {
                    setFailureMsg(response.data.msg)
                    setFailure(true)
                    }
                })
                .then(()=>{
                    axios.get(API_URL+"projects/update/:"+projID)
                    .then(res => console.log(res))
                    .catch(err=>console.error(err))
                })
                .catch(
                    (err) => {
                        console.error(err)
                    }
                )

        }

    return (
        <div className = "submit-page-container">
            <header className="submit-header">
                <h1 className="submit-header-text">Add Project</h1>
                <img src={Line} alt="styling line" className="submit-header-line"/>
            </header>
            <section className = "submit-messages-container">
                {success &&
                    <div className = "submit-messages-container-sucess">
                        <h3 className = "submit-messages-text">Your project has been uploaded </h3>
                    </div>
                }
                {failure &&
                    <div className = "submit-messages-container-failure">
                        <h3 className = "submit-messages-text">{failureMsg}</h3>
                    </div>
                }
            </section>            
            
            <img src={HorizontalLine} alt="styling line" className="submit-messages-line" />
            
            <section className = "submit-form-container">
                <form encType="multipart/form-data">
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
                    <FormInputContributors 
                        labelFor="contributors"
                        labelText="Contributors: "
                        type="text"
                        placeholder="Contributors"
                        name="contributors"
                        setContributors={setContributors}  
                        contributors={contributors}                  
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
                    <FormInputTech 
                        labelFor="builtUsing"
                        labelText="Technologies Used: "
                        name="builtUsing"
                        className="builtUsing-input"
                        setBuiltUsing={setBuiltUsing}  
                        builtUsing={builtUsing}     
                    />
                    <FormInputImage 
                        labelFor="appImage"
                        labelText="Deployed Project Image: "
                        name="appImage"
                        className="form-input"
                        imageClassName="form-input-image"
                        setValue={setAppImage}
                        state={appImage}
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
                    <FormInput 
                        labelFor="weekNumber"
                        labelText="Week Number: "
                        placeholder=""
                        className="weekNumber-input"
                        type="number"
                        name="weekNumber"
                        setValue={setWeekNumber}
                    />                
                    <FormInputImage 
                        labelFor="additionalAppImage1"
                        labelText="Additional Project image 1: "
                        name="additionalAppImage1"
                        className="form-input"
                        imageClassName="form-input-image"
                        setValue={setAdditionalAppImage1}
                        state={additionalAppImage1}
                    /> 
                    <FormInputImage 
                        labelFor="additionalAppImage2"
                        labelText="Additional Project image 2: "
                        name="additionalAppImage2"
                        className="form-input"
                        imageClassName="form-input-image"
                        setValue={setAdditionalAppImage2}
                        state={additionalAppImage2}
                    />
                    <FormInputImage 
                        labelFor="additionalAppImage3"
                        labelText="Additional Project image 3: "
                        name="additionalAppImage3"
                        className="form-input"
                        imageClassName="form-input-image"
                        setValue={setAdditionalAppImage3}
                        state={additionalAppImage3}
                    />                                                                                                                         
                <button type="submit" onClick={(e)=>handleSubmit(e)}>Submit</button>            
                </form>
            </section>
        </div>
    )
}

export default Submit
