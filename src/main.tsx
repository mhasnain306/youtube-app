import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const client = new QueryClient();

const clientId =
  "597889139500-mjjuu39tcofqrqkgscmna3k40k3pq196.apps.googleusercontent.com";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
