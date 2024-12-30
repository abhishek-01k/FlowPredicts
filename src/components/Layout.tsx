import { Link } from "react-router-dom";
import { Home, PlusCircle, TrendingUp, User, Menu } from "lucide-react";
import WalletConnect from "./WalletConnect";
import { ThemeToggle } from "./theme/theme-toogle";
import { APP_ROUTES } from "@/constants/appRoute";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const navLinks = [
    { to: APP_ROUTES.HOME, icon: Home, label: "Home" },
    { to: APP_ROUTES.CREATE_PREDICTION, icon: PlusCircle, label: "Create" },
    { to: APP_ROUTES.PREDICTIONS, icon: TrendingUp, label: "Predictions" },
    { to: APP_ROUTES.PROFILE, icon: User, label: "Profile" },
  ];

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
        >
          <link.icon className="w-4 h-4" />
          <span>{link.label}</span>
        </Link>
      ))}
    </>
  );

  return (
    <div className="bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold">
                FlowPredicts
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-4">
              <NavLinks />
              <WalletConnect />
              <ThemeToggle />
            </nav>

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4 mt-4">
                    <div className="flex items-start">
                      <ThemeToggle />
                    </div>
                    <NavLinks />
                    <div className="flex flex-col items-start">
                      <WalletConnect />
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
