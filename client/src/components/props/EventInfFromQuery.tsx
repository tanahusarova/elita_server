import EventInf from "./EventInf";

class EventInfFromQuery implements EventInf{
    event_id:number;
    type_id:number;
    name:string;
    from_time:string;
    to_time:string;
    date_time:string;
    colour:string;
    user_id:number;
    visible:boolean;


    constructor( event_id:number, type_id:number, name:string, from_time:string,
        to_time:string, date_time:string, colour:string, user_id:number,
        visible:boolean){
            this.event_id = event_id;
            this.type_id = type_id;
            this.name = name;
            this.from_time = from_time;
            this.to_time = to_time;
            this.date_time = date_time;
            this.colour = colour;
            this.user_id = user_id;
            this.visible = visible;
        }
}

export default EventInfFromQuery;