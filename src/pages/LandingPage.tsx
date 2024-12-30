import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Brain,
  Shuffle,
  Shield,
  Zap,
  ChevronRight,
  TrendingUpDown,
} from "lucide-react";
import { APP_ROUTES } from "@/constants/appRoute";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".hidden-initially");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[560px] flex items-center justify-center text-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4" variant="secondary">
            Built on Flow Blockchain
          </Badge>
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Predict. Trade. Earn.
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            The next generation of prediction markets powered by Flow blockchain
            and AI
          </p>
          <div className="flex gap-4 justify-center md:flex-row flex-col">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => {
                navigate(APP_ROUTES.PREDICTIONS);
              }}
            >
              Explore Predictions <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              Create Prediction <TrendingUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose FlowPredicts
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 mb-4 text-primary" />,
                title: "Secure & Decentralized",
                description:
                  "Built on Flow blockchain for maximum security and transparency",
              },
              {
                icon: <Zap className="h-8 w-8 mb-4 text-primary" />,
                title: "Lightning Fast",
                description:
                  "Experience instant settlements and low transaction fees",
              },
              {
                icon: <Brain className="h-8 w-8 mb-4 text-primary" />,
                title: "AI-Powered Insights",
                description:
                  "Get smart predictions and market analysis powered by AI",
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center hidden-initially">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Preview */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">
            Trending Predictions
          </h2>
          <Tabs defaultValue="trending" className="w-full ">
            <TabsList className="mb-8 flex flex-row gap-4 bg-background">
              <TabsTrigger
                value="trending"
                className="py-2 bg-slate-100 text-black"
              >
                Trending
              </TabsTrigger>
              <TabsTrigger
                value="sports"
                className="py-2 bg-slate-100 text-black"
              >
                Sports
              </TabsTrigger>
              <TabsTrigger
                value="crypto"
                className="py-2 bg-slate-100 text-black"
              >
                Crypto
              </TabsTrigger>
              <TabsTrigger
                value="politics"
                className="py-2 bg-slate-100 text-black"
              >
                Politics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="trending">
              <ScrollArea className="h-[600px] pr-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Card key={item} className="p-6 mb-4 hidden-initially">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col items-start">
                        <Badge className="mb-2">Trending</Badge>
                        <h3 className="text-lg font-semibold">
                          Will BTC reach $100k by 2024?
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          24h Volume: 50,000 FLOW
                        </p>
                      </div>
                      <Button variant="outline">Trade Now</Button>
                    </div>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Roadmap</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="h-8 w-8 mb-4 text-primary" />,
                title: "Q1 2025",
                features: ["Platform Launch", "Basic Predictions"],
              },
              {
                icon: <Brain className="h-8 w-8 mb-4 text-primary" />,
                title: "Q2 2025",
                features: ["AI Predictions", "Market Analysis"],
              },
              {
                icon: <Shuffle className="h-8 w-8 mb-4 text-primary" />,
                title: "Q3 2025",
                features: [
                  "Token Swap",
                  "Cross-chain Bridge",
                  "ERC-20 Support",
                ],
              },
            ].map((phase, index) => (
              <Card key={index} className="p-6 hidden-initially">
                {phase.icon}
                <h3 className="text-xl font-semibold mb-4">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
