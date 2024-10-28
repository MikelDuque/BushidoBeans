import './styles/app.css'
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo"
import Login from './pages/LoginCopy'
import Register from './pages/Register'
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";

function App() {
    return (
        
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </Router>
    )
}

export default App;
