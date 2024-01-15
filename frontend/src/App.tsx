import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app";

  return <div className={appStyles}>App</div>;
};

export default App;
