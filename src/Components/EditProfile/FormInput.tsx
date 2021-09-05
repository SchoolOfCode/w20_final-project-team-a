import React from 'react'

type Props = {
    labelFor:string, 
    labelText:string, 
    type:string, 
    placeholder:string,
    className: string, 
    name:string,
    required?:boolean,
    defaultValue?:string,
    user:any, 
    setUserDetails:(val:any)=> void}

const FormInput : React.FC<Props> = ({
    labelFor, 
    labelText, 
    type, 
    placeholder,
    className,
    name,
    required=true,
    defaultValue="",
    user, 
    setUserDetails}) => {  

    const handleChange = (e: string) => {
        const updatedUser = {...user, [labelFor]:e}
        setUserDetails(updatedUser)
    }

    return (
        <div className={className}>
                <label htmlFor={labelFor}>{labelText}</label>
                <input
                    defaultValue={defaultValue}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    onChange={(e)=>handleChange(e.target.value)}
                ></input>
        </div>
    )
}

export default FormInput
