import React from "react";
import { Link } from "react-router-dom";

const CatalogNavigation = ({ selectedCategory, handleCategoryChange, all_id, categoriesArr }) => {
  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item" key={all_id}>
        <Link 
          className={selectedCategory === all_id ? "nav-link active" : "nav-link"}  
          onClick={() => handleCategoryChange(all_id)} 
          to="#">
          Все
        </Link>
      </li>
      {categoriesArr?.map((c) => (
        <li className="nav-item" key={c.id}>
          <Link 
            className={selectedCategory === c.id ? "nav-link active" : "nav-link"} 
            to="#"
            onClick={() => handleCategoryChange(c.id)}>
            {c.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CatalogNavigation;
