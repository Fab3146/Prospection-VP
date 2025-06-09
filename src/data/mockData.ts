import { Prospect, SalesRepOption, StatusOption } from '../types';

export const statusOptions: StatusOption[] = [
  { value: 'client', label: 'Client', color: '#059669' },
  { value: 'hot', label: 'Hot', color: '#DC2626' },
  { value: 'warm', label: 'Warm', color: '#EA580C' },
  { value: 'cold', label: 'Cold', color: '#6B7280' }
];

export const mockProspects: Prospect[] = [
  {
    id: '1',
    name: 'Club de Padel Paris',
    address: '123 Avenue des Champs-Élysées',
    city: 'Paris',
    coordinates: {
      lat: 48.8566,
      lng: 2.3522
    },
    contactName: 'Jean Dupont',
    contactEmail: 'jean@clubpadelparis.fr',
    contactPhone: '+33 1 23 45 67 89',
    status: 'client',
    numberOfCourts: 6,
    notes: 'Installation complétée en 2023. Très satisfait de nos services.',
    lastContactDate: '2023-12-15',
    nextFollowUpDate: '2024-06-15',
    createdAt: '2023-01-10',
    salesRep: 'flavien',
    hasAutomation: true,
    automationSystem: 'Concurrent A',
    hasBookingSystem: true,
    bookingSystem: 'Système B',
    quotes: [
      {
        id: 'q1',
        number: 'DEVIS-0001',
        date: '2023-11-15',
        amount: 15000,
        description: 'Migration système de réservation',
        status: 'accepted'
      }
    ]
  },
  {
    id: '2',
    name: 'Padel Lyon',
    address: '45 Rue de la République',
    city: 'Lyon',
    coordinates: {
      lat: 45.7640,
      lng: 4.8357
    },
    contactName: 'Marie Laurent',
    contactEmail: 'marie@padellyon.fr',
    contactPhone: '+33 4 56 78 90 12',
    status: 'hot',
    numberOfCourts: 4,
    notes: 'Très intéressé par notre solution d\'automatisation. Rendez-vous prévu pour une démonstration.',
    lastContactDate: '2024-04-02',
    nextFollowUpDate: '2024-04-20',
    createdAt: '2024-03-15',
    salesRep: 'mathieu',
    hasAutomation: false,
    hasBookingSystem: true,
    bookingSystem: 'Système C',
    quotes: []
  },
  {
    id: '3',
    name: 'Marseille Padel Club',
    address: '78 Boulevard du Prado',
    city: 'Marseille',
    coordinates: {
      lat: 43.2965,
      lng: 5.3698
    },
    contactName: 'Philippe Martin',
    contactEmail: 'philippe@marseillepadel.fr',
    contactPhone: '+33 4 91 23 45 67',
    status: 'warm',
    numberOfCourts: 3,
    notes: 'A manifesté un intérêt pour notre système. À recontacter après leur tournoi de mai.',
    lastContactDate: '2024-03-10',
    nextFollowUpDate: '2024-05-15',
    createdAt: '2024-02-20',
    salesRep: 'olivier',
    hasAutomation: true,
    automationSystem: 'Concurrent B',
    hasBookingSystem: false,
    quotes: [
      {
        id: 'q2',
        number: 'DEVIS-0002',
        date: '2024-03-15',
        amount: 25000,
        description: 'Installation complète',
        status: 'sent'
      }
    ]
  },
  {
    id: '4',
    name: 'Toulouse Padel Center',
    address: '56 Rue des Sports',
    city: 'Toulouse',
    coordinates: {
      lat: 43.6047,
      lng: 1.4442
    },
    contactName: 'Sophie Blanc',
    contactEmail: 'sophie@toulousepadel.fr',
    contactPhone: '+33 5 61 78 90 12',
    status: 'cold',
    numberOfCourts: 5,
    notes: 'Premier contact effectué. Pas encore prêt pour l\'automatisation mais à suivre pour l\'année prochaine.',
    lastContactDate: '2024-02-05',
    nextFollowUpDate: '2024-07-05',
    createdAt: '2024-01-25',
    salesRep: 'mathieu',
    hasAutomation: false,
    hasBookingSystem: false,
    quotes: []
  },
  {
    id: '5',
    name: 'Nice Padel Academy',
    address: '123 Promenade des Anglais',
    city: 'Nice',
    coordinates: {
      lat: 43.7102,
      lng: 7.2620
    },
    contactName: 'Lucas Moreau',
    contactEmail: 'lucas@nicepadel.fr',
    contactPhone: '+33 4 93 12 34 56',
    status: 'client',
    numberOfCourts: 8,
    notes: 'Client depuis 2022. Très satisfait. Potentiel pour mise à niveau du système.',
    lastContactDate: '2024-01-20',
    nextFollowUpDate: '2024-05-20',
    createdAt: '2021-11-10',
    salesRep: 'flavien',
    hasAutomation: true,
    automationSystem: 'Notre système',
    hasBookingSystem: true,
    bookingSystem: 'Notre système',
    quotes: [
      {
        id: 'q3',
        number: 'DEVIS-0003',
        date: '2021-10-15',
        amount: 45000,
        description: 'Installation complète',
        status: 'accepted'
      }
    ]
  },
  {
    id: '6',
    name: 'Strasbourg Padel Club',
    address: '45 Avenue de l\'Europe',
    city: 'Strasbourg',
    coordinates: {
      lat: 48.5734,
      lng: 7.7521
    },
    contactName: 'Emma Klein',
    contactEmail: 'emma@strasbourgpadel.fr',
    contactPhone: '+33 3 88 90 12 34',
    status: 'warm',
    numberOfCourts: 4,
    notes: 'Intéressé mais en attente de financement. À recontacter en juin.',
    lastContactDate: '2024-03-22',
    nextFollowUpDate: '2024-06-10',
    createdAt: '2024-03-01',
    salesRep: 'olivier',
    hasAutomation: false,
    hasBookingSystem: true,
    bookingSystem: 'Système A',
    quotes: [
      {
        id: 'q4',
        number: 'DEVIS-0004',
        date: '2024-03-25',
        amount: 28000,
        description: 'Installation complète',
        status: 'pending'
      }
    ]
  }
];

export const salesRepOptions: SalesRepOption[] = [
  { value: 'flavien', label: 'Flavien', color: '#2563EB' },
  { value: 'mathieu', label: 'Mathieu', color: '#059669' },
  { value: 'olivier', label: 'Olivier', color: '#DC2626' }
];
export const originOptions = [
  { value: 'salon', label: 'Salon' },
  { value: 'appelsortant', label: 'Appel sortant' },
  { value: 'inbound', label: 'Demande entrante' },
  { value: 'terrain', label: 'Prospection terrain' },
  { value: 'boucheoreille', label: 'Bouche à oreille' },
];

export const stageOptions = [
  { value: 'decouverte', label: 'Découverte' },
  { value: 'demo', label: 'Démo' },
  { value: 'negociation', label: 'Négociation' },
  { value: 'signature', label: 'Signature' },
  { value: 'perdu', label: 'Perdu' },
];

export const interactionOptions = [
  { value: 'email', label: 'E-mail' },
  { value: 'telephone', label: 'Téléphone' },
  { value: 'visio', label: 'Visio' },
  { value: 'rdv', label: 'RDV terrain' },
];
