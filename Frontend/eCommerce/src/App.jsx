import { Routes, Route } from "react-router-dom";
import BigLayout from "./layouts/BigLayout/BigLayout";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import CheckoutLayout from "./layouts/CheckoutLayout/CheckoutLayout";
import Inicio from "./pages/Inicio/Inicio";
import Catalogo from "./pages/Catalogo";
import Login from './pages/Login';
import Register from './pages/Register';
import SobreNosotros from './pages/SobreNosotros';
import DetallesProducto from './pages/DetallesProducto';
import NotFound from './components/NotFound';
import Checkout from "./pages/Checkout/Checkout";
import ConfirmarPedido from "./pages/Checkout/ConfirmarPedido";
import { ReviewProvider } from "./context/ReviewContext";
import DireccionEnvio from "./components/DireccionEnvio/DireccionEnvio";
import { CheckoutProvider } from './context/CheckoutContext';
import User from "./components/Dashboard/UserData/User";
import UserProfile from './components/Dashboard/UserProfile/UserProfile';
import UserAddress from './components/Dashboard/UserAddress/UserAddress';
import UserOrders from './components/Dashboard/UserOrders/UserOrders';
import AdminView from "./pages/AdminView/AdminView";
import { AdminPrivateRoute } from "./utils/RestrictedRoute";

function App() { 
    return (
        <Routes>
            {/* ----- HOME LAYOUT ----- */}
            <Route path="/" element={<HomeLayout/>}>
                <Route index element={<Inicio />} />
            </Route>

            {/* ----- GENERAL LAYOUT ----- */}
            <Route path="/" element={<BigLayout/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/sobreNosotros" element={<SobreNosotros />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/producto/:id" element={
                    <ReviewProvider>
                        <DetallesProducto />
                    </ReviewProvider>
                } />
                <Route path="/user" element={<User />} />
                <Route path="/400" element={<NotFound />} />
                <Route path="/direccion" element={<DireccionEnvio />} />

                {/* ----- RUTAS PARA USUARIO ----- */}
                <Route path="/user/profile" element={<UserProfile />} />
                <Route path="/user/address" element={<UserAddress />} />
                <Route path="/user/orders" element={<UserOrders />} />
            </Route>

            {/* ----- CHECKOUT LAYOUT ----- */}
            <Route path="/" elements={<CheckoutLayout/>}>
                <Route path="/checkout" element={
                    <CheckoutProvider>
                        <Checkout />
                    </CheckoutProvider>
                }/>
            </Route>

            <Route path="/ConfirmarPedido" element={<ConfirmarPedido />} />
        </Routes>
    );
};
        {/* ----- GENERAL LAYOUT ----- */}
        <Route path="/" element={<BigLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/sobreNosotros" element={<SobreNosotros />} />

            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={
                <ReviewProvider>
                    <DetallesProducto />
                </ReviewProvider>
            } />

            
            <Route path="/vistaAdmin" element={
                <AdminPrivateRoute>
                    <AdminView />
                </AdminPrivateRoute>
            }/>

            <Route path="400" element={<NotFound />} />

            {/* QUITAR ESTA RUTA; VIENE INCORPORADA EN EL CHEKOUT */}
            <Route path="/direccion" element={
//                <DireccionProvider>
                    <DireccionEnvio />
//                </DireccionProvider>
            } />

        </Route>

export default App;
