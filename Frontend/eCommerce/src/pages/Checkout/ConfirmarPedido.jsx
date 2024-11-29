import React, { useState, useEffect } from 'react';
import * as jwt_decode from 'jwt-decode';
import { GET_ORDER_BY_ID } from "../../endpoints/config";
import '../../styles/Confirmacion.css';



function ConfirmarPedido() {
  const [datos, setDatos] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (token) {
          try {
              const decodedToken = jwt_decode.jwtDecode(token);
              console.log(decodedToken)
              setUser(decodedToken.unique_name);  
              setUserId(decodedToken.id);
              console.log("id: ", decodedToken.id);
          } catch (error) {
              console.error("Error al decodificar el token", error);
          }
      } else {
          console.error("Token no encontrado");
      }
  }, []);

  useEffect(() => {
      const fetchData = async () => {
          if (userId) {
              try {
                  const url = GET_ORDER_BY_ID(userId);
                  const response = await fetch(url, { 
                      method: 'GET', 
                      headers: { 'Content-Type': 'application/json' } 
                  });
                  const data = await response.json();
                  console.log("url", url);
                  console.log("respuesta api", data);
                  setDatos(data); 
              } catch (error) { 
                  alert("Hubo un error al cargar los productos.");
              }
          }
      };
      fetchData();
  }, [userId]);

    
    console.log("data", datos);
    console.log("userId", datos.userId);
    console.log("totalPrice", datos.totalPrice);
    console.log("totalProducts", datos.totalProducts);
    console.log("purchaseDate", datos.purchaseDate);
    

  return (
    <>
    {datos.totalProducts > 0 ? (
      <div className="order-confirmation">
        <h1>Confirmación de Pedido</h1>
        <div><strong>Usuario:</strong> {user}</div>
        <div><strong>Precio total:</strong> {datos.totalPrice}</div>
        <div><strong>Productos Totales:</strong> {datos.totalProducts}</div>
        <div><strong>Fecha de compra:</strong> {datos.purchaseDate}</div>
        <div><strong>Productos:</strong></div>
        <ul>
            <li>{datos.orderProducts}</li>
        </ul>
        <div>
            <strong>Dirección:</strong>
            {/* Dirección */}
        </div>
      </div>
    ) : (
      <div className='order-confirmation2'>No hay ningún pedido aún</div>
    )}
    </>
  ) 
  
}

export default ConfirmarPedido;