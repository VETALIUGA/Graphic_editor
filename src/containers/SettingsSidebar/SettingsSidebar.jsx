import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './SettingsSidebar.scss'

const SettingsSidebar = ({ title, children }) => {
    return (
        <section className="settings-sidebar__section">
            <div className="settings-sidebar__article-wrap">
                <FontAwesomeIcon icon={faSlidersH} className="settings-sidebar__icon icon--sm" />
                <h3 className="settings-sidebar__article text--xmd">{title}</h3>
            </div>
            <div className="settings-sidebar__children">
                {children}
            </div>
        </section>
    )
}

export default SettingsSidebar;
