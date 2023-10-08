import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Oauth2 from "./pages/Oauth2";
import Thumbnail from "./components/Thumbnail";
import Layout from "./pages/Layout";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/thumbnail", element: <Thumbnail /> },
      { path: "/about", element: <About /> },
    ],
  },
  {
    path: "/oauth2",
    element: <Oauth2 />,
  },
]);

export default router;
