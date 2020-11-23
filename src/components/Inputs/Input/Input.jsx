import React from 'react'
import './Input.scss'

const Input = (props) => {
    return (
        <div className="text__wrap text--sm">
            <span className="text__title">{props.title}</span>
            <label className="text__value-wrap">
                <input
                    type="number"
                    // name={name}
                    className="input text__value-input text--sm"
                    min={props.range.min}
                    max={props.range.max}
                    // step={step}
                    value={props.value}
                    onChange={(e) => props.inputHandler(e)}
                />
                <span className="text__value">
                    {props.dimension}
                </span>
            </label>
        </div>
    )
}

export default Input