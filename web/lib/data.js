// Mock data for the AI-Powered Ambulance Dispatch System

export const liveStats = {
  ongoingEmergencies: 13,
  avgResponseTime: "6 min",
  availableAmbulances: 22,
  hospitalBedUtilization: "82%",
}

export const aiAlerts = [
  {
    id: 1,
    title: "High-Demand Zone Detected",
    description: "Downtown area showing 40% increase in emergency calls",
    severity: "high",
    timestamp: "2 min ago",
  },
  {
    id: 2,
    title: "Predicted Shortage of Ambulances",
    description: "AI predicts ambulance shortage in North sector within 15 minutes",
    severity: "medium",
    timestamp: "5 min ago",
  },
  {
    id: 3,
    title: "Route Congestions",
    description: "Heavy traffic detected on Highway 401 - rerouting recommended",
    severity: "medium",
    timestamp: "8 min ago",
  },
]

export const incidents = [
  {
    id: "A12345",
    status: "On Route",
    severity: "High",
    location: "181 Longton Step6 N",
    assignedAmbulance: "Ambulance 3",
    eta: "4 min",
    timestamp: "10:23 AM",
  },
  {
    id: "A12346",
    status: "At Scene",
    severity: "Medium",
    location: "5211 Labe Ave W",
    assignedAmbulance: "Ambulance 1",
    eta: "On site",
    timestamp: "10:15 AM",
  },
  {
    id: "A12347",
    status: "Moving",
    severity: "High",
    location: "531 Pave Trace W",
    assignedAmbulance: "Ambulance 2",
    eta: "2 min",
    timestamp: "10:18 AM",
  },
  {
    id: "A12348",
    status: "Dispatched",
    severity: "Low",
    location: "892 Oak Street E",
    assignedAmbulance: "Ambulance 7",
    eta: "7 min",
    timestamp: "10:25 AM",
  },
  {
    id: "A12349",
    status: "On Route",
    severity: "Medium",
    location: "1456 Maple Drive S",
    assignedAmbulance: "Ambulance 5",
    eta: "5 min",
    timestamp: "10:20 AM",
  },
]

export const mapMarkers = [
  // Emergencies (Red)
  { id: 1, type: "emergency", lat: 43.6532, lng: -79.3832, label: "A12345" },
  { id: 2, type: "emergency", lat: 43.6612, lng: -79.3952, label: "A12346" },
  { id: 3, type: "emergency", lat: 43.6482, lng: -79.3712, label: "A12347" },
  
  // Hospitals (Green)
  { id: 4, type: "hospital", lat: 43.6572, lng: -79.3872, label: "Toronto General" },
  { id: 5, type: "hospital", lat: 43.6652, lng: -79.3932, label: "St. Michael's" },
  { id: 6, type: "hospital", lat: 43.6442, lng: -79.3792, label: "Mount Sinai" },
  
  // Ambulances (Blue)
  { id: 7, type: "ambulance", lat: 43.6552, lng: -79.3852, label: "Unit 3" },
  { id: 8, type: "ambulance", lat: 43.6592, lng: -79.3892, label: "Unit 1" },
  { id: 9, type: "ambulance", lat: 43.6512, lng: -79.3772, label: "Unit 2" },
  { id: 10, type: "ambulance", lat: 43.6632, lng: -79.3912, label: "Unit 5" },
]

export const quickActions = [
  {
    id: 1,
    title: "Dispatch Ambulance",
    description: "Manually dispatch an ambulance to a location",
    icon: "Truck",
    color: "blue",
  },
  {
    id: 2,
    title: "Add Incident Manually",
    description: "Create a new emergency incident",
    icon: "Plus",
    color: "green",
  },
  {
    id: 3,
    title: "Override AI Decision",
    description: "Manually override AI routing decisions",
    icon: "AlertTriangle",
    color: "red",
  },
]
