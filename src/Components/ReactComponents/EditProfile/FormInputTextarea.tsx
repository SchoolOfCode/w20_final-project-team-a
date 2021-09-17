import React, {useState} from 'react'

type Props = {
    labelFor:string, 
    labelText:string, 
    placeholder:string,
    className: string, 
    name:string,
    value:string,
    required?:boolean,
    maxlength:number,
    defaultValue:string,
    setState:(val:any)=> void,
    index:number,
    // formError: boolean[],
    // setformError:(value:any)=>void
}

const FormInputTextarea : React.FC<Props> = ({
    labelFor, 
    labelText, 
    placeholder,
    className,
    name,
    value,
    required=true,
    maxlength,
    defaultValue,
    setState,
    index,
    // formError,
    // setformError
}) => {  

    // const [errorMessage, setErrorMessage] = useState<string>("")


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // if (required && e.target.value.length === 0){
        //     setErrorMessage("This field is required");
        //     setformError(formError.map((item,i) => (i === index) ? item = true : item))
        //     return;
        // } else{
        //     setErrorMessage("");
        //     setformError(formError.map((item,i) => (i === index) ? item = false : item))
        // }
        setState(e)
    }

    return (
        <section className={`edit-profile-form-group ${className}`}>
            <label htmlFor={labelFor}>{labelText}</label>
            <textarea
                defaultValue={defaultValue}
                placeholder={placeholder}
                name={name}
                value={value}
                required={required}
                maxLength={maxlength}
                onChange={(e)=>handleChange(e)}
            ></textarea>
            <div className="invalid-input-message">
                {/* {errorMessage} */}
            </div>
        </section>
    )
}

export default FormInputTextarea
