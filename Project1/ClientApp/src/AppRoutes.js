import { Vehiculos } from "./components/Vehiculos";
import { Ubicaciones } from "./components/Ubicaciones";
import { Estado } from "./components/Estado";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/vehiculos',
    element: <Vehiculos />
    },
    {
        path: '/ubicaciones',
        element: <Ubicaciones />
    }
    ,
    {
        path: '/estado',
        element: <Estado />
    }
];

export default AppRoutes;
