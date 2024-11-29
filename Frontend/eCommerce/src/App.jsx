import BigLayout from "./layouts/BigLayout/BigLayout"
import HomeLayout from "./layouts/HomeLayout/HomeLayout"
import ChekoutLayout from "./layouts/CheckoutLayout/CheckoutLayout"
import Inicio from "./pages/Inicio/Inicio";
import Catalogo from "./pages/Catalogo";
import Login from './pages/Login';
import Register from './pages/Register';
import SobreNosotros from './pages/SobreNosotros';
import DetallesProducto from './pages/DetallesProducto';
import { Routes, Route } from "react-router-dom";
import NotFound from './components/NotFound';
import Checkout from "./pages/Checkout/Checkout";
import { ReviewProvider } from "./context/ReviewContext";
import DireccionEnvio from "./components/DireccionEnvio/DireccionEnvio";
import { DireccionProvider } from "./context/DireccionContext";
import { CheckoutProvider } from './context/CheckoutContext';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout/>}>
                <Route index element={<Inicio />} />
            </Route>

            <Route path="/" element={<BigLayout/>}>
                {/* Rutas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/sobreNosotros" element={<SobreNosotros />} />
                <Route path="/producto/:id" element={
                    <ReviewProvider>
                        <DetallesProducto />
                    </ReviewProvider>
                } />
                <Route path="/catalogo" element={<Catalogo />} />
                

                <Route path="/direccion" element={
                    <DireccionProvider>
                        <DireccionEnvio />
                    </DireccionProvider>
                } />

                {/* Ruta para página no encontrada */}
                <Route path="400" element={<NotFound />} />
            </Route>

            <Route path="/" elements={<ChekoutLayout/>}>
                <Route path="/checkout" element={
                    <CheckoutProvider>
                        <Checkout />
                    </CheckoutProvider>}/>
            </Route>
        </Routes>
    );
}

export default App;
