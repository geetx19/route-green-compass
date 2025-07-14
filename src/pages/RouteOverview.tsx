import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  Ship, 
  Train, 
  Clock, 
  MapPin, 
  AlertCircle,
  CheckCircle,
  Package
} from "lucide-react";

const routes = [
  {
    id: "RT001",
    source: "Seattle, WA",
    destination: "Portland, OR",
    transportType: "truck",
    status: "in-transit",
    estimatedTime: "2h 15m",
    progress: 65,
    cargo: "Fresh Produce",
    driver: "Mike Chen"
  },
  {
    id: "RT002", 
    source: "Los Angeles, CA",
    destination: "San Francisco, CA",
    transportType: "truck",
    status: "completed",
    estimatedTime: "Completed",
    progress: 100,
    cargo: "Organic Grains",
    driver: "Sarah Martinez"
  },
  {
    id: "RT003",
    source: "Miami, FL",
    destination: "Atlanta, GA", 
    transportType: "truck",
    status: "delayed",
    estimatedTime: "5h 45m",
    progress: 30,
    cargo: "Dairy Products",
    driver: "James Wilson"
  },
  {
    id: "RT004",
    source: "Long Beach, CA",
    destination: "Seattle, WA",
    transportType: "ship",
    status: "in-transit",
    estimatedTime: "1d 8h",
    progress: 45,
    cargo: "Import Goods",
    driver: "Captain Rodriguez"
  },
  {
    id: "RT005",
    source: "Chicago, IL",
    destination: "New York, NY",
    transportType: "rail",
    status: "scheduled",
    estimatedTime: "18h 30m",
    progress: 0,
    cargo: "Packaged Foods",
    driver: "Train Operator"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-success text-white";
    case "in-transit":
      return "bg-info text-white";
    case "delayed":
      return "bg-danger text-white";
    case "scheduled":
      return "bg-warning text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4" />;
    case "in-transit":
      return <Truck className="w-4 h-4" />;
    case "delayed":
      return <AlertCircle className="w-4 h-4" />;
    case "scheduled":
      return <Clock className="w-4 h-4" />;
    default:
      return <Package className="w-4 h-4" />;
  }
};

const getTransportIcon = (type: string) => {
  switch (type) {
    case "truck":
      return <Truck className="w-5 h-5" />;
    case "ship":
      return <Ship className="w-5 h-5" />;
    case "rail":
      return <Train className="w-5 h-5" />;
    default:
      return <Package className="w-5 h-5" />;
  }
};

export default function RouteOverview() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Routes</p>
                <p className="text-2xl font-bold text-success">12</p>
              </div>
              <Truck className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delayed</p>
                <p className="text-2xl font-bold text-warning">3</p>
              </div>
              <AlertCircle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-info">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Time</p>
                <p className="text-2xl font-bold text-info">89%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Efficiency</p>
                <p className="text-2xl font-bold text-primary">94%</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Routes Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Supply Routes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routes.map((route) => (
              <div key={route.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent rounded-lg">
                      {getTransportIcon(route.transportType)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{route.id}</h3>
                      <p className="text-sm text-muted-foreground">{route.cargo}</p>
                    </div>
                  </div>
                  <Badge className={`flex items-center gap-1 ${getStatusColor(route.status)}`}>
                    {getStatusIcon(route.status)}
                    {route.status.replace("-", " ").toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-success" />
                    <span className="text-sm text-foreground">{route.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-danger" />
                    <span className="text-sm text-foreground">{route.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{route.estimatedTime}</span>
                  </div>
                </div>

                {route.status !== "completed" && route.status !== "scheduled" && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">{route.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-green h-2 rounded-full transition-all duration-300"
                        style={{ width: `${route.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Driver: {route.driver}</span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}