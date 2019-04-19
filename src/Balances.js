import React, { useState } from 'react';
import { useBalances } from './api';
import { Deposit } from './Deposit';
import { Withdraw } from './Withdraw';

export const Balances = ({
  balances,
  AccountId,
  loggedIn,
  Products,
  dispatch
}) => {
  useBalances(AccountId, loggedIn, dispatch);
  const [deposit, setDeposit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  return (
    <>
      <h1>Balances</h1>
      <button
        onClick={() => {
          setDeposit(!deposit);
        }}>
        Deposit
      </button>
      <button
        onClick={() => {
          setWithdraw(!withdraw);
        }}>
        Withdraw
      </button>
      <table>
        <tbody>
          <tr>
            <th>Product</th>
            <th>Balance</th>
            <th />
          </tr>
        </tbody>
        <tbody>
          {balances.map(({ ProductId, ProductSymbol, Amount }) => (
            <tr key={`${ProductId}-${ProductSymbol}`}>
              <td>{ProductSymbol}</td>
              <td>{Amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {deposit && <Deposit AccountId={AccountId} Products={Products} />}
      {withdraw && <Withdraw Products={Products} />}
    </>
  );
};
