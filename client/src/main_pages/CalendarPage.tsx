import React, {useEffect, useState} from "react"
import { NewEvent } from "../components/NewEvent";
import {Calendar} from "../components/Calendar";
import Plans from "../components/Plans";
import SharedInformations from "../components/SharedInformations";
import PropsIdUser from "../components/props/PropsIdUser";
import PropsNewEvent from "../components/props/PropsNewEvent";


export const CalendarPage = (id:PropsIdUser) => {

    const [informations, setInf] = useState(new SharedInformations('2023-05-14', parseInt(localStorage.id)));
    const [propsNewEvent, setPropsNewEvent] = useState(new PropsNewEvent(-1, '', '2023-05-14T22:00:00.000Z', '2023-05-14T22:00:00.000Z', '', '#88c20cff', parseInt(localStorage.id), 1, true));


    function handleDateChoice(d:string) {
        setInf(new SharedInformations(d, parseInt(localStorage.id)));
        console.log(informations.date + '... calendar page');

      }

      function handleEventChoice(event:PropsNewEvent) {
        setPropsNewEvent(event);
      }

      useEffect(() => {
      }, []);

      useEffect(() => {
        
      }, [informations.date]);


    //do new event sa musi dostat natiahnuty event z plans, z toho na ktore sa kliklo
    return (
        <div className="calendar-page">
            <div className='background-container'>
            <Calendar handleDateChoice={handleDateChoice} idOfLogedUser={parseInt(localStorage.id)}/> 
            </div>
            <Plans handleEventChoice={handleEventChoice} sharedInformations={informations}/>
            <NewEvent event={propsNewEvent} sharedInformations={informations}/>

        </div>
    )
}

export default CalendarPage;

//cez kalendar potrebujem posunut datum do plans, a cez vyber posuniem generatoru aj meno prihlaseneho a uzivatela ktoreho si vybral