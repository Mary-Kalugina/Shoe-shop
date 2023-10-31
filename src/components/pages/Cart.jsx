import Banner from "../Banner";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import Header from "../Header";
import postOrder from "../../api/Requests";
import Footer from "../Footer";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  // const dispatch = useDispatch();
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [error, setError] = useState(false);

  const [cart, setCart] = useState([]);

  const handleAgreementChange = (e) => {
    setAgreementChecked(e.target.checked);
  };

  useEffect(() => {
    updateCart();
  }, []);

  const updateCart = () => {
    setIsLoading(true);
    const cartData = JSON.parse(localStorage.getItem('cart'));
    setCart(cartData || []);   
    total();
    setIsLoading(false);
  }

  const total = () => {
    const total = cart.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
    setTotalPrice(total);
  }

  const deleteItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
    total();
  } 

  const sendOrder = () => {
    setIsLoading(true);

    const orderBody = {
      owner: {
        phone: phone,
        address: adress,
      },
      items: cart?.map((item) => ({
        id: item.id,
        price: item.price,
        count: item.quantity,
      })),
    };
    // console.log(orderBody)

    postOrder(orderBody)
      .then(() => {
        localStorage.removeItem('cart');
        setCart([]);
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
  
  // console.log(cart)
    return(<>
    <Header/>
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner/>
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Название</th>
      <th scope="col">Размер</th>
      <th scope="col">Кол-во</th>
      <th scope="col">Стоимость</th>
      <th scope="col">Итого</th>
      <th scope="col">Действия</th>
    </tr>
  </thead>
  <tbody>
    {isLoading ? (
      <tr>
        <td colSpan="7">
          <div className="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </td>
      </tr>
    ) : orderDone ? (
      <tr>
        <td colSpan="7">
          <h2 className="text-center">Заказ успешно оформлен!</h2>
        </td>
      </tr>
    ) : error ? (
      <tr>
        <td colSpan="7">
          <h2 className="text-center">Ошибка, попробуйте снова</h2>
        </td>
      </tr>
    ) : (
      cart?.map((item, index) => (
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
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
              <form className="card-body">
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input className="form-control" id="phone" placeholder="Ваш телефон" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input className="form-control" id="address" placeholder="Адрес доставки" value={adress} onChange={(e) => setAdress(e.target.value)}/>
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
                  <button type="submit" className="btn btn-outline-secondary" disabled={!agreementChecked} onClick={sendOrder}>
                    Оформить
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer /> 
  </>
)}

export default Cart;
