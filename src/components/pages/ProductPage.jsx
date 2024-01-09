import React, {useState, useEffect} from "react";
import Header from "../Header";
import Footer from '../Footer';

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { itemData } from "../../api/Requests";
import { setCartToolkit, setActiveTab } from '../../toolkit/toolkitSlice';
import Loader from "../Loader";


const ProductPage = () => {
    const [availableSizes, setSizes ] = useState([]);
    const [chosenSize, setChoise] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const id = useSelector(state => state.toolkit.id);
    const cart = useSelector(state => state.toolkit.cart)

    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const data = await itemData(id);
            setItem(data);
            filterSizes(data);
          } catch (error) {
            console.error('Произошла ошибка при загрузке данных:', error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchData();
    }, [id]);      


    const filterSizes = (data) => {
        const arr = data?.sizes;
        const sizes = arr?.filter((i) => i.available);
        setSizes(sizes);
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
        setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        if (quantity < 10) {
        setQuantity(quantity + 1);
        }
    };

    const putToStorage = (item) => {
        console.log(quantity)
        const data = {
            ...item, 
            quantity: quantity,
            size: chosenSize
        };

    if (cart) {
        let itemFound = false;
        const updatedCart = cart.map((cartItem) => {
          if (cartItem.id === data.id && cartItem.size === chosenSize) {
            itemFound = true;
            return {
              ...cartItem,
              quantity: cartItem.quantity + data.quantity,
            };
          }
          return cartItem;
        });
        if (!itemFound) {
            updatedCart.push(data);
        }

        dispatch(setCartToolkit(updatedCart))
    } else {
        dispatch(setCartToolkit([data]))
    }
  }
    return(<>
   <Header/>  
    <main className="container">
        <div className="row product_page">
            <div className="col">
                      {isLoading ? <Loader/> :
                <section className="catalog-item">
                    <h2 className="text-center">{item.title}</h2>
                    <div className="row">
                        <div className="col-5">
                            <img src={item?.images}
                                className="card-img-top" alt={item?.title}/>
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Артикул</td>
                                        <td>{item?.sku}</td>
                                    </tr>
                                    <tr>
                                        <td>Производитель</td>
                                        <td>{item?.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <td>Цвет</td>
                                        <td>{item?.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Материалы</td>
                                        <td>{item?.material}</td>
                                    </tr>
                                    <tr>
                                        <td>Сезон</td>
                                        <td>{item?.season}</td>
                                    </tr>
                                    <tr>
                                        <td>Повод</td>
                                        <td>{item?.reason}</td>
                                    </tr>
                                </tbody>
                            </table>
                                <div className="text-center">
                                    <p>Размеры в наличии: {availableSizes?.length ? availableSizes?.map((i, index) => (
                                    <span onClick={() => setChoise(i.size)} key={index} className={`catalog-item-size ${chosenSize === i.size ? "selected" : ""}`}>
                                    {i.size}
                                    </span>
                                    )) : null}</p>
                                    <p>Количество: {availableSizes?.length ? (
                                    <span className="controll-group">
                                    <button className="number-controller" onClick={decreaseQuantity}>-</button>
                                    <span className="product-number">{quantity}</span>
                                    <button className="number-controller" onClick={increaseQuantity}>+</button>
                                    </span>
                                    ) : null}</p>
                                </div>
                                {availableSizes?.length ? 
                                <Link to="/cart.html">
                                    <button 
                                        disabled={!chosenSize} 
                                        className="btn btn-danger btn-block btn-lg" 
                                        onClick={() => {
                                                putToStorage(item);
                                                dispatch(setActiveTab(''))
                                            }}>
                                        В корзину
                                    </button>
                                </Link>
                                : null}
                            </div>
                        </div>
                    </section>}
                </div>
            </div>
        </main>
        <Footer/>
    </>)
}

export default ProductPage;