
import React from 'react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../constants/data';
import type { Testimonial } from '../types';

// FIX: Replaced JSX.Element with React.ReactNode to fix "Cannot find namespace 'JSX'" error.
const NavCard: React.FC<{ to: string; title: string; description: string; icon: React.ReactNode }> = ({ to, title, description, icon }) => (
  <Link to={to} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </Link>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-white rounded-xl shadow-lg p-8">
    <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
    <div className="flex items-center">
      <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4"/>
      <div>
        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
        <p className="text-gray-500 text-sm">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight">
          Your City, <span className="text-blue-600">In Motion</span>.
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          Real-time bus tracking, easy scheduling, and seamless ticket booking. Experience public transport like never before.
        </p>
      </section>

      {/* Navigation Cards Section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <NavCard
            to="/tracking"
            title="Live Tracking"
            description="Watch your bus move in real-time on the map."
            icon={<MapPinIcon />}
          />
          <NavCard
            to="/schedule"
            title="Bus Schedules"
            description="Find updated schedules for all routes in the city."
            icon={<CalendarDaysIcon />}
          />
          <NavCard
            to="/booking"
            title="Book Tickets"
            description="Book your tickets in advance with just a few clicks."
            icon={<TicketIcon />}
          />
          <NavCard
            to="/chatbot"
            title="AI Assistant"
            description="Get instant answers to your travel questions."
            icon={<ChatBubbleIcon />}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Riders Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </div>
  );
};

// Icons
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CalendarDaysIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const TicketIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>;
const ChatBubbleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;


export default Home;
