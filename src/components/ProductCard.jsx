import React from "react";
import { Link } from "react-router-dom";
import { setActiveTab, showItem } from '../toolkit/toolkitSlice';
import { useDispatch } from "react-redux";

const ProductCard = ({item}) => {
    const dispatch = useDispatch();

    return (
        <div className="col-4">
            <div className="card catalog-item-card">
                <img 
                    src={item.images[0]}
                    className="card-img-top" 
                    alt={item.title}/>
                <div className="card-body">
                    <div className="card-bottom">
                        <p className="card-text">{item.title}</p>
                        <p className="card-text">{item.price} руб.</p>
                        <Link 
                            to={`/catalog/${item.id}.html`} 
                            onClick={() => {
                                dispatch(showItem(item.id)); 
                                dispatch(setActiveTab(''))
                            }} 
                            className="btn btn-outline-primary">
                            Заказать
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;