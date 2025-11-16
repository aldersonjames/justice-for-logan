# Interactive Map Component

## Overview
The Interactive Map component displays key locations in Logan's story using an interactive Leaflet map. It shows the geography of Logan's advocacy journey from her hometown to the halls of Congress.

## Features
- **Interactive Markers**: Custom-styled markers for each location type
- **Detailed Popups**: Click markers to see location details
- **Responsive Design**: Optimized for mobile and desktop
- **Custom Styling**: Uses Justice for Logan brand colors
- **Legend**: Visual guide to marker types
- **Story Context**: Contextual information about the journey
- **Auto-fitting Bounds**: Automatically adjusts to show all locations

## Installation

The component requires the following dependencies (already in package.json):

```bash
npm install react-leaflet leaflet
```

## Usage

### Basic Integration

Add to your App.jsx:

```jsx
import InteractiveMap from './components/InteractiveMap'

function App() {
  return (
    <div>
      {/* Other components */}
      <InteractiveMap />
      {/* Other components */}
    </div>
  )
}
```

### Navigation Integration

Add to your navigation menu:

```jsx
<a href="#map" className="nav-link">Map</a>
```

## Data Structure

The map loads locations from `/src/data/map-locations.json`:

```json
{
  "id": 1,
  "name": "City, State",
  "type": "hometown|tragedy|advocacy|milestone",
  "coordinates": [latitude, longitude],
  "title": "Display Title",
  "description": "Detailed description",
  "icon": "icon-name",
  "color": "#HEX-COLOR",
  "significance": "Short Label"
}
```

## Location Types

- **hometown** (Pink #FF69B4): Logan's home and roots
- **tragedy** (Gray #4B5563): Memorial locations
- **advocacy** (Teal #004C54): Advocacy events and awareness
- **milestone** (Purple #6366F1): Legislative and major achievements

## Customization

### Adding New Locations

Edit `/src/data/map-locations.json`:

```json
{
  "id": 5,
  "name": "New City, ST",
  "type": "advocacy",
  "coordinates": [lat, lng],
  "title": "Event Title",
  "description": "Event description and significance",
  "icon": "megaphone",
  "color": "#004C54",
  "significance": "Advocacy Event"
}
```

### Styling

Custom styles are in `/src/components/InteractiveMap.css`:
- Popup styling
- Marker animations
- Mobile optimizations
- Accessibility improvements

## Mobile Optimization

The component includes:
- Touch-friendly markers (larger on mobile)
- Responsive popups
- Disabled scroll wheel zoom (user must use zoom controls)
- Optimized tile loading

## Accessibility

- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- High contrast markers
- Clear visual hierarchy

## Performance

- Lazy loading of map tiles
- Efficient re-rendering with useMemo
- Optimized marker icons
- Smooth animations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## Troubleshooting

### Map Not Displaying
1. Ensure dependencies are installed: `npm install`
2. Check that map-locations.json exists
3. Verify Leaflet CSS is imported
4. Check browser console for errors

### Markers Not Showing
1. Verify coordinates are in [latitude, longitude] format
2. Check that marker icons are created properly
3. Ensure map bounds include all markers

### Styling Issues
1. Verify InteractiveMap.css is imported
2. Check that Tailwind classes are available
3. Clear browser cache

## Future Enhancements

Possible additions:
- Route lines connecting locations chronologically
- Animated journey path
- Video/photo overlays at locations
- Clustering for many markers
- Filter by location type
- Search functionality
- Export map as image

## Related Components

- Timeline: Shows chronological events
- Advocacy: Action items and causes
- Events Calendar: Upcoming events that could be mapped

## Contact

For questions or issues with this component, refer to the main Justice for Logan development team.
