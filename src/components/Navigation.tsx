import React from 'react';
import { 
  MapPin, 
  Users, 
  BarChart4, 
  Settings, 
  PlusCircle,
  Menu,
  X
} from 'lucide-react';
import Button from './ui/Button';

interface NavigationProps {
  onAddProspect: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ onAddProspect, activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <BarChart4 size={20} /> },
    { id: 'map', label: 'Carte', icon: <MapPin size={20} /> },
    { id: 'prospects', label: 'Prospects', icon: <Users size={20} /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img src="/logo.png" alt="VP Prospect" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900">VP Prospect</span>
            </div>
            
            {/* Desktop navigation */}
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === item.id
                      ? 'border-orange-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button 
              onClick={onAddProspect}
              icon={<PlusCircle size={16} />}
            >
              Nouveau prospect
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button
              variant="outline"
              className="p-2"
              onClick={toggleMobileMenu}
              icon={isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            >
              <span className="sr-only">Open main menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left ${
                  activeTab === item.id
                    ? 'bg-orange-50 border-orange-500 text-orange-500'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </div>
              </button>
            ))}
            <div className="px-4 py-3">
              <Button 
                onClick={() => {
                  onAddProspect();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-center"
                icon={<PlusCircle size={16} />}
              >
                Nouveau prospect
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;