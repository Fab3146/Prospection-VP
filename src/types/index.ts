export type ProspectStatus = 'client' | 'hot' | 'warm' | 'cold';
export type SalesRep = 'flavien' | 'mathieu' | 'olivier';

export interface Quote {
  id: string;
  number: string; // Added quote number
  date: string;
  amount: number;
  description: string;
  status: 'sent' | 'accepted' | 'rejected' | 'pending';
  file?: string;
}

export interface Prospect {
  id: string;
  name: string;
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: ProspectStatus;
  numberOfCourts: number;
  notes: string;
  lastContactDate: string;
  nextFollowUpDate: string;
  createdAt: string;
  salesRep: SalesRep;
  hasAutomation: boolean;
  automationSystem?: string;
  hasBookingSystem: boolean;
  bookingSystem?: string;
  quotes: Quote[];
}

export interface StatusOption {
  value: ProspectStatus;
  label: string;
  color: string;
  bgColor: string;
}

export interface SalesRepOption {
  value: SalesRep;
  label: string;
  color: string;
}

export interface AppSettings {
  salesReps: SalesRepOption[];
  statusColors: {
    [key in ProspectStatus]: {
      color: string;
      bgColor: string;
    };
  };
  nextQuoteNumber: number;
}