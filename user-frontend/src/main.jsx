import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/index.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import ContextStates from "./context/ContextStates";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ContextStates>
      <App />
    </ContextStates>
  </Provider>
);
