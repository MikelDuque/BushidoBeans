import { useEffect, useState } from "react";
// import * as jwtDecode from "jwt-decode";
import "./UserOrders.css";
import Sidebar from "../UserSidebar/Sidebar";
function UserOrders() {
    // const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const orders = [
        { id: 1, purchaseDate: "2023-05-01T00:00:00Z", totalPrice: 100, products: [{ id: 1, name: "Producto 1", price: 50, image: "./image.png", cartProducts: [{ quantity: 1 }] }, { id: 1, name: "Producto 2", price: 50, image: "image_url", cartProducts: [{ quantity: 1 }] }, { id: 1, name: "Producto 1", price: 50, image: "image_url", cartProducts: [{ quantity: 1 }] },] },
        { id: 2, purchaseDate: "2023-05-02T00:00:00Z", totalPrice: 150, products: [{ id: 2, name: "Producto 2", price: 75, image: "image_url", cartProducts: [{ quantity: 2 }] }] },
        { id: 3, purchaseDate: "2023-05-03T00:00:00Z", totalPrice: 200, products: [{ id: 3, name: "Producto 3", price: 100, image: "image_url", cartProducts: [{ quantity: 1 }] }] }
    ];
    // useEffect(() => {
    //     const fetchOrders = async () => {
    //         try {
    //             const token = localStorage.getItem("accessToken");
    //             if (!token) throw new Error("Token not found");

    //             const decodedToken = jwtDecode.jwtDecode(token);
    //             const userId = decodedToken.id;

    //             const response = await fetch(`https://localhost:7015/api/Orders/${userId}`, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${token}`,
    //                 },
    //             });

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setOrders(data);
    //             } else {
    //                 throw new Error("Failed to fetch orders");
    //             }
    //         } catch (error) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchOrders();
    // }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;

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
                                {order.products.map((product) => (
                                    <div key={product.id} className="order-product">
                                        <img src={product.image} alt={product.name} className="product-image" />
                                        <p><strong>Producto:</strong> {product.name}</p>
                                        <p><strong>Cantidad:</strong> {product.cartProducts[0].quantity}</p>
                                        <p><strong>Precio:</strong> ${product.price}</p>
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
