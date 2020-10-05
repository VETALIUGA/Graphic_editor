import React from 'react'
import './SettingsSidebar.scss'

const SettingsSidebar = ({brightness}) => {
    return (
        <section className="settings-sidebar__section">
            {brightness}
        </section>
    )
}

export default SettingsSidebar;
