import React from 'react'
import {User} from '../../Pages/Dashboard'
import "../../Styling/AdminBoard.css"
import AdminTitle from './AdminTitle'
import AdminProjectDisplay from './AdminProjectDisplay'
import HorizontalLine from "../../Components/BackgroundsPlus/Viewed Profile Up Left.png"


interface ProfileProps{
    user: User;
}

const AdminBoard :React.FC<ProfileProps> = ({
    user}) =>{

    
    return (
        <div className="admin-page-container">
            <AdminTitle />
            <img src={HorizontalLine} alt="styling line" className="admin-horizontal-line" />
            <AdminProjectDisplay />
        </div>
    )
}

export default AdminBoard
