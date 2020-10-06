import React from 'react'

const InputRange = ({ inputHandler, value, range: { min, max }, name }) => {
    return (
        <label>
            <span>{name}</span>
            <input type="range" name={name} onChange={(e) => inputHandler(e)} value={value} min={min} max={max} />
            <span>{value}</span>
        </label>
    )
}

export default InputRange