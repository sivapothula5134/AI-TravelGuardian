import { MapPin, Clock } from 'lucide-react';
import { SafetyScoreBadge } from './SafetyScoreBadge';

export function ItineraryCard({ place }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <img
        src={place.image}
        alt={place.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{place.name}</h3>
            <p className="text-sm text-gray-600">{place.description}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{place.distance} from current location</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Recommended: {place.timeToSpend}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <SafetyScoreBadge score={place.safetyScore} />
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
