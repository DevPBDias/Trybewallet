import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/Wallet.css';
import { getCurrencyThunk } from '../actions';
import Form from '../components/Form';
import TableExpenses from '../components/TableExpenses';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencyProp } = this.props;
    getCurrencyProp();

  }

  render() {
    const { expenses } = this.props;
    const multiplierExpensesForCurrency = expenses
      .map((value) => ((value.value) * (value.exchangeRates[value.currency].ask)));
    const totalSum = multiplierExpensesForCurrency
      .reduce((acumulator, current) => acumulator + current, 0);
    
    const emailSaved = localStorage.getItem('emailUser')

    return (
      <section>
        <div className="header">
          <header
            className="email-header"
            data-testid="email-field"
          >
            {emailSaved}
          </header>
          <div className="money-header">
            <p
              className="expenses-header"
              data-testid="total-field"
            >
              { `R$ ${totalSum.toFixed(2)}` }
            </p>
          </div>
        </div>
        <Form />
        <TableExpenses />
      </section>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencyProp: (currency) => dispatch(getCurrencyThunk(currency)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getCurrencyProp: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
