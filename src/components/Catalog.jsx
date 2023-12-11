import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { items, categoryItems, categories } from "../api/Requests";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, showItem, setCategoriesArr } from '../toolkit/toolkitSlice';
import {setCatalogItems} from '../toolkit/catalogSlice';
import Search from "./Search";
import Loader from "./pages/Loader";

const Catalog = ({form}) => {
    let renderItemsNumber = 0;
    const [selectedCategory, setSelectedCategory] = useState("11");
    const [offset, setOffset] = useState(renderItemsNumber);
    const [isLoading, setIsLoading] = useState(false);
    const [moreItems, setmoreItems] = useState(true);

    const catalogItems = useSelector(state => state.catalog.items);
    const categoriesArr = useSelector(state => state.toolkit.categories);
    const dispatch = useDispatch();
    let itemsToLoad = 6;

    const all_id = '11';

    useEffect(() => {
      if (categoriesArr.length === 0) {
        loadCategories();
      }
      
      loadCatalogItems();
      return () => {
        dispatch(setCatalogItems([]))
      }
    }, [selectedCategory, offset]);
    
console.log()
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
      
        if (selectedCategory === all_id) { // если категория все
          fetchDataPromise = items(offset);
        } else if (selectedCategory === 15 || selectedCategory === 12) { //для категорий мужская и детская обувь 
          itemsToLoad = 4; //почему 4 - непонятно. так лучше с сервера заргужаются с сервера тк товаров мало
          // setOffset(4);
          fetchDataPromise = categoryItems(selectedCategory, 4);
        }
        else { // если выбрана конкретная категория
          fetchDataPromise = categoryItems(selectedCategory, offset);
        }
        fetchDataPromise
          .then(data => {
            setmoreItems(data.length > 0 && data.length % itemsToLoad === 0 ? true : false); // определяет показывать ли кнопку Ещё
            const items = [...catalogItems, ...data]; // к уже загруженным добавляем новые 
            //фильтруем от повторов
            const newArray = items.filter((element, index, array) => {
              return array.map(mapObj => mapObj['id']).indexOf(element['id']) === index;
            });
            dispatch(setCatalogItems(newArray));
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
        setOffset(offset + itemsToLoad);
      };

      const handleCategoryChange = (categoryID) => {
        setOffset(itemsToLoad);
        setSelectedCategory(categoryID);
        dispatch(setCatalogItems([]))
      };

console.log(catalogItems)
      return(
          <section className="catalog">
            <h2 className="text-center"><a name='top'>Каталог</a></h2>
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
             : catalogItems?.length === 0 ? <h3 className="text-center" style={{ marginTop: '100px' }}>Товары не найдены :( </h3> : <>
            <div className="row">
              {catalogItems?.map((item, index) => (
                 <div className="col-4" key={index}>
                 <div className="card catalog-item-card">
                   <img src={item.images[0]}
                     className="card-img-top img-fluid" alt={item.title}/>
                   <div className="card-body">
                     <p className="card-text">{item.title}</p>
                     <div className="card-bottom">
                        <p className="card-text">{item.price} руб.</p>
                        <Link to={`/catalog/${item.id}.html`} onClick={() => {dispatch(showItem(item.id)); dispatch(setActiveTab(''))}} className="btn btn-outline-primary">Заказать</Link>
                     </div>
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
            )}
            <p className="ancor"><a href="#top">Наверх</a></p>
          </div></>}
        </section>
    )
}

export default Catalog;