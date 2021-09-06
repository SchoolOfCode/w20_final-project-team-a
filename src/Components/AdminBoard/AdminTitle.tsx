import React from 'react'
import Line from "../BackgroundsPlus/Line.png"

const AdminTitle = () => {
    return (
        <header className="admin-page-header">
            <h1 className="admin-header-text">Admin Panel</h1>
            <img src={Line} alt="styling line" className="admin-header-line"/>
        </header>
    )
}

export default AdminTitle
