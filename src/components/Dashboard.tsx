import React from 'react';
import { Prospect, AppSettings } from '../types';
import Card, { CardContent, CardHeader } from './ui/Card';
import { Users, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface DashboardProps {
  prospects: Prospect[];
  settings: AppSettings;
}

const Dashboard: React.FC<DashboardProps> = ({ prospects, settings }) => {
  // Calculate metrics
  const totalProspects = prospects.length;
  const clientCount = prospects.filter(p => p.status === 'client').length;
  const hotProspectCount = prospects.filter(p => p.status === 'hot').length;
  const warmProspectCount = prospects.filter(p => p.status === 'warm').length;
  const coldProspectCount = prospects.filter(p => p.status === 'cold').length;
  
  // Calculate follow-ups
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const upcomingFollowUps = prospects.filter(prospect => {
    const followUpDate = new Date(prospect.nextFollowUpDate);
    followUpDate.setHours(0, 0, 0, 0);
    return followUpDate >= today && followUpDate <= nextWeek;
  });
  
  const overdue = prospects.filter(prospect => {
    const followUpDate = new Date(prospect.nextFollowUpDate);
    followUpDate.setHours(0, 0, 0, 0);
    return followUpDate < today;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  const statusList = [
    { value: 'client', label: 'Client', color: settings.statusColors.client.color, bgColor: settings.statusColors.client.bgColor },
    { value: 'hot', label: 'Prospect chaud', color: settings.statusColors.hot.color, bgColor: settings.statusColors.hot.bgColor },
    { value: 'warm', label: 'Prospect tiède', color: settings.statusColors.warm.color, bgColor: settings.statusColors.warm.bgColor },
    { value: 'cold', label: 'Prospect froid', color: settings.statusColors.cold.color, bgColor: settings.statusColors.cold.bgColor }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Prospects Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-blue-100">
                <Users className="h-6 w-6 text-blue-800" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Prospects
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {totalProspects}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Clients Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Clients
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {clientCount}
                    </div>
                    <div className="ml-2 text-sm text-green-600">
                      {totalProspects > 0 ? Math.round((clientCount / totalProspects) * 100) : 0}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Hot Prospects Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Prospects chauds
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {hotProspectCount}
                    </div>
                    <div className="ml-2 text-sm text-red-600">
                      {totalProspects > 0 ? Math.round((hotProspectCount / totalProspects) * 100) : 0}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Follow-ups Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-purple-100">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Suivis à venir (7j)
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {upcomingFollowUps.length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Prospect Distribution */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Distribution des prospects</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusList.map(status => {
                const count = prospects.filter(p => p.status === status.value).length;
                const percentage = totalProspects > 0 ? (count / totalProspects) * 100 : 0;
                
                return (
                  <div key={status.value}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: status.color }}>
                        {status.label}
                      </span>
                      <span className="text-sm text-gray-500">
                        {count} ({Math.round(percentage)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: status.color
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Follow-ups */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Suivis à effectuer</h3>
          </CardHeader>
          <CardContent>
            {upcomingFollowUps.length === 0 && overdue.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <Calendar className="mx-auto h-12 w-12 text-gray-300" />
                <p className="mt-2">Aucun suivi planifié pour les 7 prochains jours</p>
              </div>
            ) : (
              <div className="space-y-6">
                {overdue.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-red-600 mb-3 flex items-center">
                      <Clock size={16} className="mr-1" /> En retard
                    </h4>
                    <ul className="space-y-3">
                      {overdue.map(prospect => {
                        const statusOption = statusList.find(option => option.value === prospect.status);
                        
                        return (
                          <li key={prospect.id} className="bg-red-50 p-3 rounded-md">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{prospect.name}</p>
                                <p className="text-xs text-gray-500">{prospect.city}</p>
                              </div>
                              <div className="text-right">
                                <span 
                                  className="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
                                  style={{ 
                                    backgroundColor: statusOption?.bgColor,
                                    color: statusOption?.color
                                  }}
                                >
                                  {statusOption?.label}
                                </span>
                                <p className="text-xs text-red-600 mt-1">
                                  {formatDate(prospect.nextFollowUpDate)}
                                </p>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                
                {upcomingFollowUps.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                      <Calendar size={16} className="mr-1" /> Cette semaine
                    </h4>
                    <ul className="space-y-3">
                      {upcomingFollowUps.map(prospect => {
                        const statusOption = statusList.find(option => option.value === prospect.status);
                        
                        return (
                          <li key={prospect.id} className="bg-gray-50 p-3 rounded-md">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{prospect.name}</p>
                                <p className="text-xs text-gray-500">{prospect.city}</p>
                              </div>
                              <div className="text-right">
                                <span 
                                  className="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
                                  style={{ 
                                    backgroundColor: statusOption?.bgColor,
                                    color: statusOption?.color
                                  }}
                                >
                                  {statusOption?.label}
                                </span>
                                <p className="text-xs text-gray-600 mt-1">
                                  {formatDate(prospect.nextFollowUpDate)}
                                </p>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;