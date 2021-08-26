import React, {useState} from 'react'
import axios from 'axios';
import FormInput from '../Components/FormInput/FormInput';
import FormInputContributors from '../Components/FormInput/FormInputContributors';
import FormInputMultiText from '../Components/FormInput/FormInputMultiText';
import FormInputImage from '../Components/FormInput/FormInputImage';

const Submit: React.FC = () => {

const [projectName, setProjectName] = useState();
const [weekNumber, setWeekNumber] = useState();
const [contributors, setContributors] = useState <string[]>([]);
const [problemStatement, setProblemStatement] = useState();
const [additionalInformation, setAdditionalInformation] = useState();
const [githubUrl, setGithubUrl] = useState();
const [techUsed, setTechUsed] = useState([]);
const [appDeploymentImage, setAppDeploymentImage] = useState();
const [appDeploymentUrl, setAppDeploymentUrl] = useState();
const [additionalAppData, setAdditionalAppData] = useState([]);
const [success, setSuccess] = useState(false);
const [failure, setFailure] = useState(false);
const [failureMsg, setFailureMsg] = useState([{msg:""}]);

// const Test: React.FC = () => {}

const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
    e.preventDefault();
    axios({
        method:"POST",
        url:"http://localhost:5000/api/projects/submit",
        data: {projectName, weekNumber, contributors, problemStatement,additionalInformation, githubUrl, appDeploymentUrl},
    }).then(
        (response) => {
            if (response.data.success) {
                setSuccess(true)
                setFailure(false)
            }
            else {
            setFailureMsg(response.data.msg)
            setFailure(true)
            }
        }
        )
        .catch(
            (err) => {
                console.error(err)
            }
        )
}

    return (
        <div>
            <h1>Add a project to the showcase</h1>
            {success &&
            <div style={{backgroundColor:"lightgreen", color:"black"}}> 
                <p>Your project has been uploaded. </p>
            </div>}
            {failure &&
            <div style={{backgroundColor:"red", color:"white"}}> 
                <p>{failureMsg}</p>
            </div>
            }            
            <form>
                <FormInput 
                    labelFor="projectName"
                    labelText="Project Name: "
                    type="text"
                    placeholder="My Project"
                    name="projectName"
                    setValue={setProjectName}
                />
                <FormInput 
                    labelFor="weekNumber"
                    labelText="Week Number: "
                    placeholder=""
                    type="number"
                    name="weekNumber"
                    setValue={setWeekNumber}
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
                <FormInputMultiText 
                    labelFor="problemStatement"
                    labelText="Problem Statement: "
                    placeholder="max 140 characters"
                    name="problemStatement"
                    setValue={setProblemStatement}
                />   
                <FormInputMultiText
                    labelFor="additionalInformation"
                    labelText="Additional Information: "
                    placeholder="max 140 characters"
                    name="additionalInformation"
                    setValue={setAdditionalInformation}
                />
                <FormInput 
                    labelFor="githubUrl"
                    labelText="GitHub URL: "
                    type="text"
                    placeholder="github.com/myproject"
                    name="githubUrl"
                    setValue={setGithubUrl}
                />
{/* techUsed */}
                <FormInputImage 
                    labelFor="appDeploymentImage"
                    labelText="Deployed Project Image: "
                    name="appDeploymentImage"
                    setValue={setAppDeploymentImage}
                    state={appDeploymentImage}
                />
                <FormInput 
                    labelFor="appDeploymentUrl"
                    labelText="Deployed Project URL: "
                    type="url"
                    placeholder="www.myproject.com"
                    name="appDeploymentUrl"
                    setValue={setAppDeploymentUrl}
                />   
{/* additionalAppData */}                                                                                           
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Submit</button>            
            </form> 
        </div>
    )
}

export default Submit
