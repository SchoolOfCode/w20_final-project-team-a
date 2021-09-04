import React from 'react'
import {User} from '../../Pages/Dashboard'
import HorizontalLine from "../../Components/BackgroundsPlus/Viewed Profile Up Left.png"
import Header from '../VerticalHeader/Header'
import '../../Styling/EditProfile.css'
import PreviewImage from './PreviewImage'

interface ProfileProps{
    user: User;
}

const EditProfile :React.FC<ProfileProps> = ({
        user}) =>{

    return (
        <div className="edit-page-container">
            <Header title="Edit Profile"/>
            <img src={HorizontalLine} alt="styling line" className="edit-profile-horizontal-line" />
            <section className="edit-page-profile-container">
                <PreviewImage src={user.photo} name={user.displayName} cohort={user.cohort}/>
            </section>
        </div>
    )
}

export default EditProfile