import React from 'react'
import "../../Styling/ProjectSubmit.css"

type Props = {
    labelFor:string, 
    labelText:string, 
    name:string,
    builtUsing:any,
    className:string, 
    setBuiltUsing:(val:any)=> void}

const FormInputTech : React.FC<Props> = ({
    labelFor, 
    labelText, 
    name,
    className, 
    builtUsing,
    setBuiltUsing}) => {  

        
        const handleIconClick = (key:any) => {
            builtUsing[key].used=!builtUsing[key].used
            setBuiltUsing(builtUsing);
            // setSelectedStatus(
            // selectedStatus === "unselected-tech" ? "selected-tech" : "unselected-tech")
            }
            
            // console.log(builtUsing["HTML"].image)
            const builtUsingIconsArray = []
            for (const key of Object.keys(builtUsing)){
            // const [selectedStatus, setSelectedStatus] = useState("unselected-tech")
            builtUsingIconsArray.push(
            <li>
            <input 
                type="checkbox" 
                id={builtUsing[key].name}
                style={{display:"none"}}/>     
                <label htmlFor={builtUsing[key].name} className="tech-used">  
                <img 
                src={builtUsing[key].image} 
                alt = {builtUsing[key].name}
                onClick = {() => handleIconClick(key) }
                />
                </label> 
            </li>
            )
        }
            
    // console.log(builtUsingIconsArray)
    return (
        <div className={className}>
            <label htmlFor={labelFor}>{labelText}</label>
                <ul>
                    {builtUsingIconsArray.map((icon, i) => {
                        return icon
                    } )
                    }
                </ul>
        </div>
    )
            }

// const ImageCheckbox = ({builtUsingImage}) =>{
//     return (
//     <img src={builtUsingImage} alt="built using"/>

//     )
// }

export default FormInputTech
