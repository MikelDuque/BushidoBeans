import './styles/App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";

function App() {
    return (
        
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </Router>
    )
}

export default App;
