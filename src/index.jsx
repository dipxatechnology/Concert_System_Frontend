import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { AnimCursor } from "./components/AnimCursor.jsx";
import ScrollIndicator from "./components/ScrollIndicator.jsx";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});
const theme = extendTheme({
  colors: {
    brand: {
      100: "#d45161",
      200: "#be4857",
    },
    Background: "#222222",
    Foreground: "#333333",
    Accent: "#D45161",
    Primary: "#FFFFFF",
    Secondary: "#FFFFFF7F",
    Borders: "#555555",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <ChakraProvider theme={theme}>
                  <App />
                </ChakraProvider>
                <ScrollIndicator />
                <AnimCursor />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
