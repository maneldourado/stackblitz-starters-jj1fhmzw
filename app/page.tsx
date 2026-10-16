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
  Truck: () => (
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
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
  More: () => (
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
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
  Edit: () => (
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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
};

/* =========================================================
   TIPOS
   ========================================================= */

type Role = 'gestor' | 'funcionario';
type ToastTone = 'success' | 'error' | 'info' | 'warning';

type DelayReport = {
  id: string;
  driverName: string;
  driverInitials: string;
  vehicle: string;
  route: string;
  reasonId: string;
  reasonLabel: string;
  details: string;
  time: string;
};

type Trip = {
  id: string;
  initials: string;
  name: string;
  role: string;
  mat: string;
  plate: string;
  model: string;
  destination: string;
  start: string;
  end: string;
  progress: number;
  status: string;
  tone: 'success' | 'info' | 'warning' | 'danger';
  toneAvatar: 'brand' | 'success';
};

type Notification = {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  tone: 'info' | 'success' | 'danger' | 'warning';
};

type Toast = { id: number; title: string; desc: string; tone: ToastTone };

/* =========================================================
   DADOS
   ========================================================= */

const DELAY_REASONS = [
  {
    id: 'traffic',
    label: 'Trânsito intenso',
    desc: 'Congestionamento acima do previsto',
  },
  {
    id: 'mechanical',
    label: 'Problema mecânico',
    desc: 'Falha ou pane no veículo',
  },
  {
    id: 'roadwork',
    label: 'Obra na via',
    desc: 'Interdição, desvio ou via bloqueada',
  },
  {
    id: 'weather',
    label: 'Condições climáticas',
    desc: 'Chuva forte, neblina ou vento',
  },
  {
    id: 'meeting',
    label: 'Reunião estendida',
    desc: 'Compromisso durou mais que o previsto',
  },
  { id: 'other', label: 'Outro motivo', desc: 'Descreva abaixo o ocorrido' },
];

const getReasonLabel = (id: string) =>
  DELAY_REASONS.find((r) => r.id === id)?.label ?? 'Outro motivo';

const INITIAL_TRIPS: Trip[] = [
  {
    id: 'VG-4821',
    initials: 'JS',
    name: 'João Silva',
    role: 'Consultor',
    mat: '11122',
    plate: 'RJ-45RF',
    model: 'Toyota Hilux',
    destination: 'Macaé, RJ',
    start: '08:30',
    end: '10:15',
    progress: 65,
    status: 'Em viagem',
    tone: 'success',
    toneAvatar: 'success',
  },
  {
    id: 'VG-4820',
    initials: 'CP',
    name: 'Carlos Pereira',
    role: 'Analista',
    mat: '12345',
    plate: 'ABC-1234',
    model: 'Fiat Toro',
    destination: 'Campos, RJ',
    start: '09:10',
    end: '11:45',
    progress: 40,
    status: 'Em viagem',
    tone: 'success',
    toneAvatar: 'brand',
  },
  {
    id: 'VG-4819',
    initials: 'RS',
    name: 'Rafael Santos',
    role: 'Diretor',
    mat: '98765',
    plate: 'XDE-5678',
    model: 'Toyota Hilux',
    destination: 'Vitória, ES',
    start: '07:45',
    end: '13:00',
    progress: 90,
    status: 'Chegando',
    tone: 'info',
    toneAvatar: 'brand',
  },
  {
    id: 'VG-4818',
    initials: 'TC',
    name: 'Thiago Costa',
    role: 'Técnico',
    mat: '45678',
    plate: 'XYZ-9012',
    model: 'Ford Ranger',
    destination: 'Niterói, RJ',
    start: 'Aguardando',
    end: '—',
    progress: 0,
    status: 'Pendente',
    tone: 'warning',
    toneAvatar: 'brand',
  },
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Veículo em manutenção',
    desc: 'Ford Ranger · XYZ-9012 · Preventiva agendada',
    time: 'há 20 min',
    read: false,
    tone: 'warning',
  },
  {
    id: 'n2',
    title: 'Viagem com atraso',
    desc: 'Rafael Santos · 12 min além do previsto',
    time: 'há 1 hora',
    read: false,
    tone: 'danger',
  },
  {
    id: 'n3',
    title: 'Nova solicitação de viagem',
    desc: 'Aguardando sua aprovação',
    time: 'há 3 horas',
    read: false,
    tone: 'info',
  },
];

const EMPLOYEES = [
  {
    id: 'joao',
    name: 'João Silva · Consultor',
    role: 'Consultor',
    mat: '11122',
    status: 'Em viagem',
  },
  {
    id: 'carlos',
    name: 'Carlos Pereira · Analista',
    role: 'Analista',
    mat: '12345',
    status: 'Em viagem',
  },
  {
    id: 'rafael',
    name: 'Rafael Santos · Diretor',
    role: 'Diretor',
    mat: '98765',
    status: 'Em viagem',
  },
  {
    id: 'thiago',
    name: 'Thiago Costa · Técnico',
    role: 'Técnico',
    mat: '45678',
    status: 'Disponível',
  },
  {
    id: 'ana',
    name: 'Ana Souza · Analista',
    role: 'Analista',
    mat: '55123',
    status: 'Disponível',
  },
  {
    id: 'pedro',
    name: 'Pedro Lima · Consultor',
    role: 'Consultor',
    mat: '66234',
    status: 'Férias',
  },
];

const VEHICLES = [
  { id: 'hilux', label: 'Toyota Hilux · RJ-45RF' },
  { id: 'toro', label: 'Fiat Toro · ABC-1234' },
  { id: 'ranger', label: 'Ford Ranger · XYZ-9012' },
];

const FLEET = [
  {
    plate: 'RJ-45RF',
    model: 'Toyota Hilux',
    year: 2023,
    km: '48.230',
    status: 'Em uso',
    tone: 'info',
  },
  {
    plate: 'ABC-1234',
    model: 'Fiat Toro',
    year: 2022,
    km: '62.110',
    status: 'Em uso',
    tone: 'info',
  },
  {
    plate: 'XDE-5678',
    model: 'Toyota Hilux',
    year: 2023,
    km: '31.540',
    status: 'Em uso',
    tone: 'info',
  },
  {
    plate: 'XYZ-9012',
    model: 'Ford Ranger',
    year: 2021,
    km: '89.720',
    status: 'Manutenção',
    tone: 'warning',
  },
  {
    plate: 'QWE-3344',
    model: 'Chevrolet S10',
    year: 2022,
    km: '55.180',
    status: 'Disponível',
    tone: 'success',
  },
];

/* =========================================================
   APP (orquestra tudo)
   ========================================================= */

export default function App() {
  const [role, setRole] = useState<Role>('gestor');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [delayReport, setDelayReport] = useState<DelayReport | null>(null);
  const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
  const [notifications, setNotifications] = useState<Notification[]>(
    INITIAL_NOTIFICATIONS
  );
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (title: string, desc: string, tone: ToastTone = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, title, desc, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  };

  const pushNotification = (
    title: string,
    desc: string,
    tone: 'info' | 'success' | 'danger' | 'warning' = 'info'
  ) => {
    setNotifications((n) => [
      { id: `n-${Date.now()}`, title, desc, time: 'agora', read: false, tone },
      ...n,
    ]);
  };

  useEffect(() => {
    if (delayReport) {
      pushNotification(
        'Atraso reportado',
        `${delayReport.driverName} · ${delayReport.reasonLabel}`,
        'danger'
      );
    }
  }, [delayReport?.id]);

  const handleRoleChange = (r: Role) => {
    setRole(r);
    setActiveTab(r === 'gestor' ? 'dashboard' : 'viagem-atual');
  };

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="app-shell">
      <Sidebar
        role={role}
        setRole={handleRoleChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unread={unread}
      />
      <div className="main-area">
        {role === 'gestor' ? (
          <ManagerShell
            activeTab={activeTab}
            delayReport={delayReport}
            trips={trips}
            setTrips={setTrips}
            notifications={notifications}
            setNotifications={setNotifications}
            showToast={showToast}
          />
        ) : (
          <EmployeeShell
            activeTab={activeTab}
            delayReport={delayReport}
            onReportDelay={(r) => {
              setDelayReport(r);
              showToast(
                'Atraso reportado',
                'Sua central foi notificada.',
                'success'
              );
            }}
            showToast={showToast}
          />
        )}
      </div>
      <ToastContainer toasts={toasts} setToasts={setToasts} />
    </div>
  );
}

/* =========================================================
   TOASTS
   ========================================================= */

function ToastContainer({
  toasts,
  setToasts,
}: {
  toasts: Toast[];
  setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
}) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.tone}`}>
          <div className="toast-icon">
            {t.tone === 'success' ? (
              <I.Check />
            ) : t.tone === 'error' ? (
              <I.X />
            ) : t.tone === 'warning' ? (
              <I.Alert />
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
            onClick={() => setToasts((arr) => arr.filter((x) => x.id !== t.id))}
            aria-label="Fechar"
          >
            <I.X />
          </button>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   SIDEBAR (controlada pelo App)
   ========================================================= */

function Sidebar({
  role,
  setRole,
  activeTab,
  setActiveTab,
  unread,
}: {
  role: Role;
  setRole: (r: Role) => void;
  activeTab: string;
  setActiveTab: (s: string) => void;
  unread: number;
}) {
  const gestorNav = [
    { id: 'dashboard', label: 'Dashboard', icon: <I.Home /> },
    {
      id: 'viagens',
      label: 'Viagens',
      icon: <I.Route />,
      badge: unread > 0 ? '!' : undefined,
      pulse: unread > 0,
    },
    { id: 'funcionarios', label: 'Funcionários', icon: <I.Users /> },
    { id: 'frota', label: 'Frota', icon: <I.Car /> },
    { id: 'relatorios', label: 'Relatórios', icon: <I.Chart /> },
    { id: 'config', label: 'Configurações', icon: <I.Settings /> },
  ];

  const funcNav = [
    { id: 'viagem-atual', label: 'Viagem Atual', icon: <I.Route /> },
    { id: 'agenda', label: 'Minha Agenda', icon: <I.Calendar /> },
    { id: 'comunicacao', label: 'Comunicação', icon: <I.Chat />, badge: '2' },
    { id: 'historico', label: 'Histórico', icon: <I.Clock /> },
    { id: 'config', label: 'Configurações', icon: <I.Settings /> },
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
          <span>Business Travel Platform</span>
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
            <I.Driver /> Funcionário
          </button>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-label">
          {role === 'gestor' ? 'Operação' : 'Minha Jornada'}
        </div>
        {nav.map((item) => (
          <a
            key={item.id}
            className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge && (
              <span className={`nav-badge ${item.pulse ? 'pulse' : ''}`}>
                {item.badge}
              </span>
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
              <span>Gerente de Operações</span>
            </div>
          </>
        ) : (
          <>
            <div className="avatar success">JS</div>
            <div className="sidebar-user-info">
              <strong>João Silva</strong>
              <span>Consultor · Hilux RJ-45RF</span>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

/* =========================================================
   SHELL GESTOR (roteia por aba)
   ========================================================= */

function ManagerShell({
  activeTab,
  delayReport,
  trips,
  setTrips,
  notifications,
  setNotifications,
  showToast,
}: {
  activeTab: string;
  delayReport: DelayReport | null;
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [tripDetails, setTripDetails] = useState<Trip | null>(null);

  useEffect(() => {
    if (delayReport) setAlertDismissed(false);
  }, [delayReport?.id]);

  const showAlert = !!delayReport && !alertDismissed;

  const breadcrumbMap: { [k: string]: string[] } = {
    dashboard: ['Operação', 'Dashboard'],
    viagens: ['Operação', 'Viagens'],
    funcionarios: ['Operação', 'Funcionários'],
    frota: ['Operação', 'Frota'],
    relatorios: ['Operação', 'Relatórios'],
    config: ['Sistema', 'Configurações'],
  };

  const handleExport = () => {
    const header =
      'ID;Funcionário;Veículo;Placa;Destino;Início;Fim;Status;Progresso';
    const rows = trips.map((t) =>
      [
        t.id,
        t.name,
        t.model,
        t.plate,
        t.destination,
        t.start,
        t.end,
        t.status,
        `${t.progress}%`,
      ].join(';')
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `viagens-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(
      'Exportação concluída',
      `${trips.length} viagens exportadas.`,
      'success'
    );
  };

  const handleRegister = (data: {
    destination: string;
    employeeId: string;
    vehicleId: string;
    time: string;
  }) => {
    const emp = EMPLOYEES.find((e) => e.id === data.employeeId);
    const veh = VEHICLES.find((v) => v.id === data.vehicleId);
    const [name, role] = (emp?.name ?? '').split(' · ');
    const initials = (name || '')
      .split(' ')
      .map((s) => s[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
    const [model, plate] = (veh?.label ?? '').split(' · ');

    const newTrip: Trip = {
      id: `VG-${4800 + trips.length + 1}`,
      initials: initials || 'NV',
      name: name || 'Novo',
      role: role || 'Funcionário',
      mat: emp?.mat || '00000',
      plate: plate || '—',
      model: model || '—',
      destination: data.destination,
      start: data.time || '—',
      end: '—',
      progress: 0,
      status: 'Pendente',
      tone: 'warning',
      toneAvatar: 'brand',
    };

    setTrips((t) => [newTrip, ...t]);
    setShowRegisterModal(false);
    showToast(
      'Viagem registrada',
      `${newTrip.name} · ${newTrip.destination}`,
      'success'
    );
  };

  const handleCancelTrip = (id: string) => {
    setTrips((arr) => arr.filter((t) => t.id !== id));
    setTripDetails(null);
    showToast(
      'Viagem cancelada',
      `Viagem ${id} removida do sistema.`,
      'warning'
    );
  };

  return (
    <>
      <Topbar
        breadcrumb={breadcrumbMap[activeTab] ?? ['Operação', 'Dashboard']}
        userInitials="MC"
        notifications={notifications}
        setNotifications={setNotifications}
        showToast={showToast}
      />
      <div className="content">
        {activeTab === 'dashboard' && (
          <ManagerDashboard
            delayReport={delayReport}
            onOpenDelayAlert={() => setAlertDismissed(false)}
            trips={trips}
            onExport={handleExport}
            onOpenRegister={() => setShowRegisterModal(true)}
            onTripDetails={setTripDetails}
            showToast={showToast}
          />
        )}
        {activeTab === 'viagens' && (
          <TripsPage
            trips={trips}
            onExport={handleExport}
            onOpenRegister={() => setShowRegisterModal(true)}
            onTripDetails={setTripDetails}
          />
        )}
        {activeTab === 'funcionarios' && (
          <EmployeesPage showToast={showToast} />
        )}
        {activeTab === 'frota' && <FleetPage showToast={showToast} />}
        {activeTab === 'relatorios' && <ReportsPage trips={trips} />}
        {activeTab === 'config' && <SettingsPage showToast={showToast} />}
      </div>

      {showAlert && delayReport && (
        <DelayAlertModal
          report={delayReport}
          onClose={() => setAlertDismissed(true)}
          showToast={showToast}
        />
      )}

      {showRegisterModal && (
        <RegisterTripModal
          onClose={() => setShowRegisterModal(false)}
          onSubmit={handleRegister}
        />
      )}

      {tripDetails && (
        <TripDetailsModal
          trip={tripDetails}
          onClose={() => setTripDetails(null)}
          onCancel={() => handleCancelTrip(tripDetails.id)}
          showToast={showToast}
        />
      )}
    </>
  );
}

/* =========================================================
   SHELL FUNCIONÁRIO (roteia por aba)
   ========================================================= */

function EmployeeShell({
  activeTab,
  delayReport,
  onReportDelay,
  showToast,
}: {
  activeTab: string;
  delayReport: DelayReport | null;
  onReportDelay: (r: DelayReport) => void;
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const breadcrumbMap: { [k: string]: string[] } = {
    'viagem-atual': ['Minha Jornada', 'Viagem Atual'],
    agenda: ['Minha Jornada', 'Minha Agenda'],
    comunicacao: ['Minha Jornada', 'Comunicação'],
    historico: ['Minha Jornada', 'Histórico'],
    config: ['Sistema', 'Configurações'],
  };

  return (
    <>
      <Topbar
        breadcrumb={
          breadcrumbMap[activeTab] ?? ['Minha Jornada', 'Viagem Atual']
        }
        userInitials="JS"
        notifications={INITIAL_NOTIFICATIONS.map((n) => ({ ...n, read: true }))}
        setNotifications={() => {}}
        showToast={showToast}
      />
      <div className="content">
        {activeTab === 'viagem-atual' && (
          <EmployeeDashboard
            delayReport={delayReport}
            onOpenReport={() => setShowReportModal(true)}
            onOpenSupport={() => setShowSupport(true)}
            showToast={showToast}
          />
        )}
        {activeTab === 'agenda' && <SchedulePage showToast={showToast} />}
        {activeTab === 'comunicacao' && <ChatPage showToast={showToast} />}
        {activeTab === 'historico' && <HistoryPage />}
        {activeTab === 'config' && <SettingsPage showToast={showToast} />}
      </div>

      {showReportModal && (
        <ReportDelayModal
          onClose={() => setShowReportModal(false)}
          onSubmit={(reasonId, details) => {
            const time = new Date().toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });
            onReportDelay({
              id: `dl-${Date.now()}`,
              driverName: 'João Silva',
              driverInitials: 'JS',
              vehicle: 'Toyota Hilux · RJ-45RF',
              route: 'Macaé → Campos → Vitória',
              reasonId,
              reasonLabel: getReasonLabel(reasonId),
              details,
              time,
            });
            setShowReportModal(false);
          }}
        />
      )}

      {showSupport && (
        <SupportModal
          onClose={() => setShowSupport(false)}
          showToast={showToast}
        />
      )}
    </>
  );
}

/* =========================================================
   PÁGINAS · GESTOR
   ========================================================= */

function ManagerDashboard({
  delayReport,
  onOpenDelayAlert,
  trips,
  onExport,
  onOpenRegister,
  onTripDetails,
  showToast,
}: {
  delayReport: DelayReport | null;
  onOpenDelayAlert: () => void;
  trips: Trip[];
  onExport: () => void;
  onOpenRegister: () => void;
  onTripDetails: (t: Trip) => void;
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  const recent = trips.slice(0, 4);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Dashboard de Viagens</h1>
          <p>
            Acompanhe as viagens corporativas em tempo real · Atualizado há 2
            minutos ·{' '}
            <span style={{ color: 'var(--success-700)', fontWeight: 600 }}>
              Sistema online
            </span>
          </p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={onExport}>
            <I.Download /> Exportar
          </button>
          <button className="btn btn-primary" onClick={onOpenRegister}>
            <I.Plus /> Registrar Viagem
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <KpiCard
          label="Viagens Ativas"
          value={String(trips.length)}
          tone="blue"
          icon={<I.Route />}
          trend={{ dir: 'up', value: '+3' }}
          meta="vs. ontem"
        />
        <KpiCard
          label="Funcionários em Viagem"
          value="8"
          tone="green"
          icon={<I.Users />}
          trend={{ dir: 'up', value: '+1' }}
          meta="vs. ontem"
        />
        <KpiCard
          label="Viagens Hoje"
          value="47"
          tone="amber"
          icon={<I.Briefcase />}
          trend={{ dir: 'up', value: '+12%' }}
          meta="vs. média"
        />
        <KpiCard
          label="Viagens no Prazo"
          value={delayReport ? '92%' : '96%'}
          tone={delayReport ? 'red' : 'green'}
          icon={<I.Check />}
          trend={{ dir: 'down', value: delayReport ? '-4%' : '-1.2%' }}
          meta="vs. semana"
        />
      </div>

      <div className="grid-2col">
        <div className="card">
          <div className="card-header">
            <div>
              <h3>Viagens em Andamento</h3>
              <p>Acompanhamento em tempo real dos deslocamentos ativos</p>
            </div>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Funcionário</th>
                  <th>Veículo</th>
                  <th>Destino</th>
                  <th>Progresso</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recent.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <UserCell
                        initials={t.initials}
                        name={t.name}
                        sub={`${t.role} · Mat. ${t.mat}`}
                        tone={t.toneAvatar}
                      />
                    </td>
                    <td>
                      <span className="cell-mono">{t.plate}</span>
                      <div className="text-xs text-muted">{t.model}</div>
                    </td>
                    <td>
                      {t.destination}
                      <div className="text-xs text-muted">
                        {t.start} → {t.end}
                      </div>
                    </td>
                    <td style={{ minWidth: 120 }}>
                      <ProgressBar
                        value={t.progress}
                        tone={
                          t.tone === 'success'
                            ? 'blue'
                            : t.tone === 'info'
                            ? 'green'
                            : 'amber'
                        }
                        label={t.progress > 0 ? `${t.progress}%` : 'Aguardando'}
                      />
                    </td>
                    <td>
                      <span className={`badge badge-${t.tone}`}>
                        {t.status}
                      </span>
                    </td>
                    <td>
                      <RowActionsMenu
                        onDetails={() => onTripDetails(t)}
                        onEdit={() =>
                          showToast(
                            'Editar viagem',
                            `${t.id} · ${t.name}`,
                            'info'
                          )
                        }
                        onChat={() =>
                          showToast('Chat', `Conversa com ${t.name}.`, 'info')
                        }
                        onCancel={() => {
                          if (confirm(`Cancelar viagem ${t.id}?`))
                            showToast('Viagem cancelada', t.id, 'warning');
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <div className="card-header">
              <div>
                <h3>Alertas Operacionais</h3>
                <p>Requerem sua atenção</p>
              </div>
              <span className="badge badge-danger no-dot">
                {delayReport ? 4 : 3}
              </span>
            </div>
            <div className="card-body">
              {delayReport && (
                <div
                  className="alert-item"
                  style={{ cursor: 'pointer' }}
                  onClick={onOpenDelayAlert}
                >
                  <div className="alert-icon red">
                    <I.Alert />
                  </div>
                  <div className="alert-body">
                    <strong style={{ color: 'var(--danger-700)' }}>
                      Atraso reportado · {delayReport.driverName}
                    </strong>
                    <p>
                      {delayReport.reasonLabel} · {delayReport.time}
                    </p>
                  </div>
                </div>
              )}
              <div className="alert-item">
                <div className="alert-icon red">
                  <I.Alert />
                </div>
                <div className="alert-body">
                  <strong>Veículo em manutenção</strong>
                  <p>Ford Ranger · XYZ-9012 · Preventiva agendada</p>
                </div>
              </div>
              <div className="alert-item">
                <div className="alert-icon amber">
                  <I.Alert />
                </div>
                <div className="alert-body">
                  <strong>Viagem com atraso</strong>
                  <p>Rafael Santos · 12 min além do previsto</p>
                </div>
              </div>
              <div className="alert-item">
                <div className="alert-icon blue">
                  <I.Info />
                </div>
                <div className="alert-body">
                  <strong>Nova solicitação de viagem</strong>
                  <p>Aguardando aprovação do gestor</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <h3>Atividade Recente</h3>
                <p>Últimas ações do sistema</p>
              </div>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-marker green">
                  <I.Check />
                </div>
                <div className="activity-body">
                  <p>
                    <strong>João Silva</strong> concluiu viagem em Macaé
                  </p>
                  <span className="activity-time">há 8 minutos</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-marker blue">
                  <I.Route />
                </div>
                <div className="activity-body">
                  <p>
                    Nova viagem <strong>#VG-4821</strong> foi registrada
                  </p>
                  <span className="activity-time">há 22 minutos</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-marker amber">
                  <I.Clock />
                </div>
                <div className="activity-body">
                  <p>
                    <strong>Rafael Santos</strong> iniciou viagem para Vitória
                  </p>
                  <span className="activity-time">há 1 hora</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TripsPage({
  trips,
  onExport,
  onOpenRegister,
  onTripDetails,
}: {
  trips: Trip[];
  onExport: () => void;
  onOpenRegister: () => void;
  onTripDetails: (t: Trip) => void;
}) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = trips;
    if (filter !== 'all')
      list = list.filter((t) => t.status.toLowerCase().includes(filter));
    const q = search.trim().toLowerCase();
    if (q)
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.destination.toLowerCase().includes(q) ||
          t.plate.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q)
      );
    return list;
  }, [trips, filter, search]);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Viagens</h1>
          <p>
            {trips.length} viagens registradas · {filtered.length} exibidas
          </p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={onExport}>
            <I.Download /> Exportar
          </button>
          <button className="btn btn-primary" onClick={onOpenRegister}>
            <I.Plus /> Nova Viagem
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              className={`btn ${
                filter === 'all' ? 'btn-primary' : 'btn-secondary'
              } btn-sm`}
              onClick={() => setFilter('all')}
            >
              Todas
            </button>
            <button
              className={`btn ${
                filter === 'em viagem' ? 'btn-primary' : 'btn-secondary'
              } btn-sm`}
              onClick={() => setFilter('em viagem')}
            >
              Em viagem
            </button>
            <button
              className={`btn ${
                filter === 'pendente' ? 'btn-primary' : 'btn-secondary'
              } btn-sm`}
              onClick={() => setFilter('pendente')}
            >
              Pendentes
            </button>
            <button
              className={`btn ${
                filter === 'chegando' ? 'btn-primary' : 'btn-secondary'
              } btn-sm`}
              onClick={() => setFilter('chegando')}
            >
              Chegando
            </button>
          </div>
          <input
            className="form-input"
            style={{ maxWidth: 320 }}
            placeholder="Buscar por nome, destino, placa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Funcionário</th>
                <th>Veículo</th>
                <th>Destino</th>
                <th>Início → Fim</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      textAlign: 'center',
                      padding: 32,
                      color: 'var(--slate-500)',
                    }}
                  >
                    Nenhuma viagem encontrada.
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <span className="cell-mono">{t.id}</span>
                    </td>
                    <td>
                      <UserCell
                        initials={t.initials}
                        name={t.name}
                        sub={`${t.role} · Mat. ${t.mat}`}
                        tone={t.toneAvatar}
                      />
                    </td>
                    <td>
                      <span className="cell-mono">{t.plate}</span>
                      <div className="text-xs text-muted">{t.model}</div>
                    </td>
                    <td>{t.destination}</td>
                    <td>
                      {t.start} → {t.end}
                    </td>
                    <td>
                      <span className={`badge badge-${t.tone}`}>
                        {t.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => onTripDetails(t)}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function EmployeesPage({
  showToast,
}: {
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Funcionários</h1>
          <p>{EMPLOYEES.length} colaboradores cadastrados na plataforma</p>
        </div>
        <div className="page-actions">
          <button
            className="btn btn-primary"
            onClick={() =>
              showToast(
                'Novo funcionário',
                'Formulário de cadastro em breve.',
                'info'
              )
            }
          >
            <I.Plus /> Adicionar
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Funcionário</th>
                <th>Cargo</th>
                <th>Matrícula</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {EMPLOYEES.map((e) => {
                const initials = e.name
                  .split(' ')
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();
                const tone =
                  e.status === 'Em viagem'
                    ? 'success'
                    : e.status === 'Disponível'
                    ? 'brand'
                    : 'brand';
                const badgeTone =
                  e.status === 'Em viagem'
                    ? 'info'
                    : e.status === 'Disponível'
                    ? 'success'
                    : 'warning';
                return (
                  <tr key={e.id}>
                    <td>
                      <UserCell
                        initials={initials}
                        name={e.name.split(' · ')[0]}
                        sub={`Mat. ${e.mat}`}
                        tone={tone as any}
                      />
                    </td>
                    <td>{e.role}</td>
                    <td>
                      <span className="cell-mono">{e.mat}</span>
                    </td>
                    <td>
                      <span className={`badge badge-${badgeTone}`}>
                        {e.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => showToast('Perfil', e.name, 'info')}
                      >
                        Ver perfil
                      </button>
                    </td>
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

function FleetPage({
  showToast,
}: {
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Frota</h1>
          <p>
            {FLEET.length} veículos cadastrados · Monitoramento em tempo real
          </p>
        </div>
        <div className="page-actions">
          <button
            className="btn btn-primary"
            onClick={() =>
              showToast('Novo veículo', 'Formulário em breve.', 'info')
            }
          >
            <I.Plus /> Adicionar
          </button>
        </div>
      </div>

      <div
        className="kpi-grid"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        <KpiCard
          label="Total de Veículos"
          value={String(FLEET.length)}
          tone="blue"
          icon={<I.Car />}
        />
        <KpiCard label="Em uso" value="3" tone="green" icon={<I.Route />} />
        <KpiCard
          label="Em manutenção"
          value="1"
          tone="amber"
          icon={<I.Alert />}
        />
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Quilometragem</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {FLEET.map((v) => (
                <tr key={v.plate}>
                  <td>
                    <span className="cell-mono">{v.plate}</span>
                  </td>
                  <td>{v.model}</td>
                  <td>{v.year}</td>
                  <td>{v.km} km</td>
                  <td>
                    <span className={`badge badge-${v.tone}`}>{v.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() =>
                        showToast('Veículo', `${v.model} · ${v.plate}`, 'info')
                      }
                    >
                      Detalhes
                    </button>
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

function ReportsPage({ trips }: { trips: Trip[] }) {
  const byStatus = {
    'Em viagem': trips.filter((t) => t.status === 'Em viagem').length,
    Chegando: trips.filter((t) => t.status === 'Chegando').length,
    Pendente: trips.filter((t) => t.status === 'Pendente').length,
  };
  const total = trips.length;

  const bars = [
    { label: 'Seg', value: 6 },
    { label: 'Ter', value: 9 },
    { label: 'Qua', value: 7 },
    { label: 'Qui', value: 12 },
    { label: 'Sex', value: 10 },
    { label: 'Sáb', value: 4 },
    { label: 'Dom', value: 2 },
  ];
  const maxBar = Math.max(...bars.map((b) => b.value));

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Relatórios</h1>
          <p>Métricas consolidadas de viagens e utilização da frota</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <I.Download /> Exportar PDF
          </button>
        </div>
      </div>

      <div
        className="kpi-grid"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        <KpiCard
          label="Viagens este mês"
          value="182"
          tone="blue"
          icon={<I.Route />}
          trend={{ dir: 'up', value: '+14%' }}
          meta="vs. mês anterior"
        />
        <KpiCard
          label="Km rodados"
          value="9.420"
          tone="green"
          icon={<I.MapPin />}
          trend={{ dir: 'up', value: '+8%' }}
          meta="vs. mês anterior"
        />
        <KpiCard
          label="Custo médio / viagem"
          value="R$ 186"
          tone="amber"
          icon={<I.Chart />}
          trend={{ dir: 'down', value: '-3%' }}
          meta="vs. mês anterior"
        />
      </div>

      <div className="grid-2col">
        <div className="card">
          <div className="card-header">
            <div>
              <h3>Viagens por dia da semana</h3>
              <p>Distribuição das últimas 7 semanas</p>
            </div>
          </div>
          <div className="card-body">
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 16,
                height: 200,
                padding: '0 12px',
              }}
            >
              {bars.map((b) => (
                <div
                  key={b.label}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-end',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: `${(b.value / maxBar) * 100}%`,
                        background:
                          'linear-gradient(180deg, var(--brand-500), var(--brand-700))',
                        borderRadius: 6,
                        transition: 'height 0.4s',
                      }}
                      title={`${b.value} viagens`}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 11.5,
                      color: 'var(--slate-500)',
                      fontWeight: 600,
                    }}
                  >
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3>Distribuição por status</h3>
              <p>{total} viagens no período</p>
            </div>
          </div>
          <div className="card-body">
            {Object.entries(byStatus).map(([label, count]) => {
              const pct = total ? Math.round((count / total) * 100) : 0;
              const tone =
                label === 'Em viagem'
                  ? 'success'
                  : label === 'Chegando'
                  ? 'info'
                  : 'warning';
              return (
                <div key={label} style={{ marginBottom: 16 }}>
                  <div className="row-between" style={{ marginBottom: 6 }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--slate-700)',
                      }}
                    >
                      {label}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--slate-500)' }}>
                      {count} ({pct}%)
                    </span>
                  </div>
                  <ProgressBar
                    value={pct}
                    tone={
                      tone === 'success'
                        ? 'blue'
                        : tone === 'info'
                        ? 'green'
                        : 'amber'
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function SettingsPage({
  showToast,
}: {
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  const [company, setCompany] = useState('RotaSegura Ltda');
  const [email, setEmail] = useState('contato@rotasegura.com');
  const [notifyDelay, setNotifyDelay] = useState(true);
  const [notifyMaintenance, setNotifyMaintenance] = useState(true);
  const [notifyTrips, setNotifyTrips] = useState(false);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Configurações</h1>
          <p>Preferências da conta e da plataforma</p>
        </div>
      </div>

      <div className="grid-2col">
        <div className="card">
          <div className="card-header">
            <div>
              <h3>Dados da Empresa</h3>
              <p>Informações gerais</p>
            </div>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-field">
                <label>Razão Social</label>
                <input
                  className="form-input"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>E-mail de contato</label>
                <input
                  className="form-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>CNPJ</label>
                  <input
                    className="form-input"
                    defaultValue="12.345.678/0001-90"
                  />
                </div>
                <div className="form-field">
                  <label>Telefone</label>
                  <input
                    className="form-input"
                    defaultValue="+55 (21) 4002-8922"
                  />
                </div>
              </div>
              <div className="row-between">
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    showToast('Descartado', 'Alterações não salvas.', 'info')
                  }
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    showToast(
                      'Configurações salvas',
                      'Suas preferências foram atualizadas.',
                      'success'
                    )
                  }
                >
                  <I.Check /> Salvar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3>Notificações</h3>
              <p>Escolha o que deseja receber</p>
            </div>
          </div>
          <div className="card-body">
            <ToggleRow
              label="Alertas de atraso"
              desc="Notificar quando um funcionário reportar atraso"
              value={notifyDelay}
              onChange={setNotifyDelay}
            />
            <ToggleRow
              label="Manutenção da frota"
              desc="Lembretes de revisões preventivas"
              value={notifyMaintenance}
              onChange={setNotifyMaintenance}
            />
            <ToggleRow
              label="Resumo diário de viagens"
              desc="E-mail com resumo ao fim do dia"
              value={notifyTrips}
              onChange={setNotifyTrips}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   PÁGINAS · FUNCIONÁRIO
   ========================================================= */

function SchedulePage({
  showToast,
}: {
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  const agenda = [
    {
      id: 1,
      time: '08:30',
      title: 'Reunião comercial',
      local: 'Macaé, RJ',
      status: 'Concluído',
      tone: 'success',
    },
    {
      id: 2,
      time: '10:15',
      title: 'Visita técnica',
      local: 'Campos dos Goytacazes, RJ',
      status: 'Em andamento',
      tone: 'info',
    },
    {
      id: 3,
      time: '12:30',
      title: 'Alinhamento com cliente',
      local: 'Vitória, ES',
      status: 'Agendado',
      tone: 'warning',
    },
    {
      id: 4,
      time: '15:00',
      title: 'Retorno à empresa',
      local: 'Sede - Rio de Janeiro, RJ',
      status: 'Agendado',
      tone: 'warning',
    },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Minha Agenda</h1>
          <p>Compromissos agendados para hoje · 15 de janeiro de 2024</p>
        </div>
        <div className="page-actions">
          <button
            className="btn btn-primary"
            onClick={() =>
              showToast('Novo compromisso', 'Formulário em breve.', 'info')
            }
          >
            <I.Plus /> Novo
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="timeline">
            {agenda.map((a) => (
              <div
                key={a.id}
                className={`tl-item ${a.status === 'Concluído' ? 'done' : ''}`}
              >
                <div
                  className={`tl-dot ${
                    a.status === 'Concluído'
                      ? 'done'
                      : a.status === 'Em andamento'
                      ? 'current'
                      : ''
                  }`}
                />
                <div className="tl-content">
                  <div className="row-between" style={{ marginBottom: 4 }}>
                    <strong>{a.title}</strong>
                    <span className={`badge badge-${a.tone}`}>{a.status}</span>
                  </div>
                  <span>
                    {a.time} · {a.local}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ChatPage({
  showToast,
}: {
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  const [messages, setMessages] = useState<
    { id: number; text: string; time: string; sent: boolean }[]
  >([
    { id: 1, text: 'Bom dia! Como está a viagem?', time: '08:15', sent: false },
    {
      id: 2,
      text: 'Bom dia! Tudo certo, saindo agora da empresa.',
      time: '08:20',
      sent: true,
    },
    {
      id: 3,
      text: 'Perfeito. Qualquer imprevisto, avise.',
      time: '08:22',
      sent: false,
    },
    { id: 4, text: 'Combinado.', time: '08:23', sent: true },
  ]);
  const [draft, setDraft] = useState('');

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setMessages((m) => [...m, { id: Date.now(), text, time, sent: true }]);
    setDraft('');
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          text: 'Recebido. Central acompanhando.',
          time: new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          sent: false,
        },
      ]);
    }, 900);
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Comunicação</h1>
          <p>Conversa com a central de operações</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 720 }}>
        <div className="card-header">
          <div className="flex">
            <div className="avatar brand">MC</div>
            <div>
              <strong style={{ display: 'block', fontSize: 14 }}>
                Mariana Costa
              </strong>
              <span className="text-xs text-muted">Central de Operações</span>
            </div>
          </div>
          <span className="badge badge-success">Online</span>
        </div>
        <div className="chat-window" style={{ height: 420 }}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-msg ${m.sent ? 'sent' : 'received'}`}
            >
              {m.text}
              <span className="time">{m.time}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            placeholder="Digite uma mensagem..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button className="chat-send" onClick={send} aria-label="Enviar">
            <I.Send />
          </button>
        </div>
      </div>
    </>
  );
}

function HistoryPage() {
  const history = [
    {
      id: 'VG-4795',
      date: '12/01/2024',
      destination: 'Niterói, RJ',
      distance: '48 km',
      duration: '1h 20min',
      status: 'Concluída',
    },
    {
      id: 'VG-4780',
      date: '11/01/2024',
      destination: 'Petrópolis, RJ',
      distance: '120 km',
      duration: '2h 45min',
      status: 'Concluída',
    },
    {
      id: 'VG-4762',
      date: '10/01/2024',
      destination: 'Campos, RJ',
      distance: '82 km',
      duration: '1h 50min',
      status: 'Concluída',
    },
    {
      id: 'VG-4741',
      date: '09/01/2024',
      destination: 'Macaé, RJ',
      distance: '176 km',
      duration: '3h 10min',
      status: 'Concluída',
    },
    {
      id: 'VG-4720',
      date: '08/01/2024',
      destination: 'Vitória, ES',
      distance: '510 km',
      duration: '6h 20min',
      status: 'Concluída',
    },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Histórico de Viagens</h1>
          <p>Suas últimas viagens registradas</p>
        </div>
      </div>

      <div
        className="kpi-grid"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        <KpiCard
          label="Total de viagens"
          value={String(history.length)}
          tone="blue"
          icon={<I.Route />}
        />
        <KpiCard
          label="Km percorridos"
          value="936 km"
          tone="green"
          icon={<I.MapPin />}
        />
        <KpiCard
          label="Horas em viagem"
          value="15h 25min"
          tone="amber"
          icon={<I.Clock />}
        />
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Destino</th>
                <th>Distância</th>
                <th>Duração</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id}>
                  <td>
                    <span className="cell-mono">{h.id}</span>
                  </td>
                  <td>{h.date}</td>
                  <td>{h.destination}</td>
                  <td>{h.distance}</td>
                  <td>{h.duration}</td>
                  <td>
                    <span className="badge badge-success">{h.status}</span>
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

function EmployeeDashboard({
  delayReport,
  onOpenReport,
  onOpenSupport,
}: {
  delayReport: DelayReport | null;
  onOpenReport: () => void;
  onOpenSupport: () => void;
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Bom dia, João</h1>
          <p>Você tem 3 compromissos agendados hoje · Viagem #VG-4821</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={onOpenSupport}>
            <I.Phone /> Suporte
          </button>
          <button
            className="btn btn-danger"
            onClick={onOpenReport}
            disabled={!!delayReport}
          >
            <I.Alert />{' '}
            {delayReport ? 'Atraso já reportado' : 'Reportar Atraso'}
          </button>
        </div>
      </div>

      {delayReport ? (
        <div className="delay-banner reported">
          <I.Alert />
          <div>
            <strong>Atraso reportado ao gestor</strong>
            <span>
              {delayReport.reasonLabel} · Enviado às {delayReport.time}
              {delayReport.details ? ` · "${delayReport.details}"` : ''}
            </span>
          </div>
        </div>
      ) : (
        <div className="delay-banner warning">
          <I.Clock />
          <div>
            <strong>Viagem dentro do prazo</strong>
            <span>Previsão de chegada: 10:15 · Sem imprevistos</span>
          </div>
        </div>
      )}

      <div className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">
            {delayReport
              ? 'Viagem com atraso reportado'
              : 'Viagem em andamento'}
          </div>
          <h2>Macaé → Campos → Vitória</h2>
          <p className="hero-subtitle">
            Toyota Hilux · Placa RJ-45RF · Iniciada às 08:30
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-label">Distância total</span>
              <span className="hero-stat-value">82 km</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-label">Tempo estimado</span>
              <span className="hero-stat-value">
                {delayReport ? '2h 15min' : '1h 45min'}
              </span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-label">Chegada prevista</span>
              <span className="hero-stat-value">
                {delayReport ? '10:45' : '10:15'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2col">
        <div className="card">
          <div className="card-header">
            <div>
              <h3>Navegação</h3>
              <p>Trajeto otimizado em tempo real</p>
            </div>
            <span className="badge badge-success">Ao vivo</span>
          </div>
          <div className="card-body">
            <div className="map-box" style={{ height: 280 }}>
              <svg
                className="map-route"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M 18 65 Q 30 55, 46 42 T 78 22"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="0.6"
                  strokeDasharray="2 1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="map-pin start" />
              <div className="map-pin warning" />
              <div className="map-pin end" />
              <div className="map-legend">
                <span>
                  <i style={{ background: 'var(--brand-600)' }} /> Origem
                </span>
                <span>
                  <i style={{ background: 'var(--warning-500)' }} /> Atenção
                </span>
                <span>
                  <i style={{ background: 'var(--danger-500)' }} /> Destino
                </span>
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
                marginTop: 16,
              }}
            >
              <StatMini label="Velocidade" value="62 km/h" />
              <StatMini label="Restante" value="34 km" />
              <StatMini
                label="Chegada"
                value={delayReport ? '10:45' : '10:15'}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3>Veículo Atribuído</h3>
            </div>
          </div>
          <div className="card-body">
            <div className="row-between" style={{ marginBottom: 12 }}>
              <div className="flex">
                <div className="alert-icon blue">
                  <I.Car />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: 13.5 }}>
                    Toyota Hilux
                  </strong>
                  <span className="text-xs text-muted">Placa RJ-45RF</span>
                </div>
              </div>
              <span className="badge badge-success">Operacional</span>
            </div>
            <div className="divider" />
            <div className="row-between text-xs text-muted">
              <span>Quilometragem</span>
              <strong style={{ color: 'var(--slate-900)' }}>48.230 km</strong>
            </div>
            <div className="row-between text-xs text-muted mt-2">
              <span>Última revisão</span>
              <strong style={{ color: 'var(--slate-900)' }}>02/01/2024</strong>
            </div>
            <div className="row-between text-xs text-muted mt-2">
              <span>Próxima revisão</span>
              <strong style={{ color: 'var(--slate-900)' }}>02/04/2024</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   COMPONENTES AUXILIARES
   ========================================================= */

function Topbar({
  breadcrumb,
  userInitials,
  notifications,
  setNotifications,
  showToast,
}: {
  breadcrumb: string[];
  userInitials: string;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

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

      <div className="topbar-search">
        <I.Search />
        <input placeholder="Buscar viagens, funcionários, veículos..." />
      </div>

      <div className="topbar-actions">
        <div className="dropdown">
          <button
            className="icon-btn"
            aria-label="Notificações"
            onClick={() => {
              setShowNotif((v) => !v);
              setShowProfile(false);
            }}
          >
            <I.Bell />
            {unread > 0 && <span className="dot" />}
          </button>
          {showNotif && (
            <>
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 99 }}
                onClick={() => setShowNotif(false)}
              />
              <div className="dropdown-menu wide" style={{ zIndex: 100 }}>
                <div className="dropdown-header">
                  <strong>Notificações</strong>
                  {unread > 0 && (
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '2px 8px', fontSize: 11 }}
                      onClick={() =>
                        setNotifications((arr) =>
                          arr.map((n) => ({ ...n, read: true }))
                        )
                      }
                    >
                      Marcar todas como lidas
                    </button>
                  )}
                </div>
                <div className="dropdown-body">
                  {notifications.length === 0 ? (
                    <div className="notif-empty">Nenhuma notificação</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`notif-item ${n.read ? 'read' : 'unread'}`}
                        onClick={() =>
                          setNotifications((arr) =>
                            arr.map((x) =>
                              x.id === n.id ? { ...x, read: true } : x
                            )
                          )
                        }
                      >
                        <div className="notif-dot" />
                        <div className="notif-body">
                          <strong>{n.title}</strong>
                          <p>{n.desc}</p>
                          <span className="time">{n.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="dropdown">
          <button
            className="icon-btn"
            aria-label="Perfil"
            style={{ padding: 0, width: 38, height: 38 }}
            onClick={() => {
              setShowProfile((v) => !v);
              setShowNotif(false);
            }}
          >
            <div className="avatar brand" style={{ width: 38, height: 38 }}>
              {userInitials}
            </div>
          </button>
          {showProfile && (
            <>
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 99 }}
                onClick={() => setShowProfile(false)}
              />
              <div className="dropdown-menu" style={{ zIndex: 100 }}>
                <div className="dropdown-header">
                  <div>
                    <strong>
                      {userInitials === 'MC' ? 'Mariana Costa' : 'João Silva'}
                    </strong>
                    <span
                      style={{
                        display: 'block',
                        marginTop: 2,
                        fontSize: 11.5,
                        color: 'var(--slate-500)',
                      }}
                    >
                      {userInitials === 'MC'
                        ? 'mariana@rotasegura.com'
                        : 'joao@rotasegura.com'}
                    </span>
                  </div>
                </div>
                <div className="dropdown-body">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setShowProfile(false);
                      showToast('Perfil', 'Página em breve.', 'info');
                    }}
                  >
                    <I.User /> Meu perfil
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setShowProfile(false);
                      showToast(
                        'Configurações',
                        'Preferências da conta.',
                        'info'
                      );
                    }}
                  >
                    <I.Settings /> Configurações
                  </button>
                  <div className="dropdown-separator" />
                  <button
                    className="dropdown-item danger"
                    onClick={() => {
                      setShowProfile(false);
                      showToast('Sessão encerrada', 'Até logo!', 'info');
                    }}
                  >
                    <I.LogOut /> Sair
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function RowActionsMenu({
  onDetails,
  onEdit,
  onChat,
  onCancel,
}: {
  onDetails: () => void;
  onEdit: () => void;
  onChat: () => void;
  onCancel: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="dropdown">
      <button
        className="icon-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ações"
      >
        <I.More />
      </button>
      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 99 }}
            onClick={() => setOpen(false)}
          />
          <div className="dropdown-menu" style={{ zIndex: 100, minWidth: 220 }}>
            <div className="dropdown-body">
              <button
                className="dropdown-item"
                onClick={() => {
                  setOpen(false);
                  onDetails();
                }}
              >
                <I.Eye /> Ver detalhes
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  setOpen(false);
                  onEdit();
                }}
              >
                <I.Edit /> Editar viagem
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  setOpen(false);
                  onChat();
                }}
              >
                <I.Chat /> Abrir chat
              </button>
              <div className="dropdown-separator" />
              <button
                className="dropdown-item danger"
                onClick={() => {
                  setOpen(false);
                  onCancel();
                }}
              >
                <I.Trash /> Cancelar viagem
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ToggleRow({
  label,
  desc,
  value,
  onChange,
}: {
  label: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className="row-between"
      style={{ padding: '14px 0', borderBottom: '1px solid var(--border)' }}
    >
      <div>
        <strong
          style={{
            display: 'block',
            fontSize: 13.5,
            color: 'var(--slate-900)',
          }}
        >
          {label}
        </strong>
        <span style={{ fontSize: 12, color: 'var(--slate-500)' }}>{desc}</span>
      </div>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 44,
          height: 24,
          borderRadius: 99,
          border: 'none',
          background: value ? 'var(--brand-600)' : 'var(--slate-300)',
          position: 'relative',
          transition: 'background 0.2s',
          cursor: 'pointer',
        }}
        aria-pressed={value}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: value ? 22 : 2,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'white',
            transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
      </button>
    </div>
  );
}

function KpiCard({
  label,
  value,
  tone,
  icon,
  trend,
  meta,
}: {
  label: string;
  value: string;
  tone: 'blue' | 'green' | 'amber' | 'red';
  icon: React.ReactNode;
  trend?: { dir: 'up' | 'down'; value: string };
  meta?: string;
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-head">
        <span className="kpi-label">{label}</span>
        <div className={`kpi-icon ${tone}`}>{icon}</div>
      </div>
      <div className="kpi-value">{value}</div>
      {trend && (
        <div className="kpi-meta">
          <span className={`trend ${trend.dir}`}>
            {trend.dir === 'up' ? <I.ArrowUp /> : <I.ArrowDown />} {trend.value}
          </span>
          {meta && <span>{meta}</span>}
        </div>
      )}
    </div>
  );
}

function UserCell({
  initials,
  name,
  sub,
  tone = 'brand',
}: {
  initials: string;
  name: string;
  sub: string;
  tone?: 'brand' | 'success';
}) {
  return (
    <div className="cell-user">
      <div className={`avatar sm ${tone}`}>{initials}</div>
      <div className="cell-user-info">
        <strong>{name}</strong>
        <span>{sub}</span>
      </div>
    </div>
  );
}

function ProgressBar({
  value,
  tone = 'blue',
  label,
}: {
  value: number;
  tone?: 'blue' | 'green' | 'amber';
  label?: string;
}) {
  const color =
    tone === 'green'
      ? 'var(--success-500)'
      : tone === 'amber'
      ? 'var(--warning-500)'
      : 'var(--brand-600)';
  return (
    <div>
      <div
        style={{
          width: '100%',
          height: 6,
          background: 'var(--slate-100)',
          borderRadius: 99,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            background: color,
            borderRadius: 99,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      {label && (
        <div
          style={{
            fontSize: 11.5,
            color: 'var(--slate-500)',
            marginTop: 4,
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

function StatMini({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: '10px 14px',
        background: 'var(--slate-50)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div style={{ fontSize: 11, color: 'var(--slate-500)', fontWeight: 600 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: 'var(--slate-900)',
          marginTop: 2,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   MODAIS
   ========================================================= */

function ReportDelayModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (reasonId: string, details: string) => void;
}) {
  const [reasonId, setReasonId] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!reasonId) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit(reasonId, details);
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div
            className="modal-alert-icon"
            style={{
              background: 'var(--warning-500)',
              boxShadow: '0 6px 16px rgba(245, 158, 11, 0.35)',
              width: 44,
              height: 44,
            }}
          >
            <I.Alert />
          </div>
          <div>
            <h2>Reportar Atraso</h2>
            <p>Informe o motivo para notificar a central</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <I.X />
          </button>
        </div>
        <div className="modal-body">
          <p className="modal-desc">
            Selecione abaixo o motivo principal do seu atraso.
          </p>
          <div className="reason-list">
            {DELAY_REASONS.map((r) => (
              <label
                key={r.id}
                className={`reason-option ${
                  reasonId === r.id ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="delay-reason"
                  value={r.id}
                  checked={reasonId === r.id}
                  onChange={(e) => setReasonId(e.target.value)}
                />
                <div>
                  <strong>{r.label}</strong>
                  <span>{r.desc}</span>
                </div>
              </label>
            ))}
          </div>
          {reasonId === 'other' && (
            <div className="form-field" style={{ marginTop: 14 }}>
              <label>Descreva o motivo</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Ex.: Aguardando liberação da portaria."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn btn-danger"
            disabled={!reasonId || submitting}
            onClick={handleSubmit}
          >
            <I.Alert /> {submitting ? 'Enviando...' : 'Enviar Alerta'}
          </button>
        </div>
      </div>
    </div>
  );
}

function SupportModal({
  onClose,
  showToast,
}: {
  onClose: () => void;
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  const contacts = [
    {
      id: 1,
      title: 'Central de Operações',
      desc: '+55 (21) 4002-8922',
      icon: <I.Phone />,
    },
    {
      id: 2,
      title: 'Suporte Técnico',
      desc: 'suporte@rotasegura.com',
      icon: <I.Chat />,
    },
    {
      id: 3,
      title: 'Emergência 24h',
      desc: '0800 123 4567',
      icon: <I.Alert />,
    },
  ];
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div
            className="modal-alert-icon"
            style={{
              background: 'var(--brand-600)',
              boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)',
              width: 44,
              height: 44,
            }}
          >
            <I.Phone />
          </div>
          <div>
            <h2>Suporte</h2>
            <p>Fale com a central de operações</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <I.X />
          </button>
        </div>
        <div className="modal-body">
          <p className="modal-desc">
            Escolha o canal mais adequado para o seu atendimento.
          </p>
          <div className="help-list">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="help-item"
                onClick={() => {
                  showToast(
                    'Chamado iniciado',
                    `${c.title} · ${c.desc}`,
                    'info'
                  );
                  onClose();
                }}
              >
                <div className="help-icon">{c.icon}</div>
                <div>
                  <strong>{c.title}</strong>
                  <span>{c.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

function DelayAlertModal({
  report,
  onClose,
  showToast,
}: {
  report: DelayReport;
  onClose: () => void;
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal alert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header alert">
          <div className="modal-alert-icon">
            <I.Alert />
          </div>
          <div>
            <h2>Atraso Reportado</h2>
            <p>Um funcionário reportou um atraso durante a viagem</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <I.X />
          </button>
        </div>
        <div className="modal-body">
          <div className="alert-detail">
            <div className="alert-detail-row">
              <span>Funcionário</span>
              <strong>{report.driverName}</strong>
            </div>
            <div className="alert-detail-row">
              <span>Veículo</span>
              <strong>{report.vehicle}</strong>
            </div>
            <div className="alert-detail-row">
              <span>Viagem</span>
              <strong>{report.route}</strong>
            </div>
            <div className="alert-detail-row">
              <span>Motivo</span>
              <strong style={{ color: 'var(--danger-700)' }}>
                {report.reasonLabel}
              </strong>
            </div>
            {report.details && (
              <div className="alert-detail-row">
                <span>Detalhes</span>
                <strong>{report.details}</strong>
              </div>
            )}
            <div className="alert-detail-row">
              <span>Reportado às</span>
              <strong>{report.time}</strong>
            </div>
          </div>
          <div className="alert-tip">
            <I.Info />
            <span>
              Recomendamos contatar o funcionário para avaliar o impacto na
              agenda e reajustar os próximos compromissos.
            </span>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Fechar
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              showToast(
                'Chamada iniciada',
                `Ligando para ${report.driverName}...`,
                'info'
              );
              onClose();
            }}
          >
            <I.Phone /> Ligar
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              showToast('Abrindo viagem', report.route, 'info');
              onClose();
            }}
          >
            <I.Route /> Ver Viagem
          </button>
        </div>
      </div>
    </div>
  );
}

function RegisterTripModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: {
    destination: string;
    employeeId: string;
    vehicleId: string;
    time: string;
  }) => void;
}) {
  const [destination, setDestination] = useState('');
  const [employeeId, setEmployeeId] = useState('joao');
  const [vehicleId, setVehicleId] = useState('hilux');
  const [time, setTime] = useState('08:30');
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleSubmit = () => {
    const errs: { [k: string]: string } = {};
    if (!destination.trim()) errs.destination = 'Informe o destino.';
    if (!time) errs.time = 'Selecione um horário.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit({ destination, employeeId, vehicleId, time });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div
            className="modal-alert-icon"
            style={{
              background: 'var(--brand-600)',
              boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)',
              width: 44,
              height: 44,
            }}
          >
            <I.Plus />
          </div>
          <div>
            <h2>Registrar Nova Viagem</h2>
            <p>Cadastre um novo deslocamento corporativo</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <I.X />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="form-field">
              <label>Destino *</label>
              <input
                className="form-input"
                placeholder="Endereço completo"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{
                  borderColor: errors.destination
                    ? 'var(--danger-500)'
                    : undefined,
                }}
              />
              {errors.destination && (
                <span style={{ color: 'var(--danger-700)', fontSize: 11.5 }}>
                  {errors.destination}
                </span>
              )}
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Funcionário</label>
                <select
                  className="form-select"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                >
                  {EMPLOYEES.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>Veículo</label>
                <select
                  className="form-select"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                >
                  {VEHICLES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-field">
              <label>Horário de saída *</label>
              <input
                type="time"
                className="form-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{
                  borderColor: errors.time ? 'var(--danger-500)' : undefined,
                }}
              />
              {errors.time && (
                <span style={{ color: 'var(--danger-700)', fontSize: 11.5 }}>
                  {errors.time}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            <I.Check /> Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

function TripDetailsModal({
  trip,
  onClose,
  onCancel,
  showToast,
}: {
  trip: Trip;
  onClose: () => void;
  onCancel: () => void;
  showToast: (t: string, d: string, tone?: ToastTone) => void;
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div
            className="modal-alert-icon"
            style={{
              background: 'var(--brand-600)',
              boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)',
              width: 44,
              height: 44,
            }}
          >
            <I.Route />
          </div>
          <div>
            <h2>Detalhes da Viagem</h2>
            <p>{trip.id}</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">
            <I.X />
          </button>
        </div>
        <div className="modal-body">
          <div className="alert-detail">
            <div className="alert-detail-row">
              <span>Funcionário</span>
              <strong>{trip.name}</strong>
            </div>
            <div className="alert-detail-row">
              <span>Cargo · Matrícula</span>
              <strong>
                {trip.role} · {trip.mat}
              </strong>
            </div>
            <div className="alert-detail-row">
              <span>Veículo</span>
              <strong>
                {trip.model} · {trip.plate}
              </strong>
            </div>
            <div className="alert-detail-row">
              <span>Destino</span>
              <strong>{trip.destination}</strong>
            </div>
            <div className="alert-detail-row">
              <span>Início → Fim</span>
              <strong>
                {trip.start} → {trip.end}
              </strong>
            </div>
            <div className="alert-detail-row">
              <span>Progresso</span>
              <strong>{trip.progress}%</strong>
            </div>
            <div className="alert-detail-row">
              <span>Status</span>
              <strong>{trip.status}</strong>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Fechar
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => showToast('Editar viagem', `${trip.id}`, 'info')}
          >
            <I.Edit /> Editar
          </button>
          <button className="btn btn-danger" onClick={onCancel}>
            <I.Trash /> Cancelar viagem
          </button>
        </div>
      </div>
    </div>
  );
}
