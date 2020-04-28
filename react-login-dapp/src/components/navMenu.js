import React, { Component } from 'react';

class NavMenu extends Component {
  
  render() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">DAS</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/dashboard">Inicio <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/organization">Organización</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/interact">Interacción</a>
            </li>
          </ul>
          <ul class="navbar-nav navbar-right">
              <li class="nav-item active"><a class="nav-link" href="#">Salir</a></li>
          </ul>
        
        </div>
      </nav>
    );
  }
}

export default NavMenu;
