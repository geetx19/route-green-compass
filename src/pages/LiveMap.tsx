import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Truck, Clock, Package } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const activeRoutes = [
  {
    id: "RT001",
    source: { lat: 47.6062, lng: -122.3321, name: "Seattle, WA" },
    destination: { lat: 45.5152, lng: -122.6784, name: "Portland, OR" },
    currentPosition: { lat: 46.7297, lng: -122.4786 },
    status: "in-transit",
    cargo: "Fresh Produce",
    progress: 65
  },
  {
    id: "RT003",
    source: { lat: 25.7617, lng: -80.1918, name: "Miami, FL" },
    destination: { lat: 33.7490, lng: -84.3880, name: "Atlanta, GA" },
    currentPosition: { lat: 28.5383, lng: -81.3792 },
    status: "delayed",
    cargo: "Dairy Products", 
    progress: 30
  },
  {
    id: "RT004",
    source: { lat: 33.7701, lng: -118.1937, name: "Long Beach, CA" },
    destination: { lat: 47.6062, lng: -122.3321, name: "Seattle, WA" },
    currentPosition: { lat: 37.4419, lng: -122.1430 },
    status: "in-transit",
    cargo: "Import Goods",
    progress: 45
  }
];

export default function LiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([39.8283, -98.5795], 4);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create custom icons
    const sourceIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #22c55e; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    const destinationIcon = L.divIcon({
      className: 'custom-div-icon', 
      html: `<div style="background-color: #ef4444; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    const truckIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
        <div style="color: white; font-size: 8px;">🚛</div>
      </div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });

    // Add routes to map
    activeRoutes.forEach((route) => {
      // Source marker
      L.marker([route.source.lat, route.source.lng], { icon: sourceIcon })
        .addTo(map)
        .bindPopup(`<b>Source:</b> ${route.source.name}<br><b>Route:</b> ${route.id}`);

      // Destination marker  
      L.marker([route.destination.lat, route.destination.lng], { icon: destinationIcon })
        .addTo(map)
        .bindPopup(`<b>Destination:</b> ${route.destination.name}<br><b>Route:</b> ${route.id}`);

      // Current position (truck)
      L.marker([route.currentPosition.lat, route.currentPosition.lng], { icon: truckIcon })
        .addTo(map)
        .bindPopup(`<b>Route:</b> ${route.id}<br><b>Cargo:</b> ${route.cargo}<br><b>Progress:</b> ${route.progress}%`);

      // Route line
      const routeLine = L.polyline([
        [route.source.lat, route.source.lng],
        [route.currentPosition.lat, route.currentPosition.lng],
        [route.destination.lat, route.destination.lng]
      ], {
        color: route.status === 'delayed' ? '#ef4444' : '#22c55e',
        weight: 3,
        opacity: 0.7,
        dashArray: route.status === 'delayed' ? '10, 10' : undefined
      }).addTo(map);

      // Progress line (completed portion)
      L.polyline([
        [route.source.lat, route.source.lng],
        [route.currentPosition.lat, route.currentPosition.lng]
      ], {
        color: '#22c55e',
        weight: 5,
        opacity: 0.9
      }).addTo(map);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const focusOnRoute = (route: typeof activeRoutes[0]) => {
    if (!mapInstanceRef.current) return;
    
    setSelectedRoute(route.id);
    
    // Fit map to show the entire route
    const bounds = L.latLngBounds([
      [route.source.lat, route.source.lng],
      [route.destination.lat, route.destination.lng],
      [route.currentPosition.lat, route.currentPosition.lng]
    ]);
    
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Live Route Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div ref={mapRef} className="w-full h-[520px] rounded-b-lg" />
            </CardContent>
          </Card>
        </div>

        {/* Route Details Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Active Routes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeRoutes.map((route) => (
                <div 
                  key={route.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-soft ${
                    selectedRoute === route.id ? 'border-primary bg-accent' : 'border-border'
                  }`}
                  onClick={() => focusOnRoute(route)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{route.id}</h3>
                    <Badge 
                      className={route.status === 'delayed' ? 'bg-danger text-white' : 'bg-success text-white'}
                    >
                      {route.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{route.cargo}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-success" />
                      <span className="text-foreground">{route.source.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-danger" />
                      <span className="text-foreground">{route.destination.name}</span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
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
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Map Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm text-foreground">Source Location</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-danger rounded-full"></div>
                <span className="text-sm text-foreground">Destination</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-info rounded-full flex items-center justify-center text-white text-xs">🚛</div>
                <span className="text-sm text-foreground">Current Position</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-0.5 bg-success"></div>
                <span className="text-sm text-foreground">Completed Route</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-0.5 border-t-2 border-dashed border-danger"></div>
                <span className="text-sm text-foreground">Delayed Route</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}