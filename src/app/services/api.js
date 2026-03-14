// Mock API service simulating backend responses

export const generateItinerary = async (destination, days, budget, interests) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const itineraries = {
    Hyderabad: [
      {
        day: 1,
        places: [
          {
            name: "Charminar",
            description: "Historic monument and mosque",
            image: "https://images.unsplash.com/photo-1760549310130-d970c7cf2d83?w=500",
            distance: "2 km",
            safetyScore: 8.5,
            timeToSpend: "1-2 hours"
          },
          {
            name: "Chowmahalla Palace",
            description: "Palace of the Nizams",
            image: "https://images.unsplash.com/photo-1658163724548-29ef00812a54?w=500",
            distance: "1.5 km",
            safetyScore: 9.0,
            timeToSpend: "2-3 hours"
          },
          {
            name: "Laad Bazaar",
            description: "Famous for bangles and jewelry",
            image: "https://images.unsplash.com/photo-1767974922022-333e5ad861f8?w=500",
            distance: "0.5 km",
            safetyScore: 7.8,
            timeToSpend: "1-2 hours"
          }
        ]
      },
      {
        day: 2,
        places: [
          {
            name: "Golconda Fort",
            description: "Historic fort with acoustic architecture",
            image: "https://images.unsplash.com/photo-1760549310130-d970c7cf2d83?w=500",
            distance: "11 km",
            safetyScore: 8.7,
            timeToSpend: "3-4 hours"
          },
          {
            name: "Qutub Shahi Tombs",
            description: "Ancient royal tombs",
            image: "https://images.unsplash.com/photo-1658163724548-29ef00812a54?w=500",
            distance: "2 km",
            safetyScore: 8.9,
            timeToSpend: "1-2 hours"
          }
        ]
      },
      {
        day: 3,
        places: [
          {
            name: "Ramoji Film City",
            description: "World's largest film studio complex",
            image: "https://images.unsplash.com/photo-1697106719728-14f5aad54a27?w=500",
            distance: "25 km",
            safetyScore: 9.2,
            timeToSpend: "Full day"
          }
        ]
      }
    ],
    default: [
      {
        day: 1,
        places: [
          {
            name: "City Center",
            description: "Main tourist attraction",
            image: "https://images.unsplash.com/photo-1658163724548-29ef00812a54?w=500",
            distance: "5 km",
            safetyScore: 8.0,
            timeToSpend: "2-3 hours"
          },
          {
            name: "Historical Museum",
            description: "Learn about local history",
            image: "https://images.unsplash.com/photo-1760549310130-d970c7cf2d83?w=500",
            distance: "3 km",
            safetyScore: 8.5,
            timeToSpend: "2-3 hours"
          }
        ]
      }
    ]
  };

  const plan = itineraries[destination] || itineraries.default;
  return plan.slice(0, parseInt(days) || 3);
};

export const getSafetyScore = async (location) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    location,
    overallScore: 8.2,
    crimeRate: 7.5,
    crowdDensity: 6.8,
    policeCoverage: 9.0,
    userReports: 8.5,
    safeZones: [
      { name: "Downtown Area", score: 9.1 },
      { name: "Shopping District", score: 8.7 },
      { name: "Tourist Hub", score: 9.3 }
    ],
    riskZones: [
      { name: "Old Market", score: 6.2 },
      { name: "Industrial Area", score: 5.8 }
    ],
    alerts: [
      { type: "info", message: "High crowd expected near main attractions on weekends" },
      { type: "success", message: "Increased police patrol during evening hours" }
    ]
  };
};

export const getLocalServices = async (location, serviceType = "all") => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const services = {
    restaurants: [
      {
        name: "Paradise Biryani",
        type: "Restaurant",
        rating: 4.5,
        distance: "1.2 km",
        address: "MG Road, City Center",
        cuisine: "Indian, Biryani",
        priceRange: "₹₹"
      },
      {
        name: "Shah Ghouse",
        type: "Restaurant",
        rating: 4.3,
        distance: "2.1 km",
        address: "Charminar Area",
        cuisine: "Mughlai, North Indian",
        priceRange: "₹₹"
      },
      {
        name: "Cafe Coffee Day",
        type: "Cafe",
        rating: 4.0,
        distance: "0.8 km",
        address: "Shopping Mall, Level 2",
        cuisine: "Coffee, Snacks",
        priceRange: "₹"
      }
    ],
    groceries: [
      {
        name: "Reliance Smart",
        type: "Supermarket",
        rating: 4.2,
        distance: "1.5 km",
        address: "Main Street",
        hours: "8 AM - 10 PM"
      },
      {
        name: "Local Fresh Market",
        type: "Market",
        rating: 4.0,
        distance: "0.9 km",
        address: "Market Road",
        hours: "6 AM - 8 PM"
      }
    ],
    pharmacies: [
      {
        name: "Apollo Pharmacy",
        type: "Pharmacy",
        rating: 4.4,
        distance: "0.7 km",
        address: "Hospital Road",
        hours: "24/7"
      },
      {
        name: "MedPlus",
        type: "Pharmacy",
        rating: 4.1,
        distance: "1.3 km",
        address: "Shopping Complex",
        hours: "8 AM - 11 PM"
      }
    ],
    atms: [
      {
        name: "HDFC Bank ATM",
        type: "ATM",
        distance: "0.3 km",
        address: "Near City Center",
        status: "Available"
      },
      {
        name: "SBI ATM",
        type: "ATM",
        distance: "0.6 km",
        address: "Main Road",
        status: "Available"
      }
    ]
  };

  if (serviceType === "all") {
    return services;
  }
  return services[serviceType] || [];
};

export const getEmergencyLocations = async (currentLocation) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    policeStations: [
      {
        name: "City Police Station",
        distance: "1.2 km",
        address: "Police Line Road",
        phone: "100",
        estimatedTime: "5 mins"
      },
      {
        name: "Tourist Police Help Center",
        distance: "2.5 km",
        address: "Tourist Hub",
        phone: "1091",
        estimatedTime: "8 mins"
      }
    ],
    hospitals: [
      {
        name: "Apollo Hospital",
        distance: "1.8 km",
        address: "Health Care Avenue",
        phone: "108",
        type: "Multi-specialty",
        estimatedTime: "6 mins"
      },
      {
        name: "City General Hospital",
        distance: "3.2 km",
        address: "Hospital Road",
        phone: "102",
        type: "Government Hospital",
        estimatedTime: "10 mins"
      }
    ],
    emergencyContacts: [
      { service: "Police", number: "100" },
      { service: "Ambulance", number: "108" },
      { service: "Fire", number: "101" },
      { service: "Women Helpline", number: "1091" },
      { service: "Tourist Helpline", number: "1363" }
    ]
  };
};

export const getTransportOptions = async (from, to) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      type: "Metro + Cab",
      time: "35 mins",
      cost: "₹120",
      safetyScore: 8.1,
      steps: ["Take Metro to Station X", "Book cab for 5km"]
    },
    {
      type: "Direct Cab",
      time: "28 mins",
      cost: "₹250",
      safetyScore: 8.5,
      steps: ["Book Uber/Ola"]
    },
    {
      type: "Bus",
      time: "50 mins",
      cost: "₹40",
      safetyScore: 7.8,
      steps: ["Take Route 45 bus"]
    }
  ];
};
