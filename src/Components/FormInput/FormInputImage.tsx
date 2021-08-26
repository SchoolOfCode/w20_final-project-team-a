import React, { useState, useEffect } from 'react';
// import soclogo from "C://Users//Becks//Documents//school-of-code//w20_final-project-team-a//src//soc-logo.png"

// interface HTMLInputEvent extends Event {
//     target: HTMLInputElement & EventTarget
// }
type Props = {
    labelFor:string, 
    labelText:string, 
    name:string,
    setValue:(val:any)=> void,
    state:any
}

const FormInputImage : React.FC<Props> = ({
    labelFor, 
    labelText, 
    name,
    setValue,
    state}) => {

// const [currentFile, setCurrentFile] = useState();
const [preview, setPreview] = useState();

const addImageHandler = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
        setValue(undefined)
        return
    }
    setValue(e.target.files[0])
}

useEffect( () => {
    if (!state) {
        setPreview(undefined);
        return
    }
    const imageURL:any = URL.createObjectURL(state)
    setPreview(imageURL);
    return () => URL.revokeObjectURL(imageURL)
},[state]
)
    return (
        <div>
                <label htmlFor={labelFor}>{labelText}</label>
                <input 
                    type="file"
                    name={name}
                    required={true}
                    onChange={(e) => addImageHandler(e)}
                    accept="image/*"        
                ></input>
                { state &&
                <img src={preview} alt="user upload" />
                } 
                {/* <img src={soclogo} alt="user upload" />*/}
        </div>
    )
}

export default FormInputImage
