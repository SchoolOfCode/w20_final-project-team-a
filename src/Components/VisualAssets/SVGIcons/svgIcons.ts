import HTML from "./HTML.svg";
import CSS from "./CSS.svg";
import Javascript from "./Javascript.svg";
import Typescript from "./Typescript.svg";
import React from "./React.svg";
import ReactNative from "./ReactNative.svg";
import Nodejs from "./node-dot-js.svg";
import Expressjs from "./Expressjs.svg";
import MongoDB from "./MongoDB.svg";
import PostgreSQL from "./PostgreSQL.svg";
import Tailwind from "./Tailwind.svg";
import Sass from "./Sass.svg";
import Bootstrap from "./Bootstrap.svg";

export interface svgObject{
    [index:string] :svgIcon
}
interface svgIcon {
    name: string,
    used: boolean,
    image: string,
}
export const builtUsingSVGObject :svgObject = {
    HTML: { name: "HTML", used: true, image: HTML },
    CSS: { name: "CSS", used: false, image: CSS },
    Javascript: { name: "Javascript", used: false, image: Javascript },
    Typescript: { name: "Typescript", used: false, image: Typescript },
    React: { name: "React", used: false, image: React },
    ReactNative: { name: "ReactNative", used: false, image: ReactNative },
    Nodejs: { name: "Nodejs", used: false, image: Nodejs },
    Expressjs: { name: "Expressjs", used: false, image: Expressjs },
    MongoDB: { name: "MongoDB", used: false, image: MongoDB },
    PostgreSQL: { name: "PostgreSQL", used: false, image: PostgreSQL },
    Tailwind: { name: "Tailwind", used: false, image: Tailwind },
    Sass: { name: "Sass", used: false, image: Sass },
    Bootstrap: { name: "Bootstrap", used: false, image: Bootstrap },
  };
  
export interface iconsObject {
    [index:string] :string
}

export const builtUsingSVG : iconsObject = {
    "HTML": HTML,
    "CSS": CSS ,
    "Javascript": Javascript,
    "Typescript": Typescript,
    "React": React,
    "ReactNative":ReactNative,
    "Nodejs": Nodejs,
    "Expressjs": Expressjs,
    "MongoDB": MongoDB,
    "PostgreSQL": PostgreSQL,
    "Tailwind": Tailwind,
    "Sass": Sass ,
    "Bootstrap": Bootstrap
};
