import React from 'react';
import { Prospect, Quote } from '../types';
import Card, { CardHeader, CardContent, CardFooter } from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { statusOptions, salesRepOptions } from '../data/mockData';
import { 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Info, 
  Edit, 
  X, 
  User,
  Settings,
  BookOpen,
  FileText
} from 'lucide-react';

interface ProspectCardProps {
  prospect: Prospect;
  onEdit: () => void;
  onClose?: () => void;
  isDetailed?: boolean;
}

const ProspectCard: React.FC<ProspectCardProps> = ({ 
  prospect, 
  onEdit, 
  onClose, 
  isDetailed = false 
}) => {
  const statusOption = statusOptions.find(option => option.value === prospect.status);
  const salesRep = salesRepOptions.find(option => option.value === prospect.salesRep);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR').format(date);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const getQuoteStatusColor = (status: Quote['status']) => {
    switch (status) {
      case 'accepted':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      case 'sent':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const getQuoteStatusLabel = (status: Quote['status']) => {
    switch (status) {
      case 'accepted':
        return 'Accepté';
      case 'rejected':
        return 'Refusé';
      case 'sent':
        return 'Envoyé';
      default:
        return 'En attente';
    }
  };

  return (
    <Card className={`h-full ${isDetailed ? 'border border-gray-200' : ''}`}>
      <CardHeader className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-gray-900">{prospect.name}</h3>
            {onClose && (
              <button 
                onClick={onClose}
                className="ml-auto text-gray-400 hover:text-gray-500"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Badge 
              label={statusOption?.label || prospect.status} 
              color={statusOption?.color || '#666'} 
              bgColor={statusOption?.bgColor || '#f3f4f6'} 
            />
            <span className="text-sm text-gray-500">{prospect.city}</span>
          </div>
          <div className="mt-1 flex items-center text-sm" style={{ color: salesRep?.color }}>
            <User size={14} className="mr-1" />
            {salesRep?.label}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin size={18} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-700">{prospect.address}, {prospect.city}</span>
          </div>
          
          <div className="flex items-start">
            <Info size={18} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <span className="text-gray-700">{prospect.numberOfCourts} courts</span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">Systèmes en place</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Settings size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-700">
                  Automatisation: {prospect.hasAutomation ? (
                    <span className="text-green-600">{prospect.automationSystem}</span>
                  ) : (
                    <span className="text-gray-500">Aucun système</span>
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <BookOpen size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-700">
                  Système de réservation: {prospect.hasBookingSystem ? (
                    <span className="text-green-600">{prospect.bookingSystem}</span>
                  ) : (
                    <span className="text-gray-500">Aucun système</span>
                  )}
                </span>
              </div>
            </div>
          </div>
          
          <div className="pt-2 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium text-gray-700">{prospect.contactName}</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                <a href={`mailto:${prospect.contactEmail}`} className="text-blue-600 hover:underline">
                  {prospect.contactEmail}
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                <a href={`tel:${prospect.contactPhone}`} className="text-blue-600 hover:underline">
                  {prospect.contactPhone}
                </a>
              </div>
            </div>
          </div>
          
          {isDetailed && (
            <>
              <div className="pt-2 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                <p className="text-gray-700 text-sm">{prospect.notes}</p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-2">Devis</h4>
                {prospect.quotes.length > 0 ? (
                  <div className="space-y-2">
                    {prospect.quotes.map(quote => (
                      <div 
                        key={quote.id} 
                        className="flex items-center justify-between p-2 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center">
                          <FileText size={16} className="text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {quote.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(quote.date)} - {formatAmount(quote.amount)}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getQuoteStatusColor(quote.status)}`}>
                          {getQuoteStatusLabel(quote.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Aucun devis enregistré</p>
                )}
              </div>
            </>
          )}
          
          <div className="pt-2 border-t border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">Suivi</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-700">
                  Dernier contact: <span className="font-medium">{formatDate(prospect.lastContactDate)}</span>
                </span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-gray-700">
                  Prochain suivi: <span className="font-medium">{formatDate(prospect.nextFollowUpDate)}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={onEdit}
          variant="primary"
          className="w-full"
          icon={<Edit size={16} />}
        >
          Modifier
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProspectCard;