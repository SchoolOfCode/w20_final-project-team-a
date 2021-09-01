import React, { useState, useEffect } from 'react';

type Props = {
    labelFor:string, 
    labelText:string, 
    name:string,
    className:string,
    imageClassName: string
    setValue:(val:any)=> void,
    state:any
}

const FormInputImage : React.FC<Props> = ({
    labelFor, 
    labelText, 
    name,
    className,
    imageClassName,
    setValue,
    state
    }) => {

    const [preview, setPreview] = useState<string>();

    const addImageHandler = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setValue(undefined);
            return;
        }
        setValue(e.target.files[0]);
        console.log(e.target.files)
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
        <div className={className}>
                <label htmlFor={labelFor}>{labelText}</label>
                <input 
                    type="file"
                    name={name}
                    required={true}
                    onChange={(e) => addImageHandler(e)}
                    accept="image/*"        
                ></input>
                { state &&
                <img src={preview} alt="user upload" className={imageClassName}/>
                } 
        </div>
    )
}

export default FormInputImage
