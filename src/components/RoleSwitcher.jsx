import React from 'react';
import { User, ShieldCheck, Users, Settings, RotateCcw } from 'lucide-react';

export default function RoleSwitcher({ currentRole, onChangeRole, onResetData }) {
  const roles = [
    { 
      id: 'colaborador', 
      label: 'Colaborador', 
      emoji: '👤',
      icon: User, 
      activeClass: 'bg-[#00673e] text-white border-[#004d2e]',
      hoverClass: 'hover:bg-[#00673e]/10 hover:text-[#00673e] hover:border-[#00673e]/20 text-slate-500 border-slate-200'
    },
    { 
      id: 'gestor', 
      label: 'Gestor', 
      emoji: '🛡️',
      icon: ShieldCheck, 
      activeClass: 'bg-indigo-600 text-white border-indigo-700',
      hoverClass: 'hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 text-slate-500 border-slate-200'
    },
    { 
      id: 'cliente', 
      label: 'Indique & Ganhe', 
      emoji: '🎁',
      icon: Users, 
      activeClass: 'bg-[#ea580c] text-white border-orange-700',
      hoverClass: 'hover:bg-amber-50 hover:text-[#ea580c] hover:border-amber-200 text-slate-500 border-slate-200'
    },
    { 
      id: 'admin', 
      label: 'Admin', 
      emoji: '⚙️',
      icon: Settings, 
      activeClass: 'bg-slate-800 text-white border-slate-900',
      hoverClass: 'hover:bg-slate-100 hover:text-slate-700 hover:border-slate-300 text-slate-500 border-slate-200'
    }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-2.5 rounded-full shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15)] max-w-[95vw] overflow-x-auto scrollbar-none">
      {/* Label */}
      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mr-1 hidden sm:inline whitespace-nowrap select-none">
        Demo:
      </span>

      {/* Role buttons */}
      {roles.map((role) => {
        const isActive = currentRole === role.id;
        return (
          <button
            key={role.id}
            onClick={() => onChangeRole(role.id)}
            title={`Visualizar como ${role.label}`}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-black border-2 transition-all duration-200 whitespace-nowrap select-none ${
              isActive
                ? `${role.activeClass} scale-105 shadow-md`
                : `bg-white ${role.hoverClass}`
            }`}
          >
            <span className="text-sm leading-none">{role.emoji}</span>
            <span className="hidden sm:inline">{role.label}</span>
          </button>
        );
      })}

      {/* Divider + Reset */}
      <div className="w-px h-5 bg-slate-200 mx-1 shrink-0" />
      <button
        onClick={() => {
          if (window.confirm('Resetar todos os dados para o padrão da campanha?')) {
            onResetData();
          }
        }}
        title="Resetar banco de dados"
        className="p-2 rounded-full text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all border-2 border-transparent hover:border-rose-200"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
