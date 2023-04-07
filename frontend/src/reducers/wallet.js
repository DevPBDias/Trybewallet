// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  ADD_CURRENCY,
  GET_API_SUCESS,
  GET_API_FAIL,
} from '../actions';

const INITIAL_USER_STATE = {
  currencies: [],
  expenses: [],
  error: '',
};

const wallet = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case ADD_CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_API_SUCESS:
    return {
      ...state,
      error: '',
    };
  case GET_API_FAIL:
    return {
      ...state,
      error: 'Api não encontrada',
    };
  default:
    return state;
  }
};

export default wallet;
