import React,{useState} from "react";

type Props = {
  labelFor: string,
  labelText: string,
  name: string;
  builtUsing: any,
  className: string,
  setBuiltUsing: (val: any) => void,
  index:number,
  formError: boolean[],
  setformError:(value:any)=>void
};

const FormInputTech: React.FC<Props> = ({
  labelFor,
  labelText,
  name,
  className,
  builtUsing,
  setBuiltUsing,
  index,
  formError,
  setformError
  }) => {

  const [errorMessage, setErrorMessage] = useState<string>("")
  

  const re = new RegExp(/:(true)\b/,'g')

  const handleIconClick = (key: any) => {
    builtUsing[key].used = !builtUsing[key].used;
    setBuiltUsing(builtUsing);
    const iconsString = JSON.stringify(builtUsing)
    console.log(iconsString.match(re))
    // for (const [k,v] of Object.entries(builtUsing)){
    //   console.log(k,v)
    // }
    if(!iconsString.match(re)){
      setErrorMessage("Please select at least one technology")
      setformError(formError.map((item,i) => (i === index) ? item = true : item))
    } else{
      setErrorMessage("")
      setformError(formError.map((item,i) => (i === index) ? item = false : item))
    }
  };

  let i = 0;
  const builtUsingIconsArray = [];

  for (const key of Object.keys(builtUsing)) {
    builtUsingIconsArray.push(
      <li
        key={i}
        className={i % 2 === 0 ? `${className}-${1}` : `${className}-${2}`}
      >
        <input
          type="checkbox"
          id={builtUsing[key].name}
          style={{ display: "none" }}
          onChange={()=>handleIconClick(key)}
        />
        <label htmlFor={builtUsing[key].name} className="tech-used">
          <img
            src={builtUsing[key].image}
            alt={builtUsing[key].name}
            // onClick={() => handleIconClick(key)}
          />
        <h6>{builtUsing[key].name}</h6>
        </label>
      </li>
    );
    i++;
  }

  return (
    <div className={className}>
      <label htmlFor={labelFor} className="builtUsing-input-title">
        {labelText}
      </label>
      <ul>
        {builtUsingIconsArray.map((icon, i) => {
          return icon;
        })}
      </ul>
      <div className="invalid-input-message tech-error-message">
        {formError[index] && errorMessage}
      </div>
    </div>
  );
};

export default FormInputTech;
