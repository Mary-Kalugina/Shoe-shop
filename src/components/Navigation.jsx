import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from '../toolkit/toolkitSlice';


const Navigation = () => {
    const activeTab = useSelector(state => state.toolkit.activeTab);
    const dispatch = useDispatch();

    // Переключает ссылки меню
    const handleTabs = (tab) => {
        dispatch(setActiveTab(tab))
    }

    return (
        <ul className="navbar-nav mr-auto">
            <li onClick={() => handleTabs('Главная')} className={`nav-item ${activeTab === 'Главная' ? ' nav-item-active' : ''}`}>
                <Link className="nav-link" to="/">Главная</Link>
            </li>
            <li onClick={() => handleTabs('Каталог')} className={`nav-item ${activeTab === 'Каталог' ? ' nav-item-active' : ''}`}>
                <Link className="nav-link" to="/catalog.html">Каталог</Link>
            </li>
            <li onClick={() => handleTabs('О магазине')} className={`nav-item ${activeTab === 'О магазине' ? ' nav-item-active' : ''}`}>
                <Link className="nav-link" to="/about.html">О магазине</Link>
            </li>
            <li onClick={() => handleTabs('Контакты')} className={`nav-item ${activeTab === 'Контакты' ? ' nav-item-active' : ''}`}>
                <Link className="nav-link" to="/contacts.html">Контакты</Link>
            </li>
        </ul>
    )    
}

export default Navigation;
