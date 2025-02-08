import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import "./App.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ThemeProvider } from "@material-tailwind/react";
 
createRoot(document.getElementById("root")).render(
   <Provider store={store}>
            <App /> 
       
    </Provider> 
);