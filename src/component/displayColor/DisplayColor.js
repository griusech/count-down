import React from 'react'
import './styles.css'

const DisplayColor = ({ timer, disabled, handleClick }) => {
    return (
        <div className="bg-image">
            <div className="container">
                <div className="row content m-auto">
                    <div className="card-count col-md-6 col-sm-12">
                        <span className="timer">
                           0 : {timer}
                        </span>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="assigned-color">
                            Detén el contador antes que termine y se le asignará un color
                        </div>
                        <button className="btn btn-secondary" disabled={disabled} onClick={handleClick}>CLICK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayColor
