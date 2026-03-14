import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, TrendingUp, Users, MapPin, Info } from 'lucide-react';
import { getSafetyScore } from '../services/api';
import { SafetyScoreBadge } from '../components/SafetyScoreBadge';

export function SafetyMapPage() {
  const [location, setLocation] = useState('Hyderabad');
  const [safetyData, setSafetyData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSafetyData();
  }, []);

  const loadSafetyData = async () => {
    setLoading(true);
    try {
      const data = await getSafetyScore(location);
      setSafetyData(data);
    } catch (error) {
      console.error('Error loading safety data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = () => {
    loadSafetyData();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety Map & Monitoring</h1>
          <p className="text-xl text-gray-600">
            Real-time safety scores and area monitoring for secure travel
          </p>
        </div>

        {/* Location Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city or area name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleLocationChange}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Check Safety
            </button>
          </div>
        </div>

        {safetyData && (
          <div className="space-y-8">
            {/* Overall Safety Score */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Overall Safety Score</h2>
                  <p className="text-blue-100">Based on multiple safety factors</p>
                </div>
                <Shield className="w-16 h-16 opacity-50" />
              </div>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-6xl font-bold">{safetyData.overallScore}</span>
                <span className="text-2xl mb-2">/10</span>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <p className="text-sm">
                  {safetyData.overallScore >= 8
                    ? '✓ This area is generally safe for tourists'
                    : safetyData.overallScore >= 6
                    ? '⚠ Exercise normal caution in this area'
                    : '⚠ Extra precautions recommended'}
                </p>
              </div>
            </div>

            {/* Safety Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">{safetyData.crimeRate}/10</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Crime Rate</h3>
                <p className="text-sm text-gray-600">Lower is better</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                  <span className="text-2xl font-bold text-gray-900">{safetyData.crowdDensity}/10</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Crowd Density</h3>
                <p className="text-sm text-gray-600">Current congestion level</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <MapPin className="w-8 h-8 text-green-600" />
                  <span className="text-2xl font-bold text-gray-900">{safetyData.policeCoverage}/10</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Police Coverage</h3>
                <p className="text-sm text-gray-600">Security presence</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                  <span className="text-2xl font-bold text-gray-900">{safetyData.userReports}/10</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">User Reports</h3>
                <p className="text-sm text-gray-600">Traveler feedback</p>
              </div>
            </div>

            {/* Alerts */}
            {safetyData.alerts && safetyData.alerts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  Safety Alerts & Notifications
                </h2>
                <div className="space-y-3">
                  {safetyData.alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'success'
                          ? 'bg-green-50 border-green-500'
                          : alert.type === 'warning'
                          ? 'bg-yellow-50 border-yellow-500'
                          : 'bg-blue-50 border-blue-500'
                      }`}
                    >
                      <p className="text-gray-800">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safe Zones */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  Safe Zones
                </h2>
                <div className="space-y-3">
                  {safetyData.safeZones.map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="font-medium text-gray-900">{zone.name}</span>
                      <SafetyScoreBadge score={zone.score} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  Areas Requiring Caution
                </h2>
                <div className="space-y-3">
                  {safetyData.riskZones.map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <span className="font-medium text-gray-900">{zone.name}</span>
                      <SafetyScoreBadge score={zone.score} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Safety Heatmap</h2>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-12 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Interactive Safety Map</p>
                  <p className="text-sm text-gray-500">
                    Visual representation of safety zones and risk areas
                  </p>
                  <div className="mt-6 flex justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-sm text-gray-600">Safe</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span className="text-sm text-gray-600">Moderate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm text-gray-600">Caution</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-600" />
                Safety Recommendations
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Avoid traveling alone in low-scored areas, especially after dark</li>
                <li>• Keep your valuables secure and stay aware of your surroundings</li>
                <li>• Share your location with trusted contacts when exploring new areas</li>
                <li>• Use our Emergency page for quick access to police and medical services</li>
                <li>• Trust your instincts - if something feels unsafe, leave the area</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
