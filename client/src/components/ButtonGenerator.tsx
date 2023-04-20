import React, {useState, useEffect} from "react";
import Date from "../configs/Date";
import { Weekdays } from "../configs/Weekdays";
import { monthDates } from "../configs/MonthDays";
import PropsButtonEvent from "./props/PropsButtonEvent";
import PropsButtonGenerator from "./props/PropsButtonGenerator";
import { getNicknames } from "../api/User";
import { getEventByDate } from "../api/Events";
import ButtonEvent from "./ButtonEvent";
import EventInf from "./props/EventInf";
import EventInfFromQuery from "./props/EventInfFromQuery";
import PropsNewEvent from "./props/PropsNewEvent";

type ChildComponentProps = {
  handleEventChoice: (event:PropsNewEvent) => void;
  forButtonGenerator: PropsButtonGenerator;
};

export const ButtonGenerator: React.FC<ChildComponentProps> = (prop) => {
    //doplnit fetchovanie z databazy a generovanie eventbuttonikov
    //id mam od loginu, datum zo stlacenia butoniku, a id of user z vyberu v plans
    const [eventsByDate, setEventsByDate] = useState<EventInf[]>([]);
    const [loaded, setLoaded] = useState(true);
    const [text, setText] = useState('');
    const [buttons, setButtons] = useState<string[]>([""]);

    function addNewButton() {
          const newButtons = [``];
          setButtons(newButtons);
  }



    async function loadEvents() {
      setLoaded(false);
      const eventsByDate = await getEventByDate(
        prop.forButtonGenerator.idOfLogedUser,
        prop.forButtonGenerator.idOfUserWithPlans,
        prop.forButtonGenerator.date
      );
    
      const newEvents = eventsByDate.map((value:EventInf) => {
        if (value.visible) {
          return new EventInfFromQuery(
            value.event_id,
            value.type_id,
            value.name,
            value.from_time,
            value.to_time,
            value.date_time,
            value.colour,
            value.user_id,
            value.visible
          );
        } else {
          return new EventInfFromQuery(
            -1,
            value.type_id,
            "OCUPIED",
            value.from_time,
            value.to_time,
            value.date_time,
            "#abababff",
            value.user_id,
            value.visible
          );
        }
      });
    
      setEventsByDate(newEvents);
      setLoaded(true);
    }
    


      
      useEffect(() => {
        console.log('nacitavaju sa nove eventy');
        loadEvents();
      }, [prop.forButtonGenerator.date, prop.forButtonGenerator.idOfLogedUser, prop.forButtonGenerator.idOfUserWithPlans]);
      

    return(
    <div>
         <div className="weekdays-container">
            <label>{text}</label>

            </div>
            <div className="event-buttons">
               {(loaded && eventsByDate.length > 0) ? (
               eventsByDate.map((value:EventInf) => (
               <ButtonEvent handleEventChoice={prop.handleEventChoice} event={value} 
               watchedUser={prop.forButtonGenerator.idOfUserWithPlans} logedUser={prop.forButtonGenerator.idOfLogedUser}/>
               ))
                ) : (loaded && eventsByDate.length === 0) ? (<div className="no-plans">No plans available</div>) : (
        <div>Loading...</div>
      )}
          </div>

            <div className="reload-button">
             {buttons.map((button, index) => (
               <button key={index}>{button}</button>
             ))}
          </div>
    </div>
    )

}

export default ButtonGenerator;