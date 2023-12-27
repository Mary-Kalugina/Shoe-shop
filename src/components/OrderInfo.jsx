import React from "react";
import { Link } from "react-router-dom";

const OrderInfo = ({ cart, totalPrice, deleteItem }) => {
  return (
    <table>
      <tbody>
       {cart.map((item, index) => (
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
