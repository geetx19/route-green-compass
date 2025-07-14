import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Thermometer, Droplets, Clock, Leaf, TrendingDown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PredictionResult {
  riskLevel: "Low" | "Medium" | "High";
  percentage: number;
  explanation: string;
  recommendations: string[];
}

export default function SpoilagePrediction() {
  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    duration: "",
    foodType: "produce"
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateSpoilageRisk = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const temp = parseFloat(formData.temperature);
      const humidity = parseFloat(formData.humidity);
      const duration = parseFloat(formData.duration);
      
      let riskScore = 0;
      
      // Temperature risk (optimal range: 0-4°C for most produce)
      if (temp > 20) riskScore += 40;
      else if (temp > 10) riskScore += 25;
      else if (temp > 4) riskScore += 10;
      
      // Humidity risk (optimal range: 85-95% for most produce)
      if (humidity > 95) riskScore += 15;
      else if (humidity < 85) riskScore += 20;
      
      // Duration risk
      if (duration > 48) riskScore += 30;
      else if (duration > 24) riskScore += 15;
      else if (duration > 12) riskScore += 8;
      
      // Food type multiplier
      if (formData.foodType === "dairy") riskScore *= 1.3;
      else if (formData.foodType === "meat") riskScore *= 1.5;
      
      const finalScore = Math.min(Math.round(riskScore), 100);
      
      let riskLevel: "Low" | "Medium" | "High";
      let explanation: string;
      let recommendations: string[];
      
      if (finalScore <= 30) {
        riskLevel = "Low";
        explanation = "Current transport conditions are optimal for preserving food quality. Minimal spoilage risk expected.";
        recommendations = [
          "Continue monitoring temperature and humidity",
          "Maintain current transport conditions",
          "Consider this route for future sensitive cargo"
        ];
      } else if (finalScore <= 65) {
        riskLevel = "Medium";
        explanation = "Some environmental factors may contribute to food quality degradation. Moderate spoilage risk detected.";
        recommendations = [
          "Adjust temperature to 2-4°C if possible",
          "Monitor humidity levels more frequently",
          "Consider reducing transport duration",
          "Increase quality checks upon arrival"
        ];
      } else {
        riskLevel = "High";
        explanation = "Critical environmental conditions detected. High probability of significant food spoilage during transport.";
        recommendations = [
          "Immediate temperature adjustment required",
          "Consider alternate transport method",
          "Implement real-time monitoring",
          "Prepare for potential quality loss",
          "Alert receiving facility of conditions"
        ];
      }
      
      setPrediction({
        riskLevel,
        percentage: finalScore,
        explanation,
        recommendations
      });
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.temperature && formData.humidity && formData.duration) {
      calculateSpoilageRisk();
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-success text-white";
      case "Medium":
        return "bg-warning text-white";
      case "High":
        return "bg-danger text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-green rounded-lg">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Food Spoilage Prediction</h2>
          <p className="text-muted-foreground">Reduce waste with AI-powered spoilage risk assessment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Transport Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="temperature" className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  Temperature (°C)
                </Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 8.5"
                  value={formData.temperature}
                  onChange={(e) => setFormData({...formData, temperature: e.target.value})}
                  required
                />
                <p className="text-xs text-muted-foreground">Optimal range: 0-4°C for most produce</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="humidity" className="flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  Humidity (%)
                </Label>
                <Input
                  id="humidity"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g., 85"
                  value={formData.humidity}
                  onChange={(e) => setFormData({...formData, humidity: e.target.value})}
                  required
                />
                <p className="text-xs text-muted-foreground">Optimal range: 85-95% for most produce</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Transport Duration (hours)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="e.g., 24"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="foodType">Food Type</Label>
                <select
                  id="foodType"
                  className="w-full p-2 border border-border rounded-md bg-background"
                  value={formData.foodType}
                  onChange={(e) => setFormData({...formData, foodType: e.target.value})}
                >
                  <option value="produce">Fresh Produce</option>
                  <option value="dairy">Dairy Products</option>
                  <option value="meat">Meat & Poultry</option>
                  <option value="packaged">Packaged Foods</option>
                </select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-green hover:opacity-90" 
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Predict Spoilage Risk"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {prediction && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  Spoilage Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-accent rounded-lg">
                  <Badge className={`text-lg px-4 py-2 ${getRiskColor(prediction.riskLevel)}`}>
                    {prediction.riskLevel} Risk
                  </Badge>
                  <p className="text-3xl font-bold text-foreground mt-2">{prediction.percentage}%</p>
                  <p className="text-sm text-muted-foreground mt-1">Spoilage Probability</p>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {prediction.explanation}
                  </AlertDescription>
                </Alert>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Recommendations:</h4>
                  <ul className="space-y-2">
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Card */}
          <Card className="border-l-4 border-l-emerald">
            <CardHeader>
              <CardTitle className="text-base">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-foreground">
                Our AI model analyzes multiple environmental factors to predict food spoilage risk:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Temperature deviation from optimal ranges</li>
                <li>• Humidity levels and fluctuations</li>
                <li>• Transport duration impact</li>
                <li>• Food type sensitivity factors</li>
              </ul>
              <p className="text-xs text-muted-foreground pt-2">
                This helps optimize routes and reduce food waste by up to 25%.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}