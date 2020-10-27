import React from 'react'
import Logo from '@/assets/Logo.svg'
import './Header.scss'

const Header = (props) => {
    return (
        <header className="section header__section">
            <img src={Logo} alt=""/>
        </header>
    )
}

export default Header;