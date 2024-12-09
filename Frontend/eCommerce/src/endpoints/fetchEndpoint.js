export default async function fetchEndpoint(url, type, token, params, needAuth) {
  console.log(`PETICION: URL: ${url}, tipo: ${type}, token: ${token}, params stringtify: ${JSON.stringify(params)}, needAuth: ${needAuth}`);
  
  const response = (token && needAuth) ?
    await defineFetch(url, type, token, params).catch((error) => error.status === 401).then(() => {throw "Unauthorized"}) :
    await defineFetch(url, type, token, params);

  const jsonResponse = await response.json();

  if (response.ok) return jsonResponse;
  
  throw jsonResponse.message;
};

/* ------------------------- */

async function defineFetch(url, type, token, params) {
  
  if(type !== 'GET' && params) return (
    await fetch(url, {
      method: type,
      headers: printHeaders(token),
      body: JSON.stringify(params)
  }));

  return await fetch(url, {headers: printHeaders(token)});
}

function printHeaders(token) {
  if(token  === null) return ({'Content-Type': 'application/json'});

  return ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }); 
}