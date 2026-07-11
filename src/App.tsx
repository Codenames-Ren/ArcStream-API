import { Header } from "@/components/Header";
import { EndpointList } from "@/components/EndpointList";
import { APP_CONFIG } from "@/config/app";

function App() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <EndpointList />
      </main>

      <footer className="border-t-[3px] border-border bg-surface px-4 py-6 text-center">
        <p className="font-mono text-xs text-muted-foreground">
          © Ren Kyrielight · {APP_CONFIG.name} API Playground  
        </p>
      </footer>
    </div>
  );
}

export default App;