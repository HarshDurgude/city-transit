
import type { BusRoute, BusSchedule, Testimonial } from '../types';

export const BUS_ROUTES: BusRoute[] = [
  { id: 'R101', name: 'Downtown Express', start: 'Central Station', end: 'City Mall', stops: ['Market Square', 'Library', 'General Hospital'] },
  { id: 'R102', name: 'University Line', start: 'West Suburb', end: 'Tech University', stops: ['Community College', 'Student Dorms', 'Science Park'] },
  { id: 'R103', name: 'Lakeview Circular', start: 'Lakeview Park', end: 'Lakeview Park', stops: ['Marina', 'Boat Club', 'Aquarium'] },
  { id: 'R205', name: 'Industrial Loop', start: 'Factory Zone', end: 'Logistics Hub', stops: ['Warehouse District', 'Cargo Terminal'] },
];

export const BUS_SCHEDULES: BusSchedule[] = [
  { id: 'S01', routeId: 'R101', routeName: 'Downtown Express', departureTime: '08:00 AM', arrivalTime: '08:45 AM', days: ['Mon-Fri'] },
  { id: 'S02', routeId: 'R101', routeName: 'Downtown Express', departureTime: '09:00 AM', arrivalTime: '09:45 AM', days: ['Mon-Sat'] },
  { id: 'S03', routeId: 'R102', routeName: 'University Line', departureTime: '07:30 AM', arrivalTime: '08:15 AM', days: ['Mon-Fri'] },
  { id: 'S04', routeId: 'R102', routeName: 'University Line', departureTime: '08:30 AM', arrivalTime: '09:15 AM', days: ['Mon-Fri'] },
  { id: 'S05', routeId: 'R103', routeName: 'Lakeview Circular', departureTime: '10:00 AM', arrivalTime: '11:00 AM', days: ['Sat-Sun'] },
  { id: 'S06', routeId: 'R205', routeName: 'Industrial Loop', departureTime: '06:00 AM', arrivalTime: '06:40 AM', days: ['Mon-Sat'] },
  { id: 'S07', routeId: 'R101', routeName: 'Downtown Express', departureTime: '10:00 AM', arrivalTime: '10:45 AM', days: ['Mon-Fri'] },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Priya Sharma', role: 'Daily Commuter', quote: "This app has transformed my daily commute. The real-time tracking is incredibly accurate, and I never miss my bus anymore!", avatar: 'https://picsum.photos/100/100?random=1' },
  { id: 2, name: 'Rajesh Kumar', role: 'Student', quote: "As a student, getting to my university on time is crucial. The schedule page is so easy to use, and booking tickets is a breeze.", avatar: 'https://picsum.photos/100/100?random=2' },
  { id: 3, name: 'Anjali Verma', role: 'Tourist', quote: "Exploring a new city was so much easier with CityTransit Live. I could easily find routes and schedules for all the major attractions.", avatar: 'https://picsum.photos/100/100?random=3' },
];
