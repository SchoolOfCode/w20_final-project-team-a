import React from 'react'
import Line from "../BackgroundsPlus/Line.png"
import '../../Styling/HeaderTitle.css'

const Header = ({title}:any) => {
    return (
        <header className="page-header">
            <h1 className="page-header-text">{title}</h1>
            <img src={Line} alt="styling line" className="page-header-line"/>
        </header>
    )
}

export default Header
