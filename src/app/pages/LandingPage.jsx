import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, MapPin, Heart, AlertCircle, Navigation, Bot, TrendingUp, Clock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function LandingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    budget: '',
    interests: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/plan-trip', { state: formData });
  };

  const features = [
    {
      icon: Bot,
      title: 'AI Travel Planner',
      description: 'Get personalized day-wise itineraries optimized for your interests and budget with our intelligent AI agent.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Shield,
      title: 'Safety Monitoring',
      description: 'Real-time safety scores, crime alerts, and crowd density monitoring to ensure your journey is secure.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: MapPin,
      title: 'Local Discovery',
      description: 'Find nearby restaurants, pharmacies, ATMs, and essential services with ratings and directions.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: AlertCircle,
      title: 'Emergency Assistance',
      description: 'One-tap panic button to locate nearest police stations, hospitals, and emergency contacts instantly.',
      color: 'bg-red-100 text-red-600'
    }
  ];

  const benefits = [
    {
      icon: Navigation,
      title: 'Smart Route Optimization',
      description: 'AI analyzes traffic, transport options, and safety to recommend the best routes.'
    },
    {
      icon: TrendingUp,
      title: 'Dynamic Itinerary Updates',
      description: 'Automatic adjustments based on weather, closures, and real-time conditions.'
    },
    {
      icon: Clock,
      title: 'Time-Saving Automation',
      description: 'Eliminate hours of manual planning with automated trip generation.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Plan Smart.<br />Travel Safe.
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Your AI-powered companion for intelligent travel planning and real-time safety monitoring.
              </p>

              {/* Quick Start Form */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Start Planning Your Trip</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g., Hyderabad, Paris, Tokyo"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Days
                      </label>
                      <input
                        type="number"
                        value={formData.days}
                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                        placeholder="3"
                        min="1"
                        max="30"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select</option>
                        <option value="budget">Budget</option>
                        <option value="moderate">Moderate</option>
                        <option value="luxury">Luxury</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Travel Interests
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Culture', 'Food', 'Adventure', 'Shopping', 'Nature'].map((interest) => (
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

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Generate AI Travel Plan
                  </button>
                </form>
              </div>
            </div>

            <div className="hidden lg:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1697106719728-14f5aad54a27?w=600"
                alt="Travel Adventure"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose TravelGuardian AI?
          </h2>
          <p className="text-xl text-gray-600">
            Powered by Agentic AI to automate your travel planning and ensure your safety
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759747412934-dbe1f0f9b065?w=600"
                alt="Smart Travel Planning"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Intelligent Automation for Modern Travelers
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                        <benefit.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Travel Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of travelers using AI-powered planning for safer, smarter journeys.
          </p>
          <button
            onClick={() => navigate('/plan-trip')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg text-lg"
          >
            Start Planning Now
          </button>
        </div>
      </div>
    </div>
  );
}
