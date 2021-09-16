import React, {useState} from 'react'
import "./ShowcaseProfile.scss";
import HorizontalCircuit from '../../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit';
import circuitT from "../../../Components/VisualAssets/BackgroundsPlus/HomeBGTop.png"
import circuitB from "../../../Components/VisualAssets/BackgroundsPlus/HomeBGBottom.png"
import { builtUsingSVG } from "../../../Components/VisualAssets/SVGIcons/svgIcons";

const ShowcaseProfile = (data: any) => {

    const project = data.location.state;
    const imageGalleryArray = [project.appDeploymentImage, ...project.additionaAppImageURLs]
    const [imageGalleryIndex, setImageGalleryIndex] = useState(0);
    const usersNames = [...project.users.map((user:any)=>user.displayName)]

    const increaseGalleryIndex = () => {
        if (imageGalleryIndex>= imageGalleryArray.length-1) {
          setImageGalleryIndex(0)
        }
        else{
        setImageGalleryIndex(imageGalleryIndex +1)
        }
      }
  
      const decreaseGalleryIndex = () => {
        if (imageGalleryIndex < 1) {
          setImageGalleryIndex(imageGalleryArray.length-1)
        }
        else{
        setImageGalleryIndex(imageGalleryIndex -1)
        }
      }

    return (
        <div className="wrapper">
            <img className="circuitT" src={circuitT} alt="circuit-board"/>
            <img className="circuitB" src={circuitB} alt="circuit-board"/>
            <p className="arrow-left"
                onClick={decreaseGalleryIndex}> {"<"} </p>{" "}
            <img
                className="showcase-project-image"
                src={imageGalleryArray[imageGalleryIndex]}
                alt="project-img"
            ></img>
            <p className="arrow-right"
                onClick={increaseGalleryIndex}> {">"} </p>{" "}

            <HorizontalCircuit className="line-right"/>

            <p className="description">{project.additionalInformation}</p>
            <p className="tech">
            {project.techUsed && project.techUsed.map((tech:string,i:number) => {
                  return (
                  <li key={i}>
                    <img 
                    src={builtUsingSVG[tech]} 
                    alt="icon"
                    className="showcase-tech-icon"
                    />
                  </li>
                  )
                })}
            </p>
            <p className="heading">{project.projectName}</p>

            <HorizontalCircuit className="line-left"/>

            <p className="problem-statement">{project.problemStatement}</p>
            <p className="contributors">{usersNames.join(", ")}</p>



        </div>
    )
}

export default ShowcaseProfile
