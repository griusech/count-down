import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../../hook/useLocalStorage';
import DisplayColor from '../displayColor/DisplayColor';
import ListUsers from '../users/ListUsers';
import './styles.css'

const CountDown = () => {

  const [timer, setTimer] = useState(60);
  const [color, setColor] = useLocalStorage('');
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
      // Simulo un click siempre en el segundo asignado
      // cuando el usuario ya hizo click
      if (disabled && timer === 20) {
        handleClick()
        setColor('')
      }
      setTimer((time) => time - 1)
    }, 1000);
    return () => clearInterval(TimerInt)
  }, [timer]);

  // Valido los segundos
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
    setValues(newValues);
    setDisabled(true);
    setTimer(60);
    setColor(color);
  };

  return (
    <>
      <div className="content-page m-auto">
        <div>
          <DisplayColor
            timer={timer}
            disabled={disabled}
            handleClick={handleClick}
            color={color}
          />
        </div>
        {color &&
          <div className="mt-2 d-flex justify-content-center align-items-center">
            <span className="text-color">Su color asignado es:</span>
            <div className="crad-color" style={{ background: color }}></div>
          </div>
        }
        <div className=" container row mt-5 m-auto">
          <div className="col-md-6 col-sm-12">
            <div className="text-table">
              ESTADISTICA DE USUARIOS
            </div>
            {/* TABLA DE ESTADÍSTICAS */}
            <table className="table table-striped table-bordered border-info m-auto w-50 mt-2">
              <thead>
                <tr>
                  <th scope="col">COLORES</th>
                  <th scope="col">CLICKS</th>
                </tr>
              </thead>
              <tbody>
                {values.map((value, i) =>
                  <tr key={i}>
                    <td>{value.name}</td>
                    <td>{value.val}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="col-md-6 col-sm-12 mb-5">
            <ListUsers />
          </div>
        </div>
      </div>

      {/* Agrego un pequeño Footer */}
      <div className="page-footer footer">
        <div className="footer-copyright text-center py-3">© 2021 Copyright</div>
      </div>
    </>
  )
}

export default CountDown
