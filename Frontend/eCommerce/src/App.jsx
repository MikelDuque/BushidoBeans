import BigLayout from "./layouts/BigLayout/BigLayout"
import HomeLayout from "./layouts/HomeLayout/HomeLayout"
import ChekoutLayout from "./layouts/CheckoutLayout/CheckoutLayout"
import Inicio from "./pages/Inicio/Inicio";
import Catalogo from "./pages/Catalogo";
import Login from './pages/Login-Register/Login_Register';
import Register from './pages/Register';
import SobreNosotros from './pages/SobreNosotros';
import DetallesProducto from './pages/DetallesProducto';
import { Routes, Route } from "react-router-dom";
import NotFound from './components/NotFound';
import Checkout from "./pages/Checkout/Checkout";
import ConfirmarPedido from "./pages/Checkout/ConfirmarPedido";
import { ReviewProvider } from "./context/ReviewContext";
import DireccionEnvio from "./components/DireccionEnvio/DireccionEnvio";
//import { DireccionProvider } from "./context/DireccionContext";
import { CheckoutProvider } from './context/CheckoutContext';
import AdminView from "./pages/AdminView/AdminView";
import { AdminPrivateRoute } from "./utils/RestrictedRoute";

function App() { return (
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


        {/* ----- CHECKOUT LAYOUT ----- */}
        <Route path="/" elements={<ChekoutLayout/>}>
            <Route path="/checkout" element={
                <CheckoutProvider>
                    <Checkout />
                </CheckoutProvider>}/>
        </Route>

        <Route path="/ConfirmarPedido" element={
            <ConfirmarPedido />

        } />
    </Routes>
);};

export default App;
