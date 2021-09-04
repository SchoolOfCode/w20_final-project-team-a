import React,{useState} from 'react'
import {User} from '../../Pages/Dashboard'
import HorizontalLine from "../../Components/BackgroundsPlus/Viewed Profile Up Left.png"
import Header from '../VerticalHeader/Header'
import '../../Styling/EditProfile.css'
import PreviewImage from './PreviewImage'
import { useEffect } from 'react'
import FormInput from './FormInput'
import FormInputTextarea from './FormInputTextarea'


interface ProfileProps{
    user: User;
}

const EditProfile :React.FC<ProfileProps> = ({
        user}) =>{

    const [userDetails, setUserDetails] = useState(user)
    const [newImage, setNewImage] = useState()

    const handleImage = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        setNewImage(e.target.files[0])
        console.log(e.target.files[0])
    }

    useEffect(()=>{
        setUserDetails(userDetails)
    },[userDetails, setUserDetails])

    const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        const formData = new FormData()

        // Object.entries(userDetails).forEach(([key,value]) => {
        //     console.log(user[key] !== value)
        // })
        
    }
    
    

    return (
        <div className="edit-page-container">
            <Header title="Edit Profile"/>
            <img src={HorizontalLine} alt="styling line" className="edit-profile-horizontal-line" />
            <section className="edit-page-profile-container">
                <PreviewImage {...user} />
                <FormInput 
                    labelFor="displayName" labelText="Display Name*"
                    placeholder={userDetails.displayName}
                    className="edit-form-displayName-input"
                    type="text" name="displayName" required={true}
                    user={userDetails} setUserDetails={setUserDetails}
                />
                <FormInput 
                    labelFor="githubUrl" labelText="GitHub Profile"
                    placeholder={userDetails.githubUrl || ""}
                    className="edit-form-githubUrl-input"
                    type="url" name="githubUrl" required={false}
                    user={userDetails} setUserDetails={setUserDetails}
                />
                <FormInput 
                    labelFor="linkedin" labelText="LinkedIn"
                    placeholder={userDetails.linkedin || ""}
                    className="edit-form-linkedin-input"
                    type="url" name="linkedin" required={false}
                    user={userDetails} setUserDetails={setUserDetails}
                />
                <FormInput 
                    labelFor="twitter" labelText="Twitter"
                    placeholder={userDetails.twitter || ""}
                    className="edit-form-twitter-input"
                    type="url" name="twitter" required={false}
                    user={userDetails} setUserDetails={setUserDetails}
                /> 
                <FormInput 
                    labelFor="youtube" labelText="Youtube"
                    placeholder={userDetails.youtube || ""}
                    className="edit-form-youtube-input"
                    type="url" name="youtube" required={false}
                    user={userDetails} setUserDetails={setUserDetails}
                />
                <FormInput 
                    labelFor="personal" labelText="Personal Site"
                    placeholder={userDetails.personalWebsite || ""}
                    className="edit-form-personal-input"
                    type="url" name="personal" required={false}
                    user={userDetails} setUserDetails={setUserDetails}
                /> 
                {/* Column 3 */}
                <FormInput 
                    labelFor="cohort" labelText="Cohort*"
                    placeholder={userDetails.cohort || ""}
                    className="edit-form-cohort-input"
                    type="number" name="cohort" required={true}
                    user={userDetails} setUserDetails={setUserDetails}
                /> 
                <FormInput 
                    labelFor="location" labelText="Location"
                    placeholder={userDetails.location || "West Midlands"}
                    className="edit-form-location-input"
                    type="url" name="location" required={false}
                    user={userDetails} setUserDetails={setUserDetails}
                />
                <FormInputTextarea 
                    labelFor="statement" labelText="Personal Statement*"
                    placeholder={userDetails.statement || "I <3 TypeScript"}
                    className="edit-form-statement-input"
                    name="statement" required={true} 
                    maxlength={140} rows={5} cols={4}
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
                <button 
                    type="button" className="edit-page-button" onClick={(e)=>handleSave(e)}>Save Changes
                </button>
            </section>
        </div>
    )
}

export default EditProfile