export const interactService = (request) => {
    const INTERACT_API_ENDPOINT = 'http://localhost:3000/api/v1/interact';
    
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.contract)
    };
  
    return fetch(INTERACT_API_ENDPOINT, parameters)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      });
  };
  