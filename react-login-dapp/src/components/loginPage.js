import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';
const xss = require("xss");

class LoginPage extends Component {
  onHandleLogin = (event) => {
    event.preventDefault();

    let email = xss(event.target.email.value);
    let password = xss(event.target.password.value);

    const data = {
      email, password
    };

    this.props.dispatch(loginUserAction(data));
  }

  
  componentDidMount() {
    document.title = 'Login';
    var ele = document.querySelector("input[name=password]");
     attachHandler(ele, "invalid", function () {
        this.setCustomValidity("Please enter at least 5 characters.");
        this.setCustomValidity("");
    });

    function attachHandler(el, evtname, fn) {
      if (el.addEventListener) {
          el.addEventListener(evtname, fn.bind(el), false);
      } else if (el.attachEvent) {
          el.attachEvent('on' + evtname, fn.bind(el));
      }
    }
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
          <i><a class="icon-title">DAS</a></i>
          </span>
          <span class="login100-form-title p-b-34 p-t-27">Inicio de sesión</span>
          <div class="wrap-input100 validate-input" data-validate="Email">
            <input class="input100" type="email" name="email" id="email" placeholder="Email" />
            <span class="focus-input100" data-placeholder="&#xf207;"></span>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Contraseña">
            <input class="input100" type="password" name="password" id="password" placeholder="Contraseña"
            minLength='8' pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" 
            title="Please enter 8 characters at least, including minor and upper case, number and special character at least"/>
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