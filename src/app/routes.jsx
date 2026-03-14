import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { LandingPage } from './pages/LandingPage';
import { PlanTripPage } from './pages/PlanTripPage';
import { SafetyMapPage } from './pages/SafetyMapPage';
import { LocalServicesPage } from './pages/LocalServicesPage';
import { EmergencyPage } from './pages/EmergencyPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'plan-trip', Component: PlanTripPage },
      { path: 'safety-map', Component: SafetyMapPage },
      { path: 'local-services', Component: LocalServicesPage },
      { path: 'emergency', Component: EmergencyPage }
    ]
  }
]);
