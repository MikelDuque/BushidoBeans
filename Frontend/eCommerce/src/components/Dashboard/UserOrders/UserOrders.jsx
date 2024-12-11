import { useEffect, useState } from "react";
import "./UserOrders.css";
import Sidebar from "../UserSidebar/Sidebar";
import { GET_ORDERS_BY_USER_ID, GET_ORDER_BY_ID } from "../../../endpoints/config.js";
import { useAuth } from "../../../context/AuthContext.jsx";

function UserOrders() {
    const { token, decodedToken } = useAuth();
    const userId = decodedToken?.id || 0;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Obtener las órdenes del usuario
                const response = await fetch(GET_ORDERS_BY_USER_ID(userId), {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const orderSummaries = await response.json();

                    // Obtener detalles completos de cada orden
                    const detailedOrders = await Promise.all(
                        orderSummaries.map(async (order) => {
                            const detailResponse = await fetch(GET_ORDER_BY_ID(order.id), {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`,
                                },
                            });

                            if (detailResponse.ok) {
                                return await detailResponse.json();
                            } else {
                                throw new Error(`Error fetching details for order ID: ${order.id}`);
                            }
                        })
                    );

                    setOrders(detailedOrders);
                } else {
                    throw new Error("Failed to fetch order summaries");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId, token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="order-wrapper">
            <Sidebar />
            <div className="order-content">
                <h2 className="titulo">Pedidos</h2>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className="order-details">
                            <p><strong>Pedido ID:</strong> {order.id}</p>
                            <p><strong>Fecha de Compra:</strong> {new Date(order.purchaseDate).toLocaleDateString()}</p>
                            <p><strong>Total:</strong> ${order.totalPrice}</p>
                            <h3>Productos:</h3>
                            <div className="order-products">
                                {order.orderProducts?.map((product) => (
                                    <div key={product.productId} className="order-product">
                                        <img src={`https://localhost:7015/${product.image}`} alt={product.name} className="product-image" />
                                        <p><strong>Producto:</strong> {product.name}</p>
                                        <p><strong>Cantidad:</strong> {product.quantity}</p>
                                        <p><strong>Precio:</strong> ${product.purchasePrice}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron pedidos.</p>
                )}
            </div>
        </div>
    );
}

export default UserOrders;
