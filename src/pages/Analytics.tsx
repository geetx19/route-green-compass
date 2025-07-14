import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Leaf, Package, Truck, BarChart3 } from "lucide-react";

// Mock data for charts
const spoilageTrends = [
  { month: "Jan", spoilageRate: 8.2, target: 6.0 },
  { month: "Feb", spoilageRate: 7.1, target: 6.0 },
  { month: "Mar", spoilageRate: 6.8, target: 6.0 },
  { month: "Apr", spoilageRate: 5.9, target: 6.0 },
  { month: "May", spoilageRate: 5.2, target: 6.0 },
  { month: "Jun", spoilageRate: 4.8, target: 6.0 },
];

const carbonEmissions = [
  { route: "Seattle-Portland", emissions: 45, efficiency: 92 },
  { route: "LA-SF", emissions: 52, efficiency: 88 },
  { route: "Miami-Atlanta", emissions: 78, efficiency: 85 },
  { route: "Chicago-NYC", emissions: 134, efficiency: 90 },
  { route: "Denver-Phoenix", emissions: 89, efficiency: 87 },
];

const deliveryEfficiency = [
  { month: "Jan", onTime: 87, delayed: 13 },
  { month: "Feb", onTime: 89, delayed: 11 },
  { month: "Mar", onTime: 91, delayed: 9 },
  { month: "Apr", onTime: 94, delayed: 6 },
  { month: "May", onTime: 92, delayed: 8 },
  { month: "Jun", onTime: 95, delayed: 5 },
];

const packagingSustainability = [
  { name: "Recyclable", value: 45, color: "#22c55e" },
  { name: "Biodegradable", value: 30, color: "#84cc16" },
  { name: "Compostable", value: 15, color: "#65a30d" },
  { name: "Traditional", value: 10, color: "#94a3b8" },
];

const weeklyPerformance = [
  { day: "Mon", routes: 24, avgEfficiency: 91 },
  { day: "Tue", routes: 28, avgEfficiency: 93 },
  { day: "Wed", routes: 32, avgEfficiency: 89 },
  { day: "Thu", routes: 29, avgEfficiency: 95 },
  { day: "Fri", routes: 35, avgEfficiency: 92 },
  { day: "Sat", routes: 18, avgEfficiency: 88 },
  { day: "Sun", routes: 12, avgEfficiency: 94 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-green rounded-lg">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Environmental KPIs and performance metrics</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Waste Reduction</p>
                <p className="text-2xl font-bold text-success">-23%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4 text-success" />
                  <span className="text-xs text-success">vs last month</span>
                </div>
              </div>
              <Leaf className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-info">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Carbon Footprint</p>
                <p className="text-2xl font-bold text-info">2.1 tons</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="w-4 h-4 text-success" />
                  <span className="text-xs text-success">-15% this month</span>
                </div>
              </div>
              <Truck className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivery Efficiency</p>
                <p className="text-2xl font-bold text-warning">95%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-xs text-success">+3% improvement</span>
                </div>
              </div>
              <Package className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Green Packaging</p>
                <p className="text-2xl font-bold text-primary">90%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-xs text-success">+8% adoption</span>
                </div>
              </div>
              <Leaf className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spoilage Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Food Spoilage Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={spoilageTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="spoilageRate" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  name="Spoilage Rate (%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#22c55e" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="Target (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Delivery Efficiency */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Delivery Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={deliveryEfficiency}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="onTime" 
                  stackId="1"
                  stroke="#22c55e" 
                  fill="#22c55e"
                  name="On Time (%)"
                />
                <Area 
                  type="monotone" 
                  dataKey="delayed" 
                  stackId="1"
                  stroke="#ef4444" 
                  fill="#ef4444"
                  name="Delayed (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Carbon Emissions by Route */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Carbon Emissions by Route
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={carbonEmissions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="route" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="emissions" fill="#3b82f6" name="CO2 (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Packaging Sustainability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              Packaging Sustainability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={packagingSustainability}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {packagingSustainability.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {packagingSustainability.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-foreground">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Weekly Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="routes" fill="#22c55e" name="Active Routes" />
              <Bar dataKey="avgEfficiency" fill="#3b82f6" name="Avg Efficiency (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}