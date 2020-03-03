import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUserAction } from '../actions/authenticationActions';

class RegisterPage extends Component {
  onHandleRegistration = (event) => {
    event.preventDefault();

    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      name, email, password
    };

    this.props.dispatch(registerUserAction(data));
  }

  componentDidMount() {
    document.title = 'Registro';
  }

  render() {
    let message, isSuccess;

    if (this.props.response.register.hasOwnProperty('response')) {
      isSuccess = this.props.response.register.response.success;
      message = this.props.response.register.response.message;
    }
    
    return (
      <div class="container-login100">
      <div class="wrap-login100">
        {!isSuccess ? <span class="login100-form-title p-b-34 p-t-27">{message}</span> : <Redirect to='login' />}
        <form class="login100-form validate-form" onSubmit={this.onHandleRegistration}>
          <span class="login100-form-logo">
            <i class="zmdi zmdi-landscape"></i>
          </span>
          <span class="login100-form-title p-b-34 p-t-27">Registro</span>
          <div class="wrap-input100 validate-input" data-validate="Usuario">
            <input class="input100" type="text" name="name" id="name" placeholder="Usuario" />
            <span class="focus-input100" data-placeholder="&#xf207;"></span>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Email">
            <input class="input100" type="email" name="email" id="email" placeholder="Email" />
            <span class="focus-input100" data-placeholder="&#xf2b6;"></span>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Contraseña">
            <input class="input100" type="password" name="password" id="password" placeholder="Contraseña"/>
            <span class="focus-input100" data-placeholder="&#xf191;"></span>
          </div>
          <div class="container-login100-form-btn">
            <button class="login100-form-btn">Enviar</button>
          </div>
        </form>
        Ya tienes una cuenta? <Link to='login'>Inicia sesión aquí</Link>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (response) => ({
  response
});

export default connect(mapStateToProps)(RegisterPage);
