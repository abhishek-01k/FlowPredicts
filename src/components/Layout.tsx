import { Link } from "react-router-dom";
import { Home, PlusCircle, User } from "lucide-react";
import WalletConnect from "./WalletConnect";
import { ThemeToggle } from "./theme/theme-toogle";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold">
                PredictChain
              </Link>
            </div>

            <nav className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/create"
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create</span>
              </Link>
              <Link
                to="/my-predictions"
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
              >
                <User className="w-4 h-4" />
                <span>My Predictions</span>
              </Link>
              <ThemeToggle />
              <WalletConnect />
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
