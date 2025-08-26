export interface Event {
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

export const initialEvents: Event[] = [
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