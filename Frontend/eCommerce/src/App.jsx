import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from "react-router-dom";
import Inicio from "./pages/Inicio";
import Prueba from "./pages/prueba"
//import Login Yasir


const routeDefinition = createRoutesFromElements(
  <>
    <Route path="/" element={<Inicio />} />
    <Route path="/prueba" element={<Prueba />} />
  </>
);


const router = createBrowserRouter(routeDefinition);

function App() {
  return <RouterProvider router={router} />;
}

export default App