import React from 'react'

interface Props{
    labelFor:string, 
    labelText:string, 
    type:string, 
    placeholder:string,
    className: string, 
    name:string,
    setValue:(val:any)=> void}

const FormInput : React.FC<Props> = ({
    labelFor, 
    labelText, 
    type, 
    placeholder,
    className,
    name,
    setValue}) => {  

    return (
        <div className={className}>
                <label htmlFor={labelFor}>{labelText}</label>
                <input 
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    required={true}
                    onChange={(e)=>setValue(e.target.value)}
                ></input>
        </div>
    )
}

export default FormInput
