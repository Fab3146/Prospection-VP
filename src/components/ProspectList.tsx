import React, { useState } from 'react';
import { Prospect, StatusOption, SalesRepOption } from '../types';
import { statusOptions, salesRepOptions } from '../data/mockData';
import Card, { CardContent, CardHeader } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { Search, Filter, ChevronDown, Calendar, MapPin, User } from 'lucide-react';

interface ProspectListProps {
  prospects: Prospect[];
  onSelectProspect: (prospect: Prospect) => void;
}

const ProspectList: React.FC<ProspectListProps> = ({ prospects, onSelectProspect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [salesRepFilter, setSalesRepFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleStatusFilter = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter(s => s !== status));
    } else {
      setStatusFilter([...statusFilter, status]);
    }
  };

  const toggleSalesRepFilter = (rep: string) => {
    if (salesRepFilter.includes(rep)) {
      setSalesRepFilter(salesRepFilter.filter(r => r !== rep));
    } else {
      setSalesRepFilter([...salesRepFilter, rep]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  const filteredProspects = prospects.filter(prospect => {
    const matchesSearch = 
      searchTerm === '' || 
      prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.contactName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter.length === 0 ||
      statusFilter.includes(prospect.status);

    const matchesSalesRep =
      salesRepFilter.length === 0 ||
      salesRepFilter.includes(prospect.salesRep);

    return matchesSearch && matchesStatus && matchesSalesRep;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg font-medium text-gray-900">Liste des prospects</h3>
            <div className="flex items-center gap-2">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="Rechercher..."
                />
              </div>
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
          </div>

          {showFilters && (
            <div className="mt-4 space-y-4 pt-3 border-t border-gray-200">
              <div>
                <span className="text-sm font-medium text-gray-700 mr-2">Statut:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {statusOptions.map(status => (
                    <label key={status.value} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-800 transition duration-150 ease-in-out"
                        checked={statusFilter.includes(status.value)}
                        onChange={() => toggleStatusFilter(status.value)}
                      />
                      <span className="ml-2 mr-4 text-sm" style={{ color: status.color }}>
                        {status.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-700 mr-2">Commercial:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {salesRepOptions.map(rep => (
                    <label key={rep.value} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-800 transition duration-150 ease-in-out"
                        checked={salesRepFilter.includes(rep.value)}
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
        </CardHeader>

        <CardContent>
          {filteredProspects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Aucun prospect ne correspond à vos critères de recherche.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Club</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ville</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commercial</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étape</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interaction</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prochain suivi</th>
                    <th className="px-6 py-3 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProspects.map(prospect => {
                    const statusOption = statusOptions.find(option => option.value === prospect.status);
                    const salesRep = salesRepOptions.find(option => option.value === prospect.salesRep);

                    return (
                      <tr 
                        key={prospect.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => onSelectProspect(prospect)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{prospect.name}</div>
                          <div className="text-sm text-gray-500">{prospect.numberOfCourts} courts</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{prospect.contactName}</div>
                          <div className="text-sm text-gray-500">{prospect.contactEmail}</div>
                          {prospect.contactRole && (
                            <div className="text-sm italic text-gray-400">{prospect.contactRole}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin size={14} className="mr-1 text-gray-400" />
                            {prospect.city}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {statusOption && (
                            <Badge 
                              label={statusOption.label} 
                              color={statusOption.color} 
                              bgColor={statusOption.bgColor} 
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm" style={{ color: salesRep?.color }}>
                            <User size={14} className="mr-1" />
                            {salesRep?.label}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{prospect.stage || '—'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{prospect.lastInteractionType || '—'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            {prospect.nextFollowUpDate ? formatDate(prospect.nextFollowUpDate) : '—'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="outline"
                            className="text-blue-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProspect(prospect);
                            }}
                          >
                            Voir
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProspectList;
