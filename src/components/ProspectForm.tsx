import React, { useState } from 'react';
import { Prospect, ProspectStatus, SalesRep, Quote } from '../types';
import Card, { CardHeader, CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';
import { statusOptions, salesRepOptions } from '../data/mockData';
import { Save, X, Plus, Trash } from 'lucide-react';

interface ProspectFormProps {
  prospect?: Prospect;
  onSave: (prospect: Prospect) => void;
  onCancel: () => void;
}

const defaultProspect: Prospect = {
  id: '',
  name: '',
  address: '',
  city: '',
  coordinates: {
    lat: 0,
    lng: 0
  },
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  status: 'cold',
  numberOfCourts: 0,
  notes: '',
  lastContactDate: new Date().toISOString().slice(0, 10),
  nextFollowUpDate: new Date().toISOString().slice(0, 10),
  createdAt: new Date().toISOString(),
  salesRep: 'flavien',
  hasAutomation: false,
  automationSystem: '',
  hasBookingSystem: false,
  bookingSystem: '',
  quotes: []
};

const emptyQuote: Quote = {
  id: '',
  date: new Date().toISOString().slice(0, 10),
  amount: 0,
  description: '',
  status: 'pending'
};

const ProspectForm: React.FC<ProspectFormProps> = ({ prospect, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Prospect>(prospect || {
    ...defaultProspect,
    id: Math.random().toString(36).substring(2, 9)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'lat' || name === 'lng') {
      setFormData({
        ...formData,
        coordinates: {
          ...formData.coordinates,
          [name]: parseFloat(value)
        }
      });
    } else if (name === 'numberOfCourts') {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10)
      });
    } else if (name === 'hasAutomation' || name === 'hasBookingSystem') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleQuoteChange = (index: number, field: keyof Quote, value: string | number) => {
    const newQuotes = [...formData.quotes];
    newQuotes[index] = {
      ...newQuotes[index],
      [field]: field === 'amount' ? parseFloat(value as string) : value
    };
    setFormData({ ...formData, quotes: newQuotes });
  };

  const addQuote = () => {
    setFormData({
      ...formData,
      quotes: [...formData.quotes, { ...emptyQuote, id: Math.random().toString(36).substring(2, 9) }]
    });
  };

  const removeQuote = (index: number) => {
    const newQuotes = [...formData.quotes];
    newQuotes.splice(index, 1);
    setFormData({ ...formData, quotes: newQuotes });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {prospect ? 'Modifier le prospect' : 'Nouveau prospect'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {prospect 
              ? 'Mettre à jour les informations du prospect' 
              : 'Ajouter un nouveau prospect à votre liste'}
          </p>
        </div>
        <button 
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X size={18} />
        </button>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom du club
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Statut
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange as any}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="salesRep" className="block text-sm font-medium text-gray-700">
                  Commercial
                </label>
                <select
                  id="salesRep"
                  name="salesRep"
                  value={formData.salesRep}
                  onChange={handleChange as any}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {salesRepOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Adresse
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Ville
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="numberOfCourts" className="block text-sm font-medium text-gray-700">
                  Nombre de courts
                </label>
                <input
                  type="number"
                  name="numberOfCourts"
                  id="numberOfCourts"
                  min="0"
                  value={formData.numberOfCourts}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="lat" className="block text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <input
                  type="number"
                  name="lat"
                  id="lat"
                  step="0.0001"
                  value={formData.coordinates.lat}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="lng" className="block text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <input
                  type="number"
                  name="lng"
                  id="lng"
                  step="0.0001"
                  value={formData.coordinates.lng}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Systèmes en place</h4>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="hasAutomation"
                      id="hasAutomation"
                      checked={formData.hasAutomation}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasAutomation" className="ml-2 block text-sm text-gray-900">
                      Système d'automatisation existant
                    </label>
                  </div>
                  {formData.hasAutomation && (
                    <input
                      type="text"
                      name="automationSystem"
                      value={formData.automationSystem}
                      onChange={handleChange}
                      placeholder="Nom du système"
                      className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                </div>

                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="hasBookingSystem"
                      id="hasBookingSystem"
                      checked={formData.hasBookingSystem}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasBookingSystem" className="ml-2 block text-sm text-gray-900">
                      Système de réservation existant
                    </label>
                  </div>
                  {formData.hasBookingSystem && (
                    <input
                      type="text"
                      name="bookingSystem"
                      value={formData.bookingSystem}
                      onChange={handleChange}
                      placeholder="Nom du système"
                      className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  )}
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Informations de contact</h4>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                  Nom du contact
                </label>
                <input
                  type="text"
                  name="contactName"
                  id="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  id="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                  Téléphone
                </label>
                <input
                  type="text"
                  name="contactPhone"
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium text-gray-900">Devis</h4>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addQuote}
                  icon={<Plus size={16} />}
                >
                  Ajouter un devis
                </Button>
              </div>
              
              {formData.quotes.map((quote, index) => (
                <div key={quote.id || index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="text-sm font-medium text-gray-900">Devis #{index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeQuote(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        value={quote.date}
                        onChange={(e) => handleQuoteChange(index, 'date', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Montant</label>
                      <input
                        type="number"
                        value={quote.amount}
                        onChange={(e) => handleQuoteChange(index, 'amount', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <input
                        type="text"
                        value={quote.description}
                        onChange={(e) => handleQuoteChange(index, 'description', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Statut</label>
                      <select
                        value={quote.status}
                        onChange={(e) => handleQuoteChange(index, 'status', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="pending">En attente</option>
                        <option value="sent">Envoyé</option>
                        <option value="accepted">Accepté</option>
                        <option value="rejected">Refusé</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-900">Suivi</h4>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="lastContactDate" className="block text-sm font-medium text-gray-700">
                  Dernier contact
                </label>
                <input
                  type="date"
                  name="lastContactDate"
                  id="lastContactDate"
                  value={formData.lastContactDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="nextFollowUpDate" className="block text-sm font-medium text-gray-700">
                  Prochain suivi
                </label>
                <input
                  type="date"
                  name="nextFollowUpDate"
                  id="nextFollowUpDate"
                  value={formData.nextFollowUpDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            icon={<Save size={16} />}
          >
            Enregistrer
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProspectForm;