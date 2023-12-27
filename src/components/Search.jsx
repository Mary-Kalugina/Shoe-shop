import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from '../toolkit/toolkitSlice';
import {setCatalogItems} from '../toolkit/catalogSlice'
import { find } from "../api/Requests";

const Search = () => {
    const text = useSelector(state => state.toolkit.searchText);
    const dispatch = useDispatch();

    useEffect(() => {
      if (text) {
        handleSearch();
      }
    }, []);
    
    function debounce(func, delay) {
        let timerId;
        return function () {
          const args = arguments;
          clearTimeout(timerId);
          timerId = setTimeout(function () {
            func.apply(this, args);
          }, delay);
        };
      }

      function handleSearch() {
        find(text)
        .then(data => dispatch(setCatalogItems(data)))
        .catch(error => {
          console.error('Ошибка при поиске товаров:', error);
        });;
      }
      
      const delayedSearch = debounce(handleSearch, 500);

      const handleChange = (e) => {
        const searchText = e.target.value;
        dispatch(setSearchValue(searchText));
        delayedSearch(searchText);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
      };

      return( 
        <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
            <input value={text} className="form-control" placeholder="Поиск" onChange={(e) => handleChange(e)}/> 
        </form> 
    )
}

export default Search; 
  