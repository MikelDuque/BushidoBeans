export default async function fetchEndpoint(url, type, token, params) {
  try {
    console.log(`PETICION: URL: ${url}, tipo: ${type}, token: ${token}, params: ${params}`);
    
    const response = await defineFetch(url, type, token, params);

    if (response.ok) return await response.json();

    throw new Error("Solicitud a la API fallida");

  } catch (error) {throw new Error(error)};
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