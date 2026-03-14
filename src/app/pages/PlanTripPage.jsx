import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Loader2, Sparkles, Calendar } from 'lucide-react';
import { generateItinerary } from '../services/api';
import { ItineraryCard } from '../components/ItineraryCard';

export function PlanTripPage() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    destination: '',
    days: '3',
    budget: '',
    interests: []
  });
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
      handleGenerate(location.state);
    }
  }, []);

  const handleGenerate = async (data = formData) => {
    if (!data.destination || !data.days || !data.budget) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const result = await generateItinerary(
        data.destination,
        data.days,
        data.budget,
        data.interests
      );
      setItinerary(result);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      alert('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Travel Planner</h1>
          <p className="text-xl text-gray-600">
            Let our AI create the perfect itinerary for your journey
          </p>
        </div>

        {/* Planning Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Trip Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination *
              </label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="e.g., Hyderabad"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Days *
              </label>
              <input
                type="number"
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                placeholder="3"
                min="1"
                max="30"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget *
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Budget</option>
                <option value="budget">Budget</option>
                <option value="moderate">Moderate</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => handleGenerate()}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Plan
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Travel Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {['Culture', 'Food', 'Adventure', 'Shopping', 'Nature', 'History', 'Photography'].map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => {
                    const newInterests = formData.interests.includes(interest)
                      ? formData.interests.filter(i => i !== interest)
                      : [...formData.interests, interest];
                    setFormData({ ...formData, interests: newInterests });
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Itinerary Display */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-lg text-gray-600">AI is crafting your perfect itinerary...</p>
          </div>
        )}

        {!loading && itinerary && (
          <div className="space-y-12">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Your {formData.days}-Day Journey to {formData.destination}</span>
              </div>
            </div>

            {itinerary.map((day) => (
              <div key={day.day} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    {day.day}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Day {day.day}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {day.places.map((place, index) => (
                    <ItineraryCard key={index} place={place} />
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Travel Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Book transportation between locations in advance for better prices</li>
                <li>• Check safety scores before visiting each location</li>
                <li>• Keep emergency contacts handy using our Emergency page</li>
                <li>• Use our Local Services page to find nearby restaurants and facilities</li>
                <li>• Download offline maps in case of connectivity issues</li>
              </ul>
            </div>
          </div>
        )}

        {!loading && !itinerary && (
          <div className="text-center py-20">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">Fill in your trip details and generate your AI-powered itinerary</p>
          </div>
        )}
      </div>
    </div>
  );
}
