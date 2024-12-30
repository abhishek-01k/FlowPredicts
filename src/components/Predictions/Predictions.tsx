import { Prediction } from "@/types/prediction";
import { useGlobalContext } from "@/context/GlobalContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivePredictions from "./components/ActivePredictions";
import AllPredictions from "./components/AllPredictions";

const Predictions = () => {
  const { activePredictions, allPredictions, loadingPredictions } =
    useGlobalContext();

  if (loadingPredictions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Prediction Markets</h1>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] gap-4 py-2 bg-background">
          <TabsTrigger value="active" className="py-2 bg-slate-100 text-black">
            Active Predictions
          </TabsTrigger>
          <TabsTrigger value="all" className="py-2 bg-slate-100 text-black">
            All Predictions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="flex flex-col items-start mb-6 gap-2">
            <h2 className="text-xl font-semibold">Active Markets</h2>
            <span className="text-muted-foreground">
              Active predictions: {(activePredictions as Prediction[]).length}
            </span>
          </div>
          <ActivePredictions predictions={activePredictions as Prediction[]} />
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="flex flex-col items-start mb-6 gap-2">
            <h2 className="text-xl font-semibold">All Markets</h2>
            <span className="text-muted-foreground">
              Total predictions: {(allPredictions as Prediction[]).length}
            </span>
          </div>
          <AllPredictions predictions={allPredictions as Prediction[]} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Predictions;
