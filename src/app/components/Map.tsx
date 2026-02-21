import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { name: "Milano", coordinates: [9.1900, 45.4642] as [number, number] },
  { name: "Helsinki", coordinates: [24.9384, 60.1699] as [number, number] },
  { name: "Madrid", coordinates: [-3.7038, 40.4168] as [number, number] }
];

export function Map() {
  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 600,
          center: [10, 52] // centered around Europe
        }}
        className="w-full h-full outline-none"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#D1D5DB"
                stroke="#F3F4F6"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#9CA3AF", outline: "none" },
                  pressed: { outline: "none" },
                }}
                className="dark:fill-gray-700 dark:stroke-gray-800 dark:hover:fill-gray-600 transition-colors duration-300"
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={6} fill="#EF4444" stroke="#fff" strokeWidth={2} className="dark:stroke-gray-900" />
            <text
              textAnchor="middle"
              y={-15}
              className="text-xs font-semibold fill-gray-900 dark:fill-gray-100 placeholder-opacity-100"
              style={{ fontFamily: "system-ui", fill: "currentColor" }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
