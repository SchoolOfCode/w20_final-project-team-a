import React, {useState} from 'react'

type Props = {
    labelFor:string, 
    labelText:string, 
    type:string, 
    placeholder:string, 
    name:string, 
    setValue:(val:any)=> void}

const FormInput : React.FC<Props> = ({
    labelFor, 
    labelText, 
    type, 
    placeholder, 
    name, 
    setValue}) => {  

    return (
        <div>
                <label htmlFor={labelFor}>{labelText}</label>
                <input 
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    required={true}
                    onBlur={(e)=>setValue(e.target.value)}
                ></input>
        </div>
    )
}

export default FormInput
