import React, { useRef, useState } from 'react';
import Time from '../configs/Time';

class Event {
    id:number; 
    id_of_type:number; 
    name:string;
    from:string;
    to:string;
    colour:string;
    date:string;


     constructor(id:number, id_of_type:number, name:string, 
                from:string, to:string,  colour:string, date:string) {

        this.id = id;
        this.id_of_type = id_of_type;
        this.name = name;
        this.from = from;
        this.to = to;
        this.colour = colour;
        this.date = date;
    }
}

export default Event;  