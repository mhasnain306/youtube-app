import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Oauth2 from "./pages/Oauth2";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/oauth2",
    element: <Oauth2 />,
  },
]);

export default router;
