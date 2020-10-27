import { faCropAlt, faFileArchive, faFileImage, faSlidersH, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './ToolsSidebar.scss';

const ToolsSidebar = ({ title }) => {
    return (
        <section className="section tools-sidebar__section">
            <NavLink className="tools-sidebar__link link text--xsm" activeClassName="tools-sidebar__link--active" exact to='/'>
                <FontAwesomeIcon icon={faFileImage} className="tools-sidebar__icon icon--md" />
                <span className="tools-sidebar__title">Зображення</span>
            </NavLink>
            <NavLink className="tools-sidebar__link link text--xsm" activeClassName="tools-sidebar__link--active" to='/recovery'>
                <FontAwesomeIcon icon={faToolbox} className="tools-sidebar__icon icon--md" />
                <span className="tools-sidebar__title">Відновлення</span>
            </NavLink>
            <NavLink className="tools-sidebar__link link text--xsm" activeClassName="tools-sidebar__link--active" to='/color'>
                <FontAwesomeIcon icon={faSlidersH} className="tools-sidebar__icon icon--md" />
                <span className="tools-sidebar__title">Фотокорекція</span>
            </NavLink>
            <NavLink className="tools-sidebar__link link text--xsm" activeClassName="tools-sidebar__link--active" to='/crop'>
                <FontAwesomeIcon icon={faCropAlt} className="tools-sidebar__icon icon--md" />
                <span className="tools-sidebar__title">Обрізання</span>
            </NavLink>
            <NavLink className="tools-sidebar__link link text--xsm" activeClassName="tools-sidebar__link--active" to='/compress'>
                <FontAwesomeIcon icon={faFileArchive} className="tools-sidebar__icon icon--md" />
                <span className="tools-sidebar__title">Оптимізація</span>
            </NavLink>
        </section>
    )
}

export default ToolsSidebar;