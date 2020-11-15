import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './InputButtons.scss'


const InputButtons = (props) => {

    return (
        <div className="input-buttons">
            <span className="input-buttons__label text--sm">{props.title}</span>
            {props.isLoading? <FontAwesomeIcon icon={faSpinner} spin className='input-buttons__spinner icon--xsm'/> : null}
            <div className="input-buttons__wrap">
                {props.settings.map((item, index) => {
                    return (
                        <button disabled={props.isLoading || item.value === props.activeValue} key={index} value={item.value} onClick={(e) => props.clickHandler(e.target.value)} className={`input-buttons__button ${item.value === props.activeValue? ' active' : ''}`}>{item.title}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default InputButtons