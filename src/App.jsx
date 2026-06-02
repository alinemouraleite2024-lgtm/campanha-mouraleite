import React, { useState, useEffect, useMemo } from 'react';
import { 
  initializeDatabase, getData, setData, 
  enviarEvidencia, gerenciarEvidencia, 
  cadastrarIndicacao, atualizarStatusIndicacao, 
  progredirCurso, resetDatabase 
} from './utils/mockData';

import { 
  Search, Bell, Flame, Coins, Trophy, Target, Award, ShoppingBag, 
  History, LogOut, User, Lock, ShieldCheck, Users, Sparkles,
  LayoutDashboard, Zap, Crown, Medal, Home, Heart, Gift, TrendingUp, Settings,
  GraduationCap
} from 'lucide-react';

import RoleSwitcher from './components/RoleSwitcher';
import ColaboradorPortal from './components/ColaboradorPortal';
import GestorPortal from './components/GestorPortal';
import ClientePortal from './components/ClientePortal';
import AdminPortal from './components/AdminPortal';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default logged in for demo
  const [email, setEmail] = useState('aline.oliveira@mouraleite.com.br');
  const [senha, setSenha] = useState('*********');

  const [currentRole, setCurrentRole] = useState('colaborador');
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, ranking, missoes, conquistas, premios, historico

  const [regras, setRegras] = useState(null);
  const [colaboradores, setColaboradores] = useState([]);
  const [indicacoes, setIndicacoes] = useState([]);
  const [evidencias, setEvidencias] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [premios, setPremios] = useState([]);

  // MAIN AUTHENTICATED PORTAL WITH PREMIUM SIDEBAR
  const menuItems = useMemo(() => {
    switch (currentRole) {
      case 'colaborador':
        return [
          { id: 'dashboard', label: 'Início', icon: Home, emoji: '🏠' },
          { id: 'missoes', label: 'Missões', icon: Target, emoji: '🎯' },
          { id: 'minha_jornada', label: 'Minha Jornada', icon: Sparkles, emoji: '✨' },
          { id: 'jornada_equipe', label: 'Jornada da Equipe', icon: Users, emoji: '🤝' },
          { id: 'relacionamento', label: 'Indicações', icon: Heart, emoji: '💚' },
          { id: 'conquistas', label: 'Conquistas', icon: Medal, emoji: '🎖️' },
          { id: 'premios', label: 'Benefícios', icon: Gift, emoji: '🎁' },
          { id: 'academia', label: 'Academia Moura Leite', icon: GraduationCap, emoji: '🎓' }
        ];
      case 'gestor':
        return [
          { id: 'dashboard', label: 'Início', icon: Home, emoji: '🏠' },
          { id: 'ranking', label: 'Evolução', icon: Trophy, emoji: '🏆' },
          { id: 'missoes', label: 'Indicações', icon: Users, emoji: '🎯' },
          { id: 'conquistas', label: 'Conquistas', icon: Medal, emoji: '🎖️' },
          { id: 'premios', label: 'Resgates', icon: Gift, emoji: '🎁' },
          { id: 'historico', label: 'Histórico', icon: History, emoji: '📈' }
        ];
      case 'cliente':
        return [
          { id: 'dashboard', label: 'Início', icon: Home, emoji: '🏠' },
          { id: 'historico', label: 'Indicações', icon: Users, emoji: '📈' },
          { id: 'conquistas', label: 'Recompensas', icon: Gift, emoji: '🎁' },
          { id: 'premios', label: 'Regulamento', icon: ShieldCheck, emoji: '🛡️' }
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Configurações', icon: Settings, emoji: '⚙️' }
        ];
      default:
        return [];
    }
  }, [currentRole]);

  // Load database on mount
  useEffect(() => {
    initializeDatabase();
    reloadDatabase();
  }, []);

  const reloadDatabase = () => {
    setRegras(getData('regras'));
    setColaboradores(getData('colaboradores'));
    setIndicacoes(getData('indicacoes'));
    setEvidencias(getData('evidencias'));
    setNotificacoes(getData('notificacoes'));
    setClientes(getData('clientes'));
    setPremios(getData('premios'));
  };

  // 1. Submit Evidence
  const handleEnviarEvidencia = (colaboradorId, tipo, descricao, arquivoNome) => {
    enviarEvidencia(colaboradorId, tipo, descricao, arquivoNome);
    reloadDatabase();
  };

  // 2. Approve/Reject Evidence
  const handleGerenciarEvidencia = (evidenciaId, status, feedback) => {
    gerenciarEvidencia(evidenciaId, status, feedback);
    reloadDatabase();
  };

  // 3. Register Referral
  const handleCadastrarIndicacao = (clienteNome, clienteTelefone, indicadoNome, indicadoTelefone, empreendimento, colaboradorId) => {
    cadastrarIndicacao(clienteNome, clienteTelefone, indicadoNome, indicadoTelefone, empreendimento, colaboradorId);
    reloadDatabase();
  };

  // 4. Update Referral Status / Convert Sale
  const handleAtualizarStatusIndicacao = (indicacaoId, novoStatus) => {
    atualizarStatusIndicacao(indicacaoId, novoStatus);
    reloadDatabase();
  };

  // 5. Progress in a Course (Academia Moura Leite)
  const handleProgredirCurso = (colaboradorId, cursoId, incremento) => {
    progredirCurso(colaboradorId, cursoId, incremento);
    reloadDatabase();
  };

  // 6. Update Rules (Admin)
  const handleUpdateRegras = (novasRegras) => {
    setData('regras', novasRegras);
    reloadDatabase();
  };

  // 7. Update Rewards List (Admin)
  const handleUpdatePremios = (novosPremios) => {
    setData('premios', novosPremios);
    reloadDatabase();
  };

  // 8. Reset Database
  const handleResetData = () => {
    resetDatabase();
    reloadDatabase();
  };

  if (!regras) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-500 text-sm font-semibold">
        Carregando Plataforma Moura Leite 2026...
      </div>
    );
  }

  // Active employee for views (Aline Oliveira)
  const activeColaborador = colaboradores.find(c => c.id === 'ATD1023') || colaboradores[0];

  // Microsoft custom logo
  const MicrosoftIcon = () => (
    <svg className="w-4 h-4 mr-2" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H11V11H0V0Z" fill="#F25022"/>
      <path d="M12 0H23V11H12V0Z" fill="#7FBA00"/>
      <path d="M0 12H11V23H0V12Z" fill="#00A4EF"/>
      <path d="M12 12H23V23H12V12Z" fill="#FFB900"/>
    </svg>
  );

  // LOGIN PAGE SPLIT SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-200">
          
          {/* Left panel: forest green gradient + photo */}
          <div className="md:w-1/2 bg-gradient-to-br from-[#00673e] to-[#004d2e] p-12 text-center flex flex-col justify-between items-center relative overflow-hidden min-h-[350px] md:min-h-[550px]">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600')] opacity-10 bg-cover bg-center pointer-events-none"></div>
            
            <div className="m-auto space-y-6 z-10">
              {/* Logo block */}
              <div className="bg-white p-5 rounded-[24px] w-24 h-24 mx-auto flex items-center justify-center shadow-lg shadow-black/10">
                <span className="font-extrabold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-[#00673e] via-amber-500 to-[#ea580c]">
                  ML
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-wider">MOURA LEITE</h1>
                <p className="text-xs text-[#82cda4] font-bold uppercase tracking-widest mt-1">Botucatu - SP</p>
              </div>
              <p className="text-sm text-slate-200 italic max-w-xs mx-auto leading-relaxed border-t border-white/10 pt-4">
                "Transformando espaços em lares há mais de 30 anos."
              </p>
            </div>
          </div>

          {/* Right panel: Login form */}
          <div className="md:w-1/2 p-12 flex flex-col justify-center bg-white">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Bem-vindo de volta!</h2>
              <p className="text-xs text-slate-500 mt-1">Entre na sua conta para continuar.</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#00673e] focus:bg-white transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Senha</label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#00673e] focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold">
                <label className="flex items-center text-slate-500 cursor-pointer">
                  <input type="checkbox" className="mr-1.5 accent-[#00673e] rounded" />
                  Lembrar de mim
                </label>
                <a href="#reset" className="text-[#00673e] hover:underline">Esqueci a senha</a>
              </div>

              <button
                type="submit"
                className="w-full btn-3d-green text-white font-bold py-3.5 rounded-xl text-xs shadow-lg shadow-[#00673e]/10 uppercase tracking-wider"
              >
                Entrar
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-bold uppercase">ou</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={() => setIsAuthenticated(true)}
                className="w-full border border-slate-300 hover:bg-slate-50 font-bold py-3.5 rounded-xl text-xs text-slate-700 flex items-center justify-center transition-colors"
              >
                <MicrosoftIcon /> Entrar com Microsoft
              </button>
            </form>

            <div className="text-center mt-6 text-[11px] text-slate-400">
              Não tem uma conta? <a href="#register" className="text-[#00673e] hover:underline font-bold">Cadastre-se</a>
            </div>
          </div>

        </div>
      </div>
    );
  }



  // Points percentage for sidebar mini bar (Target 1000 points for trimester campaign)
  const sidebarXpPercent = activeColaborador ? Math.min(100, Math.round((activeColaborador.pontos / 1000) * 100)) : 0;

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col md:flex-row relative">
      
      {/* 1. Left Sidebar — Premium Navigation */}
      <aside className="md:w-64 shrink-0 z-20 md:sticky md:top-0 md:h-screen flex flex-col justify-between p-5 sidebar-dark">
        <div>
          {/* Logo Brand Header */}
          <div className="flex items-center gap-3 mb-7 pb-5" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div className="p-2.5 rounded-xl text-[#00673e] font-extrabold text-xs"
                 style={{ background: '#ffffff', boxShadow: '0 4px 12px rgba(255,255,255,0.15)' }}>
              ML
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white uppercase block">
                Moura Leite
              </span>
              <span className="text-[10px] text-emerald-300/60 font-bold uppercase tracking-wider block -mt-0.5">
                Botucatu · 2026
              </span>
            </div>
          </div>

          {/* Navigation Links — Minimalist */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive ? 'nav-item-active' : 'nav-item-inactive'
                  }`}
                >
                  <Icon className="w-4 h-4 nav-icon flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom profile card / Sign out */}
        <div className="pt-4 space-y-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {/* Active Employee Details — Gamified */}
          {currentRole === 'colaborador' && activeColaborador && (
            <div className="rounded-2xl p-3 space-y-2.5"
                 style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img src={activeColaborador.foto} alt="" className="w-9 h-9 rounded-xl object-cover" 
                       style={{ border: '2px solid rgba(255, 255, 255, 0.15)' }} />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-md flex items-center justify-center text-[7px]"
                       style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)', boxShadow: '0 2px 4px rgba(245,158,11,0.4)' }}>
                    ⚡
                  </div>
                </div>
                <div className="truncate flex-1">
                  <span className="text-[11px] font-black text-slate-200 block truncate">{activeColaborador.nome}</span>
                  <span className="text-[9px] font-bold text-slate-400 block -mt-0.5">Campanha Moura Leite</span>
                </div>
              </div>
              {/* Mini progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px]">
                  <span className="text-slate-400 font-medium">Meta Trimestral</span>
                  <span className="font-black text-[#00ff88]">{activeColaborador.pontos}/1000 pontos</span>
                </div>
                <div className="mini-xp-track" style={{ background: 'rgba(255, 255, 255, 0.15)' }}>
                  <div className="mini-xp-fill" style={{ width: `${sidebarXpPercent}%`, background: 'linear-gradient(90deg, #f59e0b, #00ff88)' }} />
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-300 hover:bg-rose-950/20 transition-all"
          >
            <LogOut className="w-4 h-4 text-rose-450" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* 2. Main content container on the right */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Topbar — Gamified with animated badges */}
        <header className="bg-white/80 backdrop-blur-md px-6 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-30"
                style={{ borderBottom: '1px solid rgba(226,232,240,0.5)', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.04)' }}>
          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar missões, colegas, conquistas..."
              className="w-full bg-[#f0f4f8] border border-transparent rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#00673e]/30 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Gamified counters & Notification */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            
            {/* Coins Balance badge — animated */}
            <div className="topbar-badge-gold px-3.5 py-2 rounded-2xl flex items-center gap-2 cursor-default hover:scale-105 transition-transform">
              <div className="relative">
                <Coins className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-xs font-black text-amber-600 font-mono">
                {activeColaborador.moedas}
              </span>
              <span className="text-[9px] font-bold text-amber-400 hidden sm:inline">moedas</span>
            </div>

            {/* Active Engagement badge — professional and premium */}
            <div className="px-3.5 py-2 rounded-2xl flex items-center gap-2 cursor-default hover:scale-105 transition-transform bg-[#00673e]/5 border border-[#00673e]/15 text-[#00673e]">
              <Zap className="w-4 h-4 text-[#00673e] flex-shrink-0" />
              <span className="text-xs font-black font-mono">
                {activeColaborador.ofensiva} dias
              </span>
              <span className="text-[9px] font-bold text-[#00673e]/70 hidden sm:inline">ativos</span>
            </div>

            {/* Notification Bell — pulsing badge */}
            <button className="relative p-2.5 rounded-2xl hover:bg-slate-100 transition-all hover:scale-105 text-slate-500"
                    style={{ background: 'rgba(241,245,249,0.8)', border: '1px solid rgba(226,232,240,0.6)' }}>
              <Bell className="w-4.5 h-4.5" />
              {notificacoes.some(n => !n.lida) && (
                <span className="absolute -top-1 -right-1 text-white font-extrabold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white text-[9px] animate-pulse"
                      style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 2px 8px rgba(234,88,12,0.4)' }}>
                  {notificacoes.filter(n => !n.lida).length}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic portal panels injected */}
        <main className="flex-grow p-6 sm:p-8">
          {currentRole === 'colaborador' && (
            <ColaboradorPortal 
              colaborador={activeColaborador}
              colaboradores={colaboradores}
              indicacoes={indicacoes}
              evidencias={evidencias}
              notificacoes={notificacoes}
              onEnviarEvidencia={handleEnviarEvidencia}
              onProgredirCurso={handleProgredirCurso}
              regras={regras}
              activeTabNav={activeTab} // pass active tab from sidebar navigation
              onSetActiveTab={setActiveTab}
            />
          )}

          {currentRole === 'gestor' && (
            <GestorPortal 
              colaboradores={colaboradores}
              indicacoes={indicacoes}
              evidencias={evidencias}
              onGerenciarEvidencia={handleGerenciarEvidencia}
              onAtualizarStatusIndicacao={handleAtualizarStatusIndicacao}
              activeTabNav={activeTab}
              onSetActiveTab={setActiveTab}
            />
          )}

          {currentRole === 'cliente' && (
            <ClientePortal 
              clienteDefault={clientes[0]}
              indicacoes={indicacoes}
              onCadastrarIndicacao={handleCadastrarIndicacao}
              colaboradores={colaboradores}
              activeTabNav={activeTab}
              onSetActiveTab={setActiveTab}
            />
          )}

          {currentRole === 'admin' && (
            <AdminPortal 
              regras={regras}
              premios={premios}
              onUpdateRegras={handleUpdateRegras}
              onUpdatePremios={handleUpdatePremios}
              onResetData={handleResetData}
              activeTabNav={activeTab}
              onSetActiveTab={setActiveTab}
            />
          )}
        </main>
      </div>

      {/* Floating Demo Role Switcher */}
      <RoleSwitcher 
        currentRole={currentRole}
        onChangeRole={(role) => {
          setCurrentRole(role);
          setActiveTab('dashboard'); // reset to dashboard on role swap
        }}
        onResetData={handleResetData}
      />
    </div>
  );
}
