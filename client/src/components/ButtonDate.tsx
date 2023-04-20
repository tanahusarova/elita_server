import React, { useState, useRef, useEffect, useImperativeHandle, MutableRefObject } from "react";
import { getEventByDate } from "../api/Events";

export class ChildComponentPropsButtonDate {
  date: number;
  date_str: string;
  urSend: (ref: MutableRefObject<ButtonDateRef | null>, datep:number) => void;
  idOfLoggedUser: number;
  color_back: string;

    public constructor (date:number, date_str:string, urSend: (ref: MutableRefObject<ButtonDateRef | null>, datep:number) => void, idOfLoggedUser:number, color:string){
        this.date = date;
        this.date_str = date_str;
        this.urSend = urSend;
        this.idOfLoggedUser = idOfLoggedUser;
        this.color_back = color;

    }
}

export interface ButtonDateRef {
  changeFont: (color: string) => void;
  changeBack: (color: string) => void;

}

export const ButtonDate: React.FC<ChildComponentPropsButtonDate> = (prop) => {
    const [color, setColor] = useState("#3f5c06ff");
    const [size, setSize] = useState(300);
    const [back, setBack] = useState(prop.color_back);

    const useREfB = useRef<ButtonDateRef>(null);


  const buttonStyle = {
    color: color,
    fontWeight: size,
    backgroundColor: back

  };

  useEffect(() => {
    setBack(prop.color_back);
  }, [prop.color_back]);


  const changeFont = (state:string): void => {
    if (state === 'clicked'){
        setColor('white');
        setBack('#c0d47bff')
        setSize(800);
    }

    else {
        setColor('#3f5c06ff');
        setSize(300);
        setBack(prop.color_back)
    }
  };

  const changeBack= (color:string): void => {
    setBack(color);
  };


  useImperativeHandle(useREfB, () => ({
    changeFont, changeBack
  }));

 

  return (
    <button
      className="date"
      style={buttonStyle}
      value={prop.date}
      onClick={(e) => prop.urSend(useREfB, prop.date)}
      id={prop.date_str}
    >
      <p>{prop.date_str}</p>
    </button>
  );
};

