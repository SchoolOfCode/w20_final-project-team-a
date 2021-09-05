import React,{useState, useRef} from 'react'
import {User} from '../../Pages/Dashboard'
import HorizontalLine from "../../Components/BackgroundsPlus/Viewed Profile Up Left.png"
import Header from '../VerticalHeader/Header'
import '../../Styling/EditProfile.css'
import PreviewImage from './PreviewImage'
import FormInput from './FormInput'
import FormInputTextarea from './FormInputTextarea'
import axios from 'axios'
import {API_URL} from '../../config'
import {useHistory } from 'react-router-dom'

axios.defaults.withCredentials = true;

interface ProfileProps{
    user: User;
}

const EditProfile :React.FC<ProfileProps> = ({
        user}) =>{

    const [userDetails, setUserDetails] = useState(user);
    const [newImage, setNewImage] = useState();
    const [updatedSuccessfully, setupdatedSuccessfully] = useState(false)
    const form = useRef(null);
    const history = useHistory();

    const handleImage = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        setNewImage(e.target.files[0]);
    }


    const submit = (e:any) =>{
        e.preventDefault();
        // const formData = new FormData(form.current!)
        const formData = new FormData()
        formData.append('newProfilePhoto',newImage!)
        formData.append('_id', user._id)
        formData.append('displayName', userDetails.displayName)
        formData.append('photo',user.photo || "http://localhost:5000/uploads/profiles/defaultProfilePhoto.png")
        formData.append('githubUrl',userDetails.githubUrl || user.githubUrl || "")
        formData.append('linkedin',userDetails.linkedin || user.linkedin || "")
        formData.append('twitter',userDetails.twitter || user.twitter || "")
        formData.append('youtube',userDetails.youtube || user.youtube || "")
        formData.append('personalWebsite',userDetails.personalWebsite || user.personalWebsite || "")
        formData.append('cohort',userDetails.cohort || user.cohort || "")
        formData.append('location',userDetails.location || user.location || "")
        formData.append('statement',userDetails.statement || user.statement || "")


        axios({
            url: API_URL+"auth/user/update",
            method:'put',
            data: formData
        })
        .then(res => {
            if (res.data.success){
                setupdatedSuccessfully(true)
            }
        })
        .catch(err => console.log(err))
    }
    
    

    return (
        <div className="edit-page-container">
            <Header title="Edit Profile"/>
            <img src={HorizontalLine} alt="styling line" className="edit-profile-horizontal-line" />
            <form className="edit-page-profile-container" ref={form} onSubmit={(e) => submit(e)}>
                <PreviewImage {...user} />
                <FormInput 
                    labelFor="displayName" labelText="Display Name*"
                    placeholder={userDetails.displayName}
                    className="edit-form-displayName-input"
                    type="text" name="userDetails[displayName]" required={true}
                    defaultValue={user.displayName}
                    user={userDetails} setUserDetails={setUserDetails}
                />
                <FormInput 
                    labelFor="githubUrl" labelText="GitHub Profile"
                    placeholder={userDetails.githubUrl || ""}
                    className="edit-form-githubUrl-input"
                    type="url" name="userDetails[githubUrl]" required={false}
                    defaultValue={user.githubUrl || ""}
                    user={userDetails} setUserDetails={setUserDetails}
                />
                <FormInput 
                    labelFor="linkedin" labelText="LinkedIn"
                    placeholder={userDetails.linkedin || ""}
                    className="edit-form-linkedin-input"
                    type="url" name="userDetails[linkedin]" required={false}
                    defaultValue={user.linkedin || ""}
                    user={userDetails} setUserDetails={setUserDetails}
                />
                <FormInput 
                    labelFor="twitter" labelText="Twitter"
                    placeholder={userDetails.twitter || ""}
                    className="edit-form-twitter-input"
                    type="url" name="userDetails[twitter]" required={false}
                    defaultValue={user.twitter || ""}
                    user={userDetails} setUserDetails={setUserDetails}
                /> 
                <FormInput 
                    labelFor="youtube" labelText="Youtube"
                    placeholder={userDetails.youtube || ""}
                    className="edit-form-youtube-input"
                    type="url" name="userDetails[youtube]" required={false}
                    defaultValue={user.youtube || ""}
                    user={userDetails} setUserDetails={setUserDetails}
                />
                <FormInput 
                    labelFor="personalWebsite" labelText="Personal Site"
                    placeholder={userDetails.personalWebsite || ""}
                    className="edit-form-personal-input"
                    type="url" name="userDetails[personalWebsite]" required={false}
                    defaultValue={user.personalWebsite || ""}
                    user={userDetails} setUserDetails={setUserDetails}
                /> 
                {/* Column 3 */}
                <FormInput 
                    labelFor="cohort" labelText="Cohort*"
                    placeholder={userDetails.cohort || ""}
                    className="edit-form-cohort-input"
                    type="number" name="userDetails[cohort]" required={true}
                    defaultValue={user.cohort || ""}
                    user={userDetails} setUserDetails={setUserDetails}
                /> 
                <FormInput 
                    labelFor="location" labelText="Location"
                    placeholder={userDetails.location || "West Midlands"}
                    className="edit-form-location-input"
                    type="text" name="userDetails[location]" required={false}
                    defaultValue={user.location || "West Midlands"}
                    user={userDetails} setUserDetails={setUserDetails}
                />
                <FormInputTextarea 
                    labelFor="statement" labelText="Personal Statement*"
                    placeholder={userDetails.statement || "I <3 TypeScript"}
                    className="edit-form-statement-input"
                    name="userDetails[statement]" required={true} 
                    maxlength={140} rows={5} cols={4}
                    defaultValue={user.statement || "I <3 TypeScript" }
                    user={userDetails} setUserDetails={setUserDetails}
                />
                <div className="edit-form-image-input">
                    <label htmlFor="changePicture">Upload a new picture</label>
                    <input
                        id="changePicture"
                        type="file"
                        required={false}
                        onChange={(e) => handleImage(e)}
                        accept="image/*"        
                    ></input>
                </div>
                <input type="submit" className="edit-page-button" name="Save Changes"/>
            </form>
            {updatedSuccessfully && history.push("/profiles")}
        </div>
    )
}

export default EditProfile