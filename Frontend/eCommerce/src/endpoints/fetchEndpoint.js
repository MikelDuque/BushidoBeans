export default async function fetchEndpoint(Url, type, token, params) {
  try {
    console.log(`PETICION: URL: ${Url}, tipo: ${type}, token: ${token}, params: ${params}`);
    
    const response = defineFetch(Url, type, token, params); //¿Aquí debo poner un Await?

    if (response.ok) return await response.json();

    throw new Error("Solicitud a la API fallida");

  } catch (error) {throw new Error(error)};
};

/* ------------------------- */

async function defineFetch(Url, type, token, params) {
  
  if(type !== 'GET' && params) return (
    await fetch(Url, {
      method: type,
      headers: printHeaders(token),
      body: JSON.stringify(params)
  }));

  return await fetch(Url, {headers: printHeaders(token)});
}

function printHeaders(token) {
  if(token  === null) return ({'Content-Type': 'application/json'});

  return ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }); 
}