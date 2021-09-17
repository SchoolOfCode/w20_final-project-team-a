import React, { useState, useEffect } from 'react';
import {MAX_IMAGE_SIZE, VALID_IMAGE_TYPES} from "../../../config"

type Props = {
    labelFor:string, 
    labelText:string, 
    name:string,
    className:string,
    setValue:(val:any)=> void,
    state:any,
    index:number,
    formError: boolean[],
    setformError:(value:any)=>void
}

const FormInputImage : React.FC<Props> = ({
    labelFor, 
    labelText, 
    name,
    className,
    setValue,
    state,
    index,
    formError,
    setformError
    }) => {

    const [preview, setPreview] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>("")

    const addImageHandler = (e: any) => {
        setErrorMessage("");
        if (!e.target.files || e.target.files.length === 0) {
            setValue(null);
            return;
        }
        if (e.target.files[0].size > MAX_IMAGE_SIZE){
            setErrorMessage("File Size is too large. Max 5mb");
            setformError(formError.map((item,i) => (i === index) ? item = true : item))
            return;
        }
        if (!VALID_IMAGE_TYPES.includes(e.target.files[0].type)){
            setErrorMessage("Only .jpg .jpeg .png or .gif are allowed");
            setformError(formError.map((item,i) => (i === index) ? item = true : item))
            return;
        } 

        setValue(e.target.files[0]);
        setformError(formError.map((item,i) => (i === index) ? item = false : item))
    }

    useEffect( () => {
        if (!state) {
            setPreview(undefined);
            return;
        }
        const imageURL:any = URL.createObjectURL(state)
        setPreview(imageURL);
        return () => URL.revokeObjectURL(imageURL);
    },[state]
    )
    return (
        <section className={`edit-profile-form-group ${className}`}>
            <label htmlFor={labelFor}>{labelText}</label>
            <input
                id="fileInput"
                type="file"
                name={name}
                onChange={(e) => addImageHandler(e)}
                accept="image/*"        
            ></input>
            {state?<img src={preview} alt="user upload" className={`${className}-preview`}/>:null}
            <div className="invalid-input-message">
                {errorMessage}
            </div>
        </section>
    )
}

export default FormInputImage
