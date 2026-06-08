export const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#0f0f18' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0f0f18' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#3d3d55' }] },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1a1a2e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#222240' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#252540' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0b0b14' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#16161f' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#13131e' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1e1e30' }],
  },
];

export const COLORS = {
  BG: '#0c0c12',
  CARD: '#14141f',
  CARD2: '#1a1a2e',
  PRIMARY: '#e0203a',
  WHITE: '#ffffff',
  TEXT_MUTED: 'rgba(255,255,255,0.45)',
  BORDER: 'rgba(255,255,255,0.1)',
  OVERLAY: 'rgba(12,12,18,0.85)',
};
