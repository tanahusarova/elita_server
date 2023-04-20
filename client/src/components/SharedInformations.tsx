import React from "react";

class SharedInformations{
    date: string = '';
    idOfLoggedUser:number = -1;

    public constructor(date:string, idOfLogedUser:number) {
        this.date = date;
        this.idOfLoggedUser = idOfLogedUser;
    }
      
          
      
    
}

export default SharedInformations;