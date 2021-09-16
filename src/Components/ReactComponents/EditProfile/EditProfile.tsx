import React, { useState, useRef } from "react";
import "./EditProfile.scss";
import { User } from "../../../Pages/06-Dashboard/Dashboard";
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

interface ProfileProps {
  user: User;
  updatedSuccessfully: boolean,
  setupdatedSuccessfully:(value:boolean)=>void
}

axios.defaults.withCredentials = true;

const EditProfile: React.FC<ProfileProps> = ({ user,updatedSuccessfully,setupdatedSuccessfully}) => {

  const [userDetails, setUserDetails] = useState(user);
  const [formError, setformError] = useState<boolean[]>(new Array(10).fill(false));
  const [newImage, setNewImage] = useState();
  const [failure, setFailure] = useState(false);
  const [failureMsg, setFailureMsg] = useState<string>("");

  const form = useRef(null);

  const submit = async(e: any) => {
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
    formData.append("displayName", userDetails.displayName || user.displayName || "");
    formData.append(
      "photo",
      user.photo!); //default handled on backend
    formData.append("githubUrl", userDetails.githubUrl || user.githubUrl || "");
    formData.append("linkedin", userDetails.linkedin || user.linkedin || "");
    formData.append("twitter", userDetails.twitter || user.twitter || "");
    formData.append("youtube", userDetails.youtube || user.youtube || "");
    formData.append(
      "personalWebsite",
      userDetails.personalWebsite || user.personalWebsite || ""
    );
    formData.append("cohort", userDetails.cohort || user.cohort || "");
    formData.append("location", userDetails.location || user.location || "");
    formData.append("statement", userDetails.statement || user.statement || "");
    
    try{
      const response = await axios({
        url: API_URL + "auth/user/update",
        method: "put",
        data: formData,
      })
      const data = await response.data
      if (await data.success) {
        setupdatedSuccessfully(true);
        setFailureMsg("")
        setFailure(false)
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
        ref={form}
      >
        <PreviewImage {...user} />
        <FormInput
          labelFor="displayName"
          labelText="Display Name:"
          placeholder={userDetails.displayName}
          className="edit-form-displayName-input"
          type="text"
          name="userDetails[displayName]"
          required={true}
          defaultValue={user.displayName}
          user={userDetails}
          setUserDetails={setUserDetails}
          index={0}
          formError={formError}
          setformError={setformError}
        />
        <FormInput
          labelFor="githubUrl"
          labelText="GitHub Profile:"
          placeholder={userDetails.githubUrl || ""}
          className="edit-form-githubUrl-input"
          type="url"
          name="userDetails[githubUrl]"
          required={false}
          defaultValue={user.githubUrl || ""}
          user={userDetails}
          setUserDetails={setUserDetails}
          index={1}
          formError={formError}
          setformError={setformError}
        />
        <FormInput
          labelFor="linkedin"
          labelText="LinkedIn:"
          placeholder={userDetails.linkedin || ""}
          className="edit-form-linkedin-input"
          type="url"
          name="userDetails[linkedin]"
          required={false}
          defaultValue={user.linkedin || ""}
          user={userDetails}
          setUserDetails={setUserDetails}
          index={2}
          formError={formError}
          setformError={setformError}
        />
        <FormInput
          labelFor="twitter"
          labelText="Twitter:"
          placeholder={userDetails.twitter || ""}
          className="edit-form-twitter-input"
          type="url"
          name="userDetails[twitter]"
          required={false}
          defaultValue={user.twitter || ""}  
          user={userDetails}
          setUserDetails={setUserDetails}
          index={3}
          formError={formError}
          setformError={setformError}
        />
        <FormInput
          labelFor="youtube"
          labelText="Youtube:"
          placeholder={userDetails.youtube || ""}
          className="edit-form-youtube-input"
          type="url"
          name="userDetails[youtube]"
          required={false}
          defaultValue={user.youtube || ""}
          user={userDetails}
          setUserDetails={setUserDetails}
          index={4}
          formError={formError}
          setformError={setformError}
        />
        <FormInput
          labelFor="personalWebsite"
          labelText="Personal Site:"
          placeholder={userDetails.personalWebsite || ""}
          className="edit-form-personal-input"
          type="url"
          name="userDetails[personalWebsite]"
          required={false}
          defaultValue={user.personalWebsite || ""}
          user={userDetails}
          setUserDetails={setUserDetails}
          index={5}
          formError={formError}
          setformError={setformError}
        />
        {/* Column 3 */}
        <FormInput
          labelFor="cohort"
          labelText="Cohort:"
          placeholder={userDetails.cohort || ""}
          className="edit-form-cohort-input"
          type="number"
          name="userDetails[cohort]"
          required={true}
          defaultValue={user.cohort || ""}
          user={userDetails}
          setUserDetails={setUserDetails}
          index={6}
          formError={formError}
          setformError={setformError}
        />
        <FormInput
          labelFor="location"
          labelText="Location:"
          placeholder={userDetails.location || "West Midlands"}
          className="edit-form-location-input"
          type="text"
          name="userDetails[location]"
          required={false}
          defaultValue={user.location || "West Midlands"}
          user={userDetails}
          setUserDetails={setUserDetails}
          index={7}
          formError={formError}
          setformError={setformError}
        />
        <FormInputTextarea
          labelFor="statement"
          labelText="Personal Statement:"
          placeholder={userDetails.statement || "I <3 TypeScript"}
          className="edit-form-statement-input"
          name="userDetails[statement]"
          required={true}
          maxlength={140}
          rows={5}
          cols={4}
          defaultValue={user.statement || "I <3 TypeScript"}
          user={userDetails}
          setUserDetails={setUserDetails}
          index={8}
          formError={formError}
          setformError={setformError}
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
