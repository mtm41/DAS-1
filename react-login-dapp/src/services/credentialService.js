import { getCookie } from '../utils/cookies';

export const credentialService = (request) => {
    const INTERACT_API_ENDPOINT = 'http://localhost:3000/api/v1/credential';
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('token')
      },
      body: JSON.stringify(request.username)
    };
  
    return fetch(INTERACT_API_ENDPOINT, parameters)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      });
  };
  