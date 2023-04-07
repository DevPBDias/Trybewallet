import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const rootReducer = combineReducers({
  user,
  wallet,
});

export default rootReducer;

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

// {
//     {
//       "USD": {
//         "code":"USD",
//         "codein":"BRL",
//         "name":"Dólar Americano/Real Brasileiro",
//         "high":"5.6689",
//         "low":"5.6071",
//         "varBid":"-0.0166",
//         "pctChange":"-0.29",
//         "bid":"5.6173",
//         "ask":"5.6183",
//         "timestamp":"1601476370",
//         "create_date":"2020-09-30 11:32:53"
//         },
//        ...
//     }
//  }
