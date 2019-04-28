import React from 'react';
import { useOrders, cancelOrder } from './api';

export const Orders = ({ orders, AccountId, loggedIn, dispatch }) => {
  useOrders(AccountId, loggedIn, dispatch);
  return (
    <>
      <h1>Orders</h1>
      <table>
        <tbody>
          <tr>
            <th>Instrument</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Cancel</th>
          </tr>
        </tbody>
        <tbody>
          {orders.map(
            ({ Quantity, Price, OrderState, Instrument, OrderId }) => (
              <tr key={OrderId}>
                <td>{Instrument}</td>
                <td>{Price}</td>
                <td>{Quantity}</td>
                <td>{OrderState}</td>
                <td>
                  <button onClick={() => cancelOrder(OrderId)}>X</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};
