import React from 'react'

type Props = {
    labelFor:string, 
    labelText:string, 
    placeholder:string,
    className: string, 
    name:string,
    required?:boolean,
    maxlength:number,
    rows:number,
    cols:number,
    user:any, 
    setUserDetails:(val:any)=> void}

const FormInputTextarea : React.FC<Props> = ({
    labelFor, 
    labelText, 
    placeholder,
    className,
    name,
    required=true,
    maxlength,rows,cols,
    user, 
    setUserDetails}) => {  

    const handleChange = (e: string) => {
        const updatedUser = {...user, [labelFor]:e}
        setUserDetails(updatedUser)
    }

    return (
        <div className={className}>
                <label htmlFor={labelFor}>{labelText}</label>
                <textarea 
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    maxLength={maxlength}
                    rows={rows}
                    cols={cols}
                    onChange={(e)=>handleChange(e.target.value)}
                >{placeholder}</textarea>
        </div>
    )
}

export default FormInputTextarea
