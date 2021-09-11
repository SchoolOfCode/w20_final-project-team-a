import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../../config";
import "./Homepage.scss";
import featuredImg from "./77b1a6d5-d93_my_space_2.jpg";
import Loading from "../../Components/ReactComponents/Loading/Loading";
import circuitT from "../../Components/VisualAssets/BackgroundsPlus/HomeBGTop.png"
import circuitB from "../../Components/VisualAssets/BackgroundsPlus/HomeBGBottom.png"
import HorizontalCircuit from "../../Components/ReactComponents/HorizontalCircuit/HorizontalCircuit";

const Homepage = (project: any) => {
  console.log ("what the actual fuck")
    const [featuredProject, setFeaturedProject] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [imageGalleryArray, setImageGalleryArray] = useState<any>([]);
    const [imageGalleryIndex, setImageGalleryIndex] = useState(0);
    
    const getProjects = async () => {
      setLoading(true);
      try {
        const projectArray = await axios.get(
          API_URL + "projects/featured"
          );
        setFeaturedProject(await projectArray.data);
        setImageGalleryArray([featuredProject.appDeploymentImage, ...featuredProject.additionaAppImageURLs]);
        console.log (featuredProject);
        console.log ("1imagearray", imageGalleryArray)
      } catch (err) {
      }
    };
    
    useEffect(() => {
      getProjects();
      setLoading(false);
    }, []);
    
    // useEffect(() => {
    //   setImageGalleryArray([featuredProject.appDeploymentImage, ...featuredProject.additionaAppImageURLs]);
    // }, [featuredProject]);
    
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
    loading ? (
      <Loading />
    ) : (
    <div className="wrapper">
      <img className="circuitT" src={circuitT} alt="circuit-board"/>
      <img className="circuitB" src={circuitB} alt="circuit-board"/>
      <p className="arrow-left"
      onClick={decreaseGalleryIndex}> {"<"} </p>{" "}
      {/*onClick increase image display index by 1/*/}
      <img
        className="featured-project-image"
        // src={featuredProject.appDeploymentImage}
        src={imageGalleryArray[imageGalleryIndex]}
        alt="featured-img"
      ></img>
      {/*need to access array of images, display index=0 as default/*/}
      <p className="arrow-right"
      onClick={increaseGalleryIndex}> {">"} </p>{" "}
      {/*onClick decrease image display index by 1/*/}
      <HorizontalCircuit className="line-right" />
      <p className="description"> {featuredProject.additionalInformation} </p>
      <p className="tech"> Built using {featuredProject.techUsed}</p>
      {/*needs list with tech images here/*/}
      <p className="heading"> {featuredProject.projectName} </p>
      <HorizontalCircuit className="line-left" />
      <p className="title"> {featuredProject.problemStatement}</p>
      <p className="contributors"> {featuredProject.displayNames} </p>
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
  );
};

export default Homepage;
