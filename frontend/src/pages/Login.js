import React from 'react';
import '../css/Login.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { emailAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
  }

  correctEmailAndPassword = () => {
    const { email, password } = this.state;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const checkingEmail = emailRegex.test(email);

    const mininmumCaracteres = 6;
    const passwordLength = password.length >= mininmumCaracteres;

    const condicao = [checkingEmail, passwordLength];
    const verifyTrue = condicao.every((elemento) => elemento === true);
    this.setState({ buttonDisabled: !verifyTrue });
  }

  handleChangeEmail = ({ target }) => {
    this.setState({ email: target.value }, this.correctEmailAndPassword);
  }

  handleChangePassword = ({ target }) => {
    this.setState({ password: target.value }, this.correctEmailAndPassword);
  }

  handleClickBtn = () => {
    const { email } = this.state;
    const { addEmail } = this.props;
    addEmail(email);
    localStorage.setItem('emailUser', email)
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div className="form-login">
        <h1 className='appName'>Bem vindo ao Trybewallet!</h1>
        <h3 className='titleMsg'>Efetue o login para fazer as suas cotações</h3>
        <label className='nameEmail' htmlFor="login-input">
          Email
          <input
            onChange={ this.handleChangeEmail }
            className="input-email"
            id="login-input"
            type="text"
            data-testid="email-input"
          />
        </label>
        <label className='nameEmail' htmlFor="login-password">
          Senha
          <input
            onChange={ this.handleChangePassword }
            className="input-password"
            id="login-password"
            type="password"
            data-testid="password-input"
          />
        </label>
        <Link
          to="/carteira"
        >
          <button
            className="button"
            onClick={ this.handleClickBtn }
            type="button"
            disabled={ buttonDisabled }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => dispatch(emailAction(email)),
});

Login.propTypes = {
  addEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
