export const initialState = {
  User: {},
  Balances: [],
  loggedIn: false,
  Instruments: [],
  Products: [],
  selectedInstrument: {},
  level1: {},
  buys: {},
  sells: {},
  trades: [],
  orders: [],
  meta: {
    tradesSub: false,
    accountsSub: false,
    instrumentsLoaded: false,
    productsLoaded: false
  }
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_USER':
      return { ...state, User: payload };
    case 'SET_LOGGED_IN':
      return { ...state, loggedIn: payload };
    case 'SET_INSTRUMENTS':
      return { ...state, Instruments: payload };
    case 'SET_PRODUCTS':
      return { ...state, Products: payload };
    case 'SET_SELECTED_INSTRUMENT':
      return { ...state, selectedInstrument: payload };
    case 'SET_LEVEL_1':
      return { ...state, level1: payload };
    case 'ADD_BUY':
      const { Price, ActionType } = payload;
      const { buys } = state;
      if (ActionType === 2) {
        delete buys[Price];
      } else {
        buys[Price] = payload;
      }
      return { ...state, buys };
    case 'ADD_SELL': {
      const { Price, ActionType } = payload;
      const { sells } = state;
      if (ActionType === 2) {
        delete sells[Price];
      } else {
        sells[Price] = payload;
      }
      return { ...state, sells };
    }
    case 'CLEAR_ORDERBOOK': {
      return { ...state, buys: {}, sells: {} };
    }
    case 'ADD_TRADE': {
      const { trades } = state;
      const newTrades = [payload, ...trades];
      const myNewTrades = newTrades.slice(0, 10);
      return { ...state, trades: myNewTrades };
    }
    case 'CLEAR_TRADES': {
      return { ...state, trades: [] };
    }
    case 'ADD_BALANCES': {
      return { ...state, Balances: payload };
    }
    case 'UPDATE_BALANCE': {
      const { Balances } = state;
      const filteredBalances = Balances.filter(
        balance => !(balance.ProductId === payload.ProductId)
      );
      return { ...state, Balances: [payload, ...filteredBalances] };
    }
    case 'ADD_ORDERS': {
      return { ...state, orders: payload };
    }
    case 'UPDATE_ORDERS': {
      const { orders } = state;
      const filteredOrders = orders.filter(
        order => !(order.OrderId === payload.OrderId)
      );
      return { ...state, orders: [payload, ...filteredOrders] };
    }
    case 'SUBSCRIBED_TO_TRADES':
      const { meta } = state;
      meta.tradesSub = true;
      return { ...state, meta };
    default:
      return state;
  }
};
