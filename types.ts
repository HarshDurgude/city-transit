
export interface BusRoute {
  id: string;
  name: string;
  start: string;
  end: string;
  stops: string[];
}

export interface BusSchedule {
  id: string;
  routeId: string;
  routeName: string;
  departureTime: string;
  arrivalTime: string;
  days: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}
