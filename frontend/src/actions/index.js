export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCY = 'ADD_CURRENCY';
export const GET_API_FAIL = 'GET_API_FAIL';
export const GET_API_SUCESS = 'GET_API_SUCESS';

const CURRENCY_API = 'https://economia.awesomeapi.com.br/json/all';

export const emailAction = (email) => ({
  type: ADD_EMAIL,
  payload: email,
});

export const expenseAction = (oldExpsense, newExpense) => ({
  type: ADD_EXPENSE,
  payload: [...oldExpsense, newExpense],
});

export const currencyAction = (currency) => ({
  type: ADD_CURRENCY,
  payload: currency,
});

export const getApiSucess = () => ({
  type: GET_API_SUCESS,
});

export const getApiFail = () => ({
  type: GET_API_FAIL,
});

export const getCurrencyThunk = () => {
  console.log('Redux Thunk');
  return async (dispatch) => {
    dispatch(getApiSucess());
    try {
      const response = await fetch(CURRENCY_API);
      const currency = await response.json();

      const currencyWithoutUSDT = Object.keys(currency);
      const currencyUSDT = currencyWithoutUSDT.splice(1, 1);
      console.log(currencyUSDT);

      dispatch(currencyAction(currencyWithoutUSDT));
    } catch (error) {
      dispatch(getApiFail());
    }
  };
};
