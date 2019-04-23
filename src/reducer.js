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
  //console.log("Using reducer")
  const { type, payload } = action;
  switch (type) {
    case 'SET_USER':
      //console.log("Setting user")
      return { ...state, User: payload };
    case 'SET_LOGGED_IN':
      //console.log("Setting logged_in")
      return { ...state, loggedIn: payload };
    case 'SET_INSTRUMENTS':
      //console.log("Setting instruments")
      return { ...state, Instruments: payload };
    case 'SET_PRODUCTS':
      //console.log("Setting products")
      return { ...state, Products: payload };
    case 'SET_SELECTED_INSTRUMENT':
      //console.log("Set selected instrument to " + payload)
      return { ...state, selectedInstrument: payload };
    case 'SET_LEVEL_1':
     // console.log("Setting level 1")
      return { ...state, level1: payload };
    case 'ADD_BUY':
      //console.log("Adding buy")
      const { Price, ActionType } = payload;
      const { buys } = state;
      if (ActionType === 2) {
        delete buys[Price];
      } else {
        buys[Price] = payload;
      }
      return { ...state, buys };
    case 'ADD_SELL': {
      //console.log("Addding sell")
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
      //console.log("Clearing orderbook")
      return { ...state, buys: {}, sells: {} };
    }
    case 'ADD_TRADE': {
      //console.log("Adding trade")
      const { trades } = state;
      const newTrades = [payload, ...trades];
      const myNewTrades = newTrades.slice(0, 10);
      return { ...state, trades: myNewTrades };
    }
    case 'CLEAR_TRADES': {
      //console.log("Clearing trade")
      return { ...state, trades: [] };
    }
    case 'ADD_BALANCES': {
      //console.log("Adding balances")
      return { ...state, Balances: payload };
    }
    case 'UPDATE_BALANCE': {
      //console.log("Updating balance")
      const { Balances } = state;
      const filteredBalances = Balances.filter(
        balance => !(balance.ProductId === payload.ProductId)
      );
      return { ...state, Balances: [payload, ...filteredBalances] };
    }
    case 'ADD_ORDERS': {
      //console.log("Adding orders")
      return { ...state, orders: payload };
    }
    case 'UPDATE_ORDERS': {
      //console.log("Updating orders")
      const { orders } = state;
      const filteredOrders = orders.filter(
        order => !(order.OrderId === payload.OrderId)
      );
      return { ...state, orders: [payload, ...filteredOrders] };
    }
    case 'SUBSCRIBED_TO_TRADES':
      //console.log("Subscribing to trades")
      const { meta } = state;
      meta.tradesSub = true;
      return { ...state, meta };
    default:
      return state;
  }
};
