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
  GraduationCap, Mail, ArrowRight, Eye, EyeOff, Leaf
} from 'lucide-react';

import RoleSwitcher from './components/RoleSwitcher';
import ColaboradorPortal from './components/ColaboradorPortal';
import GestorPortal from './components/GestorPortal';
import ClientePortal from './components/ClientePortal';
import AdminPortal from './components/AdminPortal';

// ==========================================
// SUBCOMPONENTES MODULARES DE LOGIN (MOURA LEITE)
// ==========================================

function LoginLoadingScreen() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 animate-scale-in">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Minimalist green spinner */}
          <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#0B8F5B] rounded-full animate-spin"></div>
          {/* Center Logo ML */}
          <div className="bg-[#00673e] text-white w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-[10px]">
            ML
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Moura Leite</h3>
          <p className="text-xs text-slate-500 font-medium mt-1 animate-pulse">Preparando sua experiência...</p>
        </div>
      </div>
    </div>
  );
}

function MicrosoftButton({ onClick, focusedField }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Entrar com Microsoft 365"
      className={`w-full bg-[#004d2e] hover:bg-[#003d24] text-white font-bold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-between transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_12px_rgba(0,77,46,0.12)] hover:shadow-[0_8px_20px_rgba(0,77,46,0.22)] border border-emerald-950/20 ${
        focusedField ? 'opacity-65' : 'opacity-100'
      }`}
    >
      <div className="flex items-center">
        <svg className="w-4 h-4 mr-3 shrink-0" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 0H11V11H0V0Z" fill="#F25022"/>
          <path d="M12 0H23V11H12V0Z" fill="#7FBA00"/>
          <path d="M0 12H11V23H0V12Z" fill="#00A4EF"/>
          <path d="M12 12H23V23H12V12Z" fill="#FFB900"/>
        </svg>
        <span className="tracking-wide">Entrar com Microsoft 365</span>
      </div>
      <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

function InstitutionalPanel() {
  return (
    <div className="hidden md:flex md:w-1/2 bg-[#fdfdfb] flex-col justify-between select-none relative min-h-[600px] rounded-l-[32px]">
      {/* Green Curved Main Block */}
      <div className="relative flex-grow flex flex-col justify-between p-10 md:p-12 pb-14 rounded-b-[48px] overflow-hidden shadow-lg">
        {/* Background Image - Real Estate Subdivision */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582268611958-ebfd161ff975?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center"
          style={{ filter: 'blur(2.5px) contrast(0.90) saturate(0.80)' }}
        ></div>
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00140c]/98 via-[#002618]/90 to-[#003823]/50 mix-blend-multiply"></div>
        
        {/* Logo and Campaign info */}
        <div className="relative z-10 flex flex-col gap-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2.5 rounded-2xl w-11 h-11 flex items-center justify-center shadow-lg shadow-black/10">
              <span className="font-extrabold text-sm tracking-tighter text-[#00673e]">
                ML
              </span>
            </div>
            <div>
              <h1 className="text-sm font-black text-white tracking-wider leading-none uppercase">Moura Leite</h1>
              <p className="text-[9px] text-[#86efac] font-black uppercase tracking-widest mt-1">Botucatu - SP</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold text-[#86efac] tracking-wider uppercase mt-2">
            <Users className="w-4 h-4" />
            <span>Campanha de Relacionamento 2026</span>
          </div>
        </div>

        {/* Headline and text */}
        <div className="relative z-10 space-y-4 max-w-sm mt-8">
          <h2 className="text-3xl md:text-[34px] font-black text-white tracking-tight leading-tight mt-6">
            Excelência construída <br />
            em cada <span className="text-[#86efac] font-black drop-shadow-[0_0_15px_rgba(134,239,172,0.55)]">relacionamento</span>.
          </h2>
          <div className="w-12 h-1 bg-[#86efac] rounded-full mt-4"></div>
          <p className="text-xs text-emerald-100/90 font-medium leading-relaxed mt-4">
            Cada atendimento fortalece a experiência do cliente e impulsiona evolução da nossa equipe.
          </p>
        </div>

        {/* Four pillars grid */}
        <div className="relative z-10 grid grid-cols-4 gap-2 border-t border-white/10 pt-6 mt-6">
          {/* Pilar 1 */}
          <div className="text-center space-y-1">
            <Heart className="w-5 h-5 mx-auto text-[#86efac] drop-shadow-[0_0_6px_rgba(134,239,172,0.3)]" />
            <span className="text-[10px] font-bold text-white block">Relacionamento</span>
            <span className="text-[8px] text-emerald-200/80 leading-tight block">que gera confiança</span>
          </div>
          {/* Pilar 2 */}
          <div className="text-center space-y-1">
            <Award className="w-5 h-5 mx-auto text-[#86efac] drop-shadow-[0_0_6px_rgba(134,239,172,0.3)]" />
            <span className="text-[10px] font-bold text-white block">Reconhecimento</span>
            <span className="text-[8px] text-emerald-200/80 leading-tight block">que inspira</span>
          </div>
          {/* Pilar 3 */}
          <div className="text-center space-y-1">
            <TrendingUp className="w-5 h-5 mx-auto text-[#86efac] drop-shadow-[0_0_6px_rgba(134,239,172,0.3)]" />
            <span className="text-[10px] font-bold text-white block">Evolução</span>
            <span className="text-[8px] text-emerald-200/80 leading-tight block">que transforma</span>
          </div>
          {/* Pilar 4 */}
          <div className="text-center space-y-1">
            <Users className="w-5 h-5 mx-auto text-[#86efac] drop-shadow-[0_0_6px_rgba(134,239,172,0.3)]" />
            <span className="text-[10px] font-bold text-white block">Equipe</span>
            <span className="text-[8px] text-emerald-200/80 leading-tight block">que faz acontecer</span>
          </div>
        </div>

        {/* Translucent quote box */}
        <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between mt-6 backdrop-blur-sm shadow-inner">
          <div className="flex items-start gap-2.5">
            <span className="text-[#86efac] font-black text-3xl leading-none">“</span>
            <p className="text-[11px] text-white leading-relaxed font-medium">
              <span className="font-extrabold">Pequenas atitudes</span> geram <span className="text-[#86efac] font-extrabold">grandes experiências</span>.
            </p>
          </div>
          <Heart className="w-5 h-5 text-white/20 shrink-0" />
        </div>
      </div>

      {/* Bottom light bar under the curve */}
      <div className="h-14 px-10 md:px-12 flex items-center gap-2 bg-[#fdfdfb]">
        <Leaf className="w-4 h-4 text-[#00673e]" />
        <p className="text-[10px] font-bold text-slate-600 tracking-wide">
          A excelência não é um destino, é uma prática diária. 💚
        </p>
      </div>
    </div>
  );
}

function LoginForm({ email, setEmail, senha, setSenha, onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null); // 'email', 'password' or null
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@mouraleite.com.br')) {
      setErrorMsg("Não foi possível acessar sua conta no momento. Verifique seus dados e tente novamente.");
    } else {
      setErrorMsg(null);
      onLoginSuccess();
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="mb-6 animate-slide-up">
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#00673e]" />
            Bem-vindo de volta!
          </h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">Entre na sua conta para continuar.</p>
        </div>

        {/* Microsoft Login Button */}
        <div className="mb-6 animate-slide-up delay-100">
          <MicrosoftButton 
            onClick={onLoginSuccess} 
            focusedField={focusedField && focusedField !== 'microsoft'} 
          />
        </div>

        {/* Divider */}
        <div className={`relative flex py-4 items-center animate-slide-up delay-100 ${
          focusedField ? 'opacity-65 transition-opacity' : 'opacity-100'
        }`}>
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-bold uppercase">ou</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Error message card */}
        {errorMsg && (
          <div className="mb-4 p-4 bg-rose-50 border border-rose-150 rounded-2xl flex items-start gap-3 animate-scale-in text-rose-700 text-xs font-semibold leading-relaxed">
            <svg className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Manual Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <span className={`block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 animate-slide-up ${
            focusedField ? 'opacity-65' : 'opacity-100'
          }`}>
            Entrar com e-mail e senha
          </span>

          {/* Email Input */}
          <div className={`relative transition-opacity ${
            focusedField && focusedField !== 'email' ? 'opacity-65' : 'opacity-100'
          }`}>
            <label htmlFor="email-input" className="sr-only">E-mail</label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className={`w-4 h-4 transition-colors ${
                focusedField === 'email' ? 'text-[#0B8F5B]' : 'text-slate-400'
              }`} />
            </div>
            <input
              id="email-input"
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 focus:outline-none focus:border-[#0B8F5B] focus:ring-2 focus:ring-[#0B8F5B]/20 focus:bg-white transition-all font-semibold"
            />
          </div>

          {/* Password Input */}
          <div className={`relative transition-opacity ${
            focusedField && focusedField !== 'password' ? 'opacity-65' : 'opacity-100'
          }`}>
            <label htmlFor="password-input" className="sr-only">Senha</label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className={`w-4 h-4 transition-colors ${
                focusedField === 'password' ? 'text-[#0B8F5B]' : 'text-slate-400'
              }`} />
            </div>
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl pl-11 pr-11 py-3.5 text-xs text-slate-800 focus:outline-none focus:border-[#0B8F5B] focus:ring-2 focus:ring-[#0B8F5B]/20 focus:bg-white transition-all font-semibold"
            />
            <button
              type="button"
              aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Checkbox and Forgot Password link */}
          <div className={`flex items-center justify-between text-[11px] font-bold transition-opacity ${
            focusedField ? 'opacity-65' : 'opacity-100'
          }`}>
            <label className="flex items-center text-slate-500 cursor-pointer select-none">
              <input type="checkbox" className="mr-2 accent-[#0b8f5b] rounded w-4 h-4 transition-colors" />
              Lembrar de mim
            </label>
            <a href="#reset" className="text-[#0B8F5B] hover:text-[#046C45] hover:underline transition-colors">Esqueci a senha</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-b from-[#0B8F5B] to-[#046C45] text-white font-bold py-3.5 rounded-2xl text-xs hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-[0_8px_25px_rgba(11,143,91,0.25)] transition-all duration-200 uppercase tracking-wider"
          >
            Entrar
          </button>
        </form>

        {/* Register link */}
        <div className={`text-center mt-6 text-[11px] text-slate-400 transition-opacity ${
          focusedField ? 'opacity-65' : 'opacity-100'
        }`}>
          Não tem uma conta? <a href="#register" className="text-[#0B8F5B] hover:text-[#046C45] hover:underline font-bold">Cadastre-se</a>
        </div>
      </div>

      {/* Footer info */}
      <div className={`mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between text-[9px] text-slate-400 font-semibold gap-2 transition-opacity ${
        focusedField ? 'opacity-40' : 'opacity-100'
      }`}>
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Acesso seguro e protegido</span>
        </div>
        <span>© 2026 Moura Leite. Todos os direitos reservados.</span>
      </div>
    </div>
  );
}

function LoginLayout({ email, setEmail, senha, setSenha, onLoginSuccess }) {
  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 md:p-8 animate-scale-in relative overflow-hidden select-none">
      
      {/* Subtle background patterns (grids / noise / radial gradient) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/30 via-slate-100 to-slate-100 opacity-80 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>
      
      {/* Content Box */}
      <div className="w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.055)] border border-slate-100/80 flex flex-col md:flex-row min-h-[600px] relative z-10">
        {/* Left: Institutional panel */}
        <InstitutionalPanel />

        {/* Right: LoginForm */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center relative">
          {/* Subtle noise grid pattern overlay on the right form */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none rounded-r-[32px]"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <LoginForm 
              email={email} 
              setEmail={setEmail} 
              senha={senha} 
              setSenha={setSenha} 
              onLoginSuccess={onLoginSuccess} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default logged out to show login screen
  const [isTransitioningLogin, setIsTransitioningLogin] = useState(false); // Controls loading screen
  const [isFadingLogin, setIsFadingLogin] = useState(false); // Controls fade-out animation of login
  
  const handleLoginSuccess = () => {
    setIsFadingLogin(true);
    setTimeout(() => {
      setIsTransitioningLogin(true);
      setIsFadingLogin(false);
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsTransitioningLogin(false);
      }, 800);
    }, 400);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsTransitioningLogin(false);
    setIsFadingLogin(false);
  };

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

  // 1. Loading transition screen
  if (isTransitioningLogin) {
    return <LoginLoadingScreen />;
  }

  // 2. Login Page with Layout and Form
  if (!isAuthenticated) {
    return (
      <div className={`transition-opacity duration-400 ${isFadingLogin ? 'opacity-0' : 'opacity-100'}`}>
        <LoginLayout 
          email={email} 
          setEmail={setEmail} 
          senha={senha} 
          setSenha={setSenha} 
          onLoginSuccess={handleLoginSuccess} 
        />
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
            onClick={handleLogout}
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
