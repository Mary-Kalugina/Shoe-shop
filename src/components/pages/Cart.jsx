import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import { setCartToolkit } from "../../toolkit/toolkitSlice";
import OrderForm from "../OrderForm";
import OrderInfo from "../OrderInfo";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [error, setError] = useState(false);
  const cart = useSelector((state) => state.toolkit.cart);

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    const total = cart.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const deleteItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    dispatch(setCartToolkit(newCart));
  };

  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <h2 className="text-center">Корзина</h2>
            {isLoading ? (
              <Loader />
            ) : orderDone ? (
              <div className="text-center">
                <h2>Заказ успешно оформлен!</h2>
              </div>
            ) : error ? (
              <div className="text-center">
                <h2>Ошибка, попробуйте снова</h2>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center">
                <h2>Корзина пуста</h2>
              </div>
            ) : (
              <OrderInfo cart={cart} totalPrice={totalPrice} deleteItem={deleteItem} />
            )}
            {cart.length !== 0 && (
              <OrderForm
                cart={cart}
                total={total}
                setIsLoading={setIsLoading}
                setError={setError}
                setOrderDone={setOrderDone}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
