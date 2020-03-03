import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';

class LoginPage extends Component {
  onHandleLogin = (event) => {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      email, password
    };

    this.props.dispatch(loginUserAction(data));
  }

  componentDidMount() {
    document.title = 'Login';
  }

  render() {
    let isSuccess, message;

    if (this.props.response.login.hasOwnProperty('response')) {
      isSuccess = this.props.response.login.response.success;
      message = this.props.response.login.response.message;
      
      if (isSuccess) {
        setCookie('token', this.props.response.login.response.token, 1);
      }
    }

    return (
      <div class="container-login100">
      <div class="wrap-login100">
        {!isSuccess ? <div>{message}</div> : <Redirect to='dashboard' />}
        <form class="login100-form validate-form" onSubmit={this.onHandleLogin}>
          <span class="login100-form-logo">
            <i class="zmdi zmdi-landscape"></i>
          </span>
          <span class="login100-form-title p-b-34 p-t-27">Inicio de sesión</span>
          <div class="wrap-input100 validate-input" data-validate="Email">
            <input class="input100" type="email" name="email" id="email" placeholder="Email" />
            <span class="focus-input100" data-placeholder="&#xf207;"></span>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Contraseña">
            <input class="input100" type="password" name="password" id="password" placeholder="Contraseña"/>
            <span class="focus-input100" data-placeholder="&#xf191;"></span>
          </div>
          <div class="container-login100-form-btn">
            <button class="login100-form-btn">Enviar</button>
          </div>
        </form>
        Aún no tienes una cuenta? <Link to='register'>Registrate aquí</Link>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(LoginPage);