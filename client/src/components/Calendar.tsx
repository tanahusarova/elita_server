import React, { useState, useRef, MutableRefObject, useEffect } from "react";
import Date from "../configs/Date";
import { Weekdays } from "../configs/Weekdays";
import { monthDates } from "../configs/MonthDays";
import SharedInformations from "./SharedInformations";
import { getEventByDate, getEventForCalendar } from "../api/Events";
import ButtonFakeDate from "./ButtonFakeDate";
import {ButtonDate, ButtonDateRef, ChildComponentPropsButtonDate} from "./ButtonDate";
import * as moment from 'moment-timezone';


type ChildComponentProps = {
    handleDateChoice: (id: string) => void;
    idOfLogedUser: number;
  };  

  type DateCalendar = {
    date_time: string;
  };  

moment.tz.setDefault('UTC');


export const Calendar: React.FC<ChildComponentProps> = (prop) => {
    const [buttonDateRef, setButtonDateRef] = useState<MutableRefObject<ButtonDateRef | null>>(useRef<ButtonDateRef>(null));
    const [eventDates, setEventDates] = useState<Array<DateCalendar>>([]);


    useEffect(() => {
        getEventForCalendar(parseInt(localStorage.id)).then((events) => {
            let eventDatesNew = new Array<DateCalendar>();
            events.forEach(function (e:DateCalendar) {
            eventDatesNew.push({date_time:e.date_time})});
            setEventDates(eventDatesNew);
            console.log(eventDates);
        });
        console.log(eventDates);
      }, []);


    const onButtonClick = (ref: MutableRefObject<ButtonDateRef | null>, date:number) =>{
        if (buttonDateRef?.current) {
            buttonDateRef.current.changeFont('unclicked');
        }
        if (ref?.current) {
            ref.current.changeFont('clicked');
            setButtonDateRef(ref);
        }
        setDate(date);

    }
  
    const setDate = (date:number) =>{
        let tmp:string = '2023-05-';
        if (date < 10) tmp = '2023-05-0';
        tmp = tmp + date;

        prop.handleDateChoice(tmp);

    }

    const getColor = (date:string) => {
        let date_tmp = date + 'T22:00:00.000Z';
        for (let i = 0; i < eventDates.length; i++){
            if (eventDates[i].date_time === date_tmp) {
                console.log(eventDates[i].date_time);
                console.log(date_tmp);
                return '#e7f0ccff';
            }
        }

        return 'white';
    }
        

    const generateDates = (date: number) => {
        for (let i = 0; i < 7; i++){
            
            if (date === 64) {
                let result =  <ButtonFakeDate/>;
            return result;
            }

            let str = '';

            if(date - 10 < 0) str = '0' + date;
            else str = '' + date;

            let date_full = '2023-05-' + str;
            let col:string = getColor(date_full);

            let propForButton:ChildComponentPropsButtonDate = new ChildComponentPropsButtonDate(date, str, onButtonClick, prop.idOfLogedUser, col);
            let result = <ButtonDate {...propForButton} />;
            return result;

        }
    }

    
    const generateWeeks = (dates: Array<Date>) => {
        let daysInWeek = 7;
        let tempArray:Array<Date[]> = [];


        if (dates.length % 7 !== 0) {
            let tmp = 7 - (dates.length % 7);
            for (let i = 0; i < tmp; i++){
                let date:Date = {day: 64};
                dates.push(date);
            }
        }

        for (let i = 0; i < dates.length; i += daysInWeek) {
            tempArray.push(dates.slice(i, i+daysInWeek));
        }

        return tempArray;
    }
    
    return(
        <div className="calendar-container">
            <div className="datepicker-container">
                <span>May 2023</span>
            </div>
            <div className="weekdays-container">
                {Weekdays.map(day => (
                    <div className="week-day">{day}</div>
                ))}
            </div>
            <div className="calendar">
                {generateWeeks(monthDates).map(week => 
                    (<div className="week"> 
                    {week.map(day => (generateDates(day.day)))}
                </div>))
                
                }

            </div>

        </div>
    )

}

export default Calendar;