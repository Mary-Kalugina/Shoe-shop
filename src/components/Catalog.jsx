import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { items, categoryItems, categories } from "../api/Requests";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setCatalogItems, showItem, setCategoriesArr } from '../toolkit/toolkitSlice';
import Search from "./Search";
import Loader from "./pages/Loader";

const Catalog = ({form}) => {
    const renderItemsNumber = 0;
    const [selectedCategory, setSelectedCategory] = useState("11");
    const [offset, setOffset] = useState(renderItemsNumber);
    const [isLoading, setIsLoading] = useState(false);
    const [moreItems, setmoreItems] = useState(true);

    const catalogItems = useSelector(state => state.toolkit.items);
    const categoriesArr = useSelector(state => state.toolkit.categories);
    const dispatch = useDispatch();

    const all_id = '11';

    useEffect(() => {
      if (categoriesArr.length === 0) {
        loadCategories();
      }
      
      loadCatalogItems();
    }, [selectedCategory, offset]);
    

    const loadCategories = () => {
      if (categoriesArr.length === 0) {
        categories()
        .then(data => {
          dispatch(setCategoriesArr(data));
        })
        .catch(error => {
          console.error('Ошибка при получении категорий:', error);
        });
      }
    }
    
      const loadCatalogItems = () => {
        setIsLoading(true);
        let fetchDataPromise;
      
        if (selectedCategory === all_id) {
          fetchDataPromise = items(offset);
        } else {
          fetchDataPromise = categoryItems(selectedCategory, offset);
        }
      
        fetchDataPromise
          .then(data => {
            setmoreItems(data.length > 0 && data.length % 6 === 0 ? true : false);
            dispatch(setCatalogItems([...catalogItems, ...data]));
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Произошла ошибка при загрузке данных:', error);
            retryLoadCatalogItems();
          });
      };
      
      const retryLoadCatalogItems = () => {
        loadCatalogItems();
      };      
      
      const handleLoadMore = () => {
        setOffset(offset + 6);
      };

      const handleCategoryChange = (categoryID) => {
        setOffset(6);
        setSelectedCategory(categoryID);
        dispatch(setCatalogItems([]))
      };

      return(
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <ul className="catalog-categories nav justify-content-center">
              <li className="nav-item" key={all_id}>
                <Link 
                  className={selectedCategory === all_id ? "nav-link active" : "nav-link"}  
                  onClick={() => handleCategoryChange(all_id)} 
                  to="#">
                  Все
                </Link>
              </li>
              {categoriesArr?.map((c) => (<li className="nav-item" key={c.id}>
                  <Link 
                    className={selectedCategory === c.id ? "nav-link active" : "nav-link"} 
                    to="#"
                    onClick={() => handleCategoryChange(c.id)}>
                    {c.title}
                  </Link>
                </li>
                ))}
            </ul>
            {form ? <Search/> : null}
            {isLoading ? <Loader/>
             : catalogItems.length === 0 ? <h3 className="text-center" style={{ marginTop: '100px' }}>Товары не найдены :( </h3> : <>
            <div className="row">
              {catalogItems?.map((item, index) => (
                 <div className="col-4" key={index}>
                 <div className="card catalog-item-card">
                   <img src={item.images[0]}
                     className="card-img-top img-fluid" alt={item.title}/>
                   <div className="card-body">
                     <p className="card-text">{item.title}</p>
                     <p className="card-text">{item.price} руб.</p>
                     <Link to={`/catalog/${item.id}.html`} onClick={() => {dispatch(showItem(item.id)); dispatch(setActiveTab(''))}} className="btn btn-outline-primary">Заказать</Link>
                   </div>
                 </div>
               </div>
              ))}
            </div>
            <div className="text-center">
            {!moreItems ? null : (
              <div className="text-center">
                <button className="btn btn-outline-primary" onClick={() => handleLoadMore()}>
                  Загрузить ещё
                </button>
              </div>
            )}</div></>}
        </section>
    )
}

export default Catalog;