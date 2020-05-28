import React, { Component } from 'react';
import NavMenu from './navMenu';
import { credentialAction } from '../actions/credentialAction';
import { connect } from 'react-redux';
import { getCookie } from '../utils/cookies';
var jwtDecode = require('jwt-decode');

const xss = require("xss");


class OrganizationPage extends Component {

  
  onHandleInteraction = (event) => {
    event.preventDefault();

    let username = xss(event.target.username.value);
    
    const data = {
      username
    };

    this.props.dispatch(credentialAction(data));
  }

  componentDidMount() {
    document.title = "Organización"
    
    fetch('http://localhost:3000/api/v1/organization', {method: 'GET', headers: { Authorization: getCookie('token'), credentials: 'same-origin'} })
    .then(function(resp) {
      if (!resp.ok)
        throw Error(resp.statusText);
      return resp.json();
    })
    .then(data => {
      if(data.hasOwnProperty('error')){
          alert('Error: Se ha producido un error tratando de recuperar la información.')
      } 
      else {
        var organizationName = document.querySelector('#orgName')
        var organizationDID = document.querySelector('#orgDID')
        var organizationCIF = document.querySelector('#orgCIF')
        var organizationCredential = document.querySelector('#orgCred')
        for (var i=0; i<data.Organizations.length; i++){
            organizationName.textContent += data.Organizations[i].name
            organizationDID.textContent += data.Organizations[i].DID
            organizationCIF.textContent += data.Organizations[i].cif
            for (var j=0; j<data.Organizations[i].credential.length; j++) // In this implementation we only want to show one credential
                organizationCredential.textContent += data.Organizations[i].credential[j].name
        }
      }
    });
  }
  
  render() {
    return (
      <div>
        <NavMenu></NavMenu>
        <div>
          Datos de la organización
        </div>
        <form class="interact-form" onSubmit={this.onHandleInteraction}>
            <div class="col-md-6">
            <h6>Información de la organización</h6>
                <p>
                    <a class="profile-font" id='orgName' >Nombre: </a>  
                </p>
                <p>
                    <a class="profile-font" id='orgDID' >DID: </a>
                </p>
                <p>
                    <a class="profile-font" id='orgCIF' >CIF: </a>
                </p>
                <p>
                    <a class="profile-font" id='orgCred' >Credenciales: </a>
                </p>
                <div class="form-group">
                  <label for="username">Emitir credencial a usuario: </label> 
                  <input class="form-control" name="username" placeholder="Username" />
                </div>
            </div>
            <div class="container-login100-form-btn">
              <button id="form-button" class="login100-form-btn" >Enviar</button>
            </div>
        </form>
      </div>
      
    );
  }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(OrganizationPage);
