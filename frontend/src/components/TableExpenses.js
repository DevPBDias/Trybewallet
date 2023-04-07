import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './TableExpenses.css';

class TableExpenses extends React.Component {
  state = {
    currencyBRL: 'Real',
    removeRowTable: 'X',
  }

  coinFunction = (expenses) => {
    // trasnformar o obj em array
    const coin = Object.entries(expenses.exchangeRates);
    const findingCoin = coin.find((coinInfo) => coinInfo[0] === expenses.currency);
    const returnFunc = Number(findingCoin[1].ask).toFixed(2);
    return returnFunc;
  }

  cambioFunction = (expenses) => {
    const cambio = Object.entries(expenses.exchangeRates);
    const findingCambio = cambio
      .find((cambioInfo) => cambioInfo[0] === expenses.currency);
    const returnFunc = findingCambio[1].name.split('/');
    return returnFunc;
  }

  valueConvertedFunction = (expenses) => {
    const value = Object.entries(expenses.exchangeRates);
    const findingValue = value.find((valueInfo) => valueInfo[0] === expenses.currency);
    const conversion = Number((findingValue[1].ask) * (expenses.value));
    const returnFunc = conversion.toFixed(2);
    return returnFunc;
  }

  render() {
    const { currencyBRL, removeRowTable } = this.state;
    const { expenses } = this.props;
    return (
      <table className="tableCurrency">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        {
          expenses.map((expensesInfo) => (
            <tbody key={ expensesInfo.id }>
              <tr>
                <td>{expensesInfo.description}</td>
                <td>{expensesInfo.tag}</td>
                <td>{expensesInfo.method}</td>
                <td>{Number(expensesInfo.value).toFixed(2)}</td>
                <td>{this.coinFunction(expensesInfo)}</td>
                <td>{this.cambioFunction(expensesInfo)}</td>
                <td>{this.valueConvertedFunction(expensesInfo)}</td>
                <td>{currencyBRL}</td>
                <td>{removeRowTable}</td>
              </tr>
            </tbody>
          ))
        }
      </table>);
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(TableExpenses);
