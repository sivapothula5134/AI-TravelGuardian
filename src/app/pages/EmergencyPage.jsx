import { useState, useEffect } from 'react';
import { AlertCircle, Phone, MapPin, Navigation, Shield, Clock, Heart } from 'lucide-react';
import { getEmergencyLocations } from '../services/api';

export function EmergencyPage() {
  const [emergencyData, setEmergencyData] = useState(null);
  const [panicActivated, setPanicActivated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmergencyData();
  }, []);

  const loadEmergencyData = async () => {
    setLoading(true);
    try {
      const data = await getEmergencyLocations('current-location');
      setEmergencyData(data);
    } catch (error) {
      console.error('Error loading emergency data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePanicButton = () => {
    setPanicActivated(true);
    // In a real app, this would:
    // 1. Share location with emergency contacts
    // 2. Alert nearby authorities
    // 3. Start recording/tracking
    setTimeout(() => {
      alert('Emergency alert sent! Location shared with emergency contacts and authorities.');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Emergency Assistance</h1>
          <p className="text-xl text-gray-600">
            Quick access to emergency services and help centers
          </p>
        </div>

        {/* Panic Button */}
        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-2xl p-8 mb-12 text-white">
          <div className="text-center max-w-2xl mx-auto">
            <AlertCircle className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Emergency Panic Button</h2>
            <p className="text-red-100 mb-8 text-lg">
              Press this button in case of emergency. Your location will be shared with emergency contacts and nearby authorities.
            </p>
            <button
              onClick={handlePanicButton}
              className={`w-full max-w-md mx-auto py-8 rounded-2xl font-bold text-2xl transition-all shadow-2xl ${
                panicActivated
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-white text-red-600 hover:bg-red-50 hover:scale-105 active:scale-95'
              }`}
              disabled={panicActivated}
            >
              {panicActivated ? '✓ ALERT SENT' : '🚨 PANIC BUTTON'}
            </button>
            {panicActivated && (
              <div className="mt-6 bg-white bg-opacity-20 rounded-lg p-4">
                <p className="font-semibold">Emergency services have been notified</p>
                <p className="text-sm text-red-100 mt-2">Help is on the way. Stay calm and safe.</p>
              </div>
            )}
          </div>
        </div>

        {emergencyData && (
          <div className="space-y-8">
            {/* Emergency Contacts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Phone className="w-6 h-6 text-blue-600" />
                Emergency Contact Numbers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencyData.emergencyContacts.map((contact, index) => (
                  <a
                    key={index}
                    href={`tel:${contact.number}`}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-shadow border border-blue-200"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{contact.service}</p>
                      <p className="text-2xl font-bold text-blue-600">{contact.number}</p>
                    </div>
                    <Phone className="w-6 h-6 text-blue-600" />
                  </a>
                ))}
              </div>
            </div>

            {/* Nearest Police Stations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Nearest Police Stations
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {emergencyData.policeStations.map((station, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{station.name}</h3>
                        <p className="text-gray-600">{station.address}</p>
                      </div>
                      <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {station.distance}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <a href={`tel:${station.phone}`} className="font-medium hover:text-blue-600">
                          {station.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>Estimated arrival: {station.estimatedTime}</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-4 flex items-center justify-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Get Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearest Hospitals */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-600" />
                Nearest Hospitals
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {emergencyData.hospitals.map((hospital, index) => (
                  <div
                    key={index}
                    className="bg-red-50 border-2 border-red-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{hospital.name}</h3>
                        <p className="text-gray-600">{hospital.address}</p>
                        <p className="text-sm text-gray-500 mt-1">{hospital.type}</p>
                      </div>
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {hospital.distance}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-4 h-4 text-red-600" />
                        <a href={`tel:${hospital.phone}`} className="font-medium hover:text-red-600">
                          {hospital.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-red-600" />
                        <span>Estimated arrival: {hospital.estimatedTime}</span>
                      </div>
                      <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium mt-4 flex items-center justify-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Get Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
                Emergency Safety Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">In Case of Emergency:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Stay calm and assess the situation</li>
                    <li>• Move to a safe location if possible</li>
                    <li>• Call emergency services immediately</li>
                    <li>• Share your location with trusted contacts</li>
                    <li>• Follow instructions from authorities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Preventive Measures:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Keep emergency numbers saved in your phone</li>
                    <li>• Inform family/friends about your travel plans</li>
                    <li>• Carry important documents and medications</li>
                    <li>• Stay aware of your surroundings</li>
                    <li>• Use our Safety Map to avoid risky areas</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Route Map</h2>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-12 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Interactive route to nearest help centers</p>
                  <p className="text-sm text-gray-500">
                    Fastest and safest routes to emergency services
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
