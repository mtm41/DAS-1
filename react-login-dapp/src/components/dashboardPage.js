import React, { Component } from 'react';

class DashboardPage extends Component {
  
  componentDidMount() {
    document.title = "PANEL"
  }
  
  render() {
    return (
      <div>
        Panel de administración de identidad
      </div>
    );
  }
}

export default DashboardPage;
