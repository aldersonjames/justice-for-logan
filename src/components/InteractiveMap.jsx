import { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './InteractiveMap.css'
import mapLocations from '../data/map-locations.json'

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom marker icons with site colors
const createCustomIcon = (type, color) => {
  const iconHtml = `
    <div style="
      background-color: ${color};
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        color: white;
        font-size: 16px;
        transform: rotate(45deg);
        font-weight: bold;
      ">
        ${getIconSymbol(type)}
      </div>
    </div>
  `

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })
}

// Get icon symbol based on location type
const getIconSymbol = (type) => {
  switch (type) {
    case 'hometown':
      return '🏠'
    case 'tragedy':
      return '🕊️'
    case 'advocacy':
      return '📢'
    case 'milestone':
      return '⚖️'
    default:
      return '📍'
  }
}

// Component to fit map bounds to show all markers
const MapBounds = ({ locations }) => {
  const map = useMap()

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = locations.map(loc => loc.coordinates)
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [locations, map])

  return null
}

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [isMapReady, setIsMapReady] = useState(false)

  // Calculate center point (roughly between all locations)
  const center = useMemo(() => {
    if (mapLocations.length === 0) return [35.5, -79.5]

    const avgLat = mapLocations.reduce((sum, loc) => sum + loc.coordinates[0], 0) / mapLocations.length
    const avgLng = mapLocations.reduce((sum, loc) => sum + loc.coordinates[1], 0) / mapLocations.length

    return [avgLat, avgLng]
  }, [])

  useEffect(() => {
    // Ensure map renders properly
    setIsMapReady(true)
  }, [])

  // Get legend items
  const legendItems = [
    { type: 'hometown', label: 'Home', color: '#FF69B4', icon: '🏠' },
    { type: 'tragedy', label: 'Memorial', color: '#4B5563', icon: '🕊️' },
    { type: 'advocacy', label: 'Advocacy', color: '#004C54', icon: '📢' },
    { type: 'milestone', label: 'Legislative', color: '#6366F1', icon: '⚖️' }
  ]

  return (
    <section id="map" className="py-16 md:py-24 bg-gradient-to-b from-white via-teal-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            The Geography of Change
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From a small town in North Carolina to the halls of Congress, Logan's story has traveled far.
            Each location represents a chapter in a journey from heartbreak to hope, from tragedy to transformative action.
          </p>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Map */}
          <div className="relative h-[500px] md:h-[600px] w-full">
            {isMapReady && (
              <MapContainer
                center={center}
                zoom={7}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Fit bounds to show all markers */}
                <MapBounds locations={mapLocations} />

                {/* Markers */}
                {mapLocations.map((location) => (
                  <Marker
                    key={location.id}
                    position={location.coordinates}
                    icon={createCustomIcon(location.type, location.color)}
                    eventHandlers={{
                      click: () => setSelectedLocation(location)
                    }}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px] max-w-[300px]">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{getIconSymbol(location.type)}</span>
                          <h3 className="font-display font-bold text-lg text-gray-900">
                            {location.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>{location.name}</strong>
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {location.description}
                        </p>
                        <div
                          className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: `${location.color}20`,
                            color: location.color
                          }}
                        >
                          {location.significance}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>

          {/* Legend */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <span className="font-semibold text-gray-700 text-sm">Map Legend:</span>
              {legendItems.map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location Details Section */}
        {selectedLocation && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8 border-l-4 animate-fade-in"
            style={{ borderLeftColor: selectedLocation.color }}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{getIconSymbol(selectedLocation.type)}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                  {selectedLocation.title}
                </h3>
                <p className="text-lg font-semibold text-gray-700 mb-3">
                  {selectedLocation.name}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {selectedLocation.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span
                    className="px-4 py-2 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: `${selectedLocation.color}20`,
                      color: selectedLocation.color
                    }}
                  >
                    {selectedLocation.significance}
                  </span>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-semibold transition-colors duration-200"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Story Context */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">💝</span>
              <h3 className="text-2xl font-display font-bold text-gray-900">
                A Journey of Love
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Each pin on this map represents more than a location—it's a testament to Logan's
              enduring impact. From the community that knew and loved her, to the nation's capital
              where her story is changing laws, Logan's legacy spans hundreds of miles and countless hearts.
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-6 md:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌟</span>
              <h3 className="text-2xl font-display font-bold text-gray-900">
                Expanding Impact
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              What began in a small North Carolina town has grown into a national movement for justice
              and reform. This map will continue to expand as Logan's story reaches new communities,
              inspires new advocates, and drives meaningful change across the country.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary/10 via-purple-50 to-secondary/10 rounded-2xl p-8 md:p-12 shadow-inner">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
            Help Us Expand This Map
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Every advocacy event, media appearance, and community gathering adds another point to
            Logan's legacy. Join us in spreading awareness and demanding change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#advocacy"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Take Action
            </a>
            <a
              href="#events"
              className="px-8 py-4 bg-white hover:bg-gray-50 text-secondary border-2 border-secondary font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Upcoming Events
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveMap
