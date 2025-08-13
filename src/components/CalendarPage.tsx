import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './Header';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  Users, 
  Video,
  Phone,
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  X
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'meeting' | 'event' | 'deadline' | 'holiday';
  location: string;
  attendees: string[];
  organizer: string;
  isRecurring: boolean;
  meetingType: 'in-person' | 'video' | 'phone';
  priority: 'low' | 'medium' | 'high';
}

const CalendarPage: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'meeting' | 'event' | 'deadline' | 'holiday'>('all');
  const [events, setEvents] = useState<Event[]>([
    // ... existing events
  ]);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    type: 'meeting',
    location: '',
    attendees: [],
    organizer: 'Wilson Chen',
    isRecurring: false,
    meetingType: 'in-person',
    priority: 'medium'
  });
  const [attendeeInput, setAttendeeInput] = useState('');

  // Move events to state initialization above
  const initialEvents: Event[] = [
    {
      id: 1,
      title: 'Q4 Board Meeting',
      description: 'Quarterly board meeting to discuss financial performance and strategic planning',
      date: '2024-01-20',
      startTime: '09:00',
      endTime: '11:00',
      type: 'meeting',
      location: 'Conference Room A',
      attendees: ['Wilson Chen', 'Sarah Johnson', 'Mike Davis', 'Lisa Wang'],
      organizer: 'Wilson Chen',
      isRecurring: false,
      meetingType: 'in-person',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Product Launch Planning',
      description: 'Planning session for the new SuperChair Executive series launch',
      date: '2024-01-22',
      startTime: '14:00',
      endTime: '16:00',
      type: 'meeting',
      location: 'Virtual Meeting',
      attendees: ['Wilson Chen', 'Product Team', 'Marketing Team'],
      organizer: 'Sarah Johnson',
      isRecurring: false,
      meetingType: 'video',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Client Presentation - ABC Corp',
      description: 'Presenting office furniture solutions to ABC Corporation',
      date: '2024-01-25',
      startTime: '10:30',
      endTime: '12:00',
      type: 'meeting',
      location: 'ABC Corp Office',
      attendees: ['Wilson Chen', 'Sales Team', 'ABC Corp Team'],
      organizer: 'Mike Davis',
      isRecurring: false,
      meetingType: 'in-person',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Team Building Event',
      description: 'Annual company team building and networking event',
      date: '2024-01-28',
      startTime: '18:00',
      endTime: '22:00',
      type: 'event',
      location: 'Grand Hotel Ballroom',
      attendees: ['All Staff'],
      organizer: 'HR Department',
      isRecurring: true,
      meetingType: 'in-person',
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Monthly Sales Review',
      description: 'Review of monthly sales performance and targets',
      date: '2024-01-30',
      startTime: '15:00',
      endTime: '16:30',
      type: 'meeting',
      location: 'Conference Room B',
      attendees: ['Wilson Chen', 'Sales Team', 'Finance Team'],
      organizer: 'Lisa Wang',
      isRecurring: true,
      meetingType: 'in-person',
      priority: 'medium'
    },
    {
      id: 6,
      title: 'Project Deadline - Website Redesign',
      description: 'Final deadline for the company website redesign project',
      date: '2024-02-01',
      startTime: '17:00',
      endTime: '17:00',
      type: 'deadline',
      location: 'Development Team',
      attendees: ['Development Team', 'Design Team'],
      organizer: 'Tech Lead',
      isRecurring: false,
      meetingType: 'in-person',
      priority: 'high'
    },
    {
      id: 7,
      title: 'Chinese New Year Holiday',
      description: 'Company holiday for Chinese New Year celebration',
      date: '2024-02-10',
      startTime: '00:00',
      endTime: '23:59',
      type: 'holiday',
      location: 'Company-wide',
      attendees: ['All Staff'],
      organizer: 'HR Department',
      isRecurring: true,
      meetingType: 'in-person',
      priority: 'low'
    },
    {
      id: 8,
      title: 'Weekly Standup',
      description: 'Weekly team standup meeting to discuss progress and blockers',
      date: '2024-01-24',
      startTime: '09:30',
      endTime: '10:00',
      type: 'meeting',
      location: 'Virtual Meeting',
      attendees: ['Development Team', 'Product Team'],
      organizer: 'Scrum Master',
      isRecurring: true,
      meetingType: 'video',
      priority: 'medium'
    }
  ];

  // Initialize events state
  React.useEffect(() => {
    setEvents(initialEvents);
  }, []);

  const handleCreateEvent = () => {
    if (!newEvent.title.trim()) return;
    
    const eventToAdd: Event = {
      ...newEvent,
      id: Math.max(...events.map(e => e.id)) + 1,
    };
    
    setEvents(prev => [...prev, eventToAdd]);
    setShowEventModal(false);
    
    // Reset form
    setNewEvent({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '10:00',
      type: 'meeting',
      location: '',
      attendees: [],
      organizer: 'Wilson Chen',
      isRecurring: false,
      meetingType: 'in-person',
      priority: 'medium'
    });
    setAttendeeInput('');
  };

  const addAttendee = () => {
    if (attendeeInput.trim() && !newEvent.attendees.includes(attendeeInput.trim())) {
      setNewEvent(prev => ({
        ...prev,
        attendees: [...prev.attendees, attendeeInput.trim()]
      }));
      setAttendeeInput('');
    }
  };

  const removeAttendee = (attendee: string) => {
    setNewEvent(prev => ({
      ...prev,
      attendees: prev.attendees.filter(a => a !== attendee)
    }));
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date && 
      (filterType === 'all' || event.type === filterType) &&
      (searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'event': return 'bg-green-500';
      case 'deadline': return 'bg-red-500';
      case 'holiday': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return <Users size={14} />;
      case 'event': return <CalendarIcon size={14} />;
      case 'deadline': return <Clock size={14} />;
      case 'holiday': return <CalendarIcon size={14} />;
      default: return <CalendarIcon size={14} />;
    }
  };

  const getMeetingTypeIcon = (meetingType: Event['meetingType']) => {
    switch (meetingType) {
      case 'video': return <Video size={14} />;
      case 'phone': return <Phone size={14} />;
      case 'in-person': return <MapPin size={14} />;
      default: return <MapPin size={14} />;
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date().toISOString().split('T')[0];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-32 border border-gray-200 dark:border-gray-700"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(dateString);
      const isToday = dateString === today;

      days.push(
        <div
          key={day}
          className={`h-32 border border-gray-200 dark:border-gray-700 p-2 overflow-y-auto hover:overflow-y-auto ${
            isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday 
              ? 'text-blue-600 dark:text-blue-400' 
              : isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`text-xs p-1 rounded cursor-pointer transition-colors ${
                  getEventTypeColor(event.type)
                } text-white hover:opacity-80`}
                title={event.title}
              >
                <div className="flex items-center gap-1">
                  {getEventTypeIcon(event.type)}
                  <span className="truncate">{event.title}</span>
                </div>
                <div className="text-xs opacity-75">
                  {event.startTime}
                </div>
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className={`text-xs text-center py-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(currentDate.getDate() - day);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }

    const today = new Date().toISOString().split('T')[0];

    return (
      <div className="grid grid-cols-7 min-h-0">
        {weekDays.map((date, index) => {
          const dateString = date.toISOString().split('T')[0];
          const dayEvents = getEventsForDate(dateString);
          const isToday = dateString === today;

          return (
            <div
              key={index}
              className={`min-h-96 border border-gray-200 dark:border-gray-700 p-3 ${
                isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className={`text-center mb-3 ${
                isToday 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : isDark ? 'text-white' : 'text-gray-900'
              }`}>
                <div className="text-xs font-medium">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-bold ${
                  isToday ? 'bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mt-1' : ''
                }`}>
                  {date.getDate()}
                </div>
              </div>
              <div className="space-y-2 overflow-y-auto max-h-80">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`text-xs p-2 rounded cursor-pointer transition-colors ${
                      getEventTypeColor(event.type)
                    } text-white hover:opacity-80`}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="opacity-75 mt-1">
                      {event.startTime} - {event.endTime}
                    </div>
                    <div className="flex items-center gap-1 mt-1 opacity-75">
                      {getMeetingTypeIcon(event.meetingType)}
                      <span className="truncate text-xs">{event.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const dateString = currentDate.toISOString().split('T')[0];
    const dayEvents = getEventsForDate(dateString).sort((a, b) => a.startTime.localeCompare(b.startTime));
    const today = new Date().toISOString().split('T')[0];
    const isToday = dateString === today;

    // Generate time slots (24 hours)
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    return (
      <div className="flex">
        {/* Time column */}
        <div className="w-20 flex-shrink-0">
          <div className="h-16 border-b border-gray-200 dark:border-gray-700"></div>
          {timeSlots.map((time) => (
            <div
              key={time}
              className={`h-16 border-b border-gray-200 dark:border-gray-700 flex items-start justify-end pr-2 pt-1 text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {time}
            </div>
          ))}
        </div>

        {/* Day column */}
        <div className="flex-1 relative">
          {/* Day header */}
          <div className={`h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center ${
            isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''
          }`}>
            <div className={`text-center ${
              isToday 
                ? 'text-blue-600 dark:text-blue-400' 
                : isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <div className="text-sm font-medium">
                {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
              </div>
              <div className={`text-2xl font-bold ${
                isToday ? 'bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mt-1' : ''
              }`}>
                {currentDate.getDate()}
              </div>
            </div>
          </div>

          {/* Time grid */}
          {timeSlots.map((time) => (
            <div
              key={time}
              className="h-16 border-b border-gray-200 dark:border-gray-700 relative"
            ></div>
          ))}

          {/* Events overlay */}
          <div className="absolute top-16 left-0 right-0">
            {dayEvents.map((event) => {
              const startHour = parseInt(event.startTime.split(':')[0]);
              const startMinute = parseInt(event.startTime.split(':')[1]);
              const endHour = parseInt(event.endTime.split(':')[0]);
              const endMinute = parseInt(event.endTime.split(':')[1]);
              
              const startPosition = (startHour * 64) + (startMinute * 64 / 60);
              const duration = ((endHour * 60 + endMinute) - (startHour * 60 + startMinute)) * 64 / 60;

              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`absolute left-1 right-1 rounded cursor-pointer transition-colors ${
                    getEventTypeColor(event.type)
                  } text-white hover:opacity-80 p-2`}
                  style={{
                    top: `${startPosition}px`,
                    height: `${Math.max(duration, 32)}px`,
                  }}
                >
                  <div className="font-medium text-sm truncate">{event.title}</div>
                  <div className="text-xs opacity-75 truncate">
                    {event.startTime} - {event.endTime}
                  </div>
                  <div className="flex items-center gap-1 text-xs opacity-75 truncate">
                    {getMeetingTypeIcon(event.meetingType)}
                    <span>{event.location}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (viewMode === 'month') {
        if (direction === 'prev') {
          newDate.setMonth(prev.getMonth() - 1);
        } else {
          newDate.setMonth(prev.getMonth() + 1);
        }
      } else if (viewMode === 'week') {
        if (direction === 'prev') {
          newDate.setDate(prev.getDate() - 7);
        } else {
          newDate.setDate(prev.getDate() + 7);
        }
      } else if (viewMode === 'day') {
        if (direction === 'prev') {
          newDate.setDate(prev.getDate() - 1);
        } else {
          newDate.setDate(prev.getDate() + 1);
        }
      }
      return newDate;
    });
  };

  const getViewTitle = () => {
    if (viewMode === 'month') {
      return formatDate(currentDate);
    } else if (viewMode === 'week') {
      const startOfWeek = new Date(currentDate);
      const day = startOfWeek.getDay();
      startOfWeek.setDate(currentDate.getDate() - day);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
      });
    }
  };

  return (
    <div className={`flex-1 flex flex-col h-full ${isDark ? 'bg-[#212121]' : 'bg-white'}`}>
      <Header />
      
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Calendar Header */}
        <div className={`flex items-center justify-between p-6 rounded-xl border mb-6 ${
          isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-white border-gray-200'
        } shadow-sm`}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <CalendarIcon size={28} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Company Calendar
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Meetings, events, and important dates
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEventModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus size={18} />
              <span className="text-sm font-medium">Add Event</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-[#2f2f2f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              }`}
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className={`px-4 py-3 rounded-lg border transition-colors ${
              isDark 
                ? 'bg-[#2f2f2f] border-gray-600 text-white focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            }`}
          >
            <option value="all">All Events</option>
            <option value="meeting">Meetings</option>
            <option value="event">Events</option>
            <option value="deadline">Deadlines</option>
            <option value="holiday">Holidays</option>
          </select>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateDate('prev')}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {getViewTitle()}
            </h2>
            <button
              onClick={() => navigateDate('next')}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {['month', 'week', 'day'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-blue-600 text-white'
                    : isDark
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className={`rounded-xl border overflow-visible ${
          isDark ? 'bg-[#2f2f2f] border-gray-600' : 'bg-white border-gray-200'
        }`}>
          {viewMode === 'month' && (
            <>
              {/* Days of week header */}
              <div className="grid grid-cols-7">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div
                    key={day}
                    className={`p-4 text-center font-medium border-b ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300 border-gray-600' 
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 min-h-0">
                {renderCalendarGrid()}
              </div>
            </>
          )}

          {viewMode === 'week' && (
            <>
              {/* Days of week header */}
              <div className="grid grid-cols-7">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div
                    key={day}
                    className={`p-4 text-center font-medium border-b ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300 border-gray-600' 
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              {renderWeekView()}
            </>
          )}

          {viewMode === 'day' && (
            <div className="overflow-y-auto max-h-96">
              {renderDayView()}
            </div>
          )}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className={`rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden ${
              isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`flex justify-between items-center p-6 border-b ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getEventTypeColor(selectedEvent.type)}`}>
                  {getEventTypeIcon(selectedEvent.type)}
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedEvent.title}
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)} 
                className={`p-2 rounded-full transition-colors ${
                  isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="space-y-6">
                {/* Event Details */}
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Event Details
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarIcon size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Date
                      </span>
                    </div>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Time
                      </span>
                    </div>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </p>
                  </div>
                </div>

                {/* Location and Meeting Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                      <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Location
                      </span>
                    </div>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedEvent.location}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getMeetingTypeIcon(selectedEvent.meetingType)}
                      <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Meeting Type
                      </span>
                    </div>
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedEvent.meetingType.charAt(0).toUpperCase() + selectedEvent.meetingType.slice(1).replace('-', ' ')}
                    </p>
                  </div>
                </div>

                {/* Organizer and Attendees */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Organizer
                    </span>
                  </div>
                  <p className={`mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedEvent.organizer}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Attendees ({selectedEvent.attendees.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.attendees.map((attendee, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 text-sm rounded-full ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {attendee}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Priority and Recurring */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Priority: 
                    </span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      selectedEvent.priority === 'high' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                        : selectedEvent.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                        : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {selectedEvent.priority.charAt(0).toUpperCase() + selectedEvent.priority.slice(1)}
                    </span>
                  </div>
                  
                  <div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Recurring: 
                    </span>
                    <span className={`ml-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {selectedEvent.isRecurring ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`flex justify-end gap-3 p-6 border-t ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-red-700 text-red-400' : 'hover:bg-red-100 text-red-600'
                }`}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal Placeholder */}
      {showEventModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowEventModal(false)}
        >
          <div 
            className={`rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden ${
              isDark ? 'bg-[#2f2f2f] border border-gray-700' : 'bg-white border'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Add New Event
                </h2>
                <button 
                  onClick={() => setShowEventModal(false)} 
                  className={`p-2 rounded-full transition-colors ${
                    isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            {/* Form Content */}
            <div className="p-6 max-h-[calc(90vh-160px)] overflow-y-auto">
              <div className="space-y-6">
                {/* Event Title */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter event title"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'bg-[#212121] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    }`}
                  />
                </div>

                {/* Event Type and Priority */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Event Type
                    </label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as Event['type'] }))}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`}
                    >
                      <option value="meeting">Meeting</option>
                      <option value="event">Event</option>
                      <option value="deadline">Deadline</option>
                      <option value="holiday">Holiday</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Priority
                    </label>
                    <select
                      value={newEvent.priority}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, priority: e.target.value as Event['priority'] }))}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Date *
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      End Time
                    </label>
                    <input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Location and Meeting Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter location or meeting link"
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Meeting Type
                    </label>
                    <select
                      value={newEvent.meetingType}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, meetingType: e.target.value as Event['meetingType'] }))}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`}
                    >
                      <option value="in-person">In Person</option>
                      <option value="video">Video Call</option>
                      <option value="phone">Phone Call</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter event description"
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                      isDark 
                        ? 'bg-[#212121] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    }`}
                  />
                </div>

                {/* Organizer */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Organizer
                  </label>
                  <input
                    type="text"
                    value={newEvent.organizer}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, organizer: e.target.value }))}
                    placeholder="Enter organizer name"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'bg-[#212121] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    }`}
                  />
                </div>

                {/* Attendees */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Attendees
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={attendeeInput}
                      onChange={(e) => setAttendeeInput(e.target.value)}
                      placeholder="Enter attendee name"
                      onKeyPress={(e) => e.key === 'Enter' && addAttendee()}
                      className={`flex-1 px-4 py-3 rounded-lg border transition-colors ${
                        isDark 
                          ? 'bg-[#212121] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={addAttendee}
                      className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  
                  {/* Attendee List */}
                  {newEvent.attendees.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newEvent.attendees.map((attendee, index) => (
                        <span
                          key={index}
                          className={`flex items-center gap-2 px-3 py-1 text-sm rounded-full ${
                            isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {attendee}
                          <button
                            onClick={() => removeAttendee(attendee)}
                            className={`hover:text-red-500 transition-colors`}
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recurring Event */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={newEvent.isRecurring}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, isRecurring: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="recurring" className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    This is a recurring event
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`flex justify-end gap-3 p-6 border-t ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <button
                onClick={() => setShowEventModal(false)}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                disabled={!newEvent.title.trim()}
                className={`px-8 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  newEvent.title.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-400 cursor-not-allowed text-white'
                }`}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;