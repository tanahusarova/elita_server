import React from "react";

class PropsNewEvent{
    event_id:number;
    name: string;
    time_from: string;
    time_to: string;
    comment: string;
    colour:string;
    idOfWathedUser:number;
    type:number;
    new_event:boolean

    constructor(event_id:number, name: string, time_from: string,time_to: string,
        comment: string, colour:string, id:number, type:number, new_event:boolean) {
        this.name = name;
        this.time_from = time_from;
        this.time_to = time_to;
        this.comment = comment;
        this.colour = colour;
        this.idOfWathedUser = id;
        this.type = type;
        this.event_id = event_id;
        this.new_event = new_event;
    }
    
}

export default PropsNewEvent;