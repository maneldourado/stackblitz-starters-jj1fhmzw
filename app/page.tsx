'use client';

import { useEffect, useMemo, useState } from 'react';

/* =========================================================
   ÍCONES
   ========================================================= */
const I = {
  Home: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Route: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  ),
  Users: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Chart: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  Settings: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Bell: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  Search: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  MapPin: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Clock: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Alert: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Car: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4H8L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  ),
  Check: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Manager: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Driver: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Send: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  ArrowUp: () => (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  ),
  ArrowDown: () => (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  ),
  Shield: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Plus: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Download: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Phone: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Info: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  X: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Calendar: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Briefcase: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  User: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  LogOut: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Eye: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Trash: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Chat: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Activity: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Moon: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
};

/* =========================================================
   TIPOS E DADOS BASE
   ========================================================= */
type Role = 'gestor' | 'funcionario';
type ToastTone = 'success' | 'error' | 'info' | 'warning';

type Trip = {
  id: string;
  driverId: string;
  driverName: string;
  origin: string;
  destination: string;
  distance: number;
  transport: string;
  isNight: boolean;
  weatherSevere: boolean;
  remoteArea: boolean;
  restPeriod: number; // horas
  hours24h: number; // horas
  riskScore: number;
  fatigueAlert: boolean;
  status: 'Pendente' | 'Aprovada' | 'Em Andamento' | 'Concluída' | 'Rejeitada';
  time: string;
};

const EMPLOYEES = [
  { id: 'joao', name: 'João Silva', role: 'Consultor', status: 'Disponível' },
  {
    id: 'carlos',
    name: 'Carlos Pereira',
    role: 'Analista',
    status: 'Disponível',
  },
  {
    id: 'rafael',
    name: 'Rafael Santos',
    role: 'Diretor',
    status: 'Disponível',
  },
  { id: 'thiago', name: 'Thiago Costa', role: 'Técnico', status: 'Disponível' },
];

const INITIAL_TRIPS: Trip[] = [
  {
    id: 'VG-001',
    driverId: 'joao',
    driverName: 'João Silva',
    origin: 'Rio de Janeiro, RJ',
    destination: 'Macaé, RJ',
    distance: 180,
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
  },
  {
    id: 'VG-002',
    driverId: 'carlos',
    driverName: 'Carlos Pereira',
    origin: 'Rio de Janeiro, RJ',
    destination: 'Vitória, ES',
    distance: 520,
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
  },
];

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

  const showToast = (title: string, desc: string, tone: ToastTone = 'info') => {
    const id = Date.now();
    setToasts((t) => [...t, { id, title, desc, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };

  const handleRoleChange = (r: Role) => {
    setRole(r);
    setActiveTab(r === 'gestor' ? 'dashboard' : 'minhas-viagens');
  };

  return (
    <div className="app-shell">
      <Sidebar
        role={role}
        setRole={handleRoleChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="main-area">
        {role === 'gestor' ? (
          <ManagerShell
            activeTab={activeTab}
            trips={trips}
            setTrips={setTrips}
            showToast={showToast}
          />
        ) : (
          <EmployeeShell
            activeTab={activeTab}
            trips={trips}
            setTrips={setTrips}
            showToast={showToast}
          />
        )}
      </div>
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.tone}`}>
            <div className="toast-icon">
              {t.tone === 'success' ? (
                <I.Check />
              ) : t.tone === 'error' ? (
                <I.X />
              ) : (
                <I.Info />
              )}
            </div>
            <div className="toast-body">
              <strong>{t.title}</strong>
              <p>{t.desc}</p>
            </div>
            <button
              className="toast-close"
              onClick={() =>
                setToasts((arr) => arr.filter((x) => x.id !== t.id))
              }
            >
              <I.X />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR E TOPBAR
   ========================================================= */
function Sidebar({
  role,
  setRole,
  activeTab,
  setActiveTab,
}: {
  role: Role;
  setRole: (r: Role) => void;
  activeTab: string;
  setActiveTab: (s: string) => void;
}) {
  const gestorNav = [
    { id: 'dashboard', label: 'Dashboard', icon: <I.Home /> },
    { id: 'viagens', label: 'Solicitações', icon: <I.Route /> },
    { id: 'funcionarios', label: 'Funcionários', icon: <I.Users /> },
  ];
  const funcNav = [
    { id: 'minhas-viagens', label: 'Minhas Viagens', icon: <I.Route /> },
    { id: 'solicitar', label: 'Nova Solicitação', icon: <I.Plus /> },
  ];
  const nav = role === 'gestor' ? gestorNav : funcNav;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">
          <I.Shield />
        </div>
        <div className="brand-text">
          <strong>RotaSegura</strong>
          <span>Corporate Travel</span>
        </div>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Modo de Acesso</div>
        <div className="role-switch">
          <button
            className={role === 'gestor' ? 'active' : ''}
            onClick={() => setRole('gestor')}
          >
            <I.Manager /> Gestor
          </button>
          <button
            className={role === 'funcionario' ? 'active' : ''}
            onClick={() => setRole('funcionario')}
          >
            <I.Driver /> Colaborador
          </button>
        </div>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-label">Menu Principal</div>
        {nav.map((item) => (
          <a
            key={item.id}
            className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="sidebar-user">
        {role === 'gestor' ? (
          <>
            <div className="avatar brand">MC</div>
            <div className="sidebar-user-info">
              <strong>Mariana Costa</strong>
              <span>Gestora Direta</span>
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

function Topbar({ breadcrumb }: { breadcrumb: string[] }) {
  return (
    <header className="topbar">
      <div className="topbar-breadcrumb">
        {breadcrumb.map((item, idx) => (
          <span
            key={idx}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            {idx > 0 && <span style={{ color: 'var(--slate-300)' }}>/</span>}
            <span className={idx === breadcrumb.length - 1 ? 'current' : ''}>
              {item}
            </span>
          </span>
        ))}
      </div>
      <div className="topbar-actions">
        <button className="icon-btn">
          <I.Bell />
        </button>
        <div className="avatar brand" style={{ width: 38, height: 38 }}>
          MC
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   SHELL GESTOR
   ========================================================= */
function ManagerShell({
  activeTab,
  trips,
  setTrips,
  showToast,
}: {
  activeTab: string;
  trips: Trip[];
  setTrips: any;
  showToast: any;
}) {
  const breadcrumbMap: any = {
    dashboard: ['Gestão', 'Dashboard'],
    viagens: ['Gestão', 'Solicitações de Viagem'],
    funcionarios: ['Gestão', 'Funcionários'],
  };

  const handleApprove = (id: string) => {
    setTrips((prev: Trip[]) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Aprovada' } : t))
    );
    showToast('Viagem Aprovada', `A viagem ${id} foi liberada.`, 'success');
  };
  const handleReject = (id: string) => {
    setTrips((prev: Trip[]) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Rejeitada' } : t))
    );
    showToast('Viagem Rejeitada', `A viagem ${id} foi bloqueada.`, 'error');
  };

  return (
    <>
      <Topbar breadcrumb={breadcrumbMap[activeTab]} />
      <div className="content">
        {activeTab === 'dashboard' && <ManagerDashboard trips={trips} />}
        {activeTab === 'viagens' && (
          <ManagerTrips
            trips={trips}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
        {activeTab === 'funcionarios' && <ManagerEmployees />}
      </div>
    </>
  );
}

function ManagerDashboard({ trips }: { trips: Trip[] }) {
  const totalTrips = trips.length;
  const nightTrips = trips.filter((t) => t.isNight).length;
  const unapproved = trips.filter(
    (t) => t.status === 'Pendente' || t.status === 'Em Andamento'
  ).length;
  const fatigueEvents = trips.filter((t) => t.fatigueAlert).length;
  const totalHours = trips.reduce((acc, t) => acc + t.distance / 60, 0); // Simulação: 60km/h média

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Dashboard de Risco e Viagens</h1>
          <p>Monitoramento de conformidade e fadiga em tempo real</p>
        </div>
      </div>

      <div className="kpi-grid">
        <KpiCard
          label="Número de Viagens"
          value={String(totalTrips)}
          tone="blue"
          icon={<I.Route />}
        />
        <KpiCard
          label="Horas Dirigidas"
          value={`${totalHours.toFixed(1)}h`}
          tone="green"
          icon={<I.Clock />}
        />
        <KpiCard
          label="Viagens Noturnas"
          value={String(nightTrips)}
          tone="amber"
          icon={<I.Moon />}
        />
        <KpiCard
          label="Sem Aprovação"
          value={String(unapproved)}
          tone="red"
          icon={<I.Alert />}
        />
        <KpiCard
          label="Alertas de Fadiga"
          value={String(fatigueEvents)}
          tone="red"
          icon={<I.Activity />}
        />
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3>Últimas Movimentações</h3>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Motorista</th>
                <th>Destino</th>
                <th>Distância</th>
                <th>Risco</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t) => (
                <tr key={t.id}>
                  <td>
                    <span className="cell-mono">{t.id}</span>
                  </td>
                  <td>{t.driverName}</td>
                  <td>{t.destination}</td>
                  <td>{t.distance} km</td>
                  <td>
                    <span
                      className={`badge ${
                        t.riskScore > 70
                          ? 'badge-danger'
                          : t.riskScore > 40
                          ? 'badge-warning'
                          : 'badge-success'
                      }`}
                    >
                      {t.riskScore}%
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-neutral">{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ManagerTrips({ trips, onApprove, onReject }: any) {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Aprovação Eletrônica</h1>
          <p>Workflow de liberação para o gestor direto</p>
        </div>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Colaborador</th>
                <th>Rota</th>
                <th>Análise de Risco</th>
                <th>Fadiga</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t: Trip) => (
                <tr key={t.id}>
                  <td>
                    <span className="cell-mono">{t.id}</span>
                  </td>
                  <td>{t.driverName}</td>
                  <td>
                    {t.origin} → {t.destination} ({t.distance} km)
                  </td>
                  <td>
                    <div style={{ fontSize: 12 }}>
                      Noturna: {t.isNight ? 'Sim' : 'Não'}
                    </div>
                    <div style={{ fontSize: 12 }}>
                      Clima: {t.weatherSevere ? 'Severo' : 'Bom'}
                    </div>
                    <div style={{ fontSize: 12 }}>
                      Área Remota: {t.remoteArea ? 'Sim' : 'Não'}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        t.fatigueAlert ? 'badge-danger' : 'badge-success'
                      }`}
                    >
                      {t.fatigueAlert ? 'Risco Alto' : 'Regular'}
                    </span>
                    <div className="text-xs text-muted mt-2">
                      Descanso: {t.restPeriod}h | 24h: {t.hours24h}h
                    </div>
                  </td>
                  <td>
                    {t.status === 'Pendente' ? (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => onApprove(t.id)}
                        >
                          <I.Check /> Aprovar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onReject(t.id)}
                        >
                          <I.X /> Rejeitar
                        </button>
                      </div>
                    ) : (
                      <span className="badge badge-info">{t.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ManagerEmployees() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Funcionários</h1>
          <p>Base de colaboradores autorizados</p>
        </div>
      </div>
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {EMPLOYEES.map((e) => (
              <tr key={e.id}>
                <td>
                  <strong>{e.name}</strong>
                </td>
                <td>{e.role}</td>
                <td>
                  <span className="badge badge-success">{e.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* =========================================================
   SHELL FUNCIONÁRIO
   ========================================================= */
function EmployeeShell({ activeTab, trips, setTrips, showToast }: any) {
  const breadcrumbMap: any = {
    'minhas-viagens': ['Minha Jornada', 'Minhas Viagens'],
    solicitar: ['Minha Jornada', 'Nova Solicitação'],
  };
  return (
    <>
      <Topbar breadcrumb={breadcrumbMap[activeTab]} />
      <div className="content">
        {activeTab === 'minhas-viagens' && (
          <EmployeeTrips
            trips={trips}
            setTrips={setTrips}
            showToast={showToast}
          />
        )}
        {activeTab === 'solicitar' && (
          <RequestForm setTrips={setTrips} showToast={showToast} />
        )}
      </div>
    </>
  );
}

function EmployeeTrips({ trips, setTrips, showToast }: any) {
  const myTrips = trips.filter((t: Trip) => t.driverId === 'joao');

  const handleStart = (id: string) => {
    setTrips((prev: Trip[]) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Em Andamento' } : t))
    );
    showToast(
      'Viagem Iniciada',
      'Boa viagem! O rastreamento está ativo.',
      'success'
    );
  };
  const handleComplete = (id: string) => {
    setTrips((prev: Trip[]) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Concluída' } : t))
    );
    showToast(
      'Viagem Concluída',
      'Registro de execução finalizado.',
      'success'
    );
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Minhas Viagens</h1>
          <p>Execução e registro de deslocamentos</p>
        </div>
      </div>
      <div className="grid-2col">
        {myTrips.map((t: Trip) => (
          <div key={t.id} className="card">
            <div className="card-header">
              <div>
                <h3>
                  {t.origin} → {t.destination}
                </h3>
                <p>
                  {t.id} · {t.distance} km
                </p>
              </div>
              <span
                className={`badge ${
                  t.status === 'Aprovada'
                    ? 'badge-success'
                    : t.status === 'Em Andamento'
                    ? 'badge-warning'
                    : 'badge-neutral'
                }`}
              >
                {t.status}
              </span>
            </div>
            <div className="card-body">
              <div className="alert-detail mb-4">
                <div className="alert-detail-row">
                  <span>Transporte</span>
                  <strong>{t.transport}</strong>
                </div>
                <div className="alert-detail-row">
                  <span>Horário</span>
                  <strong>{t.time}</strong>
                </div>
                <div className="alert-detail-row">
                  <span>Risco Calculado</span>
                  <strong>{t.riskScore}%</strong>
                </div>
              </div>
              {t.status === 'Aprovada' && (
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => handleStart(t.id)}
                >
                  Iniciar Viagem
                </button>
              )}
              {t.status === 'Em Andamento' && (
                <button
                  className="btn btn-success btn-block"
                  onClick={() => handleComplete(t.id)}
                >
                  <I.Check /> Registrar Conclusão
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function RequestForm({ setTrips, showToast }: any) {
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    distance: 0,
    transport: 'Toyota Hilux · RJ-45RF',
    isNight: false,
    weatherSevere: false,
    remoteArea: false,
    restPeriod: 8,
    hours24h: 0,
  });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // Validação estrita de negócio
    if (form.distance < 150)
      return setError(
        'Bloqueado: A política exige viagens acima de 150 km para gestão corporativa.'
      );
    if (!form.origin || !form.destination)
      return setError('Preencha origem e destino.');

    // Cálculo de Risco (0 a 100)
    let risk = 0;
    if (form.isNight) risk += 30;
    if (form.distance > 400) risk += 20;
    if (form.weatherSevere) risk += 20;
    if (form.remoteArea) risk += 20;

    // Cálculo de Fadiga
    let fatigue = false;
    if (form.restPeriod < 8 || form.hours24h > 10) {
      fatigue = true;
      risk += 30;
    }

    const newTrip: Trip = {
      id: `VG-${Math.floor(Math.random() * 900) + 100}`,
      driverId: 'joao',
      driverName: 'João Silva',
      origin: form.origin,
      destination: form.destination,
      distance: Number(form.distance),
      transport: form.transport,
      isNight: form.isNight,
      weatherSevere: form.weatherSevere,
      remoteArea: form.remoteArea,
      restPeriod: Number(form.restPeriod),
      hours24h: Number(form.hours24h),
      riskScore: Math.min(risk, 100),
      fatigueAlert: fatigue,
      status: 'Pendente',
      time: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setTrips((prev: Trip[]) => [newTrip, ...prev]);
    showToast(
      'Solicitação Enviada',
      'Aguardando aprovação eletrônica do gestor.',
      'success'
    );
    setForm({
      origin: '',
      destination: '',
      distance: 0,
      transport: 'Toyota Hilux · RJ-45RF',
      isNight: false,
      weatherSevere: false,
      remoteArea: false,
      restPeriod: 8,
      hours24h: 0,
    });
    setError('');
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Nova Solicitação de Viagem</h1>
          <p>Preencha os dados para avaliação automática</p>
        </div>
      </div>
      <div className="card" style={{ maxWidth: 800 }}>
        <div className="card-body">
          {error && (
            <div
              className="alert-tip mb-4"
              style={{
                background: 'var(--danger-50)',
                color: 'var(--danger-700)',
              }}
            >
              <I.Alert />
              <span>{error}</span>
            </div>
          )}

          <div className="form-grid">
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>Dados da Rota</h3>
            <div className="form-row">
              <div className="form-field">
                <label>Origem</label>
                <input
                  className="form-input"
                  value={form.origin}
                  onChange={(e) => setForm({ ...form, origin: e.target.value })}
                  placeholder="Cidade/UF"
                />
              </div>
              <div className="form-field">
                <label>Destino</label>
                <input
                  className="form-input"
                  value={form.destination}
                  onChange={(e) =>
                    setForm({ ...form, destination: e.target.value })
                  }
                  placeholder="Cidade/UF"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Distância (km)</label>
                <input
                  type="number"
                  className="form-input"
                  value={form.distance || ''}
                  onChange={(e) =>
                    setForm({ ...form, distance: Number(e.target.value) })
                  }
                />
              </div>
              <div className="form-field">
                <label>Meio de Transporte / Veículo</label>
                <input className="form-input" value={form.transport} readOnly />
              </div>
            </div>

            <h3 style={{ fontSize: 16, marginTop: 16, marginBottom: 8 }}>
              Avaliação Automática de Risco
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              <ToggleRow
                label="Viagem Noturna?"
                desc="Dirigir entre 22h e 06h"
                value={form.isNight}
                onChange={(v) => setForm({ ...form, isNight: v })}
              />
              <ToggleRow
                label="Clima Severo?"
                desc="Chuva forte, neblina, etc."
                value={form.weatherSevere}
                onChange={(v) => setForm({ ...form, weatherSevere: v })}
              />
              <ToggleRow
                label="Área Remota?"
                desc="Estradas não pavimentadas"
                value={form.remoteArea}
                onChange={(v) => setForm({ ...form, remoteArea: v })}
              />
            </div>

            <h3 style={{ fontSize: 16, marginTop: 16, marginBottom: 8 }}>
              Avaliação de Fadiga
            </h3>
            <div className="form-row">
              <div className="form-field">
                <label>Último descanso (horas)</label>
                <input
                  type="number"
                  className="form-input"
                  value={form.restPeriod}
                  onChange={(e) =>
                    setForm({ ...form, restPeriod: Number(e.target.value) })
                  }
                />
              </div>
              <div className="form-field">
                <label>Horas trabalhadas nas últimas 24h</label>
                <input
                  type="number"
                  className="form-input"
                  value={form.hours24h}
                  onChange={(e) =>
                    setForm({ ...form, hours24h: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            <div className="row-between mt-4">
              <span className="text-xs text-muted">
                * Viagens &gt; 150 km requerem aprovação do gestor.
              </span>
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

/* =========================================================
   AUXILIARES
   ========================================================= */
function ToggleRow({ label, desc, value, onChange }: any) {
  return (
    <div className="row-between" style={{ padding: '8px 0' }}>
      <div>
        <strong style={{ display: 'block', fontSize: 13 }}>{label}</strong>
        <span style={{ fontSize: 11, color: 'var(--slate-500)' }}>{desc}</span>
      </div>
      <button
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
