import React from "react";
import { Link } from "react-router-dom";

const OrderInfo = ({ cart, totalPrice, deleteItem }) => {
  return (
    <table className="center">
      <thead>
        <tr>
          <td>№</td>
          <td>Название</td>
          <td>Размер</td>
          <td>Кол-во</td>
          <td>Цена</td>
          <td>Итого</td>
          <td>Действия</td>
        </tr>
      </thead>
      <tbody>
       {cart.map((item, index) => (
          <tr key={item.id}>
            <td scope="row">{index + 1}</td>
            <td>
              <Link to={`/products/${item.id}.html`}>{item.title}</Link>
            </td>
            <td>{item.size}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{item.price * item.quantity}</td>
            <td>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteItem(item.id)}
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
        {cart.length !== 0 && (
          <tr>
            <td colSpan="5" className="text-right">
              Общая стоимость
            </td>
            <td>{totalPrice}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrderInfo;
