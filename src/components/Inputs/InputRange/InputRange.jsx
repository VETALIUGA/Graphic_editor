import React from 'react'
import './InputRange.scss'

const InputRange = ({ inputHandler = null, value, range: { min, max, step=1 }, name, title, dimension }) => {
    return (
        <label className='range__label'>
            <div className="range__wrap text--sm">
                <span className='range__title'>{title}</span>
                <label className="range__value-wrap">
                    <input type="number" name={name} className="input range__value-input text--sm" min={min} max={max} step={step} value={value} onChange={(e) => inputHandler(e)} />
                    <span className="range__value">{dimension}</span>
                </label>
            </div>
            <input className="input range__input" type="range" name={name} onChange={(e) => inputHandler(e)} value={value} min={min} max={max} step={step}/>
        </label>
    )
}

export default InputRange