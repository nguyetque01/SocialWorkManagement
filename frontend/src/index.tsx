import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeContextProvider from "./context/theme.context";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeContextProvider>
);
