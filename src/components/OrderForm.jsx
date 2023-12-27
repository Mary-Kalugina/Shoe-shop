import React, {useState} from "react";
import postOrder from "../api/Requests";
import { setCartToolkit } from '../toolkit/toolkitSlice';
import { useDispatch } from "react-redux";

const OrderForm = ({ cart, total, setIsLoading, setError, setOrderDone }) => {
    const [agreementChecked, setAgreementChecked] = useState(false);
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const dispatch = useDispatch();

    // Галочка согласия обработки персональных данных
    const handleAgreementChange = (e) => {
        setAgreementChecked(e.target.checked);
    };

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

        postOrder(orderBody)
        .then(() => {
            dispatch(setCartToolkit([]))
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

    return (
        <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div 
                className="order_card" 
                style={{ maxWidth: '30rem', margin: '0 auto' }}>
            <form className="order-body">
                <div 
                    className="form-group"
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendOrder()
                    }}>
                <label htmlFor="phone">Телефон</label>
                <input 
                    className="form-control" 
                    id="phone" 
                    placeholder="Ваш телефон" 
                    value={phone} 
                    onChange={(e) => setPhone(String(e.target.value))}/>
                </div>
                <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input 
                    className="form-control" 
                    id="address" 
                    placeholder="Адрес доставки" 
                    value={adress} 
                    onChange={(e) => setAdress(String(e.target.value))}/>
                </div>
                <div>
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreement"
                        onChange={handleAgreementChange}/>
                    <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button 
                    type="submit" 
                    className="btn btn-outline-primary" 
                    disabled={!agreementChecked} 
                    onClick={(e) => {
                        e.preventDefault();
                        sendOrder()
                    }}>
                    Оформить
                </button>
                </div>
            </form>
            </div>
        </section>
    )    
}

export default OrderForm;