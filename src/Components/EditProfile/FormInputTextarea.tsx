import React, {useState} from 'react'

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
    defaultValue:string,
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
    defaultValue,
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
                <textarea
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    name={name}
                    required={required}
                    maxLength={maxlength}
                    rows={rows}
                    cols={cols}
                    onChange={(e)=>handleChange(e.target.value)}
                ></textarea>
        </div>
    )
}

export default FormInputTextarea
