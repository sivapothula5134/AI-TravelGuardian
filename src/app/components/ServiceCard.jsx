import { MapPin, Star, Clock, Phone } from 'lucide-react';

export function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
          <p className="text-sm text-gray-600">{service.type}</p>
        </div>
        {service.rating && (
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-gray-900">{service.rating}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{service.distance}</span>
          <span className="text-xs text-gray-400">• {service.address}</span>
        </div>

        {service.hours && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{service.hours}</span>
          </div>
        )}

        {service.cuisine && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Cuisine:</span> {service.cuisine}
          </div>
        )}

        {service.priceRange && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Price:</span> {service.priceRange}
          </div>
        )}

        {service.phone && (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{service.phone}</span>
          </div>
        )}

        {service.status && (
          <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            {service.status}
          </div>
        )}
      </div>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Get Directions
      </button>
    </div>
  );
}
