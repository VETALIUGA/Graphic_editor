import React from 'react'
import './InputButtons.scss'

const Button = (props) => {
    return (
        <button
            disabled={props.disabled}
            value={props.value}
            onClick={(e) => props.onClick(e.target.value)}
            className={`input-buttons__button ${props.isActive ? ' active' : ''}`}
        >
            {props.title}
        </button>
    )
}

export default Button