import React from "react";

class PropsButtonGenerator{
    idOfLogedUser: number;
    idOfUserWithPlans: number;
    date: string;

    constructor(idOfLoged: number, idOfUser:number, date:string) {
        this.idOfLogedUser = idOfLoged;
        this.idOfUserWithPlans = idOfUser;
        this.date = date;
    }
    
}

export default PropsButtonGenerator;