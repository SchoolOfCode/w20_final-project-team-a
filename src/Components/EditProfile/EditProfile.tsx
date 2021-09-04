import React,{useState} from 'react'
import {User} from '../../Pages/Dashboard'
import HorizontalLine from "../../Components/BackgroundsPlus/Viewed Profile Up Left.png"
import Header from '../VerticalHeader/Header'
import '../../Styling/EditProfile.css'
import PreviewImage from './PreviewImage'
import { useEffect } from 'react'


interface ProfileProps{
    user: User;
}

const EditProfile :React.FC<ProfileProps> = ({
        user}) =>{

    const [userDetails, setUserDetails] = useState({})
    const [newImage, setNewImage] = useState("");

    useEffect(()=>{
        setUserDetails(user)
        // setNewImage(userDetails!.photo!)
        console.log(user)
    },[user,userDetails, setUserDetails])

    const handleSave = () =>{

    }

    return (
        <div className="edit-page-container">
            <Header title="Edit Profile"/>
            <img src={HorizontalLine} alt="styling line" className="edit-profile-horizontal-line" />
            <section className="edit-page-profile-container">
                <PreviewImage 
                    userDetails={userDetails} 
                    setUserDetails={setUserDetails}
                    newImage={newImage}
                    setNewImage={setNewImage}
                />

                <button 
                    type="button" className="edit-page-button" onClick={handleSave}>Save Changes
                </button>
            </section>
        </div>
    )
}

export default EditProfile