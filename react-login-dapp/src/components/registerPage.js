import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUserAction } from '../actions/authenticationActions';
var xss = require("xss");
class RegisterPage extends Component {
  onHandleRegistration = (event) => {
    event.preventDefault();

    let username = xss(event.target.name.value);
    let email = xss(event.target.email.value);
    let password = xss(event.target.password.value);
    let phone = xss(event.target.phone.value);


    const data = {
      username, email, password, phone
    };

    this.props.dispatch(registerUserAction(data));
  }

  componentDidMount() {
    document.title = 'Registro';
  }

  generateSecurePassword(){
    var generator = require('generate-password');
 
    var password = generator.generate({
        length: 11,
        numbers: true,
        uppercase: true,
        lowercase: true,
        symbols: false,
        strict: true
    });
    
    var symbols = ['&', '*', '@', '$', '!', '%', '?']
    var nSymbols = Math.round(Math.random()*5)
    if (nSymbols === 0) { nSymbols++ }
    console.log(password)
    for (var i=0; i<nSymbols; i++) {
      var position = Math.round(Math.random()*password.length)
      var symbol = Math.floor(Math.random() * symbols.length);     
      password = password.substr(0, position+1) + symbols[symbol] + password.substr(position, password.length)
    }

    // 'uEyMTw32v9'
    console.log(password);
    document.querySelector("input[name=password]").value = password
    document.querySelector("input[name=password]").type = 'text'
    
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
            <i><a class="icon-title">DAS</a></i>
          </span>
          <span class="login100-form-title p-b-34 p-t-27">Registro</span>
          <div class="wrap-input100 validate-input" data-validate="Usuario">
            <input class="input100" type="text" name="name" id="name" placeholder="Usuario" />
            <span class="focus-input100" data-placeholder="&#xf207;"></span>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Phone">
            <input class="input100" type="tel" name="phone" id="phone" placeholder="Phone Number" />
            <span class="focus-input100" data-placeholder="&#xf2b6;"></span>
            
          </div>
          <div class="wrap-input100 validate-input" data-validate="Email">
            <input class="input100" type="email" name="email" id="email" placeholder="Email" />
            <span class="focus-input100" data-placeholder="&#128231;"></span>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Contraseña">
            <input class="input100" type="password" name="password" id="password" placeholder="Contraseña"
            minLength='8' pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="Please enter 8 characters at least, including minor and upper case, number and special character at least"/>
            <span class="focus-input100" data-placeholder="&#xf191;"></span>
          </div>
          <button class="btn-default" type='button' onClick={this.generateSecurePassword}>Generate password</button>
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
