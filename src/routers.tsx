import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Oauth2 from "./pages/Oauth2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/oauth2",
    element: <Oauth2 />,
  },
]);

export default router;
