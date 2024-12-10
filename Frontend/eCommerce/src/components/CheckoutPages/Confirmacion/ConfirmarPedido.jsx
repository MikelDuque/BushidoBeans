import { useState, useEffect } from 'react';
import { API_BASE_URL, GET_ORDER_BY_ID } from "../../../endpoints/config";
import './Confirmacion.css';
import { useCheckout } from '../../../context/CheckoutContext';
import { useAuth } from '../../../context/AuthContext';
import useFetch from "../../../endpoints/useFetch.js";

function ConfirmarPedido() {
  const { currentView } = useCheckout();
  const { token, decodedToken } = useAuth();
  const userId = decodedToken ? decodedToken?.id : 0;
  const [order, setOrder] = useState(null);

  const {fetchData} = useFetch({url: GET_ORDER_BY_ID(userId), type: 'GET', token: token, needAuth:true});

  useEffect(() => {
    setOrder(fetchData);
    console.log("fetch data", fetchData);
    
  }, [fetchData, currentView]);

  function dateFormatting(date) {
    return new Date(date).toLocaleDateString('es-es', {year:"numeric", month:"long", day:"numeric", hour:"numeric", minute:"numeric"});
  }


/*
  useEffect(() => {
      const fetchData = async () => {
          if (userId) {
              try {
                  const url = GET_ORDER_BY_ID(userId);
                  const response = await fetch(url, { 
                      method: 'GET', 
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                  });
                  const data = await response.json();
                  setDatos(data); 
              } catch (error) { 
                  alert("Hubo un error al cargar los productos.");
              }
          }
      };
      fetchData();
  }, [userId]);
  */

  return (
    <>
    {order ? (
      <div className="order-confirmation">
        <h1>Confirmación de Pedido</h1>
        <div><strong>Usuario:</strong>{order.address.addressee}</div>
        <div><strong>Fecha de compra:</strong> {dateFormatting(order.purchaseDate)}</div>
        <div><strong>Precio total:</strong> {order.totalPrice} €</div>
        <div><strong>Productos Totales:</strong> {order.totalProducts} productos</div>
        <div><strong>Productos:</strong></div>
        <div>
            <strong>Dirección:</strong>
            <p>{order.address.phoneNumber}</p>
            <p>{order.address.addressInfo}</p>
        </div>
        <ul className='listaProductos'>
          {(order.orderProducts.length > 0 ? (
            order.orderProducts.map((orderItem) => (
            <li key={orderItem.productId}>
              <div><img src={`${API_BASE_URL}${orderItem.image}`}/></div>
                <ul className='contenedorDeDatos'>
                  <li><strong>Producto:</strong>{orderItem.name}</li>
                  <li><strong>Precio:</strong>{orderItem.purchasePrice} €</li>
                  <li><strong>Cantidad:</strong>{orderItem.quantity}</li>
                </ul>
            </li>
            ))) : (<h4>Tu pedido está vacío</h4>)
          )}
        </ul>
        
      </div>
    ) : (
      <div className='order-confirmation2'>No hay ningún pedido aún</div>
    )}
    </>
  ) 
}

export default ConfirmarPedido;