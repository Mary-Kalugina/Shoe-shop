import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { setSearchValue } from '../toolkit/toolkitSlice';

const Header = () => {
    const [itemsNumber, setNumber] = useState();
    const [searchVisible, setSearchVisible] = useState(false);
    const dispatch = useDispatch();
    const searchText = useSelector(state => state.toolkit.searchText);

    useEffect(() => {
        getCartFromLocalStoredge();
    })

    const getCartFromLocalStoredge = () => {
       const cart = JSON.parse(localStorage.getItem('cart'));
       if (cart) {
        setNumber(cart.length)
       }
    }

    const handleSearchIconClick = () => {
      if (!searchVisible) {
        setSearchVisible(true);
      } else if (searchText) {
        window.location.href = `/catalog.html`;
      }
    };
  
    const handleSearchInputChange = (e) => {
        dispatch(setSearchValue(e.target.value));
    };

    return (
        <header className="container">
        <div className="row">
        <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
            <img src="./img/header-logo.png" alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Главная</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/catalog.html">Каталог</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about.html">О магазине</Link>
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/contacts.html">Контакты</Link>
                </li>
                </ul>
                <div>
                <div className="header-controls-pics">
                <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleSearchIconClick}></div>
                    <Link to={'/cart.html'}><div className="header-controls-pic header-controls-cart">
                        {itemsNumber ? <div className="header-controls-cart-full">{itemsNumber}</div> : null}
                        <div className="header-controls-cart-menu"></div>
                    </div></Link>
                </div>
                <form data-id="search-form" className={`header-controls-search-form form-inline ${searchVisible ? '' : 'invisible'}`}>
                    <input className="form-control" placeholder="Search" onChange={(e) => handleSearchInputChange(e)} />
                </form>
                </div>
            </div>
            </nav>
        </div>
        </div>
        </header>
    )
}

export default Header;