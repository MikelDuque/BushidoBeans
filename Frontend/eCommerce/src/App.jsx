import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Inicio from "./pages/Inicio";
//import Login Yasir


const routeDefinition = createRoutesFromElements(
  <>
    <Route path="/" element={<Inicio />} />
  </>
);


const router = createBrowserRouter(routeDefinition);

function App() {
  return <RouterProvider router={router} />;
}

export default App