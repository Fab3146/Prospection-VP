import React, { useState } from 'react';
import { AppSettings, StatusOption, SalesRepOption } from '../types';
import Card, { CardHeader, CardContent } from './ui/Card';
import Button from './ui/Button';
import { Plus, Trash, Save, Settings as SettingsIcon } from 'lucide-react';

interface SettingsViewProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = useState<AppSettings>(settings);

  const addSalesRep = () => {
    setFormData({
      ...formData,
      salesReps: [
        ...formData.salesReps,
        {
          value: `rep-${Date.now()}`,
          label: '',
          color: '#000000'
        }
      ]
    });
  };

  const removeSalesRep = (index: number) => {
    const newSalesReps = [...formData.salesReps];
    newSalesReps.splice(index, 1);
    setFormData({ ...formData, salesReps: newSalesReps });
  };

  const updateSalesRep = (index: number, field: keyof SalesRepOption, value: string) => {
    const newSalesReps = [...formData.salesReps];
    newSalesReps[index] = { ...newSalesReps[index], [field]: value };
    setFormData({ ...formData, salesReps: newSalesReps });
  };

  const updateStatusColor = (status: string, field: 'color' | 'bgColor', value: string) => {
    setFormData({
      ...formData,
      statusColors: {
        ...formData.statusColors,
        [status]: {
          ...formData.statusColors[status as keyof typeof formData.statusColors],
          [field]: value
        }
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gérez les paramètres de l'application
          </p>
        </div>
        <Button type="submit" icon={<Save size={16} />}>
          Enregistrer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Commerciaux</h3>
          <p className="mt-1 text-sm text-gray-500">
            Gérez l'équipe commerciale et leurs couleurs associées
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.salesReps.map((rep, index) => (
              <div key={rep.value} className="flex items-center gap-4">
                <input
                  type="text"
                  value={rep.label}
                  onChange={(e) => updateSalesRep(index, 'label', e.target.value)}
                  placeholder="Nom du commercial"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="color"
                  value={rep.color}
                  onChange={(e) => updateSalesRep(index, 'color', e.target.value)}
                  className="h-10 w-20"
                />
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => removeSalesRep(index)}
                  icon={<Trash size={16} />}
                >
                  Supprimer
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addSalesRep}
              icon={<Plus size={16} />}
            >
              Ajouter un commercial
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Couleurs des statuts</h3>
          <p className="mt-1 text-sm text-gray-500">
            Personnalisez les couleurs pour chaque statut de prospect
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(formData.statusColors).map(([status, colors]) => (
              <div key={status} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {status === 'client' ? 'Client' :
                     status === 'hot' ? 'Prospect chaud' :
                     status === 'warm' ? 'Prospect tiède' :
                     'Prospect froid'}
                  </label>
                  <div className="mt-1 flex gap-4">
                    <div>
                      <label className="block text-xs text-gray-500">Texte</label>
                      <input
                        type="color"
                        value={colors.color}
                        onChange={(e) => updateStatusColor(status, 'color', e.target.value)}
                        className="h-10 w-20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500">Fond</label>
                      <input
                        type="color"
                        value={colors.bgColor}
                        onChange={(e) => updateStatusColor(status, 'bgColor', e.target.value)}
                        className="h-10 w-20"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: colors.bgColor,
                      color: colors.color
                    }}
                  >
                    Exemple
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium text-gray-900">Numérotation des devis</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configurez le prochain numéro de devis
          </p>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700">
              Prochain numéro de devis
            </label>
            <input
              type="number"
              min="1"
              value={formData.nextQuoteNumber}
              onChange={(e) => setFormData({ ...formData, nextQuoteNumber: parseInt(e.target.value, 10) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">
              Le prochain devis sera numéroté: DEVIS-{formData.nextQuoteNumber.toString().padStart(4, '0')}
            </p>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default SettingsView;