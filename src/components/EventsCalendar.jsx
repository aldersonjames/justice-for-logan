import { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import { format, parseISO, isSameDay, isPast, isFuture, addDays } from 'date-fns';
import eventsData from '../data/events.json';
import 'react-calendar/dist/Calendar.css';

const EventsCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [view, setView] = useState('grid'); // 'grid' or 'calendar'

  // Event type configurations
  const eventTypes = {
    vigil: {
      label: 'Vigils & Memorials',
      color: 'primary',
      bgColor: 'bg-primary',
      textColor: 'text-primary',
      lightBg: 'bg-primary-light',
      icon: '🕯️'
    },
    court: {
      label: 'Court Dates',
      color: 'secondary',
      bgColor: 'bg-secondary',
      textColor: 'text-secondary',
      lightBg: 'bg-secondary-light',
      icon: '⚖️'
    },
    advocacy: {
      label: 'Advocacy Meetings',
      color: 'purple',
      bgColor: 'bg-purple-600',
      textColor: 'text-purple-600',
      lightBg: 'bg-purple-100',
      icon: '📢'
    },
    legislative: {
      label: 'Legislative Hearings',
      color: 'blue',
      bgColor: 'bg-blue-600',
      textColor: 'text-blue-600',
      lightBg: 'bg-blue-100',
      icon: '🏛️'
    }
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    let filtered = eventsData.events;

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(event => event.type === selectedFilter);
    }

    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [selectedFilter]);

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return filteredEvents.filter(event =>
      isSameDay(parseISO(event.date), date)
    );
  };

  // Get upcoming events
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return filteredEvents.filter(event =>
      isFuture(parseISO(event.date)) || isSameDay(parseISO(event.date), now)
    );
  }, [filteredEvents]);

  // Tile content for calendar view
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        return (
          <div className="flex justify-center gap-0.5 mt-1">
            {dayEvents.slice(0, 3).map((event, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full ${eventTypes[event.type].bgColor}`}
              />
            ))}
          </div>
        );
      }
    }
    return null;
  };

  // Tile class name for calendar view
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = getEventsForDate(date);
      if (dayEvents.length > 0) {
        return 'has-events';
      }
    }
    return null;
  };

  // Generate ICS file for download
  const generateICS = (event) => {
    const startDate = format(parseISO(`${event.date}T${event.time}`), "yyyyMMdd'T'HHmmss");
    const endDate = event.endTime
      ? format(parseISO(`${event.date}T${event.endTime}`), "yyyyMMdd'T'HHmmss")
      : format(addDays(parseISO(`${event.date}T${event.time}`), 0), "yyyyMMdd'T'HHmmss");

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Justice for Logan//Events Calendar//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}@justiceforlogan.org`,
      `DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss'Z'")}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${event.location}${event.address ? ', ' + event.address : ''}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT24H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: Event tomorrow',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '_')}.ics`;
    link.click();
  };

  // Add to Google Calendar
  const addToGoogleCalendar = (event) => {
    const startDate = format(parseISO(`${event.date}T${event.time}`), "yyyyMMdd'T'HHmmss");
    const endDate = event.endTime
      ? format(parseISO(`${event.date}T${event.endTime}`), "yyyyMMdd'T'HHmmss")
      : format(addDays(parseISO(`${event.date}T${event.time}`), 0), "yyyyMMdd'T'HHmmss");

    const googleUrl = new URL('https://calendar.google.com/calendar/render');
    googleUrl.searchParams.append('action', 'TEMPLATE');
    googleUrl.searchParams.append('text', event.title);
    googleUrl.searchParams.append('dates', `${startDate}/${endDate}`);
    googleUrl.searchParams.append('details', event.description);
    googleUrl.searchParams.append('location', `${event.location}, ${event.address || ''}`);

    window.open(googleUrl.toString(), '_blank');
  };

  return (
    <section id="events" className="section-container bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-gray-900 mb-4">
            Events Calendar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for upcoming vigils, court dates, advocacy meetings, and legislative hearings.
            Your presence and support make a difference.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white shadow-sm">
            <button
              onClick={() => setView('grid')}
              className={`px-6 py-2 rounded-l-lg font-medium transition-colors ${
                view === 'grid'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-6 py-2 rounded-r-lg font-medium transition-colors ${
                view === 'calendar'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedFilter === 'all'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            All Events
          </button>
          {Object.entries(eventTypes).map(([key, type]) => (
            <button
              key={key}
              onClick={() => setSelectedFilter(key)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedFilter === key
                  ? `${type.bgColor} text-white shadow-lg`
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>

        {/* Calendar or Grid View */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar View */}
          {view === 'calendar' && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <style>
                  {`
                    .react-calendar {
                      border: none;
                      font-family: inherit;
                      width: 100%;
                    }
                    .react-calendar__tile {
                      padding: 0.75em 0.5em;
                      position: relative;
                    }
                    .react-calendar__tile--active {
                      background: #FF69B4;
                      color: white;
                    }
                    .react-calendar__tile--now {
                      background: #FFB6D9;
                    }
                    .react-calendar__tile:enabled:hover {
                      background-color: #FFE6F2;
                    }
                    .react-calendar__tile.has-events {
                      font-weight: 600;
                    }
                    .react-calendar__navigation button {
                      font-size: 1rem;
                      font-weight: 600;
                    }
                    .react-calendar__navigation button:enabled:hover,
                    .react-calendar__navigation button:enabled:focus {
                      background-color: #FFE6F2;
                    }
                    .react-calendar__month-view__days__day--weekend {
                      color: #FF69B4;
                    }
                  `}
                </style>
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  tileContent={tileContent}
                  tileClassName={tileClassName}
                  className="rounded-xl"
                />

                {/* Legend */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
                    Event Types
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(eventTypes).map(([key, type]) => (
                      <div key={key} className="flex items-center text-sm">
                        <span className={`w-3 h-3 rounded-full ${type.bgColor} mr-2`}></span>
                        <span className="text-gray-600">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Event Cards */}
          <div className={view === 'calendar' ? 'lg:col-span-2' : 'lg:col-span-3'}>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-6">
                {upcomingEvents.map((event) => {
                  const eventType = eventTypes[event.type];
                  const eventDate = parseISO(event.date);
                  const isEventPast = isPast(eventDate) && !isSameDay(eventDate, new Date());

                  return (
                    <div
                      key={event.id}
                      className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                        event.featured ? 'ring-2 ring-primary' : ''
                      } ${isEventPast ? 'opacity-60' : ''}`}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Date Badge */}
                        <div className={`${eventType.bgColor} text-white p-6 md:w-40 flex flex-col items-center justify-center text-center`}>
                          <div className="text-4xl font-bold">
                            {format(eventDate, 'd')}
                          </div>
                          <div className="text-lg font-semibold uppercase tracking-wide">
                            {format(eventDate, 'MMM')}
                          </div>
                          <div className="text-sm opacity-90">
                            {format(eventDate, 'yyyy')}
                          </div>
                          {event.featured && (
                            <div className="mt-2 px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                              Featured
                            </div>
                          )}
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">{eventType.icon}</span>
                                <span className={`text-xs font-semibold uppercase tracking-wide ${eventType.textColor}`}>
                                  {eventType.label}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {event.title}
                              </h3>
                            </div>
                          </div>

                          <div className="space-y-2 text-gray-600 mb-4">
                            {/* Time */}
                            <div className="flex items-center text-sm">
                              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>
                                {format(parseISO(`${event.date}T${event.time}`), 'h:mm a')}
                                {event.endTime && ` - ${format(parseISO(`${event.date}T${event.endTime}`), 'h:mm a')}`}
                              </span>
                            </div>

                            {/* Location */}
                            <div className="flex items-start text-sm">
                              <svg className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <div>
                                <div className="font-medium text-gray-900">{event.location}</div>
                                {event.address && (
                                  <div className="text-gray-500">{event.address}</div>
                                )}
                                {event.courtroom && (
                                  <div className="text-gray-500">{event.courtroom}</div>
                                )}
                                {event.room && (
                                  <div className="text-gray-500">{event.room}</div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {event.description}
                          </p>

                          {/* Additional Info */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {event.requiresRegistration && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Registration Required
                              </span>
                            )}
                            {event.capacity && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Limited to {event.capacity} attendees
                              </span>
                            )}
                            {event.ticketPrice && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {event.ticketPrice}
                              </span>
                            )}
                            {event.transportationAvailable && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Transportation Available
                              </span>
                            )}
                          </div>

                          {/* Organizer */}
                          {event.organizer && (
                            <div className="text-sm text-gray-500 mb-4">
                              Organized by: <span className="font-medium text-gray-700">{event.organizer}</span>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            {/* Add to Calendar Dropdown */}
                            <div className="relative group">
                              <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Add to Calendar
                                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>

                              {/* Dropdown Menu */}
                              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                <button
                                  onClick={() => addToGoogleCalendar(event)}
                                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                                >
                                  Google Calendar
                                </button>
                                <button
                                  onClick={() => generateICS(event)}
                                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  Apple Calendar
                                </button>
                                <button
                                  onClick={() => generateICS(event)}
                                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                                >
                                  Outlook / iCal
                                </button>
                              </div>
                            </div>

                            {/* Registration Link */}
                            {event.registrationLink && (
                              <a
                                href={event.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-secondary hover:bg-secondary-light text-white font-medium rounded-lg transition-colors flex items-center"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Register Now
                              </a>
                            )}

                            {/* Contact */}
                            {event.contactEmail && (
                              <a
                                href={`mailto:${event.contactEmail}`}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Upcoming Events
                </h3>
                <p className="text-gray-600">
                  Check back soon for upcoming events, or change your filter selection.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">
            Stay Updated on Events
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Sign up for email notifications to never miss an important event or court date.
          </p>
          <button className="px-8 py-3 bg-white text-primary hover:bg-gray-100 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Subscribe to Updates
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;
