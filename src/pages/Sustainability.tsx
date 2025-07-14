import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  Zap, 
  Recycle, 
  TreePine, 
  Truck, 
  Award,
  Target,
  Calendar,
  TrendingUp,
  Clock
} from "lucide-react";

const greenInitiatives = [
  {
    id: 1,
    title: "Electric Vehicle Fleet Expansion",
    description: "Transitioning to electric delivery vehicles in urban areas",
    progress: 68,
    target: 85,
    deadline: "Dec 2024",
    status: "In Progress",
    impact: "Reduces CO2 emissions by 40% per route",
    icon: Zap,
    color: "text-blue-600"
  },
  {
    id: 2,
    title: "Carbon-Neutral Route Optimization",
    description: "AI-powered routing to minimize carbon footprint",
    progress: 92,
    target: 100,
    deadline: "Sep 2024",
    status: "Nearly Complete",
    impact: "15% reduction in total emissions",
    icon: Truck,
    color: "text-green-600"
  },
  {
    id: 3,
    title: "Compostable Packaging Program", 
    description: "Replace plastic packaging with biodegradable alternatives",
    progress: 45,
    target: 75,
    deadline: "Mar 2025",
    status: "In Progress",
    impact: "90% packaging waste reduction",
    icon: Recycle,
    color: "text-emerald-600"
  },
  {
    id: 4,
    title: "Reforestation Partnership",
    description: "Plant trees to offset carbon emissions from transport",
    progress: 156,
    target: 100,
    deadline: "Ongoing",
    status: "Exceeded",
    impact: "2,500 trees planted this year",
    icon: TreePine,
    color: "text-green-700"
  }
];

const sustainabilityMetrics = [
  {
    title: "Electric Vehicle Usage",
    current: 68,
    target: 85,
    unit: "%",
    trend: "+12% this month",
    icon: Zap,
    color: "bg-blue-500"
  },
  {
    title: "Carbon-Neutral Routes",
    current: 92,
    target: 100,
    unit: "%",
    trend: "+5% this month",
    icon: Leaf,
    color: "bg-green-500"
  },
  {
    title: "Waste Reduction",
    current: 34,
    target: 50,
    unit: "%",
    trend: "+8% this month",
    icon: Recycle,
    color: "bg-emerald-500"
  },
  {
    title: "Sustainable Packaging",
    current: 78,
    target: 90,
    unit: "%",
    trend: "+15% this month",
    icon: Package,
    color: "bg-teal-500"
  }
];

const milestones = [
  {
    date: "Oct 2024",
    title: "Zero Waste Milestone",
    description: "Achieved 95% waste diversion from landfills",
    status: "completed",
    impact: "12 tons of waste redirected"
  },
  {
    date: "Sep 2024", 
    title: "Electric Fleet Expansion",
    description: "Added 15 new electric vehicles to the fleet",
    status: "completed",
    impact: "25% reduction in fleet emissions"
  },
  {
    date: "Aug 2024",
    title: "Renewable Energy Integration",
    description: "Warehouse operations now 100% solar powered",
    status: "completed", 
    impact: "180 MWh clean energy annually"
  },
  {
    date: "Dec 2024",
    title: "Carbon Neutral Certification",
    description: "Complete carbon neutrality across all operations",
    status: "upcoming",
    impact: "Net zero carbon footprint"
  },
  {
    date: "Feb 2025",
    title: "Circular Economy Initiative",
    description: "Launch closed-loop packaging system",
    status: "planned",
    impact: "100% recyclable packaging"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-success text-white";
    case "upcoming":
      return "bg-warning text-white";
    case "planned":
      return "bg-info text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getProgressColor = (progress: number, target: number) => {
  const percentage = (progress / target) * 100;
  if (percentage >= 100) return "bg-success";
  if (percentage >= 75) return "bg-emerald-500";
  if (percentage >= 50) return "bg-warning";
  return "bg-info";
};

function Package(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

export default function Sustainability() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-green rounded-lg">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Sustainability Insights</h2>
          <p className="text-muted-foreground">Track our environmental impact and green initiatives</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sustainabilityMetrics.map((metric, index) => (
          <Card key={index} className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${metric.color} text-white`}>
                  <metric.icon className="w-5 h-5" />
                </div>
                <Badge variant="outline" className="text-xs">
                  Target: {metric.target}{metric.unit}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">{metric.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    {metric.current}{metric.unit}
                  </span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-xs text-success">{metric.trend}</span>
                  </div>
                </div>
                <Progress 
                  value={(metric.current / metric.target) * 100} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Green Initiatives */}
        <div className="h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Active Green Initiatives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {greenInitiatives.map((initiative) => (
                <div key={initiative.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-accent rounded-lg ${initiative.color}`}>
                        <initiative.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{initiative.title}</h4>
                        <p className="text-sm text-muted-foreground">{initiative.description}</p>
                      </div>
                    </div>
                    <Badge 
                      className={
                        initiative.progress >= initiative.target 
                          ? "bg-success text-white" 
                          : "bg-info text-white"
                      }
                    >
                      {initiative.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground">
                        {initiative.progress}% / {initiative.target}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(initiative.progress, initiative.target)}`}
                        style={{ width: `${Math.min((initiative.progress / initiative.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Due: {initiative.deadline}</span>
                    </div>
                    <span className="text-success font-medium">{initiative.impact}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Milestones Timeline */}
        <div className="h-full flex flex-col space-y-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Sustainability Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
                
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-border bg-background ${
                          milestone.status === 'completed' ? 'border-success bg-success text-white' :
                          milestone.status === 'upcoming' ? 'border-warning bg-warning text-white' :
                          'border-info bg-info text-white'
                        }`}>
                          {milestone.status === 'completed' ? (
                            <Award className="w-5 h-5" />
                          ) : milestone.status === 'upcoming' ? (
                            <Clock className="w-5 h-5" />
                          ) : (
                            <Target className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-muted-foreground">{milestone.date}</span>
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status.toUpperCase()}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">{milestone.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                        <div className="flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-success" />
                          <span className="text-sm text-success font-medium">{milestone.impact}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Impact Summary */}
          <Card className="border-l-4 border-l-emerald">
            <CardHeader>
              <CardTitle className="text-base">Environmental Impact This Year</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-accent rounded-lg">
                  <p className="text-2xl font-bold text-success">2.3k</p>
                  <p className="text-xs text-muted-foreground">Trees Planted</p>
                </div>
                <div className="text-center p-3 bg-accent rounded-lg">
                  <p className="text-2xl font-bold text-info">34%</p>
                  <p className="text-xs text-muted-foreground">CO2 Reduction</p>
                </div>
                <div className="text-center p-3 bg-accent rounded-lg">
                  <p className="text-2xl font-bold text-warning">12.5</p>
                  <p className="text-xs text-muted-foreground">Tons Waste Saved</p>
                </div>
                <div className="text-center p-3 bg-accent rounded-lg">
                  <p className="text-2xl font-bold text-emerald">180</p>
                  <p className="text-xs text-muted-foreground">MWh Clean Energy</p>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="text-sm text-foreground font-medium mb-1">Next Goal:</p>
                <p className="text-xs text-muted-foreground">
                  Achieve complete carbon neutrality by December 2024
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}