import Portfolio from "@/pages/Portfolio";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Portfolio />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
