'use client';

import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import 'leaflet/dist/leaflet.css';

/* =========================================================
   ÍCONES SVG
   ========================================================= */
const mk = (size: number, sw: number, children: React.ReactNode) => {
  const Icon = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
  Icon.displayName = 'Icon';
  return Icon;
};

const I = {
  Home: mk(18, 1.75, (
    <>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  )),
  Route: mk(18, 1.75, (
    <>
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </>
  )),
  Users: mk(18, 1.75, (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  )),
  Bell: mk(18, 1.75, (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </>
  )),
  MapPin: mk(14, 1.75, (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  )),
  Clock: mk(14, 1.75, (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  )),
  Alert: mk(14, 1.75, (
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  )),
  Check: mk(14, 2.5, <polyline points="20 6 9 17 4 12" />),
  Manager: mk(13, 2, (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  )),
  Driver: mk(13, 2, (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </>
  )),
  Send: mk(16, 2, (
    <>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </>
  )),
  Shield: mk(20, 2, (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </>
  )),
  Plus: mk(14, 2.5, (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  )),
  X: mk(16, 2, (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  )),
  Activity: mk(18, 1.75, <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />),
  Info: mk(14, 1.75, (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  )),
};

/* =========================================================
   TIPOS E DADOS
   ========================================================= */
type Role = 'gestor' | 'funcionario';
type ToastTone = 'success' | 'error' | 'info' | 'warning';
type TripStatus =
  | 'Pendente'
  | 'Aprovada'
  | 'Em Andamento'
  | 'Concluída'
  | 'Rejeitada';
type WaypointType = 'risk' | 'toll' | 'police' | 'robbery';

type Waypoint = {
  id: string;
  name: string;
  time: string;
  reason: string;
  type: WaypointType;
  lat?: number;
  lng?: number;
};

type Trip = {
  id: string;
  driverName: string;
  isExternal: boolean;
  origin: string;
  destination: string;
  distance: number;
  duration: number;
  transport: string;
  isNight: boolean;
  weatherSevere: boolean;
  remoteArea: boolean;
  restPeriod: number;
  hours24h: number;
  riskScore: number;
  fatigueAlert: boolean;
  status: TripStatus;
  time: string;
  waypoints: Waypoint[];
  checklistOk?: boolean;
};

type RouteInfo = { distanceKm: number; durationMin: number };

const CITY_COORDS: Record<string, [number, number]> = {
  'Rio de Janeiro, RJ': [-22.9068, -43.1729],
  'Macaé, RJ': [-22.3708, -41.7869],
  'Vitória, ES': [-20.3155, -40.3128],
  'Campos, RJ': [-21.7545, -41.3244],
  'São Paulo, SP': [-23.5505, -46.6333],
  'Niterói, RJ': [-22.8832, -43.1034],
  'São Gonçalo, RJ': [-22.8268, -43.0539],
  'Rio das Ostras, RJ': [-22.5278, -41.9431],
  'Petrópolis, RJ': [-22.5051, -43.1786],
  'Belo Horizonte, MG': [-19.9167, -43.9345],
  'Salvador, BA': [-12.9777, -38.5016],
  'Recife, PE': [-8.0476, -34.877],
  'Fortaleza, CE': [-3.7319, -38.5267],
  'Porto Alegre, RS': [-30.0346, -51.2177],
  'Curitiba, PR': [-25.4284, -49.2733],
  'Brasília, DF': [-15.7938, -47.8825],
  'Manaus, AM': [-3.119, -60.0217],
  'Belém, PA': [-1.4558, -48.5044],
};

const WP_META: Record<WaypointType, { color: string; emoji: string; label: string }> = {
  risk: { color: '#ef4444', emoji: '⚠️', label: 'Risco' },
  toll: { color: '#f59e0b', emoji: '💰', label: 'Pedágio' },
  police: { color: '#3b82f6', emoji: '🚓', label: 'Base policial' },
  robbery: { color: '#991b1b', emoji: '🚨', label: 'Alta criminalidade' },
};

const normalizeString = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

const nowTime = () =>
  new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

const formatDuration = (min: number) => {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return h > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${m} min`;
};

const riskTone = (score: number) =>
  score > 70 ? 'danger' : score > 40 ? 'warning' : 'success';
const riskColor = (score: number) =>
  score > 70 ? '#dc2626' : score > 40 ? '#f59e0b' : '#16a34a';

const statusBadge = (s: TripStatus) =>
  s === 'Aprovada' || s === 'Concluída'
    ? 'badge-success'
    : s === 'Em Andamento'
    ? 'badge-info'
    : s === 'Rejeitada'
    ? 'badge-danger'
    : 'badge-warning';

const INITIAL_TRIPS: Trip[] = [
  {
    id: 'VG-001',
    driverName: 'João Silva',
    isExternal: false,
    origin: 'Rio de Janeiro, RJ',
    destination: 'Macaé, RJ',
    distance: 180,
    duration: 150,
    transport: 'Toyota Hilux · RJ-45RF',
    isNight: false,
    weatherSevere: false,
    remoteArea: false,
    restPeriod: 10,
    hours24h: 4,
    riskScore: 15,
    fatigueAlert: false,
    status: 'Em Andamento',
    time: '08:30',
    waypoints: [],
    checklistOk: true,
  },
  {
    id: 'VG-002',
    driverName: 'Carlos Pereira',
    isExternal: false,
    origin: 'São Paulo, SP',
    destination: 'Curitiba, PR',
    distance: 408,
    duration: 300,
    transport: 'Fiat Toro · ABC-1234',
    isNight: true,
    weatherSevere: true,
    remoteArea: true,
    restPeriod: 6,
    hours24h: 12,
    riskScore: 85,
    fatigueAlert: true,
    status: 'Pendente',
    time: '20:00',
    waypoints: [],
    checklistOk: false,
  },
];

const geoCache = new Map<string, [number, number] | null>();

const getCoords = async (location: string): Promise<[number, number] | null> => {
  if (!location.trim()) return null;
  const norm = normalizeString(location);
  if (geoCache.has(norm)) return geoCache.get(norm) ?? null;

  let query = location.trim();
  if (!query.toLowerCase().includes('brasil') && !query.toLowerCase().includes('brazil')) {
    query += ', Brasil';
  }

  try {
    const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`;
    const res = await fetch(photonUrl);
    const data = await res.json();
    if (data && data.features && data.features.length > 0) {
      const isStreetAddress = /\d/.test(query);
      let bestFeature = data.features[0];
      if (!isStreetAddress) {
        const cityFeature = data.features.find((f: any) =>
          ['city', 'town', 'village', 'municipality'].includes(f.properties.osm_value)
        );
        if (cityFeature) bestFeature = cityFeature;
      }
      const coords = bestFeature.geometry.coordinates;
      const result: [number, number] = [coords[1], coords[0]];
      geoCache.set(norm, result);
      return result;
    }
  } catch (e) {
    console.warn('Photon geocoding failed', e);
  }

  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    const res = await fetch(nominatimUrl, { headers: { 'User-Agent': 'RotaSeguraApp/1.0' } });
    const data = await res.json();
    if (data && data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      const result: [number, number] = [lat, lon];
      geoCache.set(norm, result);
      return result;
    }
  } catch (e) {
    console.warn('Nominatim geocoding failed', e);
  }

  geoCache.set(norm, null);
  return null;
};

const haversineKm = (a: [number, number], b: [number, number]) => {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};

/* =========================================================
   COMPONENTE DE MAPA
   ========================================================= */
function RouteMap({
  origin,
  destination,
  waypoints = [],
  onRouteInfo,
}: {
  origin: string;
  destination: string;
  waypoints?: Waypoint[];
  onRouteInfo?: (info: RouteInfo | null) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerGroupRef = useRef<any>(null);
  const onRouteInfoRef = useRef(onRouteInfo);
  const waypointsRef = useRef(waypoints);
  const [loading, setLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    onRouteInfoRef.current = onRouteInfo;
  }, [onRouteInfo]);

  useEffect(() => {
    waypointsRef.current = waypoints;
  }, [waypoints]);

  const waypointsKey = waypoints
    .map((w) => `${w.id}:${w.type}:${w.lat ?? ''}:${w.lng ?? ''}`)
    .join('|');

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;
    let isMounted = true;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      if (!isMounted || !mapContainerRef.current) return;

      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }

      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: true,
        fadeAnimation: false,
        zoomAnimation: false,
        markerZoomAnimation: false,
      }).setView([-15.7801, -47.9292], 4);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 19,
      }).addTo(mapRef.current);

      layerGroupRef.current = L.layerGroup().addTo(mapRef.current);

      setTimeout(() => { if (mapRef.current) mapRef.current.invalidateSize(); }, 100);
      setTimeout(() => { if (mapRef.current) mapRef.current.invalidateSize(); }, 500);

      if (isMounted) setMapReady(true);
    };

    initMap();
    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.off();
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !mapRef.current || !layerGroupRef.current) return;
    let isActive = true;

    const drawAll = async () => {
      const L = (await import('leaflet')).default;
      if (!isActive) return;
      setLoading(true);
      setNotFound(false);
      if (!layerGroupRef.current) return;
      layerGroupRef.current.clearLayers();

      try {
        const start = await getCoords(origin);
        const end = await getCoords(destination);

        if (!start || !end || !isActive) {
          if (isActive) {
            setLoading(false);
            setNotFound(true);
            onRouteInfoRef.current?.(null);
          }
          return;
        }

        let coords: [number, number][] = [];
        let info: RouteInfo | null = null;

        try {
          const routeUrl = `https://routing.openstreetmap.de/routed-car/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
          const resRoute = await fetch(routeUrl);
          const dataRoute = await resRoute.json();

          if (dataRoute.code === 'Ok' && dataRoute.routes && dataRoute.routes[0]) {
            const r = dataRoute.routes[0];
            coords = r.geometry.coordinates.map((c: any) => [c[1], c[0]]);
            info = {
              distanceKm: Math.round(r.distance / 1000),
              durationMin: Math.round(r.duration / 60),
            };
          } else {
            throw new Error('Rota não encontrada');
          }
        } catch (error) {
          const midLat = (start[0] + end[0]) / 2;
          const midLng = (start[1] + end[1]) / 2;
          const dx = end[0] - start[0];
          const dy = end[1] - start[1];
          const ctrlLat = midLat - dy * 0.2;
          const ctrlLng = midLng + dx * 0.2;

          for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            coords.push([
              (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * ctrlLat + t * t * end[0],
              (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * ctrlLng + t * t * end[1],
            ]);
          }
          const km = Math.round(haversineKm(start, end) * 1.25);
          info = { distanceKm: km, durationMin: Math.round((km / 75) * 60) };
        }

        if (!isActive || !mapRef.current) return;
        onRouteInfoRef.current?.(info);

        if (coords.length > 0) {
          L.polyline(coords, {
            color: '#2563eb',
            weight: 5,
            opacity: 0.8,
            lineJoin: 'round',
          }).addTo(layerGroupRef.current);
        }

        const iconStart = L.divIcon({
          html: '<div style="background:#2563eb;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [14, 14],
        });
        const iconEnd = L.divIcon({
          html: '<div style="background:#ef4444;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>',
          iconSize: [14, 14],
        });

        L.marker(start, { icon: iconStart })
          .addTo(layerGroupRef.current)
          .bindPopup(`Origem: ${origin}`);
        L.marker(end, { icon: iconEnd })
          .addTo(layerGroupRef.current)
          .bindPopup(`Destino: ${destination}`);

        const currentWaypoints = waypointsRef.current;
        if (currentWaypoints && currentWaypoints.length > 0) {
          currentWaypoints.forEach((wp, idx) => {
            let pt: [number, number] | null = null;
            if (wp.lat != null && wp.lng != null) {
              pt = [wp.lat, wp.lng];
            } else if (coords.length > 0) {
              const fraction = (idx + 1) / (currentWaypoints.length + 1);
              const pos = Math.min(
                Math.floor(coords.length * fraction),
                coords.length - 1
              );
              pt = coords[pos];
            }
            if (!pt) return;

            const { color, emoji } = WP_META[wp.type] || WP_META.risk;
            const iconHtml = `<div style="background:${color};width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:15px;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.4);">${emoji}</div>`;

            L.marker(pt, {
              icon: L.divIcon({ html: iconHtml, iconSize: [30, 30] }),
              zIndexOffset: 1000,
            })
              .addTo(layerGroupRef.current)
              .bindTooltip(`<strong>${wp.name}</strong>`, {
                permanent: true,
                direction: 'top',
                className: 'leaflet-tooltip-custom',
                offset: [0, -15],
              })
              .bindPopup(
                `<strong>${wp.name}</strong><br/>${wp.reason}<br/><span style="font-size:10px;color:#666">${wp.time}</span>`
              );
          });
        }

        const bounds = L.latLngBounds([start, end]);
        currentWaypoints.forEach((wp) => {
          if (wp.lat != null && wp.lng != null) bounds.extend([wp.lat, wp.lng]);
        });

        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
            mapRef.current.fitBounds(bounds, {
              padding: [50, 50],
              animate: false,
              maxZoom: 15,
            });
          }
        }, 200);
      } catch (err) {
        console.error('Erro ao desenhar mapa:', err);
      } finally {
        if (isActive) setLoading(false);
      }
    };

    const timer = setTimeout(drawAll, 500);
    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [origin, destination, waypointsKey, mapReady]);

  return (
    <div
      style={{
        height: '100%',
        minHeight: 300,
        position: 'relative',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
      }}
    >
      {loading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.8)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            color: 'var(--brand-600)',
          }}
        >
          Buscando endereço e traçando rota...
        </div>
      )}
      {!loading && notFound && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            zIndex: 1000,
            background: '#fef3c7',
            color: '#92400e',
            border: '1px solid #fcd34d',
            borderRadius: 8,
            padding: '8px 12px',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Endereço não encontrado. Tente ser mais específico (Rua, Número, Cidade).
        </div>
      )}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', zIndex: 1 }} />
      <style>{`
        .leaflet-tooltip-custom { background-color: white; border: 1px solid #e2e8f0; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); padding: 4px 8px; font-size: 12px; color: #1e293b; }
        .leaflet-tooltip-custom:before { border-top-color: white; }
      `}</style>
    </div>
  );
}

/* =========================================================
   COMPONENTES AUXILIARES
   ========================================================= */
function MapLegend() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 8,
        fontSize: 12,
        color: 'var(--slate-500)',
      }}
    >
      <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 14 }}>⚠️</span> Desvios Reportados Manualmente
      </span>
    </div>
  );
}

function RiskBar({ score }: { score: number }) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 120 }}
      title={`Risco ${score}%`}
    >
      <div
        style={{
          flex: 1,
          height: 6,
          borderRadius: 99,
          background: 'var(--slate-200, #e2e8f0)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${score}%`,
            height: '100%',
            background: riskColor(score),
            transition: 'width .3s',
          }}
        />
      </div>
      <span className={`badge badge-${riskTone(score)}`}>{score}%</span>
    </div>
  );
}

function EmptyState({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--slate-500)' }}>
      <strong style={{ display: 'block', color: 'var(--slate-700, #334155)' }}>{title}</strong>
      <span style={{ fontSize: 13 }}>{desc}</span>
    </div>
  );
}

function ToggleRow({ label, desc, value, onChange }: any) {
  return (
    <div className="row-between" style={{ padding: '8px 0' }}>
      <div>
        <strong style={{ display: 'block', fontSize: 13 }}>{label}</strong>
        <span style={{ fontSize: 11, color: 'var(--slate-500)' }}>{desc}</span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        style={{
          width: 40,
          height: 22,
          borderRadius: 99,
          border: 'none',
          background: value ? 'var(--brand-600)' : 'var(--slate-300)',
          position: 'relative',
          cursor: 'pointer',
          transition: '0.2s',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: value ? 20 : 2,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'white',
            transition: '0.2s',
          }}
        />
      </button>
    </div>
  );
}

function KpiCard({ label, value, tone, icon }: any) {
  return (
    <div className="kpi-card">
      <div className="kpi-head">
        <span className="kpi-label">{label}</span>
        <div className={`kpi-icon ${tone}`}>{icon}</div>
      </div>
      <div className="kpi-value">{value}</div>
    </div>
  );
}

/* =========================================================
   APP PRINCIPAL
   ========================================================= */
export default function App() {
  const [role, setRole] = useState<Role>('gestor');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
  const [toasts, setToasts] = useState<
    { id: number; title: string; desc: string; tone: ToastTone }[]
  >([]);
  const toastId = useRef(0);

  const showToast = (title: string, desc: string, tone: ToastTone = 'info') => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, title, desc, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };

  const pendingCount = trips.filter((t) => t.status === 'Pendente').length;

  return (
    <div className="app-shell">
      <Sidebar
        role={role}
        setRole={(r: Role) => {
          setRole(r);
          setActiveTab(r === 'gestor' ? 'dashboard' : 'minhas-viagens');
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingCount}
      />

      <div className="main-area">
        <Topbar
          pendingCount={pendingCount}
          onBell={() =>
            pendingCount > 0
              ? showToast('Aprovações', `${pendingCount} pendentes.`, 'warning')
              : showToast('Tudo em dia', 'Sem pendências.', 'info')
          }
          breadcrumb={
            activeTab === 'dashboard'
              ? ['Gestão', 'Dashboard']
              : activeTab === 'viagens'
              ? ['Gestão', 'Aprovações']
              : activeTab === 'funcionarios'
              ? ['Gestão', 'Funcionários']
              : activeTab === 'solicitar'
              ? ['Minha Jornada', 'Nova Solicitação']
              : ['Minha Jornada', 'Viagens']
          }
        />

        <div className="content">
          {role === 'gestor' ? (
            <>
              {activeTab === 'dashboard' && <ManagerDashboard trips={trips} />}
              {activeTab === 'viagens' && (
                <ManagerApprovals
                  trips={trips}
                  onApprove={(id: string) => {
                    setTrips((p) => p.map((t) => (t.id === id ? { ...t, status: 'Aprovada' } : t)));
                    showToast('Aprovada', `Viagem ${id} liberada.`, 'success');
                  }}
                  onReject={(id: string) => {
                    setTrips((p) => p.map((t) => (t.id === id ? { ...t, status: 'Rejeitada' } : t)));
                    showToast('Rejeitada', `Viagem ${id} bloqueada.`, 'error');
                  }}
                />
              )}
              {activeTab === 'funcionarios' && <ManagerEmployees trips={trips} />}
            </>
          ) : (
            <>
              {activeTab === 'minhas-viagens' && (
                <EmployeeTrips
                  trips={trips}
                  setTrips={setTrips}
                  showToast={showToast}
                  goToRequest={() => setActiveTab('solicitar')}
                />
              )}
              {activeTab === 'solicitar' && (
                <RequestForm
                  setTrips={setTrips}
                  showToast={showToast}
                  onDone={() => setActiveTab('minhas-viagens')}
                />
              )}
            </>
          )}
        </div>
      </div>

      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.tone}`}>
            <div className="toast-icon">
              {t.tone === 'success' ? <I.Check /> : t.tone === 'error' ? <I.X /> : t.tone === 'warning' ? <I.Alert /> : <I.Info />}
            </div>
            <div className="toast-body">
              <strong>{t.title}</strong>
              <p>{t.desc}</p>
            </div>
            <button
              className="toast-close"
              onClick={() => setToasts((arr) => arr.filter((x) => x.id !== t.id))}
            >
              <I.X />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sidebar({ role, setRole, activeTab, setActiveTab, pendingCount }: any) {
  const gestorNav = [
    { id: 'dashboard', label: 'Dashboard', icon: <I.Home /> },
    { id: 'viagens', label: 'Aprovações', icon: <I.Route />, badge: pendingCount },
    { id: 'funcionarios', label: 'Funcionários', icon: <I.Users /> },
  ];
  const funcNav = [
    { id: 'minhas-viagens', label: 'Minhas Viagens', icon: <I.Route /> },
    { id: 'solicitar', label: 'Nova Solicitação', icon: <I.Plus /> },
  ];
  const nav: any[] = role === 'gestor' ? gestorNav : funcNav;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark"><I.Shield /></div>
        <div className="brand-text">
          <strong>Gerenciamento de viagens/strong>
          <span>Serviços maritimos Continental</span>
        </div>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Modo de Acesso</div>
        <div className="role-switch">
          <button className={role === 'gestor' ? 'active' : ''} onClick={() => setRole('gestor')}>
            <I.Manager /> Gestor
          </button>
          <button className={role === 'funcionario' ? 'active' : ''} onClick={() => setRole('funcionario')}>
            <I.Driver /> Colaborador
          </button>
        </div>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-label">Menu</div>
        {nav.map((item) => (
          <a
            key={item.id}
            role="button"
            tabIndex={0}
            className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveTab(item.id);
              }
            }}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge > 0 && (
              <span className="badge badge-danger" style={{ marginLeft: 'auto' }}>{item.badge}</span>
            )}
          </a>
        ))}
      </nav>
      <div className="sidebar-user">
        {role === 'gestor' ? (
          <>
            <div className="avatar brand">MC</div>
            <div className="sidebar-user-info">
              <strong>Mariana Costa</strong>
              <span>Gestora</span>
            </div>
          </>
        ) : (
          <>
            <div className="avatar success">JS</div>
            <div className="sidebar-user-info">
              <strong>João Silva</strong>
              <span>Colaborador</span>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

function Topbar({ breadcrumb, pendingCount, onBell }: any) {
  return (
    <header className="topbar">
      <div className="topbar-breadcrumb">
        {breadcrumb.map((item: string, idx: number) => (
          <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {idx > 0 && <span style={{ color: 'var(--slate-300)' }}>/</span>}
            <span className={idx === breadcrumb.length - 1 ? 'current' : ''}>{item}</span>
          </span>
        ))}
      </div>
      <div className="topbar-actions">
        <button className="icon-btn" onClick={onBell} style={{ position: 'relative' }}>
          <I.Bell />
          {pendingCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#ef4444',
              }}
            />
          )}
        </button>
        <div className="avatar brand" style={{ width: 38, height: 38 }}>MC</div>
      </div>
    </header>
  );
}

function ManagerDashboard({ trips }: { trips: Trip[] }) {
  const total = trips.length;
  const pending = trips.filter((t) => t.status === 'Pendente').length;
  const fatigue = trips.filter((t) => t.fatigueAlert).length;
  const nightTrips = trips.filter((t) => t.isNight).length;
  const hours = trips.reduce((acc, t) => acc + t.duration / 60, 0);
  const high = trips.filter((t) => t.riskScore > 70).length;
  const mid = trips.filter((t) => t.riskScore > 40 && t.riskScore <= 70).length;
  const low = total - high - mid;

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Dashboard de Risco</h1>
          <p>Monitoramento de conformidade e fadiga</p>
        </div>
      </div>
      <div className="kpi-grid">
        <KpiCard label="Viagens Totais" value={String(total)} tone="blue" icon={<I.Route />} />
        <KpiCard label="Horas Dirigidas" value={`${hours.toFixed(1)}h`} tone="green" icon={<I.Clock />} />
        <KpiCard label="Viagens Noturnas" value={String(nightTrips)} tone="blue" icon={<I.Clock />} />
        <KpiCard label="Sem Aprovação" value={String(pending)} tone="red" icon={<I.Alert />} />
        <KpiCard label="Alertas Fadiga" value={String(fatigue)} tone="red" icon={<I.Activity />} />
      </div>
      <div className="grid-2col mt-4">
        <div className="card">
          <div className="card-header"><h3>Distribuição de Risco</h3></div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Alto (acima de 70%)', n: high, c: '#dc2626' },
              { label: 'Médio (41–70%)', n: mid, c: '#f59e0b' },
              { label: 'Baixo (até 40%)', n: low, c: '#16a34a' },
            ].map((r) => (
              <div key={r.label}>
                <div className="row-between" style={{ fontSize: 13, marginBottom: 4 }}>
                  <span>{r.label}</span>
                  <strong>{r.n}</strong>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: '#e2e8f0', overflow: 'hidden' }}>
                  <div style={{ width: total ? `${(r.n / total) * 100}%` : 0, height: '100%', background: r.c }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><h3>Viagens por Status</h3></div>
          <div className="card-body" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['Pendente', 'Aprovada', 'Em Andamento', 'Concluída', 'Rejeitada'].map((s) => (
              <span key={s} className={`badge ${statusBadge(s as TripStatus)}`}>
                {s}: {trips.filter((t) => t.status === s).length}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-header"><h3>Viagens Recentes</h3></div>
        {trips.length === 0 ? (
          <EmptyState title="Nenhuma viagem" desc="As solicitações aparecem aqui." />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Motorista</th>
                  <th>Rota</th>
                  <th>Risco</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>
                      {t.driverName}{' '}
                      {t.isExternal && <span className="badge badge-warning">Terceiro</span>}
                    </td>
                    <td>{t.origin} → {t.destination}</td>
                    <td><RiskBar score={t.riskScore} /></td>
                    <td><span className={`badge ${statusBadge(t.status)}`}>{t.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function ManagerApprovals({ trips, onApprove, onReject }: any) {
  const [expanded, setExpanded] = useState<string | null>(trips.length > 0 ? trips[0].id : null);
  const [filter, setFilter] = useState<'Todas' | TripStatus>('Todas');
  const [liveLocations, setLiveLocations] = useState<Record<string, [number, number]>>({});
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socketRef.current = socket;
    socket.on('location_update', (data: { driverId: string; lat: number; lng: number }) => {
      setLiveLocations((prev) => ({ ...prev, [data.driverId]: [data.lat, data.lng] }));
    });
    return () => { socket.disconnect(); };
  }, []);

  const filters: ('Todas' | TripStatus)[] = ['Todas', 'Pendente', 'Aprovada', 'Em Andamento', 'Concluída', 'Rejeitada'];
  const visible: Trip[] = filter === 'Todas' ? trips : trips.filter((t: Trip) => t.status === filter);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Aprovação Eletrônica</h1>
          <p>Clique em uma linha para expandir</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {filters.map((f) => {
          const n = f === 'Todas' ? trips.length : trips.filter((t: Trip) => t.status === f).length;
          return (
            <button
              key={f}
              className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter(f)}
            >
              {f} ({n})
            </button>
          );
        })}
      </div>
      <div className="card">
        {visible.length === 0 ? (
          <EmptyState title="Nada por aqui" desc="Nenhuma viagem com esse status." />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Colaborador</th>
                  <th>Rota</th>
                  <th>Risco</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((t: Trip) => (
                  <React.Fragment key={t.id}>
                    <tr
                      style={{
                        cursor: 'pointer',
                        background: expanded === t.id ? 'var(--slate-50)' : 'transparent',
                      }}
                      onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                    >
                      <td>{t.id}</td>
                      <td>{t.driverName}</td>
                      <td>{t.origin} → {t.destination} ({t.distance} km)</td>
                      <td><RiskBar score={t.riskScore} /></td>
                      <td>
                        {t.status === 'Pendente' ? (
                          <div style={{ display: 'flex', gap: 8 }} onClick={(e) => e.stopPropagation()}>
                            <button className="btn btn-primary btn-sm" onClick={() => onApprove(t.id)}>Aprovar</button>
                            <button className="btn btn-danger btn-sm" onClick={() => onReject(t.id)}>Rejeitar</button>
                          </div>
                        ) : (
                          <span className={`badge ${statusBadge(t.status)}`}>{t.status}</span>
                        )}
                      </td>
                    </tr>
                    {expanded === t.id && (
                      <tr>
                        <td colSpan={5} style={{ padding: 0 }}>
                          <div style={{ padding: 24, background: 'var(--bg-main)' }}>
                            <div className="grid-2col">
                              <div>
                                <h4 style={{ marginBottom: 12 }}>Mapa do Trajeto</h4>
                                <div style={{ height: 350, width: '100%' }}>
                                  <RouteMap
                                    key={`${t.origin}-${t.destination}`}
                                    origin={t.origin}
                                    destination={t.destination}
                                    waypoints={t.waypoints}
                                  />
                                </div>
                                <MapLegend />
                              </div>
                              <div>
                                <h4 style={{ marginBottom: 12 }}>Análise Detalhada</h4>
                                <div className="alert-detail">
                                  <div className="alert-detail-row"><span>Veículo</span><strong>{t.transport}</strong></div>
                                  <div className="alert-detail-row"><span>Descanso</span><strong>{t.restPeriod}h</strong></div>
                                  <div className="alert-detail-row"><span>Trabalho (24h)</span><strong>{t.hours24h}h</strong></div>
                                  <div className="alert-detail-row">
                                    <span>Inspeção OK?</span>
                                    <strong style={{ color: t.checklistOk ? 'green' : 'red' }}>
                                      {t.checklistOk ? 'Sim' : 'Não'}
                                    </strong>
                                  </div>
                                  {liveLocations[t.driverName] ? (
                                    <div
                                      className="alert-detail-row"
                                      style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--border)' }}
                                    >
                                      <span style={{ color: 'var(--brand-600)', fontWeight: 'bold' }}>📍 Localização Atual</span>
                                      <strong style={{ color: 'var(--brand-600)' }}>
                                        Lat: {liveLocations[t.driverName][0].toFixed(5)}
                                        <br />
                                        Lng: {liveLocations[t.driverName][1].toFixed(5)}
                                      </strong>
                                    </div>
                                  ) : (
                                    <div
                                      className="alert-detail-row"
                                      style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--border)' }}
                                    >
                                      <span>Localização</span>
                                      <strong style={{ color: 'var(--slate-400)' }}>Aguardando GPS...</strong>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function ManagerEmployees({ trips }: { trips: Trip[] }) {
  const people = [
    { name: 'João Silva', role: 'Consultor' },
    { name: 'Carlos Pereira', role: 'Analista' },
    { name: 'Rafael Santos', role: 'Diretor' },
  ];
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Funcionários</h1>
          <p>Equipe cadastrada e histórico</p>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h3>Funcionários Cadastrados</h3></div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Viagens</th>
                <th>Alertas de fadiga</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {people.map((p) => {
                const mine = trips.filter((t) => t.driverName === p.name);
                return (
                  <tr key={p.name}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.role}</td>
                    <td>{mine.length}</td>
                    <td>
                      {mine.filter((t) => t.fatigueAlert).length > 0 ? (
                        <span className="badge badge-danger">{mine.filter((t) => t.fatigueAlert).length}</span>
                      ) : (
                        <span className="badge badge-success">0</span>
                      )}
                    </td>
                    <td><span className="badge badge-success">Ativo</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function EmployeeTrips({ trips, setTrips, showToast, goToRequest }: any) {
  const myTrips = trips.filter((t: Trip) => t.driverName === 'João Silva');
  const [waypointModal, setWaypointModal] = useState<Trip | null>(null);
  const [trackingTripId, setTrackingTripId] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const handleAddWaypoint = (trip: Trip, reason: string, type: WaypointType) => {
    const commit = (lat?: number, lng?: number) => {
      const newWp: Waypoint = {
        id: `${trip.id}-u${Date.now()}`,
        name:
          type === 'risk'
            ? 'Área de Risco'
            : type === 'toll'
            ? 'Pedágio'
            : type === 'police'
            ? 'Posto Policial'
            : 'Alta Criminalidade',
        time: nowTime(),
        reason,
        type,
        lat,
        lng,
      };
      setTrips((prev: Trip[]) =>
        prev.map((x) => (x.id === trip.id ? { ...x, waypoints: [...x.waypoints, newWp] } : x))
      );
      showToast('Desvio Registrado', 'O gestor foi notificado.', 'success');
      setWaypointModal(null);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => commit(pos.coords.latitude, pos.coords.longitude),
        () => {
          showToast(
            'GPS indisponível',
            'Desvio registrado sem localização precisa.',
            'warning'
          );
          commit();
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    } else {
      commit();
    }
  };

  const startTracking = (tripId: string, driverName: string) => {
    if (!navigator.geolocation) {
      showToast('Erro', 'Geolocalização não suportada.', 'error');
      return;
    }

    const socket = io('http://localhost:3001');
    socketRef.current = socket;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        socket.emit('location_update', {
          driverId: driverName,
          lat: latitude,
          lng: longitude,
          timestamp: Date.now(),
        });
      },
      (error) => {
        console.error(error);
        showToast('Erro GPS', 'Permita o acesso à localização.', 'error');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    watchIdRef.current = watchId;
    setTrackingTripId(tripId);
    showToast('Rastreamento Ativo', 'Sua localização está sendo compartilhada.', 'info');
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setTrackingTripId(null);
    showToast('Rastreamento Parado', 'Compartilhamento encerrado.', 'info');
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Minhas Viagens</h1>
          <p>Registro de execução</p>
        </div>
        <button className="btn btn-primary" onClick={goToRequest}>
          <I.Plus /> Nova solicitação
        </button>
      </div>
      {myTrips.length === 0 && (
        <div className="card">
          <EmptyState title="Sem viagens" desc="Crie uma solicitação." />
        </div>
      )}
      <div className="grid-2col">
        {myTrips.map((t: Trip) => (
          <div key={t.id} className="card">
            <div className="card-header">
              <div>
                <h3>{t.origin} → {t.destination}</h3>
                <p>{t.id} · {t.distance} km</p>
              </div>
              <span className={`badge ${statusBadge(t.status)}`}>{t.status}</span>
            </div>
            <div className="card-body">
              <div style={{ height: 350, width: '100%', marginBottom: 16 }}>
                <RouteMap
                  key={`${t.origin}-${t.destination}`}
                  origin={t.origin}
                  destination={t.destination}
                  waypoints={t.waypoints}
                />
              </div>
              <div className="alert-detail mt-4">
                <div className="alert-detail-row"><span>Transporte</span><strong>{t.transport}</strong></div>
                <div className="alert-detail-row"><span>Risco</span><RiskBar score={t.riskScore} /></div>
              </div>
              {t.status === 'Aprovada' && (
                <button
                  className="btn btn-primary btn-block mt-4"
                  onClick={() => {
                    setTrips((p: any) =>
                      p.map((x: any) => (x.id === t.id ? { ...x, status: 'Em Andamento' } : x))
                    );
                    showToast('Iniciada', 'Boa viagem!', 'info');
                  }}
                >
                  Iniciar Viagem
                </button>
              )}
              {t.status === 'Em Andamento' && (
                <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {trackingTripId === t.id ? (
                    <button className="btn btn-danger btn-block" onClick={stopTracking}>
                      Parar Rastreamento GPS
                    </button>
                  ) : (
                    <button className="btn btn-info btn-block" onClick={() => startTracking(t.id, t.driverName)}>
                      <I.MapPin /> Iniciar Rastreamento em Tempo Real
                    </button>
                  )}
                  <button className="btn btn-secondary btn-block" onClick={() => setWaypointModal(t)}>
                    <I.MapPin /> Registrar Desvio
                  </button>
                  <button
                    className="btn btn-success btn-block"
                    onClick={() => {
                      stopTracking();
                      setTrips((p: any) =>
                        p.map((x: any) => (x.id === t.id ? { ...x, status: 'Concluída' } : x))
                      );
                      showToast('Concluída', 'Viagem finalizada.', 'success');
                    }}
                  >
                    <I.Check /> Registrar Conclusão
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {waypointModal && (
        <div className="modal-overlay" onClick={() => setWaypointModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Registrar Desvio</h2>
              <button className="modal-close" onClick={() => setWaypointModal(null)}>
                <I.X />
              </button>
            </div>
            <div className="modal-body">
              <div className="reason-list">
                <label
                  className="reason-option"
                  onClick={() => handleAddWaypoint(waypointModal, 'Área perigosa', 'risk')}
                >
                  <div>
                    <strong>Área de Risco</strong>
                    <span>Avisar sobre perigo</span>
                  </div>
                </label>
                <label
                  className="reason-option"
                  onClick={() => handleAddWaypoint(waypointModal, 'Pedágio', 'toll')}
                >
                  <div>
                    <strong>Pedágio</strong>
                    <span>Registrar passagem</span>
                  </div>
                </label>
                <label
                  className="reason-option"
                  onClick={() => handleAddWaypoint(waypointModal, 'Fiscalização', 'police')}
                >
                  <div>
                    <strong>Posto Policial</strong>
                    <span>Registrar fiscalização</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function RequestForm({ setTrips, showToast, onDone }: any) {
  const [form, setForm] = useState({
    driverName: 'João Silva',
    isExternal: false,
    origin: 'Rio das Ostras, RJ',
    destination: 'Macaé, RJ',
    transport: 'Toyota Hilux · RJ-45RF',
    isNight: false,
    weatherSevere: false,
    remoteArea: false,
    restPeriod: 8,
    hours24h: 0,
    checklistOk: false,
  });
  const [error, setError] = useState('');
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

  const calculateRisk = () => {
    let risk = 0;
    if (form.isNight) risk += 20;
    if (form.weatherSevere) risk += 20;
    if (form.remoteArea) risk += 15;
    if (!form.checklistOk) risk += 30;

    const distanceKm = routeInfo?.distanceKm ?? 0;
    if (distanceKm > 150) risk += 15;

    const durationMin = routeInfo?.durationMin ?? 0;
    if (durationMin > 120) risk += 10;

    const sleepDeficit = Math.max(0, 8 - form.restPeriod);
    risk += sleepDeficit * 5;

    const workOvertime = Math.max(0, form.hours24h - 8);
    risk += workOvertime * 3;

    const fatigueAlert = form.restPeriod < 8 || form.hours24h > 10;
    if (fatigueAlert) risk += 10;

    return { score: Math.min(Math.round(risk), 100), fatigueAlert };
  };

  const { score: finalScore, fatigueAlert } = calculateRisk();
  const shortTrip =
    routeInfo != null && routeInfo.distanceKm > 0 && routeInfo.distanceKm <= 150;

  const handleSubmit = () => {
    if (!form.origin.trim() || !form.destination.trim() || !form.driverName.trim())
      return setError('Preencha os campos obrigatórios.');
    if (normalizeString(form.origin) === normalizeString(form.destination))
      return setError('Origem e destino iguais.');
    if (form.restPeriod < 0 || form.hours24h < 0 || form.hours24h > 24)
      return setError('Horas inválidas.');
    if (finalScore >= 90 || !form.checklistOk)
      return setError('Bloqueio: Risco Crítico ou Inspeção Veicular Pendente.');

    const id = `VG-${Math.floor(Math.random() * 900) + 100}`;
    const newTrip: Trip = {
      id,
      driverName: form.driverName.trim(),
      isExternal: form.isExternal,
      origin: form.origin.trim(),
      destination: form.destination.trim(),
      distance: routeInfo?.distanceKm ?? 180,
      duration: routeInfo?.durationMin ?? 150,
      transport: form.transport,
      isNight: form.isNight,
      weatherSevere: form.weatherSevere,
      remoteArea: form.remoteArea,
      restPeriod: Number(form.restPeriod),
      hours24h: Number(form.hours24h),
      riskScore: finalScore,
      fatigueAlert,
      status: 'Pendente',
      time: nowTime(),
      waypoints: [],
      checklistOk: form.checklistOk,
    };

    setTrips((prev: Trip[]) => [newTrip, ...prev]);
    showToast('Enviado', 'Aguardando aprovação.', 'success');
    setError('');
    if (form.driverName.trim() === 'João Silva') onDone?.();
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Nova Solicitação</h1>
          <p>Avaliação de risco</p>
        </div>
      </div>
      <datalist id="cidades">
        {Object.keys(CITY_COORDS).map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      <div className="card" style={{ maxWidth: 900 }}>
        <div className="card-body">
          {error && (
            <div
              className="alert-tip mb-4"
              style={{ background: 'var(--danger-50)', color: 'var(--danger-700)' }}
            >
              <I.Alert />
              <span>{error}</span>
            </div>
          )}

          <div className="form-grid">
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>Dados do Colaborador</h3>
            <div className="form-row">
              <div className="form-field">
                <label>Nome</label>
                <input
                  className="form-input"
                  value={form.driverName}
                  onChange={(e) => setForm({ ...form, driverName: e.target.value })}
                />
              </div>
              <div className="form-field">
                <label>Vínculo</label>
                <select
                  className="form-select"
                  value={form.isExternal ? '1' : '0'}
                  onChange={(e) => setForm({ ...form, isExternal: e.target.value === '1' })}
                >
                  <option value="0">Próprio</option>
                  <option value="1">Terceiro</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label>Veículo</label>
              <input
                className="form-input"
                value={form.transport}
                onChange={(e) => setForm({ ...form, transport: e.target.value })}
              />
            </div>

            <h3 style={{ fontSize: 16, marginTop: 16, marginBottom: 8 }}>Trajeto</h3>
            <div className="form-row">
              <div className="form-field">
                <label>Origem</label>
                <input
                  type="text"
                  list="cidades"
                  className="form-input"
                  value={form.origin}
                  onChange={(e) => setForm({ ...form, origin: e.target.value })}
                  placeholder="Ex: Av. Tenente Célio, 100, Macaé"
                />
              </div>
              <div className="form-field">
                <label>Destino</label>
                <input
                  type="text"
                  list="cidades"
                  className="form-input"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  placeholder="Ex: Rua das Flores, Rio das Ostras"
                />
              </div>
            </div>

            <div className="mt-4" style={{ height: 350, width: '100%' }}>
              <RouteMap
                key={`${form.origin}-${form.destination}`}
                origin={form.origin}
                destination={form.destination}
                waypoints={[]}
                onRouteInfo={setRouteInfo}
              />
            </div>
            <MapLegend />

            {routeInfo && (
              <div className="alert-detail mt-4" style={{ display: 'flex', gap: 24 }}>
                <div>
                  <span className="text-xs text-muted">Distância</span>
                  <strong style={{ display: 'block' }}>{routeInfo.distanceKm} km</strong>
                </div>
                <div>
                  <span className="text-xs text-muted">Tempo estimado</span>
                  <strong style={{ display: 'block' }}>{formatDuration(routeInfo.durationMin)}</strong>
                </div>
              </div>
            )}

            {shortTrip && (
              <div
                className="alert-tip mt-2"
                style={{
                  background: '#fef3c7',
                  color: '#92400e',
                  border: '1px solid #fcd34d',
                  borderRadius: 8,
                  padding: '10px 12px',
                  fontSize: 13,
                  display: 'flex',
                  gap: 8,
                  alignItems: 'flex-start',
                }}
              >
                <I.Info />
                <span>
                  Atenção: este recurso é recomendado para viagens rodoviárias
                  acima de 150 km. Rotas mais curtas não serão bloqueadas, mas o
                  critério de elegibilidade não é atendido.
                </span>
              </div>
            )}

            <h3 style={{ fontSize: 16, marginTop: 24, marginBottom: 8 }}>Fatores Complementares</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 16,
              }}
            >
              <ToggleRow
                label="Viagem Noturna?"
                desc="Dirigir entre 22h e 06h"
                value={form.isNight}
                onChange={(v: boolean) => setForm({ ...form, isNight: v })}
              />
              <ToggleRow
                label="Clima Severo?"
                desc="Chuva forte, neblina"
                value={form.weatherSevere}
                onChange={(v: boolean) => setForm({ ...form, weatherSevere: v })}
              />
              <ToggleRow
                label="Área Remota?"
                desc="Estradas não pavimentadas"
                value={form.remoteArea}
                onChange={(v: boolean) => setForm({ ...form, remoteArea: v })}
              />
              <ToggleRow
                label="Inspeção Veicular OK?"
                desc="Pneus, freios, luzes"
                value={form.checklistOk}
                onChange={(v: boolean) => setForm({ ...form, checklistOk: v })}
              />
            </div>

            <h3 style={{ fontSize: 16, marginTop: 24, marginBottom: 8 }}>Avaliação de Fadiga</h3>
            <div className="form-row">
              <div className="form-field">
                <label>Último descanso (horas)</label>
                <input
                  type="number"
                  min={0}
                  className="form-input"
                  value={form.restPeriod}
                  onChange={(e) => setForm({ ...form, restPeriod: Number(e.target.value) })}
                />
              </div>
              <div className="form-field">
                <label>Horas trabalhadas (24h)</label>
                <input
                  type="number"
                  min={0}
                  max={24}
                  className="form-input"
                  value={form.hours24h}
                  onChange={(e) => setForm({ ...form, hours24h: Number(e.target.value) })}
                />
              </div>
            </div>

            <div
              className="mt-4"
              style={{
                padding: 16,
                borderRadius: 10,
                border: '1px solid var(--border)',
                background: 'var(--slate-50)',
              }}
            >
              <div className="row-between" style={{ marginBottom: 8 }}>
                <strong style={{ fontSize: 13 }}>Risco Final Consolidado</strong>
              </div>
              <RiskBar score={finalScore} />
              <div style={{ marginTop: 8, fontSize: 11, color: 'var(--slate-500)', lineHeight: 1.6 }}>
                <div>• Noturno: +20 · Clima severo: +20 · Área remota: +15</div>
                <div>• Distância &gt;150 km: +15 · Duração &gt;2h: +10</div>
                <div>• Inspeção pendente: +30 · Déficit de descanso: +5/h · Hora extra: +3/h</div>
              </div>
              {fatigueAlert && (
                <p style={{ marginTop: 8, fontSize: 12, color: 'var(--danger-700)' }}>
                  Alerta de fadiga: descanso abaixo de 8h ou mais de 10h trabalhadas.
                </p>
              )}
            </div>

            <div className="row-between mt-4">
              <span className="text-xs text-muted">* Distância e tempo calculados via mapa.</span>
              <button className="btn btn-primary" onClick={handleSubmit}>
                <I.Send /> Enviar para Aprovação
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
