import React, { Component } from 'react';
import NavMenu from './navMenu';
import { interactAction } from '../actions/interactAction';
import { connect } from 'react-redux';
import { getCookie } from '../utils/cookies';
var jwtDecode = require('jwt-decode');

const xss = require("xss");


class InteractPage extends Component {

  onHandlePreInteraction = (event) => {
    console.log('Pre-interaction')

    fetch('http://localhost:3000/api/v1/preinteract?token=' + getCookie('token'), {method: 'POST', credentials: 'same-origin'})
    .then(function(resp) {
      if (!resp.ok)
        throw Error(resp.statusText);
      return resp.json();
    })
    .then(data => {
      if(!data.hasOwnProperty('error')){
        var button = document.getElementById("form-button");
        var buttonI = document.getElementById("preInteractButton")
        var smsFieldList = document.getElementById("sms")
        var scFieldList = document.getElementById("smartcontract")
          if (!data.hasOwnProperty('state')){
            alert('El sms ha sido enviado, comprueba tu teléfono.')
            scFieldList.disabled = true;
            scFieldList.hidden = true;
            smsFieldList.disabled = false;
            smsFieldList.hidden = false;
            buttonI.disabled = true;
            buttonI.hidden = true;
            button.disabled = false;
            button.hidden = false;
          } else
            smsFieldList.disabled = false
            var smsInput = document.querySelector('#sms-code')
            console.log(data.code)
            smsInput.value = data.code;
            console.log(smsFieldList.textContent)
            button.disabled = false;
            button.hidden = false
            button.click()
            button.disabled = true;
            button.hidden = true;
      } else
          alert('Error: ' + data.error.message)
    })
    .catch(function(error) {
      console.log('Error: \n', error)
    });

  }
  
  onHandleInteraction = (event) => {
    event.preventDefault();

    console.log('ENTRA')
    let smartContract = xss(event.target.ethaddr.value);
    let sms = xss(event.target.smscode.value);
    console.log(smartContract);
    console.log(sms)
    var token = getCookie('token')

    const data = {
      smartContract, token, sms
    };

    this.props.dispatch(interactAction(data));
  }

  componentDidMount() {
    document.title = "Interactuar"
  }
  
  render() {
    return (
      <div>
        <NavMenu></NavMenu>
        <div>
          Interactuar con un Smart Contract externo
        </div>
        <form class="interact-form" onSubmit={this.onHandleInteraction}>
            <div class="col-md-6">
                <div class="form-group">
                  <fieldset id="smartcontract">
                    <label for="ethaddr">Smart Contract Address!!</label>
                    <input class="form-control" name="ethaddr" id="ethaddr" placeholder="Smart Contract address" />
                  </fieldset>
                    <fieldset id="sms" hidden disabled>
                      <label for="smscode">Código SMS</label>
                      <input class="form-control" name="smscode" id="sms-code" placeholder="SMS CODE" />
                    </fieldset>
                </div>
            </div>
            <div class="container-login100-form-btn">
              <button id="form-button" class="login100-form-btn" disabled hidden>Enviar</button>
            </div>
        </form>
        <div class="container-login100-form-btn">
          <button id="preInteractButton" class="login100-form-btn" onClick={this.onHandlePreInteraction}>Enviar</button>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(InteractPage);
