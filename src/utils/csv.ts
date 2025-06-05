import { Prospect } from '../types';

export const exportToCSV = (prospects: Prospect[]) => {
  const headers = [
    'Nom',
    'Adresse',
    'Ville',
    'Contact',
    'Email',
    'Téléphone',
    'Statut',
    'Nombre de courts',
    'Commercial',
    'Dernier contact',
    'Prochain suivi',
    'Système d\'automatisation',
    'Système de réservation',
    'Notes'
  ];

  const rows = prospects.map(prospect => [
    prospect.name,
    prospect.address,
    prospect.city,
    prospect.contactName,
    prospect.contactEmail,
    prospect.contactPhone,
    prospect.status,
    prospect.numberOfCourts,
    prospect.salesRep,
    prospect.lastContactDate,
    prospect.nextFollowUpDate,
    prospect.hasAutomation ? prospect.automationSystem : 'Non',
    prospect.hasBookingSystem ? prospect.bookingSystem : 'Non',
    prospect.notes
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `prospects_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};