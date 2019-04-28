import React, { useState } from 'react';
import { getWithdrawInfo } from './api';

export const Withdraw = ({ Products }) => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [template, setTemplate] = useState({});
  const onSelectProduct = async event => {
    setSelectedProduct(event.target.value);
    const result = await getWithdrawInfo({ ProductId: event.target.value });
    console.log(result);
    setTemplate(result);
  };
  return (
    <>
      <h2>Withdrawal Info</h2>
      <select onChange={onSelectProduct}>
        <option value={0}>Select Product to Withraw</option>
        {Products.map(x => (
          <option key={x.ProductId} value={x.ProductId}>
            {x.Product}
          </option>
        ))}
      </select>
      <WithdrawForm params={template} />
    </>
  );
};

const WithdrawForm = ({ params }) => {
  const { TemplateType, ...template } = params;
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
      }}>
      {Object.keys(template).map(key => {
        return (
          <>
            <div>{key}: </div>
            <input name={key} value="" type="string" />
          </>
        );
      })}
      <button type="submit">Submit Withdrawal Ticket</button>
    </form>
  );
};
