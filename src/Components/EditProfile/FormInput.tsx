import React, {useState} from 'react'

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

    const [formValue, setFormValue] = useState(placeholder)


    const handleChange = (e: string) => {
        setFormValue(e)
        const updatedUser = {...user, [labelFor]:formValue}
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
