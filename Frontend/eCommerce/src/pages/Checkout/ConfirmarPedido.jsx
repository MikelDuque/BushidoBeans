import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React, { useState, useEffect } from 'react';
import * as jwt_decode from 'jwt-decode';
import { CardConfirmacion } from "../../components/CardConfirmacion";
import { GET_ORDER_BY_ID } from "../../endpoints/config";




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
                setUser (decodedToken.unique_name);  
                setUserId (decodedToken.id);
                
                console.log("id: ",decodedToken.id);
            } catch (error) {
                console.error("Error al decodificar el token", error);
            }
        } else {
            console.error("Error al decodificar el token");
        }
    }, [userId]); 


    useEffect(() => { const fetchData = async () => {
      try {
         const url = GET_ORDER_BY_ID(userId); 
         const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } }); 
         const data = await response.json(); 
         console.log("respuesta api", data);
         
         setDatos(data); 

        }catch (error) { 
          alert("Hubo un error al cargar los productos."); } 
        
      }; 
      fetchData(); 
    }, [userId]);    

    
    console.log("data", datos);
    

  return (
    <>
      <Header />
      <div>
       {datos.length > 0 ? (
          datos.map(dataPedido => (
            
            <CardConfirmacion 
              key={dataPedido.id}
              userId={user}
              totalprice={dataPedido.totalprice +"€"}
              totalProducts={dataPedido.totalProducts}
              date= {dataPedido.purchaseDate}
            />
          ))
        ): (
            <p>No se encontró ningun pedido.</p>
          )}
      </div>
        <div>
            Direccion:
            {/*Direccion*/}
        </div>  
      <Footer />
    </>
  ) 
}

export default ConfirmarPedido