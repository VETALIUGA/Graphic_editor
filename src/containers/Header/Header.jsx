import React, { useState } from 'react'
import Logo from '@/assets/Logo.svg'
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faFileDownload } from '@fortawesome/free-solid-svg-icons'
import { InputText } from '../../components/Inputs/InputText/InputText'
import { connect } from 'react-redux'
import { setNewName } from '../../redux/actions/actions'

const Header = (props) => {
    const [isEdit, setIsEdit] = useState(false)
    const [value, setValue] = useState(props.fileName)
    const buttonHandler = () => {
        if (isEdit) {
            setIsEdit(!isEdit)
            props.setNewName(value)
        } else {
            setIsEdit(!isEdit)
        }
    }

    return (
        <header className="section header__section">
            <div className="header__item">
                <img className="header__logo" src={Logo} alt="" />
                <div className="header__edit">
                    <InputText defaultValue={value} disabled={!isEdit} inputHandler={(e) => setValue(e.target.value)} />
                    <button className="header__edit-button" onClick={buttonHandler}><FontAwesomeIcon className="icon--xsm" icon={isEdit ? faCheck : faEdit} /></button>
                </div>
            </div>

            {/* <div className="header__item">
                <a
                    className="header__link link"
                    download={props.fileName}
                    href={props.link}
                >
                    <FontAwesomeIcon className="header__link-icon icon--xsm" icon={faFileDownload} />
                    <span className="header__link-text text--md">Зберегти</span>
                </a>
            </div> */}
        </header>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setNewName: (name) => dispatch(setNewName(name))
    }
}

const mapStateToProps = ({ file: { fileName, generated: {link} }, }) => {
    return { fileName, link }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);