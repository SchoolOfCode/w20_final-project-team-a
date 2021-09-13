import React from "react";

type Props = {
  labelFor: string;
  labelText: string;
  name: string;
  builtUsing: any;
  className: string;
  setBuiltUsing: (val: any) => void;
};

const FormInputTech: React.FC<Props> = ({
  labelFor,
  labelText,
  name,
  className,
  builtUsing,
  setBuiltUsing,
}) => {
  const handleIconClick = (key: any) => {
    builtUsing[key].used = !builtUsing[key].used;
    setBuiltUsing(builtUsing);
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
        />
        <label htmlFor={builtUsing[key].name} className="tech-used">
          <img
            src={builtUsing[key].image}
            alt={builtUsing[key].name}
            onClick={() => handleIconClick(key)}
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
    </div>
  );
};

export default FormInputTech;
