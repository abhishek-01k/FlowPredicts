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

  const trendingPredictions = [
    {
      id: 1,
      trend: "Trending",
      title: "Will FlowPredicts win the Flow Hackathon?",
    },
    {
      id: 2,
      trend: "Trending",
      title: "Will OpenAI release GPT-5 by the end of 2025?",
    },
    {
      id: 3,
      trend: "Trending",
      title:
        "Will Ethereums total value locked (TVL) exceed $100 billion by Q4 2025?",
    },
    {
      id: 5,
      title: "Will SpaceX send the first crewed mission to Mars by 2026?",
      trend: "Trending",
    },
    {
      id: 6,
      title: "Will Bitcoin's price touches $150k by July 2025?",
      trend: "Trending",
    },
    {
      id: 7,
      trend: "Ethereum",
      title:
        "Will Ethereum total value locked (TVL) exceed $100 billion by Q4 2025?",
    },
    {
      id: 8,
      trend: "Ethereum",
      title:
        "Will Ethereum maintain dominance with over 50% of the DeFi market by 2025?",
    },
    {
      id: 9,
      trend: "Ethereum",
      title:
        "Will the Ethereum network successfully reduce average transaction fees below $0.50 by mid-2025?",
    },
    {
      id: 10,
      trend: "Flow",
      title: "Will FlowPredicts win the Flow Hackathon?",
    },
    {
      id: 11,
      trend: "Flow",
      title:
        "Will Flow blockchain's native token FLOW hit $20 by the end of 2025?",
    },
    {
      id: 12,
      trend: "Flow",
      title:
        "Will Flow blockchain surpass 15 million active wallets by mid-2025?",
    },
  ];

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
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={() => {
                navigate(APP_ROUTES.CREATE_PREDICTION);
              }}
            >
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
                value="ethereum"
                className="py-2 bg-slate-100 text-black"
              >
                Ethereum
              </TabsTrigger>
              <TabsTrigger
                value="flow"
                className="py-2 bg-slate-100 text-black"
              >
                Flow
              </TabsTrigger>
            </TabsList>
            <TabsContent value="trending">
              <ScrollArea className="h-[400px] pr-4">
                {trendingPredictions
                  .filter((item) => item.trend === "Trending")
                  .map((item) => (
                    <Card key={item.id} className="p-6 mb-4 hidden-initially">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col items-start">
                          <Badge className="mb-2">{item.trend}</Badge>
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                        </div>
                        <Button variant="outline">Trade Now</Button>
                      </div>
                    </Card>
                  ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="ethereum">
              <ScrollArea className="h-[400px] pr-4">
                {trendingPredictions
                  .filter((item) => item.trend === "Ethereum")
                  .map((item) => (
                    <Card key={item.id} className="p-6 mb-4 hidden-initially">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col items-start">
                          <Badge className="mb-2">{item.trend}</Badge>
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                        </div>
                        <Button variant="outline">Trade Now</Button>
                      </div>
                    </Card>
                  ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="flow">
              <ScrollArea className="h-[400px] pr-4">
                {trendingPredictions
                  .filter((item) => item.trend === "Flow")
                  .map((item) => (
                    <Card key={item.id} className="p-6 mb-4 hidden-initially">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col items-start">
                          <Badge className="mb-2">{item.trend}</Badge>
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
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
