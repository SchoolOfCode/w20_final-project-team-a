import React, {useState} from 'react'

type Props = {
    labelFor:string, 
    labelText:string, 
    placeholder:string, 
    name:string, 
    setValue:(val:any)=> void}

const FormInputMultiText : React.FC<Props> = ({
    labelFor, 
    labelText, 
    placeholder, 
    name, 
    setValue}) => {  

    return (
        <div>
                <label htmlFor={labelFor}>{labelText}</label>
                <textarea
                    placeholder={placeholder}
                    name={name}
                    required={true}
                    onBlur={(e)=>setValue(e.target.value)}
                ></textarea>
        </div>
    )
}

export default FormInputMultiText