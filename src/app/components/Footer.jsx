import { Shield, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">TravelGuardian AI</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your intelligent companion for smart and safe tourism. Plan trips, monitor safety, and explore local services with AI-powered assistance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/plan-trip" className="text-gray-400 hover:text-white transition-colors">
                  Plan Trip
                </Link>
              </li>
              <li>
                <Link to="/safety-map" className="text-gray-400 hover:text-white transition-colors">
                  Safety Map
                </Link>
              </li>
              <li>
                <Link to="/local-services" className="text-gray-400 hover:text-white transition-colors">
                  Local Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@travelguardian.ai</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 1800-TRAVEL</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Hyderabad, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 TravelGuardian AI. All rights reserved. Built for hackathon demo.</p>
        </div>
      </div>
    </footer>
  );
}
