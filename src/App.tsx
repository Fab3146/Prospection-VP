import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import ProspectList from './components/ProspectList';
import ProspectForm from './components/ProspectForm';
import ProspectCard from './components/ProspectCard';
import SettingsView from './components/SettingsView';
import { exportToCSV } from './utils/csv';
import { Prospect, AppSettings } from './types';
import { mockProspects, salesRepOptions } from './data/mockData';
import { Settings, Download } from 'lucide-react';
import Button from './components/ui/Button';

const initialSettings: AppSettings = {
  salesReps: salesRepOptions,
  statusColors: {
    client: { color: '#059669', bgColor: '#D1FAE5' },
    hot: { color: '#DC2626', bgColor: '#FEE2E2' },
    warm: { color: '#D97706', bgColor: '#FEF3C7' },
    cold: { color: '#2563EB', bgColor: '#DBEAFE' }
  },
  nextQuoteNumber: 1
};

function App() {
  const [prospects, setProspects] = useState<Prospect[]>(mockProspects);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(initialSettings);

  const handleSaveProspect = (prospect: Prospect) => {
    if (isAdding) {
      setProspects([...prospects, prospect]);
      setIsAdding(false);
    } else {
      setProspects(prospects.map(p => p.id === prospect.id ? prospect : p));
      setSelectedProspect(prospect);
      setIsEditing(false);
    }
  };

  const handleAddProspect = () => {
    setSelectedProspect(null);
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleEditProspect = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleSelectProspect = (prospect: Prospect) => {
    setSelectedProspect(prospect);
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    setActiveTab('dashboard');
  };

  const handleExportCSV = () => {
    exportToCSV(prospects);
  };

  const renderContent = () => {
    // If adding a new prospect
    if (isAdding) {
      return (
        <ProspectForm
          onSave={handleSaveProspect}
          onCancel={handleCancelEdit}
          settings={settings}
        />
      );
    }

    // If editing an existing prospect
    if (isEditing && selectedProspect) {
      return (
        <ProspectForm
          prospect={selectedProspect}
          onSave={handleSaveProspect}
          onCancel={handleCancelEdit}
          settings={settings}
        />
      );
    }

    // If viewing a prospect
    if (selectedProspect && activeTab === 'prospects') {
      return (
        <div className="max-w-2xl mx-auto">
          <ProspectCard 
            prospect={selectedProspect}
            onEdit={() => handleEditProspect(selectedProspect)}
            onClose={() => setSelectedProspect(null)}
            isDetailed={true}
            settings={settings}
          />
        </div>
      );
    }

    // Otherwise, show the main tab content
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <div className="mb-4 flex justify-end">
              <Button
                onClick={handleExportCSV}
                variant="outline"
                icon={<Download size={16} />}
              >
                Exporter en CSV
              </Button>
            </div>
            <Dashboard prospects={prospects} settings={settings} />
          </>
        );
      case 'map':
        return <MapView prospects={prospects} onEditProspect={handleEditProspect} settings={settings} />;
      case 'prospects':
        return <ProspectList prospects={prospects} onSelectProspect={handleSelectProspect} settings={settings} />;
      case 'settings':
        return <SettingsView settings={settings} onSave={handleSaveSettings} />;
      default:
        return <Dashboard prospects={prospects} settings={settings} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        onAddProspect={handleAddProspect}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;