import React from 'react'
import '../Styling/ProjectDisplay.css'


const Homepage = () => {
    return (
        <div className="wrapper">
            <p className="arrow-left"> {"<"} </p>
            <p className="main-image"> Main image </p>
            <p className="arrow-right"> {">"} </p>
            <p className="description"> Project description</p>
            <p className="tech"> Built using </p>
            <p className="banner"> Featured Project </p>
            <p className="title"> Project Title</p>
            <p className="contributors"> Contributors </p>
            
            {/* 
            background with circuits
            grid of 3 columns 1fr 3fr 1fr
                    3 rows
            
            image display from list, show current item
            arrows to iterate through image list
            github image with link to repo
            "featured project"
            dividing line
            project title
            list of contributors display names

            
            */}
        </div>
    )
}

export default Homepage
