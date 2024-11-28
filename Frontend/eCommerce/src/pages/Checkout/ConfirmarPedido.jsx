import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React, { useState, useEffect } from 'react';
import * as jwt_decode from 'jwt-decode';
import { CardConfirmacion } from "../../components/CardConfirmacion";

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

    console.log(userId)

    useEffect(() => {

    const fetchData = async () => {
        console.log(userId)
        try {
          const Url = `'https://localhost:7015/api/Order'`
          const response = await fetch(`${Url}/${userId}`
            , {method: 'GET', headers: { 'Content-Type': 'application/json' }});
          
          if (!response.ok) { throw new Error('Error al obtener los datos'); } const data = await response.json(); setDatos(data);
  
        
          console.log("response",response);
          console.log("data",data);
          setDatos(data);  


        } catch (error) {
          alert("Hubo un error al cargar los productos.");
          
        } 

      };
      
      fetchData();
      console.log("datos",datos);
    },[userId]);
    


  return (
    <>
      <Header />
      <div className="inventario">
       {datos.length > 0 ? (
          datos.map(dataPedido => (
            
            <CardConfirmacion 
              key={dataPedido.id}
              userId={user}
              totalprice={dataPedido.totalprice}
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