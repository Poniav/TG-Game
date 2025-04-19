import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Game from "./pages/game";
import Wallet from "./pages/wallet";
import Tasks from "./pages/tasks";
import { TelegramWebAppProvider } from "@/contexts/TelegramWebAppProvider";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TelegramWebAppProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/play" element={<Game />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TelegramWebAppProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
