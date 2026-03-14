import { useState, useEffect } from 'react';
import { Search, UtensilsCrossed, ShoppingCart, Pill, Landmark, Store } from 'lucide-react';
import { getLocalServices } from '../services/api';
import { ServiceCard } from '../components/ServiceCard';

export function LocalServicesPage() {
  const [services, setServices] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await getLocalServices('current-location', 'all');
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'all', label: 'All Services', icon: Store },
    { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed },
    { id: 'groceries', label: 'Groceries', icon: ShoppingCart },
    { id: 'pharmacies', label: 'Pharmacies', icon: Pill },
    { id: 'atms', label: 'ATMs', icon: Landmark }
  ];

  const getFilteredServices = () => {
    if (!services) return [];
    
    let allServices = [];
    if (activeTab === 'all') {
      allServices = [
        ...services.restaurants,
        ...services.groceries,
        ...services.pharmacies,
        ...services.atms
      ];
    } else {
      allServices = services[activeTab] || [];
    }

    if (searchQuery) {
      return allServices.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return allServices;
  };

  const filteredServices = getFilteredServices();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Local Services Discovery</h1>
          <p className="text-xl text-gray-600">
            Find nearby restaurants, shops, and essential services
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for services near you..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredServices.length}</span> services
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading services...</p>
            </div>
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No services found</p>
            <p className="text-gray-400 mt-2">Try a different search or category</p>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-blue-100">Service availability and hours are updated in real-time</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Verified Locations</h3>
              <p className="text-blue-100">All locations are verified for accuracy and safety</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">User Reviews</h3>
              <p className="text-blue-100">Ratings based on real traveler experiences</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Tips for Finding Services</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Check operating hours before visiting, especially for pharmacies and markets</li>
            <li>• Popular restaurants may require reservations during peak hours</li>
            <li>• ATMs in tourist areas may have higher withdrawal limits</li>
            <li>• Look for services with high safety scores in our Safety Map</li>
            <li>• Save important service locations for offline access</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
