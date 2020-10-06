import React from 'react'
import './SettingsSidebar.scss'

const SettingsSidebar = (props) => {
    return (
        <section className="settings-sidebar__section">
            {props.children}
        </section>
    )
}

export default SettingsSidebar;
