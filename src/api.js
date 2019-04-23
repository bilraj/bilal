import { useEffect, useReducer } from 'react';
import { APEX, Level2, Trade } from 'apex-api';
import { initialState, reducer } from './reducer';

var util = require('util')

const apex = new APEX('wss://api_demo.alphapoint.com/WSGateway/');


export const init = async dispatch => {
  console.log("Initializing session")
  const instruments = await apex.GetInstruments({ OMSId: 1 });
  dispatch({ type: 'SET_INSTRUMENTS', payload: instruments });
  const [instrument] = instruments;
  dispatch({ type: 'SET_SELECTED_INSTRUMENT', payload: instrument });
  const products = await apex.GetProducts({ OMSId: 1 });
  dispatch({ type: 'SET_PRODUCTS', payload: products });
  const SessionToken = localStorage.getItem('TestSessionToken');
  if (SessionToken) {
    login({ SessionToken }, dispatch);
  }
};

export const login = async (creds, dispatch) => {
  const { Authenticated, SessionToken } = await apex.WebAuthenticateUser(creds);
  if (Authenticated) {
    localStorage.setItem('TestSessionToken', SessionToken);
    const user = await apex.GetUserInfo();
    dispatch({ type: 'SET_USER', payload: user });
    dispatch({ type: 'SET_LOGGED_IN', payload: true });
  } else {
    localStorage.removeItem('TestSessionToken');
    dispatch({ type: 'SET_LOGGED_IN', payload: false });
  }
};

export const logout = dispatch => {
  dispatch({ type: 'SET_LOGGED_IN', payload: false });
  apex.LogOut();
};

/* Retrieves the latest Level 2 Ticker information and then subscribes the user to Level 2 market data event updates for one specific 
instrument. Level 2 allows the user to specify the level of market depth information on either side of the bid and ask. The 
SubscribeLevel2 call responds with the Level 2 response shown below. The OMS then periodically sends Level2UpdateEvent information 
in the same format as this response until you send the UnsubscribeLevel2 call.
 */
export const useSubscribeLevel2 = ({ Depth, InstrumentId }, dispatch) => {
  useEffect(() => {
    (async () => {
      // Clear buys and sells 
      dispatch({ type: 'CLEAR_ORDERBOOK' });

      const level2_response = await apex.SubscribeLevel2({
        Depth,
        InstrumentId,
        OMSId: 1
      });
      const data = level2_response.map(x => new Level2(x));
      data.forEach(x =>
        x.Side === 0
          ? dispatch({ type: 'ADD_BUY', payload: x })
          : dispatch({ type: 'ADD_SELL', payload: x })
      );
      apex.level2.subscribe(l2 => {
        l2.forEach(x =>
          x.Side === 0
            ? dispatch({ type: 'ADD_BUY', payload: x })
            : dispatch({ type: 'ADD_SELL', payload: x })
        );
      });
    })();
    return () => apex.UnsubscribeLevel2({ InstrumentId, OMSId: 1 });
  }, [InstrumentId]);
};

export const useSubscribeLevel1 = (InstrumentId, dispatch) => {
  useEffect(() => {

    console.log(util.inspect(apex));

   // console.log("Instrument changed to " + InstrumentId);
    (async () => {
      try {
        const level1 = await apex.SubscribeLevel1({
          OMSId: 1,
          InstrumentId
        });
 
        dispatch({ type: 'SET_LEVEL_1', payload: level1 });
        console.log("Set level 1")
        // Subscribe is invoked when action is dispatched; updates the state
        apex.level1.subscribe(update => {
          //console.log("Updating level 1 through listener")
          // Update the paylod for level1
          dispatch({ type: 'SET_LEVEL_1', payload: update });
        });
      } catch (e) {
        console.log(e);
      }
    })();
    return () => apex.UnSubscribeLevel1({ OMSId: 1, InstrumentId });
    // [InstrumentId] as second parameter tells it to run only when instrumentId has changed
  }, [InstrumentId]);
};

export const useTrades = (InstrumentId, tradesSub, dispatch) => {
  useEffect(() => {
    (async () => {
      if (!tradesSub) {
        try {
          dispatch({ type: 'SUBSCRIBED_TO_TRADES' });
          dispatch({ type: 'CLEAR_TRADES' });
          const trades_response = await apex.SubscribeTrades({
            InstrumentId,
            OMSId: 1,
            IncludeLastCount: 10
          });
          const trades = trades_response.map(x => new Trade(x));
          trades.forEach(trade =>
            dispatch({ type: 'ADD_TRADE', payload: trade })
          );
          apex.trades.subscribe(trade =>
            dispatch({ type: 'ADD_TRADE', payload: trade })
          );
        } catch (e) {
          console.log(e);
        }
      }
    })();
    return () => apex.UnSubscribeTrades({ InstrumentId, OMSId: 1 });
  }, [InstrumentId]);
};

export const useBalances = (AccountId, loggedIn, dispatch) => {
  useEffect(() => {
    (async () => {
      if (loggedIn) {
        // If user is logged in, get account balances 
        /* Retrieves a list of positions (balances) for a specific user account running under a specific Order Management System. 
           The trading day runs from UTC Midnight to UTC Midnight.
        */
        const positions_response = await apex.GetAccountPositions({
          OMSId: 1,
          AccountId
        });

        // Notify reducer to add balances
        dispatch({ type: 'ADD_BALANCES', payload: positions_response });

        /*Subscribes the user to notifications about the status of account-level events: orders, trades, position updates, 
        deposits, and withdrawals for a specific account on the Order Management System (OMS). The subscription reports all
         events associated with a given account; there is no filter at the call level to subscribe to some events and not others.
         */
        apex.SubscribeAccountEvents({
          AccountId,
          OMSId: 1
        });
        apex.ws
          .filter(x => x.n === 'AccountPositionEvent')
          .subscribe(response => {
            const update = JSON.parse(response.o);
            console.log("UPDATE: " + update)
            dispatch({ type: 'UPDATE_BALANCE', payload: update });
          });
      }
    })();
  }, [AccountId, loggedIn]);
};

export const useOrders = (AccountId, loggedIn, dispatch) => {
  useEffect(() => {
    (async () => {
      if (loggedIn) {
        /* Returns an array of 0 or more orders that have not yet been filled (open orders) for a single account on a 
           specific Order Management System. The call returns an empty array if an account has no open orders.
*/
        const orders_response = await apex.GetOpenOrders({
          OMSId: 1,
          AccountId
        });
        dispatch({ type: 'ADD_ORDERS', payload: orders_response });
        apex.SubscribeAccountEvents({
          AccountId,
          OMSId: 1
        });
        apex.ws
          .filter(x => x.n === 'OrderStateEvent')
          .subscribe(response => {
            const update = JSON.parse(response.o);
            dispatch({ type: 'UPDATE_ORDERS', payload: update });
          });
      }
    })();
  }, [AccountId, loggedIn]);
};

export const useAPEXReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};

export const sendOrder = async order => {
  console.log("Sending order")
  console.log(order);

/*Creates an order.
Anyone submitting an order should also subscribe to the various market data and event feeds, or call GeOpenOrders or GetOrderStatus 
to monitor the status of the order. If the order is not in a state to be executed, GetOpenOrders will not return it. */
  const result = await apex.SendOrder(order);
  console.log(result);
};

export const cancelOrder = async OrderId => {
  console.log(OrderId);
  const result = await apex.CancelOrder({ OMSId: 1, OrderId });
  console.log(result);
};

export const getDepositRequestInfoTemplate = async params => {
  console.log(params);
  try {
    const result = await apex.GetDepositRequestInfoTemplate({
      OMSId: 1,
      ...params
    });
    const {
      Template: { UseGetDepositWorkflow }
    } = result;
    if (UseGetDepositWorkflow) {
      console.log('CRYPTO');
      const result = await apex.GetDepositInfo({
        GenerateNewKey: true,
        OMSId: 1,
        ...params
      });
      const depositInfo = JSON.parse(result.DepositInfo).pop();
      console.log(depositInfo);
      return depositInfo;
    } else {
      console.log('FIAT');
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

/* 
{"OMSId":1,"OperatorId":1,"AccountId":83,"RequestUser":83,"AssetId":3,"Amount":1,"DepositInfo":"{\"ProductSymbol\":\"USD\",\"fullname\":\"Josh\",\"comments\":\"TEST\"}","Status":"New"}
*/
export const createDepositTicket = async params => {
  console.log(params);
  const {
    Amount,
    AssetId,
    ProductSymbol,
    fullname,
    comments,
    AccountId
  } = params;
  const request = {
    AccountId,
    OMSId: 1,
    OperatorId: 1,
    Amount: +Amount,
    AssetId: +AssetId,
    Status: 'New',
    DepositInfo: JSON.stringify({ ProductSymbol, fullname, comments })
  };
  console.log(request);
  const result = await apex.CreateDepositTicket(request);
  console.log(result);
};

export const getWithdrawTemplateTypes = params => {};

export const getWithdrawInfo = async ({ ProductId }) => {
  const result = await apex.GetWithdrawTemplateTypes({
    OMSId: 1,
    ProductId
  });
  console.log(result);
  const { TemplateTypes } = result;
  const [TemplateType] = TemplateTypes;
  console.log(TemplateType);
  const template = await apex.GetWithdrawTemplate({
    OMSId: 1,
    ProductId,
    TemplateType
  });
  const { Template } = template;
  return JSON.parse(Template);
};

/* 
{"OMSId":1,"AccountId":83,"ProductId":3,"Amount":1,"TemplateForm":"{ \"FullName\":\"Joshua Rossi\",\"BankAddress\":\"410 E 65th St, Apt 2F\",\"Language\":\"EN\",\"Comment\":\"TEST\",\"BankAccountNumber\":\"1\",\"BankAccountName\":\"b\",\"SwiftCode\":\"1\",\"Amount\":1}", "TemplateType": "Standard" }
*/

export const getFromLS = key => {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-7')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
};

export const saveToLS = (key, value) => {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-7',
      JSON.stringify({
        [key]: value
      })
    );
  }
};
