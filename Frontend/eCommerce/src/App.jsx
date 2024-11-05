import './styles/App.css'
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo"
import Login from './pages/Login'
import Register from './pages/Register'
import SobreNosotros from './pages/SobreNosotros'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetallesProducto from './components/DetallesProducto';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/sobreNosotros" element={<SobreNosotros />} />
                <Route path='/producto/:id' element={<DetallesProducto />} />
            </Routes>
        </Router>
    )
}

export default App;
