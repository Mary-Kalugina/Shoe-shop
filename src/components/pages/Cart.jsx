import Banner from "../Banner";
import React, {useEffect, useState} from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import postOrder from "../../api/Requests";
import Footer from "../Footer";
import { setCartToolkit } from '../../toolkit/toolkitSlice';

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [error, setError] = useState(false);
  // const [cart, setCart] = useState([]);
  const cart = useSelector(state => state.toolkit.cart);

  useEffect(() => {
    total();
  }, [cart])
// Галочка согласия обработки персональных данных

  const handleAgreementChange = (e) => {
    setAgreementChecked(e.target.checked);
  };

// Подсчет итого

  const total = () => {
    const total = cart.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
    setTotalPrice(total);
  }

// Удалить товар

  const deleteItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    dispatch(setCartToolkit(newCart))  
  } 

// Отправить заказ

  const sendOrder = () => {
    setIsLoading(true);

    const orderBody = {
      owner: {
        phone: phone,
        address: adress,
      },
      items: cart?.map((item) => ({
        id: Number(item.id),
        price: Number(item.price),
        count: Number(item.quantity),
      })),
    };
    // console.log(orderBody)

    postOrder(orderBody)
      .then(() => {
        dispatch(setCartToolkit([]))
        console.log(2)
        total();
        setIsLoading(false);
        setError(false)
        setOrderDone(true);
      })
      .catch(error => {
        console.error('Error while submitting order:', error);
        setIsLoading(false);
        setError(true)
      });
  };
  
    return(<>
    <Header/>
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner/>
          <h2 className="text-center">Корзина</h2>
          <section className="cart">
            <table className="table table-bordered">
              <tbody>
                {isLoading 
                ? (<tr>
                      <td colSpan="7">
                        <Loader/>
                      </td>
                    </tr>) 
                : orderDone
                ? (<h2 className="text-center">Заказ успешно оформлен!</h2>)
                : error ? (<h2 className="text-center">Ошибка, попробуйте снова</h2>)
                : cart.length === 0 ? (<h2 className="text-center">Корзина пуста</h2>)
                : (
                  cart.map((item, index) => (
                    <tr key={item.id}>
                      <td scope="row">{index + 1}</td>
                      <td>
                        <Link to={`/products/${item.id}.html`}>{item.title}</Link>
                      </td>
                      <td>{item.size} размер</td>
                      <td>{item.quantity} кол-во</td>
                      <td>{item.price}</td>
                      <td>{item.price * item.quantity} итого</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteItem(item.id)}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                <tr>
                <td colSpan="5" className="text-right">
                    Общая стоимость
                  </td>
                  <td>{totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </section>
          {cart.length !== 0 ? (<section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="order_card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
              <form className="order-body">
                <div className="form-group" onSubmit={(e) => {e.preventDefault(); sendOrder()}}>
                  <label htmlFor="phone">Телефон</label>
                  <input className="form-control" id="phone" placeholder="Ваш телефон" value={phone} onChange={(e) => setPhone(String(e.target.value))}/>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input className="form-control" id="address" placeholder="Адрес доставки" value={adress} onChange={(e) => setAdress(String(e.target.value))}/>
                </div>
                <div>
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreement"
                      onChange={handleAgreementChange}
                    />
                    <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                  </div>
                  <button type="submit" className="btn btn-outline-primary" disabled={!agreementChecked} onClick={sendOrder}>
                    Оформить
                  </button>
                </div>
              </form>
            </div>
          </section>
          ) : null}
        </div>
      </div>
    </main>
    <Footer /> 
  </>
)}

export default Cart;
