import React from "react";
import {Props, Pair} from "./Props";

class PropsString implements Props{
    propWhichIsArray: Array<Pair>;
    name:string;

   

    constructor(names: Array<Pair>, string:string) {
        this.propWhichIsArray = names;
        this.name = string;
    }


}

export default PropsString;
