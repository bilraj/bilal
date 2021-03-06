import React, { useState } from 'react';
import { getDepositRequestInfoTemplate, createDepositTicket } from './api';

export const Deposit = ({ Products, AccountId }) => {
  const [address, setAddress] = useState('');
  const [product, setProduct] = useState(0);
  return (
    <>
      <h2>Deposit Info</h2>
      <select
        onChange={async event => {
          console.log(event.target.value);
          setProduct(event.target.value);
          const result = await getDepositRequestInfoTemplate({
            AccountId,
            ProductId: event.target.value
          });
          result ? setAddress(result) : setAddress(false);
        }}>
        <option value={0}>Select Product to Deposit</option>
        {Products.map(x => (
          <option key={x.ProductId} value={x.ProductId}>
            {x.Product}
          </option>
        ))}
      </select>
      {address ? (
        <div>Deposit Address: {address}</div>
      ) : (
        <DepositForm
          AccountId={AccountId}
          ProductSymbol={'USD'}
          AssetId={product}
        />
      )}
    </>
  );
};

const DepositForm = ({ AssetId, ProductSymbol, AccountId }) => {
  const [fullname, setFullName] = useState('');
  const [Amount, setAmount] = useState('');
  const [comments, setComments] = useState('');
  return (
    <form
      onSubmit={event => {
        createDepositTicket({
          AssetId,
          fullname,
          Amount,
          comments,
          ProductSymbol,
          AccountId
        });
        event.preventDefault();
      }}>
      Name:
      <input
        type="text"
        name="name"
        value={fullname}
        onChange={event => setFullName(event.target.value)}
      />
      <br />
      Amount:
      <input
        type="number"
        name="amount"
        value={Amount}
        onChange={event => setAmount(event.target.value)}
      />
      <br />
      Comments:
      <input
        type="text"
        name="comments"
        value={comments}
        onChange={event => setComments(event.target.value)}
      />
      <br />
      <button type="submit">Create Deposit Ticket</button>
    </form>
  );
};
