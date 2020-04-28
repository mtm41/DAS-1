import React, { Component } from 'react';
import NavMenu from './navMenu';
import { getCookie } from '../utils/cookies';
var jwtDecode = require('jwt-decode');

class DashboardPage extends Component {
  
  componentDidMount() {
    document.title = "PANEL"
  }
  
  render() {
    return (
      <div>
        <NavMenu></NavMenu>
        <div>
          Panel de administración de identidad
        </div>
        <div class="tab-content py-4">
                <div class="tab-pane active" id="profile">
                    <h5 class="mb-3">User Profile</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <h6>About</h6>
                            <p>
                                <a class="profile-font">Nombre de usuario: </a>
                                {jwtDecode(getCookie('token')).username}  
                            </p>
                            <p>
                                <a class="profile-font">DID: </a>
                                {jwtDecode(getCookie('token')).DID}
                            </p>
                            <p>
                                <a class="profile-font">Ether: </a>
                                {jwtDecode(getCookie('token')).Ether}
                            </p>
                            <h6>Hobbies</h6>
                            <p>
                                Indie music, skiing and hiking. I love the great outdoors.
                            </p>
                        </div>
                    </div>
                </div>
        </div>  
      </div>
      
    );
  }
}

export default DashboardPage;
