Build a full-stack web application for a smart tourism platform called **TravelGuardian AI – Intelligent Agent for Smart and Safe Tourism**.

The project must use **React with JavaScript (NOT TypeScript)** and must generate a **fully functional website UI** that mimics a real travel assistant platform.

The project must have **two separate folders: frontend and backend**.

Project Folder Structure:

travelguardian-ai
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles
│   └── package.json
│
└── backend
├── main.py
├── routes
├── models
└── requirements.txt

Frontend Requirements:

Use:

* React (JavaScript only)
* Tailwind CSS
* React Router
* Axios for API requests

Design a modern travel platform UI similar to Google Travel or Airbnb.

Color Theme:
Primary: Blue (#2563EB)
Secondary: Green (#22C55E)
Background: Light Gray
Font: Inter or Poppins

Pages to Build:

1. Landing Page
   Navbar:
   Logo: TravelGuardian AI
   Menu:
   Home
   Plan Trip
   Safety Map
   Local Services
   Emergency

Hero Section:
Headline:
"Plan Smart. Travel Safe."

Input Form:
Destination
Number of Days
Budget
Travel Interests

Button:
Generate AI Travel Plan

Feature Section with cards:
AI Travel Planner
Safety Monitoring
Local Discovery
Emergency Assistance

Footer with contact links.

2. Trip Planner Page

Form Inputs:
Destination
Number of days
Budget
Interests

Button:
Generate Plan

Output Section:
Display generated itinerary

Example layout:

Day 1
Charminar
Chowmahalla Palace
Laad Bazaar

Day 2
Golconda Fort
Qutub Shahi Tombs

Each location should show:
Location card
Image
Distance
Safety Score badge

3. Safety Map Page

Map layout showing:
Safe areas
High risk zones
Crowd density indicators

Display:
Safety score heatmap
Alert banner if area is unsafe

4. Local Services Page

Show nearby:

Restaurants
Grocery Stores
Pharmacies
ATMs
Local Markets

Each service displayed as a card showing:

Name
Rating
Distance
Map location

Add search bar:
"Find services near me"

5. Emergency Page

Large Panic Button

When clicked:
Show nearby police station
Show nearby hospital
Display emergency contact numbers

UI panels should display:
Police location
Hospital location
Emergency route map

Components to Create:

Navbar
HeroSection
TripForm
ItineraryCard
SafetyScoreBadge
MapView
ServiceCard
EmergencyPanel
Footer

Backend Requirements:

Use Python FastAPI.

Create APIs:

POST /generate-itinerary
Returns day-wise itinerary.

GET /safety-score
Returns safety score for locations.

GET /local-services
Returns nearby restaurants and grocery stores.

GET /emergency-locations
Returns nearest police station and hospitals.

Backend should return **mock data for prototype purposes**.

Example:

Restaurants
Paradise Biryani
Shah Ghouse

Grocery Stores
Reliance Smart
Local Market

Emergency
Police Station
Apollo Hospital

Frontend should fetch these APIs using Axios.

Add responsive design for desktop and mobile.

The UI must use:
Card layouts
Modern dashboard style
Travel imagery
Icons for safety, maps, restaurants, and emergency.

The website should behave like a working travel assistant platform even if the AI responses are simulated with dummy data.

Ensure code is written in **JavaScript React, not TypeScript**.
