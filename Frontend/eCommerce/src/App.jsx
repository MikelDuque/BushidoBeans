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

function App() {
    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sobreNosotros" element={<SobreNosotros />} />
            <Route path="/producto/:id" element={
                <ReviewProvider>
                    <DetallesProducto />
                </ReviewProvider>
            } />
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Ruta para página no encontrada */}
            <Route path="400" element={<NotFound />} />
        </Routes>
    );
}

export default App;
