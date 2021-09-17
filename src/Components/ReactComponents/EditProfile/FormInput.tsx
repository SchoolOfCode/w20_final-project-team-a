import React, {useState} from 'react'
import validator from "validator"

type Props = {
    labelFor:string, 
    labelText:string, 
    type:string, 
    placeholder:string,
    className: string, 
    name:string,
    value:string,
    required?:boolean,
    defaultValue?:string,
    setState:(value:any)=>void,
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
    value,
    required=true,
    defaultValue="",
    setState,
    index,
    formError,
    setformError
    }) => {  

    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if(type==="url" && val.length > 0){
            if(validator.isURL(val)){
                setErrorMessage("");
                setformError(formError.map((item,i) => (i === index) ? item = false : item))
            }else{
                setErrorMessage("Please enter a valid URL");
                setformError(formError.map((item,i) => (i === index) ? item = true : item))
            }
        }
        if (required && val.length === 0){
            setErrorMessage("This field is required");
            setformError(formError.map((item,i) => (i === index) ? item = true : item))
        }else{
            setErrorMessage("");
            setformError(formError.map((item,i) => (i === index) ? item = false : item))
        }
        if(name==="cohort"){
            if(parseInt(val,10) < 1 || parseInt(val,10) > 8){
                setErrorMessage("Please enter a valid cohort number");
                setformError(formError.map((item,i) => (i === index) ? item = true : item))
            }else{
                setErrorMessage("");
                setformError(formError.map((item,i) => (i === index) ? item = false : item))
            }
        }
        setState(e)
    }

    return (
        <section className={`edit-profile-form-group ${className}`}>
            <label htmlFor={labelFor}>{labelText}</label>
            <input
                defaultValue={defaultValue}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                required={required}
                onChange={(e)=>handleChange(e)}
            ></input>
            <div className="invalid-input-message">
                {errorMessage}
            </div>
        </section>
    )
}

export default FormInput
