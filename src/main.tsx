import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/css/index.css";
import "./assets/css/game.css";
import "./assets/css/telegram-fix.css"; // Ajout des styles pour fixer les problèmes de Telegram

createRoot(document.getElementById("root")!).render(<App />);
