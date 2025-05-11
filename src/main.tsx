import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/css/index.css";
import "./assets/css/game.css";

createRoot(document.getElementById("root")!).render(<App />);
