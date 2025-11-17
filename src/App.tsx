import { Switch, Route, Router } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

// GitHub Pages base path
const basename = import.meta.env.BASE_URL || "/Best_Cafe/";

function AppRouter() {
  return (
    <Router base={basename}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <AppRouter />
    </TooltipProvider>
  );
}

export default App;

