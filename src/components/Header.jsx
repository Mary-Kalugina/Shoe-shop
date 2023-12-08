import React, {useState} from "react";
import { Link, redirect } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { setSearchValue, setActiveTab } from '../toolkit/toolkitSlice';

const Header = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const dispatch = useDispatch();
    const searchText = useSelector(state => state.toolkit.searchText);
    const cart = useSelector(state => state.toolkit.cart);
    const activeTab = useSelector(state => state.toolkit.activeTab);
    const itemsNumber = cart.length;

    console.log('head')
// Следит за кликами по иконке поиска

    const handleSearchIconClick = () => {
      if (!searchVisible) {
        setSearchVisible(true);
      } else if (searchText) {
        redirect('/catalog.html');
      }
    };
  
// Передает в хранилище значение инпута

    const handleSearchInputChange = (e) => {
        dispatch(setSearchValue(e.target.value));
    };

// Переключает ссылки меню

    const handleTabs = (tab) => {
        dispatch(setActiveTab(tab))
    }

// Переключатель ссыки на Главную

    const handleTab = () => {
        dispatch(setActiveTab('Главная'))
    }

    return (
        <header className="container">
        <div className="row">
        <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="collapase navbar-collapse" id="navbarMain">
                <Link className="navbar-brand" to="/" onClick={handleTab}>
                    <img src="./img/header-logo.png" alt="Bosa Noga" />
                </Link>
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
            </div>
            <div className="header-controls-pics">
                <form data-id="search-form" className={`header-controls-search-form form-inline ${searchVisible ? '' : 'invisible'}`}>
                    <input value={searchText} className="form-control" placeholder="Поиск" onChange={(e) => handleSearchInputChange(e)} />
                </form>
                <div 
                    data-id="search-expander" 
                    className="header-controls-pic header-controls-search"
                    onClick={handleSearchIconClick}
                ></div>
                <Link to='/cart.html'><div className="header-controls-pic header-controls-cart" onClick={() => dispatch(setActiveTab(''))}>
                    {itemsNumber ? <div className="header-controls-cart-full">{itemsNumber}</div> : null}
                    <div className="header-controls-cart-menu"></div>
                    </div>
                </Link>
            </div>
        </nav>
    </div>
</div>
</header>
    )
}

export default Header;