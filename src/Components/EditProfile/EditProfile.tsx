import React from 'react'
import {User} from '../../Pages/Dashboard'
import HorizontalLine from "../../Components/BackgroundsPlus/Viewed Profile Up Left.png"


interface ProfileProps{
    user: User;
}

const EditProfile :React.FC<ProfileProps> = ({
        user}) =>{

    return (
        <div>
            <h1>Welcome Lowly User {user.displayName}</h1>
            <img src={HorizontalLine} alt="styling line" className="edit-profile-horizontal-line" />
        </div>
    )
}

export default EditProfile