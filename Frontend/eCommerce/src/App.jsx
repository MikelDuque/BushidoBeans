import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo"
import Login from './pages/Login'
import Register from './pages/Register'
import SobreNosotros from './pages/SobreNosotros'
import DetallesProducto from './pages/DetallesProducto'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './components/NotFound';
import PopupReseña from "./components/PopUpReseña";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/sobreNosotros" element={<SobreNosotros />} />
                <Route path="/producto/:id" element={<DetallesProducto />} />
                <Route path="/producto/:id/reseña" element={<PopupReseña />} />
                <Route path='/404' element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}

export default App;
