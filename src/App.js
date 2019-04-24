import React, { useReducer, useEffect, useState } from 'react';

import GridLayout from 'react-grid-layout';

import { initialState, reducer } from './reducer';
import { init, getFromLS, saveToLS } from './api';

import { InstrumentSelector } from './InstrumentSelector';
import { Ticker } from './Ticker';
import { Login } from './Login';
import { OrderBook } from './OrderBook';
import { Trades } from './Trades';
import { Balances } from './Balances';
import { Orders } from './Orders';
import { OrderEntry } from './OrderEntry';
//import Graph from './Graph';
import logo from './logo.jpg';
import './Button.css';
import './App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Graph from './Graph';

const originalLayout = getFromLS('layout') || [
  { w: 5, h: 3, x: 0, y: 0, i: 'ticker', moved: false, static: false },
  {
    w: 1,
    h: 8,
    x: 0,
    y: 3,
    i: 'instrumentSelector',
    moved: false,
    static: false
  },
  { w: 2, h: 10, x: 10, y: 100, i: 'login', moved: false, static: false },
  { w: 2, h: 10, x: 10, y: 10, i: 'login', moved: false, static: false },
  { w: 2, h: 5, x: 3, y: 8, i: 'order_entry', moved: false, static: false },
  { w: 2, h: 14, x: 1, y: 3, i: 'balances', moved: false, static: false },
  { w: 3, h: 5, x: 3, y: 3, i: 'orders', moved: false, static: false },
  { w: 2, h: 29, x: 6, y: 0, i: 'orderbook', moved: false, static: false },
  { w: 2, h: 108, x: 8, y: 0, i: 'trades', moved: false, static: false }
];

const App = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [layout, setLayout] = useState(
    JSON.parse(JSON.stringify(originalLayout))
  );
  useEffect(() => {
    init(dispatch);
  }, []);
  const {
    loggedIn,
    Instruments,
    level1,
    buys,
    sells,
    User: { AccountId },
    Balances: balances,
    trades,
    orders,
    Products,
    selectedInstrument: { InstrumentId = 1 }
  } = state;

  return (

    <div>
      <img src={logo} />
      <button className="myButton">Login</button>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={window.innerWidth}
        onLayoutChange={layout => {
          saveToLS('layout', layout);
          setLayout(layout);
        }}>{/* 
        <div key="login">
        <Login {...{ loggedIn, dispatch }} />
      </div>
        */}

        <div key="ticker">
          <Ticker {...{ level1, InstrumentId, dispatch }} />
        </div>
        {/* When user clicks on a different instrument, the state is updated
            and components are rerendered; level1 should
            change to selected instrument DOM updates */}
        <div key="instrumentSelector">
          <InstrumentSelector {...{ Instruments, dispatch }} />
        </div>

        <div key="graph">
          <Graph />
        </div>

        <div key="order_entry">
          <OrderEntry AccountId={AccountId} InstrumentId={InstrumentId} />
        </div>
        <div key="balances">
          <Balances
            {...{ Products, balances, AccountId, loggedIn, dispatch }}
          />
        </div>
        <div key="orders">
          <Orders {...{ orders, AccountId, loggedIn, dispatch }} />
        </div>
        <div key="orderbook">
          <OrderBook {...{ buys, sells, InstrumentId, dispatch }} />
        </div>
        <div key="trades">
          <Trades {...{ trades, InstrumentId, dispatch }} />
        </div>
      </GridLayout>
    </div>
  );
};

export default App;
