import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../hook/useLocalStorage';
const CountDown = () => {

    const [timer, setTimer] = useState(25);
    const [color, setColor] = useState('');
    const [disabled, setDisabled] = useLocalStorage('clickDisabled', false);

    const [values, setValues] = useLocalStorage('values', [
        { name: 'Purple', val: 0 },
        { name: 'Blue', val: 0 },
        { name: 'Green', val: 0 },
        { name: 'Yellow', val: 0 },
        { name: 'Orange', val: 0 },
        { name: 'Red', val: 0 }
    ])

    useEffect(() => {
      const TimerInt = timer > 0 && setInterval(() => {
        setTimer((time) => time - 1);
      }, 1000);
      return () => {
        clearInterval(TimerInt)
      }
    }, [timer]);
    
    
    useEffect(() => {
      if(timer === 0) {
        setTimer(60)
        }
    }, [timer])

    // Validate Seconds
    const purple = timer >= 52
    const blue = timer >= 42
    const green = timer >= 32
    const yellow = timer >= 22
    const orange = timer >= 12
    
    const handleClick = () => {
        let color, colorName;
        switch (true) {
          case purple:
            color = "#4B0082";
            colorName = "Purple";
            break;
          case blue:
            color = "#1E90FF";
            colorName = "Blue";
            break;
          case green:
            color = "#008000";
            colorName = "Green";
            break;
          case yellow:
            color = "#FFD700";
            colorName = "Yellow";
            break;
          case orange:
            color = "#FF8C00";
            colorName = "Orange";
            break;
          default:
            color = "#DC143C";
            colorName = "Red";
            break;
        }

        const newValues = values.map((item) =>
          item.name === colorName ? { ...item, val: item.val + 1 } : item
        );

        setColor(color);
        setValues(newValues);
        setDisabled(true);
        setTimer(60);
      };
    

    return (
        <>
            <div style={{ background: color }}>
                <div>Tiempo restante : {timer} </div>

                <button disabled={disabled} onClick={handleClick}>CLICK</button>
            </div>
            <div>
                {values.map((v, i) => {
                    return (
                      <div key={i}>
                          <div>
                              {v.name} {v.val}
                          </div>
                      </div>
                    )
                })}
            </div>
        </>
    )
}

export default CountDown
