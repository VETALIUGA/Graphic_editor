import { faCropAlt, faFileArchive, faFileImage, faFolder, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './ToolsSidebar.scss';

const ToolsSidebar = ({ title }) => {
    return (
        <section className="section tools-sidebar__section">
            <NavLink className="tools-sidebar__link link text--xsm" activeClassName="tools-sidebar__link--active" to='/templates'>
                <FontAwesomeIcon icon={faFolder} className="tools-sidebar__icon icon--md" />
                <span className="tools-sidebar__title">Темплейти</span>
            </NavLink>
            <NavLink className="tools-sidebar__link link text--xsm" activeClassName="tools-sidebar__link--active" to='/images'>
                <FontAwesomeIcon icon={faFileImage} className="tools-sidebar__icon icon--md" />
                <span className="tools-sidebar__title">Зображення</span>
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