import React from "react";
import { topSales } from "../api/Requests";
import { useDispatch, useSelector } from "react-redux";
import { setTopSales} from '../toolkit/toolkitSlice';
import Loader from "./Loader";
import ProductCard from "./ProductCard";

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
                 {topItems?.map((item, index) => <ProductCard key={index} item={item}/>)}
                </div> 
            : <Loader/>}
      </section>
    )
}

export default Hits;