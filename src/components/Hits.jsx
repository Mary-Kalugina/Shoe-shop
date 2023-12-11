import React from "react";
import { topSales } from "../api/Requests";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTopSales, showItem, setActiveTab } from '../toolkit/toolkitSlice';
import Loader from "./pages/Loader";

const Hits = () => {
    const topItems = useSelector(state => state.toolkit.topSales);
    const dispatch = useDispatch();

    if(topItems.length === 0) {
        async function fetchData() {
            try {
                const data = await topSales();
                dispatch(setTopSales(data));
            } catch (error) {
                console.error('Произошла ошибка:', error);
            }
        }
        fetchData();
    }

    return(
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
             {topItems?.length > 0 ?  
                <div className="row">
                 {topItems?.map((item) => (<div className="col-1" key={item.id}>
                        <div className="card">
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
                    </div>))}
                </div> 
            : <Loader/>}
      </section>
    )
}

export default Hits;