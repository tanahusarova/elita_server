import React, {useState, useEffect} from "react";
import Select from "react-select";
import ValueType from "react-select";
import { ActionMeta } from "react-select";
import MultiValue from "react-select";
import OptionTypeBase from "react-select";
import makeAnimated from 'react-select/animated';
import { getNicknames } from '../api/User';
import dayjs, { Dayjs } from 'dayjs';
import * as moment from 'moment-timezone';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputColor from 'react-input-color';

import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
//import { DatePicker } from '@mui/x-date-pickers';
import Plans from "./Plans";
import LongMenu from "./LongMenu";
import Event from "./Event";
import Time from "../configs/Time";
import { addComment, addEvent, addEventWithParticipants, addObserver, addParticipant, deleteEvent, updateEvent } from "../api/Events";
import { response } from "express";
import SharedInformations from "./SharedInformations";
import PropsNewEvent from "./props/PropsNewEvent";


interface OptionType {
  value: number;
  label: string;
}

interface Nickname{
  user_id: number;
  nickname: string;
}

interface Participant{
  value: number;
  label: string;
}

class ParticipantP implements Participant{
  value: number;
  label: string;

  constructor (value: number, label: string){
      this.value = value;
      this.label = label;
  }
}

type ChildComponentProps = {
  event: PropsNewEvent;
  sharedInformations: SharedInformations;
};

moment.tz.setDefault('UTC');


export const NewEvent: React.FC<ChildComponentProps> = (props) => {

    //nazov, typ, farba, od, do, poznamka, kto ma vidiet, kto sa ucasti
    const [name, setName] = useState('');
    const [type, setType] = useState(3);
    const [typePrivate, setTypePrivate] = useState(true);
    const [color, setColor] = useState('#88c20cff'); 
    const [time_from, setFrom] = useState<null | Date>(new Date('2023-05-15T22:00:00.000Z'));
    const [time_to, setTo] = useState<null | Date>(new Date('2023-05-15T22:00:00.000Z'));
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('2023-05-15');
    const [selectionOfParticipants, setSelectionOfParticipants] = useState<Participant[]>([]);
    const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
    const [hiddenFromParticipants, sethiddenPart] = useState<Participant[]>([]);
    const [newE, setNewE] = useState(true);
    const [selectedType, setSelectedType] = useState<OptionType | null>(null);



    const animatedComponents = makeAnimated();




   async function handleSubmit () {
    //const {id_of_type, name, from, to, date, colour } = body;
  //let string = 'UPDATE events SET type_id = ' + id_of_type + ', name = \'' + name + '\', from_time = \''+ from +
  //'\', to_time = \''+ to +'\', date_time =\''+ date +'\', colour =\'' + colour + '\' WHERE event_id = '+ event_id + ';';
        console.log(setNewE);

        let time_fromString:string = '';
        if (time_from) 
            time_fromString = time_from?.toISOString();

        let time_toString:string = '';
        if (time_to) 
            time_toString = time_to?.toISOString();

        let partArray = new Array<{user_id_p:number}>();
        let obserArray = new Array<{user_id_o:number, visible:boolean}>();

        if (!newE){
          updateEvent(props.event.event_id, {id_of_type: type, name:name, from:time_fromString, to:time_toString, 
                      date:date, colour:color, comment:comment, user_id:props.sharedInformations.idOfLoggedUser});

        }else{
  
        partArray.push({user_id_p:props.sharedInformations.idOfLoggedUser});
        obserArray.push({user_id_o:props.sharedInformations.idOfLoggedUser, visible:true});


        for (let i = 0; i < selectedParticipants.length; i++){
          partArray.push({user_id_p:selectedParticipants[i].value});
        }

        for (let i = 0; i < selectionOfParticipants.length; i++){
          let visible = !hiddenFromParticipants.includes(selectionOfParticipants[i]);
          obserArray.push({user_id_o:selectionOfParticipants[i].value, visible:visible});
        } 


        addEventWithParticipants({event:{ id_of_type: type, name: name, from: time_fromString, to: time_toString,
                                  date: date, colour: color }, participants: partArray, observers:obserArray,
                                  comments:{user_id_c:props.sharedInformations.idOfLoggedUser, comment: comment}});
      }
    }

    const handleTimeFrom = (date:Dayjs|null) => {
      if (date === null) {
        setFrom(null);
        setDate('');
      }
      else {
        {
          const result = new Date(Date.UTC(date.toDate().getFullYear() , date.toDate().getMonth(), date.toDate().getDate(), date.toDate().getHours(), date.toDate().getMinutes(), date.toDate().getSeconds()));
          setFrom(result);
          setDate(result.toJSON().slice(0, 10));
          console.log(result.toJSON().slice(0, 10));
        }

      }
      
    }

    

    const options: OptionType[] = [
        { value: 2, label: 'school'},
        { value: 3, label: 'hobby' },
        { value: 4, label: 'other plans' },
        { value: 5, label: 'mutual plans' },


      ]

      //doplnit nicknames z databazy

      const handleSelection = (selectedOption: OptionType | null) =>{
        if (selectedOption === null) {
          setTypePrivate(true);
          setSelectedType(selectedOption);
          return;
        }

        if (selectedOption.value <= 4){
          setTypePrivate(true);
          setType(selectedOption.value);
        }

        else{
          setTypePrivate(false)
          setType(selectedOption.value);

        }

        setSelectedType(selectedOption);

      };


      const handleColorChange = (newColor: { hex: string; }) => {
        setColor(newColor.hex);
      };

      const handleDelete = () => {
        setName('');
        setColor('#88c20cff');
        setTypePrivate(false);
        setFrom(new Date('2023-05-15T22:00:00.000Z'));
        setDate('2023-05-15');
        setTo(new Date('2023-05-15T22:00:00.000Z'));
        setComment('');

        if (props.event.event_id > 0){
          deleteEvent(props.event.event_id).catch((err)=>{
            console.log(err);
          })
        }
      };

      const setNewOptions = () => {
  
        let nicknamesArray = new Array<Participant>();
        
        getNicknames().then((nicknames)=>{
          nicknames.forEach(function (value:Nickname) {
            if (value.user_id !== props.sharedInformations.idOfLoggedUser)
                nicknamesArray.push(new ParticipantP(value.user_id, value.nickname));
       });});
        return nicknamesArray;
      
      };
      
      useEffect(() => {
        setSelectionOfParticipants(setNewOptions());
      }, []);

      useEffect(() => {
        if (props.event.idOfWathedUser === props.sharedInformations.idOfLoggedUser){
          setNewE(props.event.new_event);
          setName(props.event.name);
          let date = new Date(props.event.time_from);
          setFrom(new Date(Date.UTC(date.getFullYear() , date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())));
          setDate(new Date(Date.UTC(date.getFullYear() , date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())).toJSON().slice(0, 10));
          setTypePrivate(true);


          for (let i = 0; i < 4; i++){
            if (options[i].value === props.event.type)
              setSelectedType({value: props.event.type, label:options[i].label});
          }

          date = new Date(props.event.time_to);
          setTo(new Date(Date.UTC(date.getFullYear() , date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())));
          setComment(props.event.comment);
          setColor(props.event.colour);
        }
      }, [props.event]);
      

    return (
      <div>
        <div className="new-event-container">
        <form className="new-event-buttons">
            <label htmlFor="name">name </label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="konzultacie so skolitelom" id="name" name="name" />

            <label htmlFor="type"> type </label>
            <Select 
               onChange={handleSelection}
               options={options}
               value= {selectedType} />

            <Select
             placeholder="choose participants..."
             isDisabled={typePrivate}
             closeMenuOnSelect={true}
             components={animatedComponents}
             isMulti
             options={selectionOfParticipants}
             onChange={(selectedOptions) => 
              setSelectedParticipants(selectedOptions as Participant[])} />

            <label htmlFor="hidden"> hidden from </label>
            <Select
             closeMenuOnSelect={true}
             isDisabled={!newE}
             components={animatedComponents}
             isMulti
             options={selectionOfParticipants.filter(item => !selectedParticipants.includes(item))}
             onChange={(selectedOptions) => {
              sethiddenPart(selectedOptions as Participant[]);
              console.log(hiddenFromParticipants);}} />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
          
            <label htmlFor="time_from">from </label>            
            <DateTimePicker
            disablePast              
            value={dayjs(time_from)}
            onChange={(newValue) => handleTimeFrom(newValue)}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />
            <label htmlFor="time_to">to </label>            
            <DateTimePicker
            value ={dayjs(time_to)}
            disablePast              
            onChange={(newValue) => {
              if (newValue === null)
                  setTo(new Date());
              else {
                const result = new Date(Date.UTC(newValue.toDate().getFullYear() , newValue.toDate().getMonth(), newValue.toDate().getDate(), newValue.toDate().getHours(), newValue.toDate().getMinutes(), newValue.toDate().getSeconds()));
                setTo(result);
              }
            }}
            views={['year', 'month', 'day', 'hours', 'minutes']}
          />

            </LocalizationProvider>
            <label htmlFor="comment">comment </label>
            <input value={comment} onChange={(e) => setComment(e.target.value)} type="comment" placeholder="comment" id="comment" name="comment" />
           
            <label htmlFor="color">color</label>
            <InputColor
             initialValue={color}
             onChange={handleColorChange}
             placement="right"
             />
        <div className="buttons-new-event">
        <button className="button-front-page" 
          onClick={() => handleSubmit()}>Save changes</button>
        <button className="button-front-page" 
          onClick={() => handleDelete()}>Delete event</button>
        </div>
        </form>
        </div>
        </div>
    )
}

export default NewEvent;