import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
<<<<<<< HEAD
    brand: {
      100: "#d45161",
      200: "#be4857",
    }
=======
    brand: "#D45161",
    Background: "#222222",
    Foreground: "#333333",
    Accent: "#D45161",
    Primary: "#FFFFFF",
    Secondary: "#FFFFFF7F",
    Borders: "#555555",
>>>>>>> main
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
