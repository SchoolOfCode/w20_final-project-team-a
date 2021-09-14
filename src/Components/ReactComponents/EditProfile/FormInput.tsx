import React, {useState} from 'react'
import validator from "validator"

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
    setUserDetails:(val:any)=> void,
    index:number,
    formError: boolean[],
    setformError:(value:any)=>void
}

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
    setUserDetails,
    index,
    formError,
    setformError
    }) => {  

    const [formValue, setFormValue] = useState(placeholder)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [cohortPadding, setCohortPadding] = useState<boolean>(false)

    const handleChange = (e: string) => {
        if(type==="url" && e.length > 0){
            if(!validator.isURL(e)){
                setErrorMessage("Please enter a valid URL");
                setformError(formError.map((item,i) => (i === index) ? item = true : item))
                return;
            }else{
                setErrorMessage("");
                setformError(formError.map((item,i) => (i === index) ? item = false : item))
            }
        }
        if (required && e.length === 0){
            setErrorMessage("This field is required");
            setformError(formError.map((item,i) => (i === index) ? item = true : item))
            return;
        }else{
            setErrorMessage("");
            setformError(formError.map((item,i) => (i === index) ? item = false : item))
        }
        if(type==="number"){
            if(parseInt(e,10) < 1 || parseInt(e,10) >= 8){
                setErrorMessage("Please enter a valid cohort number");
                setformError(formError.map((item,i) => (i === index) ? item = true : item))
                setCohortPadding(false)
                return;
            }else{
                setErrorMessage("");
                setformError(formError.map((item,i) => (i === index) ? item = false : item))
                setCohortPadding(true)
            }
        }
        setFormValue(e)
        const updatedUser = {...user, [labelFor]:formValue}
        setUserDetails(updatedUser)
    }

    return (
        <section className={`edit-profile-form-group ${className}`}>
            <label htmlFor={labelFor}>{labelText}</label>
            <input
                defaultValue={defaultValue}
                type={type}
                placeholder={placeholder}
                name={name}
                required={required}
                onChange={(e)=>handleChange(e.target.value)}
            ></input>
            <div className="invalid-input-message">
                {cohortPadding && <p style={{visibility: 'hidden'}}> . </p>}
                {errorMessage}
            </div>
        </section>
    )
}

export default FormInput
