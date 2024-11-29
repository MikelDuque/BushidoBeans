export default async function fetchEndpoint(Url, type, token, params) {
  try {
    console.log(`URL: ${Url}, tipo: ${type}, token: ${token}, params: ${params}`);
    
    const response = await defineFetch(Url, type, token, params);

    if (response.ok) return await response.json();

    throw new Error("Solicitud a la API fallida");

  } catch (error) {throw new Error(error)};
};

/* ------------------------- */
/*
async function defineFetch(Url, type, token, params) {
  
  if(type !== 'GET' && params) return (
    await fetch(Url, {
    method: type,
    headers: existToken(token),
    body: params
  }));

  return await fetch(Url, {headers: existToken(token)});
}

function existToken(token) {
  if(token == null) return ({'Content-Type': 'application/json'});

  return ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  }); 
}*/