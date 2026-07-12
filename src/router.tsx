import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error401 from "./pages/Error401";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/401",
        element: <Error401 />,
    },
    {
        path: "/403",
        element: <Error403 />,
    },
    {
        path: "/500",
        element: <Error500 />,
    },
    {
        path: "/503",
        element: <Error503 />,
    },
    {
        path: "*",
        element: <Error404 />,
    },
]);