import L from 'leaflet';
// Manually reconfigure Leaflet's default marker icon URLs
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';  // Standard-resolution Icon
import markerIcon from 'leaflet/dist/images/marker-icon.png';       // High-resolution (Retina) Icon for High Density Plays
import markerShadow from 'leaflet/dist/images/marker-shadow.png';   // Shadow Image for the Icon

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});