import React, {useState, useEffect} from 'react'
import "./ShowcaseProfile.scss";
import HorizontalCircuit from '../../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit';
import { API_URL } from '../../../config';
import axios from 'axios';
import Loading from '../../../Components/ReactComponents/Loading/Loading';
import circuitT from "../../Components/VisualAssets/BackgroundsPlus/HomeBGTop.png"
import circuitB from "../../Components/VisualAssets/BackgroundsPlus/HomeBGBottom.png"


const ShowcaseProfile = (data: any) => {

    return (
        <div className="wrapper">
            <img className="circuitB" src={circuitB} alt="circuit-board" />
            <img className="circuitT" src={circuitT} alt="circuit-board" />
            
            <p className="arrow-left">{"<"}</p>{" "}
            <p>Image here.</p>
            <p className="arrow-right">{">"}</p>{" "}

            <HorizontalCircuit className="line-right"/>

            <p className="description">Description Here</p>
            <p className="tech">Tech here</p>
            <p className="heading">Our Project</p>

            <HorizontalCircuit className="line-left"/>

            <p className="problem-statement">Problem Statement here</p>
            <p className="contributors">Me, Me and Eemilio</p>
            


        </div>
    )
}

export default ShowcaseProfile
