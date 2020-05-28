'use strict';

function getDashboard(request, response) {
  
  response.json('HOME');
}

module.exports = {
  getDashboard: getDashboard
}