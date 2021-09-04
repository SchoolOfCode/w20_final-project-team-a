import React, {useState, useEffect} from 'react'

const PreviewImage = ({userDetails,setUserDetails, newImage, setNewImage}:any) => {
    
  
    // const handleImage = (e: any) => {
    //     if (!e.target.files || e.target.files.length === 0) {
    //         return;
    //     }
    //     const imageURL:any = URL.createObjectURL(e.target.files[0])
    //     setNewImage(imageURL)
    //     // setUserDetails(...userDetails)
    //     console.log(e.target.files[0]);
    // }



    return (
        <article className="edit-page-picture">
            <h2 className="edit-page-picture-greeting">{userDetails.displayName}</h2>
            <img className = "edit-page-picture-image" src={userDetails.photo} alt="The user" />
            <h3 className="edit-page-picture-cohort">Bootcamp {userDetails.cohort}</h3>
            <label htmlFor="changePicture">Edit</label>
                <input
                    id="changePicture"
                    type="file"
                    required={true}
                    // onChange={(e) => handleImage(e)}
                    accept="image/*"        
                ></input>
        </article>
    )
}

export default PreviewImage
