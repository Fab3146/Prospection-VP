import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { Prospect, AppSettings } from '../types';
import { salesRepOptions } from '../data/mockData';
import Card, { CardContent, CardHeader } from './ui/Card';
import ProspectCard from './ProspectCard';
import { MapPin, Filter, ChevronDown } from 'lucide-react';
import Button from './ui/Button';

// Fix des icônes Leaflet par défaut
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapViewProps {
  prospects: Prospect[];
  onEditProspect: (prospect: Prospect) => void;
  settings: AppSettings;
}

const MapView: React.FC<MapViewProps> = ({ prospects, onEditProspect, settings }) => {
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [mapFilters, setMapFilters] = useState<string[]>(['client', 'hot', 'warm', 'cold']);
  const [salesRepFilters, setSalesRepFilters] = useState<string[]>(['flavien', 'mathieu', 'olivier']);
  const [showFilters, setShowFilters] = useState(false);

  const statusList = [
    { value: 'client', label: 'Client', color: settings.statusColors.client.color },
    { value: 'hot', label: 'Prospect chaud', color: settings.statusColors.hot.color },
    { value: 'warm', label: 'Prospect tiède', color: settings.statusColors.warm.color },
    { value: 'cold', label: 'Prospect froid', color: settings.statusColors.cold.color }
  ];

  const toggleFilter = (status: string) => {
    setMapFilters(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const toggleSalesRepFilter = (rep: string) => {
    setSalesRepFilters(prev =>
      prev.includes(rep) ? prev.filter(r => r !== rep) : [...prev, rep]
    );
  };

  const getStatusOption = (status: string) =>
    statusList.find(option => option.value === status);

  const filteredProspects = prospects.filter(
    prospect => mapFilters.includes(prospect.status) && salesRepFilters.includes(prospect.salesRep)
  );

  const handleMarkerClick = (prospect: Prospect) => {
    setSelectedProspect(prospect);
  };

  const getCustomIcon = (statusColor: string, borderColor: string) =>
    L.divIcon({
      className: '',
      html: `
        <div style="
          background-color: ${statusColor};
          border: 2px solid ${borderColor};
          width: 16px;
          height: 16px;
          border-radius: 50%;
        "></div>
      `,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-white shadow-sm rounded-lg mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Carte des prospects</h3>
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => setShowFilters(!showFilters)}
            icon={<Filter size={16} />}
          >
            Filtres
            <ChevronDown
              size={16}
              className={`ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`}
            />
          </Button>
        </div>

        {showFilters && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div>
              <span className="text-sm font-medium text-gray-700">Statut:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {statusList.map((status) => (
                  <label key={status.value} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-800"
                      checked={mapFilters.includes(status.value)}
                      onChange={() => toggleFilter(status.value)}
                    />
                    <span className="ml-2 mr-4 text-sm" style={{ color: status.color }}>
                      {status.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700">Commercial:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {salesRepOptions.map((rep) => (
                  <label key={rep.value} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-800"
                      checked={salesRepFilters.includes(rep.value)}
                      onChange={() => toggleSalesRepFilter(rep.value)}
                    />
                    <span className="ml-2 mr-4 text-sm" style={{ color: rep.color }}>
                      {rep.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        <div className="lg:col-span-2 bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: '500px' }}>
          <MapContainer center={[46.2276, 2.2137]} zoom={6} style={{ width: '100%', height: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {filteredProspects.map((prospect) => {
              const status = getStatusOption(prospect.status);
              const salesRep = salesRepOptions.find(r => r.value === prospect.salesRep);

              return (
                <Marker
                  key={prospect.id}
                  position={[prospect.coordinates.lat, prospect.coordinates.lng]}
                  eventHandlers={{
                    click: () => handleMarkerClick(prospect),
                  }}
                  icon={getCustomIcon(status?.color || 'gray', salesRep?.color || 'white')}
                >
                  <Popup>
                    <div className="text-sm font-medium">{prospect.name}</div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        <div className="h-full">
          {selectedProspect ? (
            <ProspectCard
              prospect={selectedProspect}
              onEdit={() => onEditProspect(selectedProspect)}
              onClose={() => setSelectedProspect(null)}
              settings={settings}
            />
          ) : (
            <Card className="h-full">
              <CardHeader>
                <h3 className="text-lg font-medium text-gray-900">Informations</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
                  <MapPin size={40} className="text-gray-300 mb-4" />
                  <p>Sélectionnez un marqueur sur la carte pour voir les détails du prospect</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;
