import React from 'react'
import './InputText.scss'

export const InputText = (props) => {
    return (
        <input
            className="input-text text--lg"
            defaultValue={props.defaultValue}
            type="text" disabled={props.disabled}
            onChange={props.inputHandler}
        />
    )
}
