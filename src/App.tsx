import { Suspense } from "react";
import { Toaster } from "./components/ui/toaster";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import tempoRoutes from "tempo-routes";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import GlobalErrorHandler from "./components/ui/GlobalErrorHandler";
import { NetworkStatusIndicator } from "./components/ui/NetworkStatusIndicator";

function App() {
  const appRoutes = useRoutes(routes);
  const tempoAppRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(tempoRoutes) : null;

  return (
    <GlobalErrorHandler>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700]"></div>
            </div>
          }
        >
          <div className="min-h-screen bg-gray-50">
            {appRoutes}
            {tempoAppRoutes}
            <Toaster />
            <NetworkStatusIndicator />
          </div>
        </Suspense>
      </ErrorBoundary>
    </GlobalErrorHandler>
  );
}

export default App;
