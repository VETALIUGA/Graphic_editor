import React, { useState } from 'react'
import Logo from '@/assets/Logo.svg'
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
import { InputText } from '../../components/Inputs/InputRange/InputText/InputText'
import { connect } from 'react-redux'

const Header = (props) => {
    const [isEdit, setIsEdit] = useState(false)
    const buttonHandler = () => {
        setIsEdit(!isEdit)
        
    }

    return (
        <header className="section header__section">
            <img className="header__logo" src={Logo} alt=""/>
            <div className="header__edit">
            <InputText defaultValue = 'Image' disabled={!isEdit} inputHandler={(e)=> console.log(e.target.value)}/>
            <button className="header__edit-button" onClick = {buttonHandler}><FontAwesomeIcon className="icon--xsm" icon={isEdit ? faCheck : faEdit}/></button>
            </div>
        </header>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

const mapStateToProps = (state) => {
    const { original } = state.file.links
    return { original }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);