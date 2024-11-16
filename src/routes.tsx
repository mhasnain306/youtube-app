import { createBrowserRouter } from "react-router-dom";
import ThumbnailContainer from "./components/ThumbnailContainer";
import About from "./pages/About";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import OauthButton from "./components/OauthButton";
import GoogleRedirect from "./components/GoogleRedirect";
import Oauth2 from "./pages/GoogleSignIn";
import GoogleSignIn from "./pages/GoogleSignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/thumbnail", element: <ThumbnailContainer /> },
      { path: "/about", element: <About /> },
    ],
  },
  {
    path: "/oauth",
    element: <OauthButton />,
  },
  {
    path: "/signin",
    element: <GoogleSignIn />,
  },
  {
    path: "/google-redirect",
    element: <GoogleRedirect />,
  },
]);

export default router;
