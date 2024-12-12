import { useEffect, useState } from 'react';
import { API_BASE_URL, POST_ORDER } from "../../../endpoints/config";
import './Confirmacion.css';
import { useCheckout } from '../../../context/CheckoutContext';
import { useAuth } from '../../../context/AuthContext';
import useFetch from "../../../endpoints/useFetch.js";
import { useCart } from '../../../context/CartContext.jsx';

function ConfirmarPedido() {
  const { token } = useAuth();
  const { deleteCart } = useCart();
  const { order } = useCheckout();
  const [postedOrder, setPostedOrder] = useState(null);

  const {fetchData, isLoading} = useFetch({url: POST_ORDER, type: 'POST', token: token, params:order, needAuth:true});

  
  useEffect(() => {
    console.log("order", order);
    
    console.log("postedOrder", postedOrder);
    
    if(!postedOrder) {
      setPostedOrder(fetchData)
      deleteCart(order.userId)
    };
    
  }, [fetchData]);

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
    {isLoading ? <span>Cargando el pedido...</span> : 
    (postedOrder ? (
      <div className="order-confirmation">
        <h1>Confirmación de Pedido (ID: {postedOrder.id})</h1>
        <div><strong>Usuario:</strong>{postedOrder.address?.addressee}</div>
        <div><strong>Fecha de compra:</strong> {dateFormatting(postedOrder.purchaseDate)}</div>
        <div><strong>Precio total:</strong> {postedOrder.totalPrice} €</div>
        <div><strong>Productos Totales:</strong> {postedOrder.totalProducts} productos</div>
        <div><strong>Teléfono:</strong>{postedOrder.address?.phoneNumber}</div>
        <div><strong>Dirección:</strong><p>{postedOrder.address?.addressInfo}</p></div>
        
        <div><strong>Productos:</strong></div>
        
        <ul className='listaProductos'>
          {(postedOrder.orderProducts?.length > 0 ? (
            postedOrder.orderProducts?.map((orderItem) => (
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
    ))}
    
    </>
  ) 
}

export default ConfirmarPedido;