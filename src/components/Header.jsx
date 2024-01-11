import React, {useState} from "react";
import { Link, redirect } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import Navigation from "./Navigation";
import { setSearchValue, setActiveTab } from '../toolkit/toolkitSlice';
import banner from '../img/banner.jpg';
import header from '../img/header-logo.png';

const Header = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    const dispatch = useDispatch();
    const searchText = useSelector(state => state.toolkit.searchText);
    const cart = useSelector(state => state.toolkit.cart);
    const itemsNumber = cart.length;

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
                                <img src={header} alt="Bosa Noga" />
                            </Link>
                            <Navigation />
                        </div>
                        <div className="header-controls-pics">
                            <form data-id="search-form" className={`header-controls-search-form form-inline ${searchVisible ? '' : 'invisible'}`} >
                                <input value={searchText} className="form-control" placeholder="Поиск" onChange={(e) => handleSearchInputChange(e)} />
                            </form>
                            <div 
                                data-id="search-expander" 
                                className="header-controls-pic header-controls-search"
                                onClick={() => {
                                    if (searchVisible && searchText) {
                                        dispatch(setActiveTab('Каталог'));
                                        window.location.href = "/catalog.html";
                                    }
                                    handleSearchIconClick(); 
                                }}>
                            </div>
                            <Link to='/cart.html'><div className="header-controls-pic header-controls-cart" onClick={() => dispatch(setActiveTab(''))}>
                                {itemsNumber ? <div className="header-controls-cart-full">{itemsNumber}</div> : null}
                                <div className="header-controls-cart-menu"></div>
                                </div>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="banner">
                <img src={banner} className="img-fluid" alt="К весне готовы!"/>
                <h2 className="banner-header">К весне готовы!</h2>
            </div>
        </header>
    )
}

export default Header;