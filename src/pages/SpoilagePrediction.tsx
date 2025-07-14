import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Thermometer, Droplets, Clock, Leaf, TrendingDown, MapPin, Truck, Ship, Train, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PredictionResult {
  riskLevel: "Low" | "Medium" | "High";
  percentage: number;
  explanation: string;
  recommendations: string[];
  temperature: number;
  humidity: number;
  duration: number;
}

interface RouteData {
  id: string;
  source: string;
  destination: string;
  transportType: "truck" | "ship" | "rail";
  distance: number; // in km
  cargo: string;
  status: string;
  estimatedDuration: number; // in hours
}

// Route data with distances
const routes: RouteData[] = [
  {
    id: "RT001",
    source: "Seattle, WA",
    destination: "Portland, OR",
    transportType: "truck",
    distance: 280,
    cargo: "Fresh Produce",
    status: "in-transit",
    estimatedDuration: 4.5
  },
  {
    id: "RT002", 
    source: "Los Angeles, CA",
    destination: "San Francisco, CA",
    transportType: "truck",
    distance: 615,
    cargo: "Organic Grains",
    status: "completed",
    estimatedDuration: 8.2
  },
  {
    id: "RT003",
    source: "Miami, FL",
    destination: "Atlanta, GA", 
    transportType: "truck",
    distance: 660,
    cargo: "Dairy Products",
    status: "delayed",
    estimatedDuration: 9.5
  },
  {
    id: "RT004",
    source: "Long Beach, CA",
    destination: "Seattle, WA",
    transportType: "ship",
    distance: 1850,
    cargo: "Import Goods",
    status: "in-transit",
    estimatedDuration: 32
  },
  {
    id: "RT005",
    source: "Chicago, IL",
    destination: "New York, NY",
    transportType: "rail",
    distance: 1280,
    cargo: "Packaged Foods",
    status: "scheduled",
    estimatedDuration: 18.5
  }
];

export default function SpoilagePrediction() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Record<string, PredictionResult>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  // Generate dummy environmental data based on route characteristics
  const generateEnvironmentalData = (route: RouteData) => {
    // Base temperature varies by transport type and distance
    let baseTemp = 6; // Optimal refrigerated temp
    if (route.transportType === "ship") baseTemp += 2; // Ships harder to control
    if (route.transportType === "rail") baseTemp += 1; // Moderate control
    if (route.distance > 1000) baseTemp += 1.5; // Longer routes more variation
    if (route.status === "delayed") baseTemp += 3; // Delays cause temp rises

    // Humidity varies by transport type
    let humidity = 90; // Optimal humidity
    if (route.transportType === "truck") humidity -= 5; // Trucks drier
    if (route.transportType === "ship") humidity += 3; // Ships more humid
    if (route.status === "delayed") humidity -= 8; // Equipment issues

    return {
      temperature: parseFloat((baseTemp + (Math.random() - 0.5) * 4).toFixed(1)),
      humidity: Math.max(70, Math.min(100, humidity + (Math.random() - 0.5) * 10)),
      duration: route.estimatedDuration
    };
  };

  const calculateSpoilageRisk = (route: RouteData) => {
    setLoading(prev => ({ ...prev, [route.id]: true }));
    
    // Simulate API call delay
    setTimeout(() => {
      const envData = generateEnvironmentalData(route);
      
      let riskScore = 0;
      
      // Temperature risk (optimal range: 0-4°C for most produce)
      if (envData.temperature > 20) riskScore += 40;
      else if (envData.temperature > 10) riskScore += 25;
      else if (envData.temperature > 4) riskScore += 10;
      
      // Humidity risk (optimal range: 85-95% for most produce)
      if (envData.humidity > 95) riskScore += 15;
      else if (envData.humidity < 85) riskScore += 20;
      
      // Duration risk
      if (envData.duration > 48) riskScore += 30;
      else if (envData.duration > 24) riskScore += 15;
      else if (envData.duration > 12) riskScore += 8;
      
      // Distance risk factor
      if (route.distance > 1500) riskScore += 15;
      else if (route.distance > 800) riskScore += 8;
      
      // Cargo type multiplier
      if (route.cargo.includes("Dairy")) riskScore *= 1.3;
      else if (route.cargo.includes("Produce")) riskScore *= 1.1;
      
      // Transport type factor
      if (route.transportType === "ship") riskScore *= 1.2; // Longer, less control
      
      // Status factor
      if (route.status === "delayed") riskScore *= 1.4;
      
      const finalScore = Math.min(Math.round(riskScore), 100);
      
      let riskLevel: "Low" | "Medium" | "High";
      let explanation: string;
      let recommendations: string[];
      
      if (finalScore <= 30) {
        riskLevel = "Low";
        explanation = `Route ${route.id} shows excellent conditions for preserving ${route.cargo.toLowerCase()}. Environmental factors are within optimal ranges.`;
        recommendations = [
          "Maintain current temperature controls",
          "Continue standard monitoring procedures",
          "Route is suitable for sensitive cargo"
        ];
      } else if (finalScore <= 65) {
        riskLevel = "Medium";
        explanation = `Route ${route.id} has moderate risk factors that could affect ${route.cargo.toLowerCase()} quality during the ${route.distance}km journey.`;
        recommendations = [
          "Increase monitoring frequency",
          "Consider adjusting temperature to 2-4°C",
          "Alert receiving facility of conditions",
          "Prepare for quality inspection upon arrival"
        ];
      } else {
        riskLevel = "High";
        explanation = `Critical risk detected for route ${route.id}. The ${route.estimatedDuration}-hour journey poses significant spoilage threat to ${route.cargo.toLowerCase()}.`;
        recommendations = [
          "Immediate intervention required",
          "Consider route optimization",
          "Implement emergency cooling measures",
          "Notify all stakeholders",
          "Prepare for potential cargo loss"
        ];
      }
      
      setPredictions(prev => ({
        ...prev,
        [route.id]: {
          riskLevel,
          percentage: finalScore,
          explanation,
          recommendations,
          temperature: envData.temperature,
          humidity: envData.humidity,
          duration: envData.duration
        }
      }));
      
      setLoading(prev => ({ ...prev, [route.id]: false }));
    }, 1200);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "High":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case "truck":
        return <Truck className="w-4 h-4" />;
      case "ship":
        return <Ship className="w-4 h-4" />;
      case "rail":
        return <Train className="w-4 h-4" />;
      default:
        return <Truck className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-green-500 rounded-lg">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Route-Based Spoilage Prediction</h2>
          <p className="text-gray-600">AI-powered risk assessment for active supply routes</p>
        </div>
      </div>

      {/* Full Screen Routes Container */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Full Screen Routes List */}
        <div className="xl:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Active Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {routes.map((route) => (
                  <div 
                    key={route.id} 
                    className={`border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedRoute === route.id ? 'ring-2 ring-green-500 bg-green-50' : 'bg-white'
                    }`}
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-100 rounded">
                          {getTransportIcon(route.transportType)}
                        </div>
                        <span className="font-medium text-gray-900">{route.id}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {route.distance}km
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {route.source} → {route.destination}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-3 h-3" />
                        {route.estimatedDuration}h • {route.cargo}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          calculateSpoilageRisk(route);
                        }}
                        disabled={loading[route.id]}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        {loading[route.id] ? (
                          <>
                            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          'Predict Risk'
                        )}
                      </Button>
                      
                      {predictions[route.id] && (
                        <Badge className={getRiskColor(predictions[route.id].riskLevel)}>
                          {predictions[route.id].riskLevel} ({predictions[route.id].percentage}%)
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prediction Results */}
        <div className="xl:col-span-1">
          {selectedRoute && predictions[selectedRoute] && (
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  Risk Assessment - {selectedRoute}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gray-100 rounded-lg">
                  <Badge className={`text-lg px-4 py-2 ${getRiskColor(predictions[selectedRoute].riskLevel)}`}>
                    {predictions[selectedRoute].riskLevel} Risk
                  </Badge>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{predictions[selectedRoute].percentage}%</p>
                  <p className="text-sm text-gray-600 mt-1">Spoilage Probability</p>
                </div>

                {/* Environmental Conditions */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Thermometer className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-900">{predictions[selectedRoute].temperature}°C</p>
                    <p className="text-xs text-gray-600">Temperature</p>
                  </div>
                  <div className="text-center">
                    <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-900">{predictions[selectedRoute].humidity}%</p>
                    <p className="text-xs text-gray-600">Humidity</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-900">{predictions[selectedRoute].duration}h</p>
                    <p className="text-xs text-gray-600">Duration</p>
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {predictions[selectedRoute].explanation}
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Recommendations:</h4>
                  <ul className="space-y-2">
                    {predictions[selectedRoute].recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-900">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}