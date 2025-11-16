# EventsCalendar Component

## Overview
The EventsCalendar component is a comprehensive events management system for the Justice for Logan website. It displays upcoming events including vigils, court dates, advocacy meetings, and legislative hearings with full calendar integration.

## Features

### 1. Multiple View Modes
- **List View**: Card-based display of all upcoming events
- **Calendar View**: Interactive calendar with event indicators

### 2. Event Filtering
Filter events by type:
- Vigils & Memorials
- Court Dates
- Advocacy Meetings
- Legislative Hearings

### 3. Interactive Calendar
- Visual indicators for event dates
- Click dates to view events
- Color-coded by event type
- Responsive calendar interface

### 4. Event Cards
Each event card displays:
- Date and time
- Location with full address
- Event type and category
- Detailed description
- Organizer information
- Registration requirements
- Capacity information
- Additional metadata (transportation, tickets, etc.)

### 5. Add to Calendar
Multiple calendar integration options:
- **Google Calendar**: Direct integration
- **Apple Calendar**: ICS file download
- **Outlook/iCal**: ICS file download

### 6. Responsive Design
- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly interface
- Accessible navigation

## Installation

### Required Dependencies
```bash
npm install react-calendar date-fns
```

These packages are already listed in package.json. To install all dependencies:
```bash
npm install
```

## Usage

### Adding to App.jsx
```jsx
import EventsCalendar from './components/EventsCalendar'

function App() {
  return (
    <div>
      {/* Other components */}
      <EventsCalendar />
      {/* Other components */}
    </div>
  )
}
```

### Adding Navigation Link
Add to the navigation menu in App.jsx:
```jsx
<a href="#events" className="nav-link">Events</a>
```

## Data Structure

### Events JSON Format
Events are stored in `/src/data/events.json`:

```json
{
  "events": [
    {
      "id": "unique-id",
      "title": "Event Title",
      "type": "vigil|court|advocacy|legislative",
      "date": "YYYY-MM-DD",
      "time": "HH:MM",
      "endTime": "HH:MM",
      "location": "Venue Name",
      "address": "Full Address",
      "description": "Event description",
      "organizer": "Organizer Name",
      "contactEmail": "email@example.com",
      "featured": true|false,
      "requiresRegistration": true|false,
      "registrationLink": "https://...",
      "capacity": 100,
      "ticketPrice": "$20",
      "transportationAvailable": true|false,
      "courtroom": "Room 5A",
      "room": "Hearing Room 1"
    }
  ]
}
```

### Required Fields
- `id`: Unique identifier
- `title`: Event name
- `type`: Event category (vigil, court, advocacy, legislative)
- `date`: ISO date format (YYYY-MM-DD)
- `time`: 24-hour format (HH:MM)
- `location`: Venue name
- `description`: Event details

### Optional Fields
- `endTime`: Event end time
- `address`: Full street address
- `organizer`: Organization or person
- `contactEmail`: Contact information
- `featured`: Highlight event
- `requiresRegistration`: Show registration badge
- `registrationLink`: URL for registration
- `capacity`: Maximum attendees
- `ticketPrice`: Cost or donation amount
- `transportationAvailable`: Show transportation badge
- `courtroom`: Court room number
- `room`: Meeting room

## Event Types

### Vigil (vigil)
- Color: Pink (#FF69B4)
- Icon: 🕯️
- Use for: Memorial services, candlelight vigils, remembrance events

### Court Date (court)
- Color: Teal (#004C54)
- Icon: ⚖️
- Use for: Hearings, arraignments, trials, legal proceedings

### Advocacy Meeting (advocacy)
- Color: Purple (#9333EA)
- Icon: 📢
- Use for: Community meetings, fundraisers, workshops, town halls

### Legislative Hearing (legislative)
- Color: Blue (#2563EB)
- Icon: 🏛️
- Use for: Government hearings, bill discussions, testimony sessions

## Customization

### Color Scheme
The component uses the site's color palette defined in tailwind.config.js:
- Primary: #FF69B4 (Logan Pink)
- Secondary: #004C54 (Eagles Midnight Green)
- Additional colors for different event types

### Styling
Modify the component's styling by:
1. Editing the inline styles in the component
2. Adding custom CSS classes
3. Modifying the calendar CSS in the `<style>` tag

### Calendar Appearance
Customize calendar styling in the inline `<style>` block:
- `.react-calendar`: Main calendar container
- `.react-calendar__tile`: Individual date cells
- `.react-calendar__tile--active`: Selected date
- `.react-calendar__tile--now`: Today's date
- `.has-events`: Dates with events

## Calendar Integration

### ICS File Format
The component generates standard ICS (iCalendar) files compatible with:
- Apple Calendar
- Google Calendar
- Outlook
- Most calendar applications

### Features Included in Calendar Events
- Event title and description
- Start and end times
- Location information
- 24-hour reminder alarm
- Unique event identifier

### Google Calendar Integration
Direct integration using Google Calendar's URL API:
- Opens in new tab
- Pre-fills all event information
- User can save directly to their calendar

## Accessibility

### Keyboard Navigation
- Full keyboard support for calendar
- Tab navigation through event cards
- Enter/Space to activate buttons

### Screen Readers
- Semantic HTML structure
- ARIA labels where appropriate
- Descriptive button text
- Alt text for icons

### Visual Accessibility
- High contrast colors
- Clear typography
- Focus indicators
- Responsive text sizing

## Performance

### Optimizations
- `useMemo` for filtered events
- Efficient date calculations
- Minimal re-renders
- Lazy event loading

### Best Practices
- Keep events.json under 100 events
- Archive past events periodically
- Optimize images in event descriptions

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Support
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

## Troubleshooting

### Events Not Displaying
1. Check events.json format
2. Verify date format (YYYY-MM-DD)
3. Ensure time format is 24-hour (HH:MM)
4. Check browser console for errors

### Calendar Not Loading
1. Verify react-calendar is installed
2. Check for CSS conflicts
3. Ensure date-fns is installed

### Add to Calendar Not Working
1. Check browser pop-up settings
2. Verify event data is complete
3. Test ICS file generation

## Future Enhancements

### Potential Features
- Email reminders
- Social sharing
- Recurring events
- Multi-day events
- Event comments/RSVP
- Calendar subscription feed
- Map integration
- Past events archive
- Event search functionality

### Data Expansion
- Import from external calendar services
- Admin interface for event management
- User-submitted events
- Automated court date updates

## Support

### Documentation
- React Calendar: https://www.npmjs.com/package/react-calendar
- date-fns: https://date-fns.org/

### Contact
For questions or issues with the EventsCalendar component:
- Email: dev@justiceforlogan.org
- GitHub: [Repository URL]

## License
Part of the Justice for Logan website project.
Copyright 2025 Federico Family. All rights reserved.
