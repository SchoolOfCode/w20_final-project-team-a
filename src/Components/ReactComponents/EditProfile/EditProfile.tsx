import React, { useState, useReducer } from "react";
import "./EditProfile.scss";
import LeftVerticalTitle from "../../ReactComponents/LeftVerticalTitle/LeftVerticalTitle";
import HorizontalCircuit from "../../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";
// import BGImage from "../../VisualAssets/BackgroundsPlus/EditProfile2.png"
import BGImage from "../../VisualAssets/BackgroundsPlus/ProjectSubmitBG.png"
import PreviewImage from "./PreviewImage";
import FormInput from "./FormInput";
import FormInputTextarea from "./FormInputTextarea";
import FormInputImage from "./FormInputImage";
import axios from "axios";
import { API_URL } from "../../../config";
import {useHistory} from 'react-router-dom'

export interface User {
  _id: string;
  email: string;
  displayName: string;
  cohort?: string;
  githubUrl?: string;
  photo?: string;
  statement?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  personalWebsite?: string;
  location?: string;
  role: string;
  projects?: string[];
  hasError?:boolean;
  isFormValid?:boolean;
}

interface ProfileProps {
  user: User;
  setLoginStatus:(value:boolean)=>void
}

axios.defaults.withCredentials = true;

const EditProfile: React.FC<ProfileProps> = ({ user,setLoginStatus }) => {

  const [formError, setformError] = useState<boolean[]>(new Array(10).fill(false));
  const [newImage, setNewImage] = useState();
  const [failure, setFailure] = useState(false);
  const [failureMsg, setFailureMsg] = useState<string>("");
  const history = useHistory();

  const initialState:User = {...user, hasError:false, isFormValid:true};

  type Action = 
  | {
    type: "editing"; 
    field: string; 
    payload: string;
  }
  | {
    type: "error";
    index: number,
    errorState: boolean
  }

  const userReducer = (state: User, action: Action) =>{
    if (action.type === "editing"){
        return {
          ...state,
          [action.field]: action.payload
        }
    }
    // if(action.type === "error"){
    //   let i = action.index;
    //   let errors = [...formError.slice(0,i), action.errorState,...formError.slice(i+1)]
    //   setformError(errors)
    //   if (formError.some(item=>item)){
    //     return {
    //       ...state,
    //       isFormValid: false
    //     }
    //   }
    //   else{
    //     return {
    //       ...state,
    //       isFormValid: true
    //     }
    //   }
    // }
    return state
  }

  const [formState, dispatch] = useReducer(userReducer, initialState);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
    dispatch(
      {
      type: "editing",
      field: e.target.name,
      payload: e.target.value
    })
  }

  // const handleError = (index:number, errorState:boolean) =>{
  //   dispatch(
  //     {
  //     type: "error",
  //     index: index,
  //     errorState: errorState
  //   })
  // }


  const submit = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (formError.some(item=>item)){
      setFailure(true)
      setFailureMsg("Please check all required fields have valid inputs")
      return;
    } else{
      setFailure(false);
      setFailureMsg("");
    }
    const formData = new FormData();
    formData.append("newProfilePhoto", newImage!);
    formData.append("_id", user._id);
    formData.append("displayName", formState.displayName || user.displayName);
    formData.append(
      "photo",
      user.photo!); //default handled on backend
    formData.append("githubUrl", formState.githubUrl || user.githubUrl || "");
    formData.append("linkedin", formState.linkedin || user.linkedin || "");
    formData.append("twitter", formState.twitter || user.twitter || "");
    formData.append("youtube", formState.youtube || user.youtube || "");
    formData.append(
      "personalWebsite",
      formState.personalWebsite || user.personalWebsite || ""
    );
    formData.append("cohort", formState.cohort || user.cohort || "");
    formData.append("location", formState.location || user.location || "");
    formData.append("statement", formState.statement || user.statement || "");
    
    try{
      const response = await axios({
        url: API_URL + "auth/user/update",
        method: "put",
        data: formData,
      })
      const data = await response.data
      if (await data.success) {
        setFailureMsg("")
        setFailure(false)
        setLoginStatus(true) //being used to force update to app level user details
        console.log(data, setLoginStatus)
        history.push({
          pathname: '/bootcamper_profile',
          state: data.user 
        })
      } else{
        setFailure(true)
        setFailureMsg(data.msg);
      }
    }catch(err){
      console.error(err);
    };
  }
  return (
    <div className="edit-page-container">
      <img src={BGImage} alt="circuit design" className="edit-page-background"/>
      <LeftVerticalTitle title="Edit Profile" />
      <HorizontalCircuit className="edit-profile-horizontal-line" />
      <form
        className="edit-page-profile-container"
      >
        <PreviewImage {...user} />
        <FormInput
          labelFor="displayName"
          labelText="Display Name:"
          placeholder="My name"
          className="edit-form-displayName-input"
          type="text"
          name="displayName"
          value={formState.displayName}
          required={true}
          defaultValue={user.displayName}
          setState={handleInput}
          index={0}
          // formError={formError}
          // setformError={handleError}
        />
        <FormInput
          labelFor="githubUrl"
          labelText="GitHub Profile:"
          placeholder="http://github.com/my_profile"
          className="edit-form-githubUrl-input"
          type="url"
          name="githubUrl"
          value={formState.githubUrl || ""}
          required={false}
          defaultValue={user.githubUrl || ""}
          setState={handleInput}
          index={1}
          // formError={formError}
          // setformError={handleError}
        />
        <FormInput
          labelFor="linkedin"
          labelText="LinkedIn:"
          placeholder="http://linkedin.com/in/my_profile"
          className="edit-form-linkedin-input"
          type="url"
          name="linkedin"
          value={formState.linkedin || ""}
          required={false}
          defaultValue={user.linkedin || ""}
          setState={handleInput}
          index={2}
          // formError={formError}
          // setformError={handleError}
        />
        <FormInput
          labelFor="twitter"
          labelText="Twitter:"
          placeholder="http://twitter.com/me"
          className="edit-form-twitter-input"
          type="url"
          name="twitter"
          value={formState.twitter || ""}
          required={false}
          defaultValue={user.twitter || ""}  
          setState={handleInput}
          index={3}
          // formError={formError}
          // setformError={handleError}
        />
        <FormInput
          labelFor="youtube"
          labelText="Youtube:"
          placeholder="http://youtube.com/me"
          className="edit-form-youtube-input"
          type="url"
          name="youtube"
          value={formState.youtube || ""}
          required={false}
          defaultValue={user.youtube || ""}
          setState={handleInput}
          index={4}
          // formError={formError}
          // setformError={handleError}
        />
        <FormInput
          labelFor="personalWebsite"
          labelText="Personal Site:"
          placeholder="http://my-journal.blog"
          className="edit-form-personal-input"
          type="url"
          name="personalWebsite"
          value={formState.personalWebsite || ""}
          required={false}
          defaultValue={user.personalWebsite || ""}
          setState={handleInput}
          index={5}
          // formError={formError}
          // setformError={handleError}
        />
        {/* Column 3 */}
        <FormInput
          labelFor="cohort"
          labelText="Cohort:"
          placeholder="1"
          className="edit-form-cohort-input"
          type="string"
          name="cohort"
          value={formState.cohort || ""}
          required={true}
          defaultValue={user.cohort || ""}
          setState={handleInput}
          index={6}
          // formError={formError}
          // setformError={handleError}
        />
        <FormInput
          labelFor="location"
          labelText="Location:"
          placeholder="e.g. county"
          className="edit-form-location-input"
          type="text"
          name="location"
          value={formState.location || ""}
          required={false}
          defaultValue={user.location || "West Midlands"}
          setState={handleInput}
          index={7}
          // formError={formError}
          // setformError={handleError}
        />
        <FormInputTextarea
          labelFor="statement"
          labelText="Personal Statement:"
          placeholder="A personal quote or aspiration"
          className="edit-form-statement-input"
          name="statement"
          value={formState.statement || ""}
          required={true}
          maxlength={140}
          defaultValue={user.statement || "I <3 TypeScript"}
          setState={handleInput}
          index={8}
          // formError={formError}
          // setformError={handleError}
        />
        <FormInputImage
            labelFor="photo"
            labelText="Upload a profile pic: "
            name="photo"
            className="edit-form-photo-input"
            setValue={setNewImage}
            state={newImage}
            index={9}
            formError={formError}
            setformError={setformError}
          />
        <section className="edit-profile-messages-container">
          {failure && (
            <div className="edit-profile-messages-failure">
              <h3 className="edit-profile-messages-text">{failureMsg}</h3>
            </div>
          )}
        <button className="edit-page-button" onClick={(e) => submit(e)}>Save Changes</button>
        </section>
      </form>
    </div>

  );
};

export default EditProfile;
