export default async function fetchEndpoint(Url, type, token, params) {
  try {
    const response = await fetch(Url, {
      method: type,
      headers: existToken(token),
      body: JSON.stringify(params)
    });

    if (response.ok) return await response.json();

    throw new error("Solicitud a la API fallida");

  } catch (error) {throw new error(error)};
};

/* ------------------------- */

function existToken(token) {
  if(token == null) return ({'Content-Type': 'application/json'});

  return ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  }); 
}