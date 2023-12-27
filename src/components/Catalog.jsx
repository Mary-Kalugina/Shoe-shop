import React, { useState, useEffect, useCallback } from "react";
import { items, categoryItems, categories } from "../api/Requests";
import { useDispatch, useSelector } from "react-redux";
import { setCategoriesArr } from '../toolkit/toolkitSlice';
import { setCatalogItems } from '../toolkit/catalogSlice';
import Search from "./Search";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import CatalogNavigation from "./CatalogNavigation";

const Catalog = ({ form }) => {
  // Инициализация переменных состояния
  let renderItemsNumber = 0;
  const [selectedCategory, setSelectedCategory] = useState("11");
  const [offset, setOffset] = useState(renderItemsNumber);
  const [isLoading, setIsLoading] = useState(false);
  const [moreItems, setmoreItems] = useState(true);

  // Получение данных из Redux
  const catalogItems = useSelector(state => state.catalog.items);
  const categoriesArr = useSelector(state => state.toolkit.categories);
  const dispatch = useDispatch();
  let itemsToLoad = 6;

  const all_id = '11';

  // Загрузка категорий и товаров при монтировании компонента
  useEffect(() => {
    if (categoriesArr.length === 0) {
      loadCategories();
    }

    loadCatalogItems();

    // Очистка данных при размонтировании компонента
    return () => {
      dispatch(setCatalogItems([]));
    }
  }, [selectedCategory, offset]);

  // Загрузка списка категорий
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

  // Загрузка товаров
  const loadCatalogItems = useCallback(() => {
    setIsLoading(true);
    let fetchDataPromise;

    if (selectedCategory === all_id) {
      fetchDataPromise = items(offset);
    } else if (selectedCategory === 15 || selectedCategory === 12) {
      itemsToLoad = 4;
      fetchDataPromise = categoryItems(selectedCategory, 4);
    } else {
      fetchDataPromise = categoryItems(selectedCategory, offset);
    }

    fetchDataPromise
      .then(data => {
        setmoreItems(!!data.length && data.length % itemsToLoad === 0);
        const items = [...catalogItems, ...data];
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
  });

  // Повторная загрузка товаров в случае ошибки
  const retryLoadCatalogItems = useCallback(() => {
    loadCatalogItems();
  }, [loadCatalogItems]);


  // Загрузка следующей порции товаров
  const handleLoadMore = useCallback(() => {
    setOffset((prevOffset) => prevOffset + itemsToLoad);
  }, [itemsToLoad]);

  // Обработчик изменения категории
  const handleCategoryChange = useCallback((categoryID) => {
    setOffset(itemsToLoad);
    setSelectedCategory(categoryID);
    dispatch(setCatalogItems([]))
  }, [itemsToLoad, dispatch]);  

  return (
    <section className="catalog">
      <h2 className="text-center"><a name='top'>Каталог</a></h2>
      <CatalogNavigation
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        all_id={all_id}
        categoriesArr={categoriesArr}
      />
      {form && <Search />}
      {isLoading ? <Loader />
        : catalogItems?.length === 0 ? <h3 className="text-center" style={{ marginTop: '100px' }}>Товары не найдены...</h3> : <>
          <div className="row">
            {catalogItems?.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
          <div className="text-center">
            {moreItems && (
              <div className="text-center">
                <button className="btn btn-outline-primary" onClick={() => handleLoadMore()}>
                  Загрузить ещё
                </button>
              </div>
            )}
            <p className="ancor"><a href="#top">Наверх</a></p>
          </div>
        </>}
    </section>
  )
}

export default Catalog;
