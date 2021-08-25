import React, {useState} from 'react'
import FormInput from '../Components/FormInput/FormInput';
import FormInputContributors from '../Components/FormInput/FormInputContributors';

const Submit: React.FC = () => {

const [projectName, setProjectName] = useState();
const [weekNumber, setWeekNumber] = useState();
const [contributors, setContributors] = useState <string[]>([]);
const [users, setUsers] = useState([]);
const [problemStatement, setProblemStatement] = useState();
const [additionalInformation, setAdditionalInformation] = useState();
const [githubUrl, setgithubUrl] = useState();
const [techUsed, setTechUsed] = useState([]);
const [appDeploymentImage, setAppDeploymentImage] = useState();
const [appDeploymentUrl, setAppDeploymentUrl] = useState();
const [additionalAppData, setAdditionalAppData] = useState([]);

// const Test: React.FC = () => {}

    return (
        <div>
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
            </form> 
        </div>
    )
}

export default Submit
