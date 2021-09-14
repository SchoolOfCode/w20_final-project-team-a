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
    setUserDetails:(val:any)=> void,
    index:number,
    formError: boolean[],
    setformError:(value:any)=>void
}

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
    setUserDetails,
    index,
    formError,
    setformError
}) => {  

    const [formValue, setFormValue] = useState(placeholder)
    const [errorMessage, setErrorMessage] = useState<string>("")


    const handleChange = (e: string) => {
        if (required && e.length === 0){
            setErrorMessage("This field is required");
            setformError(formError.map((item,i) => (i === index) ? item = true : item))
            return;
        } else{
            setErrorMessage("");
            setformError(formError.map((item,i) => (i === index) ? item = false : item))
        }
        setFormValue(e)
        const updatedUser = {...user, [labelFor]:formValue}
        setUserDetails(updatedUser)
    }

    return (
        <section className={`edit-profile-form-group ${className}`}>
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
            <div className="invalid-input-message">
                {errorMessage}
            </div>
        </section>
    )
}

export default FormInputTextarea
