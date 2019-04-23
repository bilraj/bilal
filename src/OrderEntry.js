import React, { useState } from 'react';
import { sendOrder } from './api';

/** Good Order
 *
 * o: "{"InstrumentId":1,"OMSId":1,"AccountId":461,"TimeInForce":1,"ClientOrderId":0,"OrderIdOCO":0,"TimeInOrder":0,"UseDisplayQuantity":false,"Side":0,"Quantity":1,"OrderType":2,"PegPriceType":"3","LimitPrice":1}"
 */
export const OrderEntry = props => {
  //console.log("Updating order entry")
  // Set initial limit price, quantity and side for order
  const [LimitPrice, setPrice] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Side, setSide] = useState(0);
  const { InstrumentId, AccountId } = props;
  return (
    // <> is Fragment syntax; Used to return array of elements without needing div tag 
    <>
      <h1>Order Entry</h1>
      <form
        onSubmit={event => {
          // Don't take default action if event not handled explicitly
          event.preventDefault();
          // Send js object containing price and quantity to api
          sendOrder({
            OMSId: 1,
            TimeInForce: 1,
            InstrumentId,
            OrderType: 2,
            LimitPrice,
            Quantity,
            Side,
            AccountId
          });
          setPrice('');
          setQuantity('');
        }}>
        <select onChange={event => setSide(event.target.value)}>
          <option value={0}>Buy</option>
          <option value={1}>Sell</option>
        </select>
        <br />
        Quantity:
        <input
          type="number"
          name="quantity"
          label="quantity"
          value={Quantity}
          onChange={event => setQuantity(event.target.value)}
        />
        <br />
        Price:
        <input
          type="number"
          name="price"
          label="price"
          value={LimitPrice}
          onChange={event => setPrice(event.target.value)}
        />
        <br />
        <button type="submit">Send Order</button>
      </form>
    </>
  );
};
