import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Award, Trophy, Target, ShoppingBag, History, 
  Calendar, ExternalLink, ShieldAlert, Zap, Copy, Check, Send, 
  FileText, Clock, CheckCircle2, XCircle, ChevronRight, Gift, HelpCircle,
  Star, Flame, Coins, TrendingUp, Crown, Medal, Lock, Rocket, Heart, Users, Home,
  MessageCircle, Bell, GraduationCap
} from 'lucide-react';

const MISSION_DETAILS = {
  meta_elogio: {
    tipo: 'elogio',
    comoFunciona: 'Reconhecimento oficial recebido espontaneamente do cliente através de e-mails, canais de atendimento ou redes sociais.',
    evidenciasAceitas: 'Prints de conversas no WhatsApp, prints de e-mails ou feedbacks formais de clientes.',
    regras: 'A evidência deve conter a identificação do cliente e o nome do colaborador de forma legível.',
    isAutomatic: false
  },
  meta_monitoria: {
    tipo: 'monitoria',
    comoFunciona: 'Avaliação mensal de qualidade realizada pela auditoria da equipe de atendimento.',
    evidenciasAceitas: 'Relatório/resultado oficial emitido pelo sistema de qualidade Moura Leite.',
    regras: 'Atingimento individual de nota igual ou superior a 98% no ciclo correspondente.',
    isAutomatic: true
  },
  meta_reversao: {
    tipo: 'reversao_insatisfeito',
    comoFunciona: 'Ação estratégica para reverter a insatisfação de um cliente detrator em uma solução efetiva e satisfatória.',
    evidenciasAceitas: 'Histórico do atendimento documentado ou print da conversa demonstrando a resolução e satisfação final.',
    regras: 'É necessário anexar a comprovação do encerramento com sucesso do problema do cliente.',
    isAutomatic: false
  },
  meta_distrato: {
    tipo: 'reversao_distrato',
    comoFunciona: 'Negociação e acolhimento bem-sucedidos que resultam no cancelamento de uma solicitação de distrato de contrato.',
    evidenciasAceitas: 'E-mail formal de retratação do cliente ou aditivo contratual de manutenção assinado.',
    regras: 'A evidência precisa indicar claramente o cancelamento do processo de distrato e continuidade da parceria.',
    isAutomatic: false
  },
  meta_cadastro: {
    tipo: 'cadastro_indicacao',
    comoFunciona: 'Cadastro automático gerado quando um novo cliente utiliza o seu link de indicação exclusivo.',
    evidenciasAceitas: 'Nenhuma (rastreamento automático via link e cookies da plataforma).',
    regras: 'Validado automaticamente no momento em que o indicado completa a ficha cadastral básica.',
    isAutomatic: true
  },
  meta_conversao: {
    tipo: 'conversao_venda',
    comoFunciona: 'Fechamento de negócio decorrente de uma indicação cadastrada e convertida em venda pela equipe comercial.',
    evidenciasAceitas: 'Nenhuma (cruzamento automático de dados com o sistema ERP da Moura Leite).',
    regras: 'Validado automaticamente após assinatura da proposta de compra e contrato pelo cliente indicado.',
    isAutomatic: true
  }
};

const MISSOES_INDIVIDUAIS_INFO = [
  {
    pilar: 'encantar',
    pilarLabel: 'Pilar Encantar',
    pilarSub: 'Transformar atendimento em experiência.',
    pilarColor: 'emerald',
    iconColor: 'text-emerald-700 bg-emerald-100',
    borderColor: 'hover:border-emerald-300',
    badgeColor: 'bg-emerald-50 text-[#00673e] border-emerald-200',
    missoes: [
      {
        id: 'elogio',
        titulo: 'Elogio Espontâneo do Cliente',
        pontos: 15,
        objetivo: 'Reconhecer atendimentos elogiados espontaneamente pelos clientes nos canais oficiais.',
        proposito: 'Valorizar atitudes que geram experiências positivas e fortalecem o relacionamento com o cliente.',
        evidencias: ['Prints WhatsApp', 'E-mails', 'Avaliações', 'Feedbacks formais'],
        criterios: 'O elogio deve conter identificação do cliente e contexto do atendimento.',
        impacto: 'Fortalece vínculos positivos e melhora a experiência do cliente.',
        status: 'manual',
        statusLabel: 'Necessita evidência',
        validacaoLabel: 'Aprovação manual da liderança'
      },
      {
        id: 'monitoria',
        titulo: 'Monitoria de Excelência',
        pontos: 10,
        objetivo: 'Reconhecer resultados acima da meta institucional na monitoria de qualidade.',
        proposito: 'Estimular excelência operacional e qualidade contínua no atendimento.',
        evidencias: null,
        criterios: 'Nota igual ou superior ao percentual definido pela campanha.',
        impacto: 'Fortalece a cultura de excelência e qualidade.',
        status: 'automatico',
        statusLabel: 'Automático',
        validacaoLabel: 'Validação sistêmica'
      }
    ]
  },
  {
    pilar: 'resolver',
    pilarLabel: 'Pilar Resolver',
    pilarSub: 'Superar desafios com protagonismo.',
    pilarColor: 'amber',
    iconColor: 'text-amber-700 bg-amber-100',
    borderColor: 'hover:border-amber-300',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    missoes: [
      {
        id: 'reversao_insatisfeito',
        titulo: 'Reversão de Cliente Insatisfeito',
        pontos: 10,
        objetivo: 'Reconhecer situações críticas revertidas com sucesso através de empatia, agilidade e senso de dono.',
        proposito: 'Valorizar colaboradores que recuperam relacionamentos e transformam situações difíceis em confiança.',
        evidencias: ['Histórico do atendimento', 'Prints', 'Relato validado pela liderança'],
        criterios: 'Demonstrar resolução efetiva e recuperação do relacionamento.',
        impacto: 'Reduz desgaste e fortalece a confiança do cliente.',
        status: 'manual',
        statusLabel: 'Necessita evidência',
        validacaoLabel: 'Aprovação manual'
      },
      {
        id: 'reversao_distrato',
        titulo: 'Reversão de Distrato',
        pontos: 10,
        objetivo: 'Reconhecer ações que evitaram cancelamentos ou perdas de relacionamento.',
        proposito: 'Estimular postura estratégica e senso de dono no atendimento.',
        evidencias: ['Histórico da negociação', 'Relato validado', 'Aprovação da liderança'],
        criterios: 'Demonstrar ação estratégica na negociação para evitar o distrato.',
        impacto: 'Fortalece retenção e relacionamento de longo prazo.',
        status: 'manual',
        statusLabel: 'Necessita evidência',
        validacaoLabel: 'Aprovação manual'
      }
    ]
  },
  {
    pilar: 'indicar',
    pilarLabel: 'Pilar Indicar',
    pilarSub: 'Multiplicar conexões de valor.',
    pilarColor: 'indigo',
    iconColor: 'text-indigo-700 bg-indigo-100',
    borderColor: 'hover:border-indigo-300',
    badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    missoes: [
      {
        id: 'cadastro_indicacao',
        titulo: 'Cadastro de Indicação',
        pontos: 15,
        objetivo: 'Reconhecer colaboradores que geram novas indicações para a Moura Leite.',
        proposito: 'Fortalecer relacionamento e crescimento através da confiança do cliente.',
        evidencias: null,
        criterios: 'Indicação cadastrada corretamente no sistema.',
        impacto: 'Expansão da network e rede de relacionamento Moura Leite.',
        status: 'automatico',
        statusLabel: 'Automático',
        validacaoLabel: 'Integração sistêmica via programa Indique & Ganhe'
      },
      {
        id: 'conversao_venda',
        titulo: 'Conversão de Indicação em Venda',
        pontos: 30,
        objetivo: 'Reconhecer indicações convertidas em oportunidade real de negócio.',
        proposito: 'Valorizar conexões que geram crescimento sustentável para a empresa.',
        evidencias: null,
        criterios: 'Confirmação comercial de fechamento de venda da indicação.',
        impacto: 'Fortalecimento do crescimento sustentável da Moura Leite.',
        status: 'automatico',
        statusLabel: 'Automático',
        validacaoLabel: 'Confirmação comercial'
      }
    ]
  }
];


export default function ColaboradorPortal({ 
  colaborador, 
  colaboradores, 
  indicacoes, 
  evidencias, 
  notificacoes, 
  onEnviarEvidencia, 
  onProgredirCurso, 
  regras,
  activeTabNav,
  onSetActiveTab
}) {
  const [copied, setCopied] = useState(false);
  const [formTipo, setFormTipo] = useState('elogio');
  const [formDescricao, setFormDescricao] = useState('');
  const [formArquivo, setFormArquivo] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [xpAnimated, setXpAnimated] = useState(false);
  const [cursoAtivo, setCursoAtivo] = useState(null);
  const [expandedMissionId, setExpandedMissionId] = useState(null);
  const [showSendForm, setShowSendForm] = useState(false);
  const [formDescricaoMeta, setFormDescricaoMeta] = useState('');
  const [formArquivoMeta, setFormArquivoMeta] = useState('');
  const [showHelpId, setShowHelpId] = useState(null);
  const [successFeedbackId, setSuccessFeedbackId] = useState(null);
  const [showGeneralFormSuccess, setShowGeneralFormSuccess] = useState(false);

  // Trigger XP animation on mount
  useEffect(() => {
    const t = setTimeout(() => setXpAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Referral Link
  const refLink = `http://portal.mouraleite.com.br/ref/${colaborador.linkReferencia}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setShowConfetti(true);
    setTimeout(() => { setCopied(false); setShowConfetti(false); }, 2500);
  };

  const handleSubmitEvidence = (e) => {
    e.preventDefault();
    if (!formDescricao.trim()) return alert("Por favor, descreva a ação.");
    const simulatedFile = formArquivo ? formArquivo.split('\\').pop() : `${formTipo}_print.png`;
    onEnviarEvidencia(colaborador.id, formTipo, formDescricao, simulatedFile);
    setFormDescricao('');
    setFormArquivo('');
    setShowGeneralFormSuccess(true);
    setTimeout(() => {
      setShowGeneralFormSuccess(false);
    }, 4000);
  };

  // Helper to load missions dynamically from localStorage
  function getData(key) {
    const data = JSON.parse(localStorage.getItem(`ml_${key}`));
    if (key === "missoes" && Array.isArray(data)) {
      const hasOld = data.some(m => m.id === "m1" || m.id === "m2" || m.id === "m3" || m.id === "m4" || !m.id.startsWith("meta_"));
      if (hasOld) {
        const officialMissions = [
          { id: "meta_elogio", titulo: "Elogio Espontâneo do Cliente", desc: "Atendimento reconhecido espontaneamente pelo cliente nos canais oficiais", pontos: 15, icone: "Sparkles", status: "concluido" },
          { id: "meta_monitoria", titulo: "Monitoria de Excelência", desc: "Nota acima de 98% na monitoria de qualidade e atendimento", pontos: 10, icone: "Award", status: "disponivel" },
          { id: "meta_reversao", titulo: "Reversão de Cliente Insatisfeito", desc: "Situação crítica revertida com empatia, agilidade e senso de dono", pontos: 10, icone: "Heart", status: "disponivel" },
          { id: "meta_distrato", titulo: "Reversão de Distrato", desc: "Recuperação de relacionamento e retenção do cliente com excelência", pontos: 10, icone: "Target", status: "disponivel" },
          { id: "meta_cadastro", titulo: "Cadastro de Indicação", desc: "Cliente participou do programa de indicação através da atuação do colaborador", pontos: 15, icone: "Users", status: "concluido" },
          { id: "meta_conversao", titulo: "Conversão da Indicação em Venda", desc: "Indicação convertida em oportunidade real de negócio para a empresa", pontos: 30, icone: "Coins", status: "disponivel" }
        ];
        localStorage.setItem("ml_missoes", JSON.stringify(officialMissions));
        return officialMissions;
      }
    }
    return data;
  }

  // Find missions
  const missoes = getData("missoes") || [
    { id: "meta_elogio", titulo: "Elogio Espontâneo do Cliente", desc: "Atendimento reconhecido espontaneamente pelo cliente nos canais oficiais", pontos: 15, icone: "Sparkles", status: "concluido" },
    { id: "meta_monitoria", titulo: "Monitoria de Excelência", desc: "Nota acima de 98% na monitoria de qualidade e atendimento", pontos: 10, icone: "Award", status: "disponivel" },
    { id: "meta_reversao", titulo: "Reversão de Cliente Insatisfeito", desc: "Situação crítica revertida com empatia, agilidade e senso de dono", pontos: 10, icone: "Heart", status: "disponivel" },
    { id: "meta_distrato", titulo: "Reversão de Distrato", desc: "Recuperação de relacionamento e retenção do cliente com excelência", pontos: 10, icone: "Target", status: "disponivel" },
    { id: "meta_cadastro", titulo: "Cadastro de Indicação", desc: "Cliente participou do programa de indicação através da atuação do colaborador", pontos: 15, icone: "Users", status: "concluido" },
    { id: "meta_conversao", titulo: "Conversão da Indicação em Venda", desc: "Indicação convertida em oportunidade real de negócio para a empresa", pontos: 30, icone: "Coins", status: "disponivel" }
  ];

  const minhasIndicacoes = indicacoes.filter(ind => ind.colaboradorId === colaborador.id);
  const minhasEvidencias = evidencias.filter(ev => ev.colaboradorId === colaborador.id);

  const getMissionStatus = (m) => {
    let checkTipo = null;
    if (m.id === 'meta_elogio') checkTipo = 'elogio';
    else if (m.id === 'meta_reversao') checkTipo = 'reversao_insatisfeito';
    else if (m.id === 'meta_distrato') checkTipo = 'reversao_distrato';
    
    if (checkTipo) {
      const match = minhasEvidencias.find(ev => ev.tipo === checkTipo);
      if (match) {
        if (match.status === 'aprovado') return 'concluido';
        if (match.status === 'pendente') return 'pendente';
        if (match.status === 'reprovado') return 'reprovado';
      }
    }
    return m.status;
  };

  const handleToggleExpand = (missionId) => {
    if (expandedMissionId === missionId) {
      setExpandedMissionId(null);
      setShowSendForm(false);
    } else {
      setExpandedMissionId(missionId);
      setFormDescricaoMeta('');
      setFormArquivoMeta('');
      setShowSendForm(false);
    }
  };

  const getRecomendacoes = () => {
    const list = [];
    
    // 1. Check if there are manual missions that are available or reproved
    const statusReversao = getMissionStatus({ id: 'meta_reversao', status: 'disponivel' });
    if (statusReversao === 'disponivel' || statusReversao === 'reprovado') {
      list.push({
        id: 'rec_reversao',
        tipo: 'missao',
        missionId: 'meta_reversao',
        titulo: '⚡ Reversão de Cliente Insatisfeito',
        desc: 'Você pode ganhar +10 pontos trazendo uma solução ágil e transformando um detrator em fã.',
        pontos: 10,
        btnLabel: 'Avançar na Missão',
        icone: 'Heart'
      });
    }

    const statusDistrato = getMissionStatus({ id: 'meta_distrato', status: 'disponivel' });
    if (statusDistrato === 'disponivel' || statusDistrato === 'reprovado') {
      list.push({
        id: 'rec_distrato',
        tipo: 'missao',
        missionId: 'meta_distrato',
        titulo: '🛡️ Reversão de Distrato',
        desc: 'Evite o cancelamento e fortaleça o relacionamento para somar +10 pontos.',
        pontos: 10,
        btnLabel: 'Avançar na Missão',
        icone: 'Target'
      });
    }

    // 2. Check courses
    const cursos = colaborador.academia?.cursos || [];
    const cursoEmProgresso = cursos.find(c => c.status === 'em_andamento');
    if (cursoEmProgresso) {
      list.push({
        id: 'rec_curso_progresso',
        tipo: 'curso',
        cursoId: cursoEmProgresso.id,
        titulo: '🎓 Trilha de Aprendizado',
        desc: `Conclua "${cursoEmProgresso.titulo}" (já em ${cursoEmProgresso.progresso}%) para receber +${cursoEmProgresso.xp} pontos de evolução profissional.`,
        pontos: cursoEmProgresso.xp,
        btnLabel: 'Avançar no Curso',
        icone: 'GraduationCap'
      });
    } else {
      const cursoNaoIniciado = cursos.find(c => c.status === 'nao_iniciado');
      if (cursoNaoIniciado) {
        list.push({
          id: 'rec_curso_novo',
          tipo: 'curso',
          cursoId: cursoNaoIniciado.id,
          titulo: '🎓 Desenvolvimento Profissional',
          desc: `Inicie o curso "${cursoNaoIniciado.titulo}" e garanta +${cursoNaoIniciado.xp} pontos ao concluir.`,
          pontos: cursoNaoIniciado.xp,
          btnLabel: 'Iniciar Desenvolvimento',
          icone: 'GraduationCap'
        });
      }
    }

    // 3. Elogio
    const statusElogio = getMissionStatus({ id: 'meta_elogio', status: 'disponivel' });
    if (statusElogio === 'disponivel' || statusElogio === 'reprovado') {
      list.push({
        id: 'rec_elogio',
        tipo: 'missao',
        missionId: 'meta_elogio',
        titulo: '💚 Encantar Clientes',
        desc: 'Recebeu um feedback positivo espontâneo? Registre a evidência para somar +15 pontos.',
        pontos: 15,
        btnLabel: 'Registrar Encantamento',
        icone: 'Sparkles'
      });
    } else {
      list.push({
        id: 'rec_indicar',
        tipo: 'relacionamento',
        titulo: '🚀 Multiplicar Relacionamento',
        desc: 'Compartilhe seu link exclusivo. Cada nova indicação convertida em venda garante +30 pontos.',
        pontos: 30,
        btnLabel: 'Indicar Novos Clientes',
        icone: 'Users'
      });
    }

    return list.slice(0, 3);
  };

  const handleExecuteRecomendacao = (rec) => {
    if (rec.tipo === 'missao') {
      handleToggleExpand(rec.missionId);
      setTimeout(() => {
        const element = document.getElementById(rec.missionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else if (rec.tipo === 'curso') {
      onSetActiveTab('academia');
    } else if (rec.tipo === 'relacionamento') {
      onSetActiveTab('relacionamento');
    }
  };

  const getSuccessTip = (missionId) => {
    const tips = {
      meta_elogio: "Verifique sempre se o nome do cliente e a data do feedback estão visíveis no print do WhatsApp ou e-mail.",
      meta_monitoria: "Esta nota é calculada automaticamente. Certifique-se de manter a atenção aos procedimentos de qualidade Moura Leite.",
      meta_reversao: "Quanto mais detalhado for o histórico da tratativa de reversão, mais rápido seu gestor conseguirá aprovar a ação e somar os pontos.",
      meta_distrato: "Certifique-se de anexar a confirmação de que o cliente aceitou a manutenção ou o novo termo aditivo assinado.",
      meta_cadastro: "Os leads cadastrados através do seu link passam por uma triagem rápida na plataforma de corretores Moura Leite.",
      meta_conversao: "Vendas convertidas são atualizadas de acordo com o faturamento do contrato no ERP Moura Leite."
    };
    return tips[missionId] || "Evidências claras e organizadas agilizam o processo de validação pela coordenação.";
  };

  const renderJornadaCard = (m) => {
    const details = MISSION_DETAILS[m.id];
    const isAutomatic = details?.isAutomatic ?? true;
    const checkTipo = details?.tipo;
    
    const status = getMissionStatus(m);
    const isExpanded = expandedMissionId === m.id;

    let cardClass = "bg-slate-50/70 border-slate-200/60 text-slate-700 hover:border-[#00673e]/30 hover:bg-slate-50/95 transition-all";
    let statusText = "Pronto para envio";
    let tagClass = "bg-slate-100 text-slate-600 border-slate-250/60";
    let dotClass = "bg-slate-400";

    if (status === 'concluido') {
      cardClass = "bg-emerald-50/30 border-emerald-250/75 text-emerald-950 hover:border-emerald-350 hover:bg-emerald-50/40 transition-all";
      statusText = "Aprovado";
      tagClass = "bg-emerald-100/60 text-emerald-800 border-emerald-250/20";
      dotClass = "bg-emerald-500";
    } else if (status === 'pendente') {
      cardClass = "bg-amber-50/30 border-amber-250/60 text-amber-955 hover:border-amber-300 hover:bg-amber-50/40 transition-all";
      statusText = "Em análise";
      tagClass = "bg-amber-100/60 text-amber-800 border-amber-200/50";
      dotClass = "bg-amber-500 animate-pulse";
    } else if (status === 'reprovado') {
      cardClass = "bg-rose-50/20 border-rose-250/60 text-rose-955 hover:border-rose-350 hover:bg-rose-50/30 transition-all";
      statusText = "Recusado";
      tagClass = "bg-rose-100/60 text-rose-800 border-rose-200/50";
      dotClass = "bg-rose-500";
    }

    const matchingEv = checkTipo ? minhasEvidencias.find(ev => ev.tipo === checkTipo) : null;
    const missionEvidencias = checkTipo ? minhasEvidencias.filter(ev => ev.tipo === checkTipo) : [];
    const expandedBorderClass = isExpanded ? "border-[#00673e] ring-2 ring-[#00673e]/15 shadow-md bg-white col-span-full md:p-6" : "shadow-sm hover:shadow-md";

    return (
      <div 
        key={m.id} 
        id={m.id}
        onClick={() => handleToggleExpand(m.id)}
        className={`p-4 sm:p-5 border rounded-2xl transition-all cursor-pointer ${cardClass} ${expandedBorderClass}`}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-slate-800 text-xs sm:text-sm tracking-tight">{m.titulo}</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-white/70 border border-slate-200 text-slate-600">
                {isAutomatic ? "⚡ Automático" : "📎 Necessita evidência"}
              </span>
              {status === 'concluido' && (
                <span className="text-[9px] px-2 py-0.5 rounded-full font-black bg-emerald-100 border border-emerald-350 text-emerald-800 flex items-center gap-1 shadow-sm select-none">
                  <span>âœ¨</span> Excelente
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-600 block mt-1.5 leading-relaxed font-semibold max-w-md">{m.desc}</span>
          </div>
          
          <div className="flex flex-col items-end gap-1.5 shrink-0 ml-3">
            <span className="font-mono font-black text-slate-800 text-xs sm:text-sm">+{m.pontos} pts</span>
            <span className={`text-[8px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 border ${tagClass}`}>
              <span className={`w-1 h-1 rounded-full ${dotClass}`}></span>
              {statusText}
            </span>
          </div>
        </div>

        {isExpanded && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="mt-6 pt-6 border-t border-slate-200 space-y-6 text-xs font-semibold text-slate-800 cursor-default animate-slide-up"
          >
            {/* Header Help contextual button */}
            <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="text-slate-800 flex items-center gap-1.5 font-bold text-[10.5px]">
                <span>📋</span> Como funciona esta missão?
              </span>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowHelpId(showHelpId === m.id ? null : m.id);
                }}
                className="text-[#00673e] hover:underline flex items-center gap-1 font-bold text-[10px]"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Explicação</span>
              </button>

              {showHelpId === m.id && (
                <div className="absolute right-0 top-11 z-20 w-64 bg-slate-900 text-white text-[10.5px] p-3.5 rounded-xl shadow-lg border border-slate-800 leading-relaxed font-medium">
                  <p className="font-black text-emerald-400 mb-1 flex items-center gap-1">
                    <span>💡</span> Dica de Sucesso:
                  </p>
                  {isAutomatic 
                    ? "Esta meta é contabilizada de forma automática pelo nosso sistema de integração Moura Leite. Nenhuma ação manual é requerida." 
                    : "Esta meta permite múltiplos envios ao longo da campanha. Descreva brevemente a ação e anexe seu comprovante para análise."}
                </div>
              )}
            </div>

            {/* Destaque sutil para missões concluídas/ativas */}
            {status === 'concluido' && (
              <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500 rounded-r-2xl flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] font-black text-[#00673e] uppercase tracking-wider block">🏆 Campanha Contínua</span>
                  <p className="text-[11.5px] text-slate-800 font-bold mt-1">
                    Sua participação já foi validada nesta missão! Você pode continuar realizando envios para acumular mais pontos durante o trimestre.
                  </p>
                </div>
                <span className="text-2xl">🌟</span>
              </div>
            )}

            {/* Dica de Sucesso Inteligente */}
            <div className="bg-amber-50/60 border border-amber-250 p-4 rounded-2xl flex items-start gap-2.5 shadow-xs">
              <span className="text-base text-amber-500 flex-shrink-0 font-bold">💡</span>
              <div>
                <span className="text-[10px] font-black text-amber-950 uppercase tracking-wider block">Dica de Sucesso Moura Leite</span>
                <p className="text-slate-800 text-[11px] font-bold leading-relaxed mt-1">{getSuccessTip(m.id)}</p>
              </div>
            </div>

            {/* Informações detalhadas da missão estruturadas - Layout vertical */}
            <div className="space-y-4">
              {/* Propósito */}
              <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl shadow-xs">
                <span className="text-[10px] font-black text-[#00673e] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <span>📋</span> Propósito da Ação
                </span>
                <p className="text-slate-800 text-xs sm:text-sm font-bold leading-relaxed mt-1">{details?.comoFunciona}</p>
              </div>

              {/* Regras */}
              <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <span>📌</span> Regras de Validação
                  </span>
                  <p className="text-slate-800 text-xs sm:text-sm font-bold leading-relaxed mt-1">{details?.regras}</p>
                </div>
              </div>

              {/* Evidências */}
              <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-[10px] font-black text-indigo-800 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                    <span>📎</span> Evidências Aceitas
                  </span>
                  <p className="text-slate-800 text-xs sm:text-sm font-bold leading-relaxed mt-1">{details?.evidenciasAceitas}</p>
                </div>
              </div>
            </div>

            {/* Histórico / Linha do Tempo de Envios (Só para missões manuais) */}
            {!isAutomatic && (
              <div className="bg-slate-50/50 border border-slate-200 p-4 rounded-2xl space-y-4 shadow-xs">
                <h5 className="text-[11px] font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-250 pb-2">
                  <span>📜</span> Histórico de Envios ({missionEvidencias.length})
                </h5>
                {missionEvidencias.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-2">Nenhuma evidência enviada nesta campanha.</p>
                ) : (
                  <div className="relative pl-6 border-l-2 border-slate-200 space-y-5 ml-2.5">
                    {missionEvidencias.map((ev) => {
                      const isApproved = ev.status === 'aprovado';
                      const isRejected = ev.status === 'reprovado';
                      let statusBadge = "bg-amber-100 text-amber-800 border-amber-200";
                      let statusText = "Em análise";
                      if (isApproved) {
                        statusBadge = "bg-emerald-100 text-emerald-800 border-emerald-200";
                        statusText = "Aprovado";
                      } else if (isRejected) {
                        statusBadge = "bg-rose-100 text-rose-800 border-rose-200";
                        statusText = "Recusado";
                      }

                      return (
                        <div key={ev.id} className="relative group">
                          {/* Timeline dot */}
                          <div className={`absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                            isApproved ? 'bg-emerald-500' : isRejected ? 'bg-rose-500' : 'bg-amber-500 animate-pulse'
                          }`} />
                          
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between flex-wrap gap-2 text-[10.5px]">
                              <span className="font-bold text-slate-700">{ev.dataEnvio}</span>
                              <div className="flex items-center gap-2">
                                <span className={`text-[8.5px] font-extrabold px-2.5 py-0.5 rounded-full border ${statusBadge}`}>
                                  {statusText}
                                </span>
                                <span className={`font-mono font-bold ${isApproved ? 'text-emerald-700' : 'text-slate-600'}`}>
                                  {isApproved ? `+${ev.pontosAprovados} pts` : '+0 pts'}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-slate-800 font-bold leading-relaxed">{ev.descricao}</p>
                            {ev.urlEvidencia && (
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-650 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200 w-fit shadow-xs">
                                <span>📎 Comprovante:</span>
                                <span className="italic font-semibold text-indigo-700">{ev.urlEvidencia}</span>
                              </div>
                            )}
                            {ev.feedbackGestor && (
                              <div className={`p-3 rounded-xl text-[11px] font-bold mt-2 leading-relaxed ${
                                isRejected ? 'bg-rose-50 border border-rose-200 text-rose-950' : 'bg-slate-100 border border-slate-200 text-slate-800'
                              }`}>
                                <span className="block text-[8.5px] font-black uppercase tracking-wider text-slate-500 mb-0.5">Feedback do Gestor</span>
                                "{ev.feedbackGestor}"
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Formulário de Envio / "Enviar Nova Evidência" Button */}
            {!isAutomatic && (
              <div className="pt-2 space-y-4">
                <div className="flex justify-between items-center border-t border-slate-200 pt-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Ações da Campanha</span>
                  <button
                    onClick={() => setShowSendForm(!showSendForm)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#00673e] hover:bg-[#00673e]/90 text-white font-extrabold rounded-xl text-[9px] uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <span>{showSendForm ? "✕ Fechar Formulário" : "📎 Enviar Nova Evidência"}</span>
                  </button>
                </div>

                {showSendForm && (
                  <div className="mt-2 animate-slide-up">
                    {successFeedbackId === m.id ? (
                      <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 py-8 animate-fade-in shadow-sm">
                        <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-250/50 shadow-sm animate-bounce">
                          <Check className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-emerald-950">âœ… Evidência enviada com sucesso!</h4>
                          <p className="text-[10.5px] text-slate-800 font-bold mt-1">O coordenador foi notificado e revisará sua ação em breve.</p>
                        </div>
                        <span className="text-[8.5px] font-black text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <span>⏳</span> Aguardando validação da liderança
                        </span>
                      </div>
                    ) : (
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!formDescricaoMeta.trim()) return alert("Por favor, descreva a ação realizada.");
                          const fileSample = formArquivoMeta ? formArquivoMeta.split('\\').pop() : `${checkTipo}_print.png`;
                          onEnviarEvidencia(colaborador.id, checkTipo, formDescricaoMeta, fileSample);
                          setFormDescricaoMeta('');
                          setFormArquivoMeta('');
                          setSuccessFeedbackId(m.id);
                          setShowSendForm(false);
                          setTimeout(() => {
                            setSuccessFeedbackId(null);
                          }, 4000);
                        }}
                        className="p-5 bg-gradient-to-br from-white via-emerald-50/5 to-emerald-50/15 border-2 border-emerald-500/20 rounded-2xl space-y-4 shadow-sm relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
                        <div className="flex justify-between items-center border-b border-emerald-100/50 pb-2">
                          <span className="text-[9px] font-black text-[#00673e] uppercase tracking-wider flex items-center gap-1.5">
                            <span>⚡</span> ÁREA DE AÇÃO: NOVO COMPROVANTE
                          </span>
                          <span className="text-[8px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase border border-emerald-200">
                            Evidência Necessária
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[8.5px] font-black text-slate-600 uppercase mb-1">Como foi o atendimento?</label>
                            <textarea
                              rows="3"
                              value={formDescricaoMeta}
                              onChange={(e) => setFormDescricaoMeta(e.target.value)}
                              placeholder="Descreva brevemente os detalhes..."
                              className="w-full bg-[#f1f5f9] border border-transparent rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-slate-350 resize-none font-bold placeholder-slate-500 shadow-inner"
                            />
                          </div>
                          <div className="flex flex-col justify-between gap-3">
                            <div>
                              <label className="block text-[8.5px] font-black text-slate-600 uppercase mb-1">Upload de Comprovante (PDF/PNG/JPG)</label>
                              <input
                                type="file"
                                value={formArquivoMeta}
                                onChange={(e) => setFormArquivoMeta(e.target.value)}
                                className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-2.5 file:rounded-xl file:border-0 file:text-[9px] file:font-black file:bg-[#00673e]/10 file:text-[#00673e] hover:file:bg-[#00673e]/20 cursor-pointer shadow-xs"
                              />
                            </div>
                            <button
                              type="submit"
                              className="w-full btn-3d-green text-white font-bold py-2.5 rounded-xl text-[9.5px] uppercase tracking-wider"
                            >
                              Enviar para Validação
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  const mensagensColetivas = getData("mensagens_coletivas") || [];
  const orientacoesIndividuais = (getData("orientacoes_individuais") || []).filter(oi => oi.colaboradorId === colaborador.id);

  // Sorting for leaderboard
  const ranking = [...colaboradores].sort((a, b) => b.pontos - a.pontos);
  const minhaPosicao = ranking.findIndex(c => c.id === colaborador.id) + 1;

  // Campaign milestones (meta trimestral de 1000 pontos)
  const metaCampanha = 1000;
  const pontosRestantes = Math.max(0, metaCampanha - colaborador.pontos);
  const percentualCampanha = Math.min(100, Math.round((colaborador.pontos / metaCampanha) * 100));

  // Render helper for home screen mission cards
  const renderMissionCard = (m) => {
    const isConcluido = m.status === 'concluido';
    return (
      <div key={m.id} className="mission-card flex flex-col justify-between p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl min-h-[110px] hover:border-[#00673e]/20 transition-all">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-6.5 h-6.5 rounded-lg flex items-center justify-center bg-[#00673e]/10 border border-[#00673e]/20 text-[#00673e] flex-shrink-0">
              {m.icone === 'Sparkles' ? <Sparkles className="w-3.5 h-3.5" /> 
               : m.icone === 'Award' ? <Award className="w-3.5 h-3.5" /> 
               : m.icone === 'Heart' ? <Heart className="w-3.5 h-3.5" /> 
               : m.icone === 'Target' ? <Target className="w-3.5 h-3.5" /> 
               : m.icone === 'Users' ? <Users className="w-3.5 h-3.5" /> 
               : m.icone === 'Coins' ? <Coins className="w-3.5 h-3.5" /> 
               : <Award className="w-3.5 h-3.5" />}
            </div>
            <h4 className="text-[11px] font-black text-slate-700 leading-tight truncate">{m.titulo}</h4>
          </div>
          <p className="text-[9px] text-slate-500 font-medium mt-2 leading-relaxed">{m.desc}</p>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-150/40">
          <span className="text-[9px] font-black text-slate-500 font-mono">+{m.pontos} pontos</span>
          <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
            isConcluido ? 'bg-green-50 text-green-600 border border-green-200' 
            : 'bg-amber-50 text-amber-600 border border-amber-200'
          }`}>
            {isConcluido ? 'Concluída' : 'Disponível'}
          </span>
        </div>
      </div>
    );
  };

  // Confetti particles for copy button
  const confettiColors = ['#f59e0b', '#00673e', '#ea580c', '#7c3aed', '#06b6d4'];

  return (
    <div className="space-y-6">
      
      {/* ================= TAB: DASHBOARD ================= */}
      {activeTabNav === 'dashboard' && (
        <div className="space-y-6 animate-slide-up">
          
          {/* 1. HERO PRINCIPAL (Boas-vindas + Resumo Simples) */}
          <div className="relative rounded-[32px] overflow-hidden border border-[#00673e]/15 p-8 md:p-10 shadow-sm bg-gradient-to-br from-white via-[#00673e]/3 to-[#00673e]/1 text-slate-800">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-5 pointer-events-none"
                 style={{ background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)' }} />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              {/* Left: Avatar + greeting */}
              <div className="flex items-center gap-5 flex-shrink-0">
                <div className="w-20 h-20 rounded-full border-2 border-[#00673e]/20 overflow-hidden shadow-sm flex-shrink-0">
                  <img src={colaborador.foto} alt={colaborador.nome} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[#00673e] text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#00673e] animate-pulse" /> Campanha de Relacionamento Moura Leite
                  </span>
                  <h2 className="text-2xl font-black tracking-tight leading-tight text-slate-800">
                    Olá, {colaborador.nome.split(" ")[0]}! 👋
                  </h2>
                  <p className="text-[#00673e] text-xs mt-1.5 font-bold italic leading-relaxed">
                    "Cada atendimento fortalece a experiência do cliente. Sua evolução de hoje constrói a confiança de amanhã." 💚
                  </p>
                  <p className="text-slate-600 text-[10.5px] mt-1 font-semibold">
                    Acompanhe a sua evolução e o progresso da equipe neste ciclo de relacionamento.
                  </p>
                </div>
              </div>

              {/* Center/Right: Campaign stats - Resumo Trimestral */}
              <div className="flex-grow max-w-xl space-y-3 md:pl-6 md:border-l border-slate-200/60">
                <div className="flex justify-between items-center text-[10px] font-black text-[#00673e] uppercase tracking-wider">
                  <span>📈 Resumo da Campanha 2026</span>
                  <span className="font-mono text-xs">{colaborador.pontos} / 1000 pontos</span>
                </div>
                <div className="w-full rounded-full overflow-hidden h-2 bg-slate-100 border border-slate-250/20">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#00673e] transition-all duration-1000"
                    style={{ width: `${Math.min(100, Math.round((colaborador.pontos / 1000) * 100))}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-slate-600 font-extrabold">
                  <span>Meta Trimestral Individual</span>
                  <span>{Math.min(100, Math.round((colaborador.pontos / 1000) * 100))}% concluído</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Messages + Campaign Highlights */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* 📢 MENSAGENS COLETIVAS (GESTÃO) */}
              <div className="card-gamified" style={{ background: 'linear-gradient(135deg, rgba(0, 103, 62, 0.02) 0%, white 100%)', borderColor: 'rgba(0,103,62,0.1)' }}>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                  <Bell className="w-4 h-4 text-[#00673e]" />
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Comunicados e Mensagens Coletivas</h3>
                </div>
                
                {mensagensColetivas.length === 0 ? (
                  <div className="py-6 text-center space-y-2">
                    <p className="text-xs text-slate-500 font-bold">Nenhum comunicado no momento. 💚</p>
                    <p className="text-[10px] text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                      A liderança poderá compartilhar novidades, comunicados gerais e reconhecimentos da equipe por aqui. Continue acompanhando as novidades da campanha!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mensagensColetivas.map((msg) => (
                      <div key={msg.id} className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-2 hover:shadow-sm transition-all">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-xs font-extrabold text-slate-800">{msg.titulo}</h4>
                          <span className="text-[9px] font-mono text-slate-400 font-bold">{new Date(msg.data).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{msg.conteudo}</p>
                        <div className="text-[9px] text-[#00673e] font-extrabold font-mono pt-1 text-right">— {msg.autor}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Propósito dos Pilares 2026 */}
              <div className="card-gamified space-y-4">
                <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    Propósito dos Pilares 2026
                  </h3>
                  <span className="text-[9px] font-bold text-[#00673e] bg-[#00673e]/5 px-2.5 py-0.5 rounded-md">
                    Foco em Relacionamento
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* Pilar: Encantar */}
                  <div className="p-3.5 bg-emerald-50/20 border border-emerald-100/70 rounded-2xl flex flex-col justify-between hover:bg-emerald-50/40 transition-all">
                    <div>
                      <span className="text-sm">💚</span>
                      <h4 className="text-[11px] font-black text-emerald-800 uppercase tracking-wide mt-1.5">Encantar</h4>
                      <p className="text-[10px] text-slate-500 font-medium mt-1 leading-relaxed">
                        Prestar atendimento de excelência com empatia, gerando elogios espontâneos que marcam positivamente o cliente.
                      </p>
                    </div>
                    <span className="text-[8px] font-extrabold text-emerald-700/80 uppercase mt-2 pt-1 border-t border-emerald-100/50 block">
                      Impacto: Fidelização & Confiança
                    </span>
                  </div>

                  {/* Pilar: Resolver */}
                  <div className="p-3.5 bg-amber-50/20 border border-amber-100/70 rounded-2xl flex flex-col justify-between hover:bg-amber-50/40 transition-all">
                    <div>
                      <span className="text-sm">⚡</span>
                      <h4 className="text-[11px] font-black text-amber-800 uppercase tracking-wide mt-1.5">Resolver</h4>
                      <p className="text-[10px] text-slate-500 font-medium mt-1 leading-relaxed">
                        Reverter insatisfações e distratos com agilidade e atitude de dono, transformando momentos difíceis em soluções.
                      </p>
                    </div>
                    <span className="text-[8px] font-extrabold text-amber-700/80 uppercase mt-2 pt-1 border-t border-amber-100/50 block">
                      Impacto: Senso de Dono & Agilidade
                    </span>
                  </div>

                  {/* Pilar: Indicar */}
                  <div className="p-3.5 bg-indigo-50/20 border border-indigo-100/70 rounded-2xl flex flex-col justify-between hover:bg-indigo-50/40 transition-all">
                    <div>
                      <span className="text-sm">🚀</span>
                      <h4 className="text-[11px] font-black text-indigo-800 uppercase tracking-wide mt-1.5">Indicar</h4>
                      <p className="text-[10px] text-slate-500 font-medium mt-1 leading-relaxed">
                        Estimular indicações de novos clientes através de nossa rede de contatos, expandindo a comunidade Moura Leite.
                      </p>
                    </div>
                    <span className="text-[8px] font-extrabold text-indigo-700/80 uppercase mt-2 pt-1 border-t border-indigo-100/50 block">
                      Impacto: Crescimento & Parceria
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Shortcuts */}
            <div className="space-y-6">
              
              {/* ATALHOS RÁPIDOS */}
              <div className="card-gamified space-y-4">
                <h3 className="text-xs font-black text-[#00673e] uppercase tracking-wider border-b border-slate-100 pb-2">
                  Sua Jornada na Plataforma
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <button onClick={() => onSetActiveTab('minha_jornada')} 
                          className="p-3 bg-white border border-slate-200/60 rounded-2xl hover:border-[#00673e] hover:shadow-sm hover:translate-x-1 transition-all text-left flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">âœ¨</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 group-hover:text-[#00673e] transition-colors">Minha Jornada</h4>
                        <span className="text-[9px] text-slate-400 block -mt-0.5 font-medium">Evolução individual e feedbacks</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00673e] group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <button onClick={() => onSetActiveTab('jornada_equipe')} 
                          className="p-3 bg-white border border-slate-200/60 rounded-2xl hover:border-[#00673e] hover:shadow-sm hover:translate-x-1 transition-all text-left flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🤝</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 group-hover:text-[#00673e] transition-colors">Jornada da Equipe</h4>
                        <span className="text-[9px] text-slate-400 block -mt-0.5 font-medium">Metas coletivas e ranking</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00673e] group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <button onClick={() => onSetActiveTab('relacionamento')} 
                          className="p-3 bg-white border border-slate-200/60 rounded-2xl hover:border-[#00673e] hover:shadow-sm hover:translate-x-1 transition-all text-left flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">💚</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 group-hover:text-[#00673e] transition-colors">Relacionamento</h4>
                        <span className="text-[9px] text-slate-400 block -mt-0.5 font-medium">Indique e Ganhe indicações</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00673e] group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <button onClick={() => onSetActiveTab('missoes')} 
                          className="p-3 bg-white border border-slate-200/60 rounded-2xl hover:border-[#00673e] hover:shadow-sm hover:translate-x-1 transition-all text-left flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🎯</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 group-hover:text-[#00673e] transition-colors">Missões</h4>
                        <span className="text-[9px] text-slate-400 block -mt-0.5 font-medium">Metas ativas e envio de evidências</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00673e] group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <button onClick={() => onSetActiveTab('academia')} 
                          className="p-3 bg-white border border-slate-200/60 rounded-2xl hover:border-[#00673e] hover:shadow-sm hover:translate-x-1 transition-all text-left flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🎓</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 group-hover:text-[#00673e] transition-colors">Academia Moura Leite</h4>
                        <span className="text-[9px] text-slate-400 block -mt-0.5 font-medium">Cursos e capacitação profissional</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00673e] group-hover:translate-x-0.5 transition-all" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ================= TAB: MINHA JORNADA ================= */}
      {activeTabNav === 'minha_jornada' && (
        <div className="space-y-6 animate-slide-up">
          
          {/* Header */}
          <div className="relative rounded-[32px] overflow-hidden border border-[#00673e]/15 p-6 shadow-sm bg-gradient-to-br from-white to-[#00673e]/2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#00673e]/10 border border-[#00673e]/20 text-[#00673e]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">Sua Jornada Individual</h3>
                <p className="text-xs text-slate-500">Monitore sua evolução, confira missões e envie evidências das suas conquistas.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">

              {/* Resumo da sua Evolução (Topo) */}
              <div className="card-gamified space-y-5 shadow-sm hover:shadow-md transition-shadow p-5 md:p-6">
                <h3 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider border-b border-slate-150 pb-2.5">
                  Resumo da sua Evolução
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Card 1: Pontos do Mês */}
                  <div className="p-4 bg-[#00673e]/5 border border-[#00673e]/15 rounded-2xl flex flex-col justify-between hover:bg-[#00673e]/10 transition-colors shadow-xs">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-black text-slate-550 uppercase tracking-wider">Pontuação do Mês</span>
                      <span className="text-sm">🏆</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-2xl font-black text-[#00673e] font-mono block">{colaborador.pontosMensal || 68}</span>
                      <span className="text-[10px] text-[#00673e] font-bold block mt-0.5">+15 pts nesta semana</span>
                    </div>
                  </div>

                  {/* Card 2: Meta Trimestral */}
                  <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col justify-between hover:bg-slate-100 transition-colors shadow-xs">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-black text-slate-550 uppercase tracking-wider">Meta Trimestral</span>
                      <span className="text-sm">🎯</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-base font-black text-slate-800 font-mono block">{colaborador.pontos} / 1000</span>
                      <span className="text-[9px] text-slate-600 font-extrabold block mt-0.5">Faltam {1000 - colaborador.pontos} pts</span>
                    </div>
                  </div>

                  {/* Card 3: Ações Concluídas */}
                  <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col justify-between hover:bg-slate-100 transition-colors shadow-xs">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-black text-slate-550 uppercase tracking-wider">Ações Aprovadas</span>
                      <span className="text-sm">âœ¨</span>
                    </div>
                    <div className="mt-3">
                      <span className="text-xl font-black text-slate-800 font-mono block">{minhasEvidencias.filter(e => e.status === 'aprovado').length} aprovadas</span>
                      <span className="text-[9px] text-slate-600 font-extrabold block mt-0.5">Neste ciclo da campanha</span>
                    </div>
                  </div>

                  {/* Card 4: Impacto Relacionamento */}
                  <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col justify-between hover:bg-slate-100 transition-colors shadow-xs">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-black text-slate-550 uppercase tracking-wider">Impacto Relac.</span>
                      <span className="text-sm">💚</span>
                    </div>
                    <div className="mt-3">
                      <div className="text-[11px] font-black text-slate-800 leading-snug">
                        {minhasEvidencias.filter(e => e.tipo === 'elogio' && e.status === 'aprovado').length} elogio{minhasEvidencias.filter(e => e.tipo === 'elogio' && e.status === 'aprovado').length !== 1 ? 's' : ''}
                      </div>
                      <span className="text-[9px] text-slate-600 font-extrabold block mt-0.5">
                        {minhasIndicacoes.filter(i => i.status === 'venda_convertida').length} ind. convertida{minhasIndicacoes.filter(i => i.status === 'venda_convertida').length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2 mt-2 pt-2 border-t border-slate-150">
                  <div className="w-full rounded-full overflow-hidden h-2.5 bg-slate-100 border border-slate-250/30">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#00673e]"
                      style={{ width: `${Math.min(100, Math.round((colaborador.pontos / 1000) * 100))}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                    <span>Evolução Individual da Campanha</span>
                    <span>{Math.min(100, Math.round((colaborador.pontos / 1000) * 100))}% concluído</span>
                  </div>
                </div>
              </div>

              {/* Sua Evolução na Campanha (Metas Individuais) */}
              <div className="card-gamified space-y-5 shadow-sm hover:shadow-md transition-shadow p-5 md:p-6">
                <h3 className="text-xs sm:text-sm font-black text-slate-700 uppercase tracking-wider border-b border-slate-150 pb-2.5">
                  Sua Evolução na Campanha
                </h3>
                <div className="space-y-6">
                  {/* Encantar */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-black text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <span>💚</span> Pilar Encantar
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {missoes.filter(m => m.id === 'meta_elogio' || m.id === 'meta_monitoria').map(m => renderJornadaCard(m))}
                    </div>
                  </div>

                  {/* Resolver */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-black text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <span>⚡</span> Pilar Resolver
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {missoes.filter(m => m.id === 'meta_reversao' || m.id === 'meta_distrato').map(m => renderJornadaCard(m))}
                    </div>
                  </div>

                  {/* Indicar */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-black text-indigo-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <span>🚀</span> Pilar Indicar
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {missoes.filter(m => m.id === 'meta_cadastro' || m.id === 'meta_conversao').map(m => renderJornadaCard(m))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Histórico em Linha do Tempo */}
              <div className="card-gamified shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <History className="w-4.5 h-4.5 text-[#00673e]" /> Linha do Tempo e Histórico de Ações
                </h3>
                
                {minhasEvidencias.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center font-medium">Nenhuma evidência registrada na linha do tempo ainda.</p>
                ) : (
                  <div className="relative pl-6 border-l-2 border-slate-150 space-y-5 ml-2.5">
                    {minhasEvidencias.map((ev) => {
                      const isAprovado = ev.status === 'aprovado';
                      const isReprovado = ev.status === 'reprovado';
                      
                      return (
                        <div key={ev.id} className="relative group">
                          {/* Circle marker on line */}
                          <div className={`absolute -left-[32px] top-2.5 w-4 h-4 rounded-full border-2 flex items-center justify-center text-[7px] bg-white transition-transform group-hover:scale-110 shadow-sm z-10 ${
                            isAprovado 
                              ? 'border-emerald-500 text-emerald-500 font-black bg-emerald-50/50' 
                              : isReprovado 
                                ? 'border-rose-500 text-rose-500 font-black bg-rose-50/50' 
                                : 'border-amber-500 text-amber-500 font-black bg-amber-50/50 animate-pulse'
                          }`}>
                            {isAprovado ? '✓' : isReprovado ? '✕' : '⏳'}
                          </div>

                          <div className="p-4 bg-white border border-slate-200/70 rounded-2xl hover:border-[#00673e]/20 hover:shadow-md transition-all space-y-2">
                            <div className="flex justify-between items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${
                                  isAprovado ? 'bg-emerald-500' : isReprovado ? 'bg-rose-500' : 'bg-amber-500 animate-pulse'
                                }`} />
                                <span className="text-[10px] font-black text-slate-800 font-mono">
                                  {ev.dataEnvio ? ev.dataEnvio.split('-').reverse().slice(0, 2).join('/') : 'Recente'}
                                </span>
                                <span className="text-[10px] font-bold text-slate-500">|</span>
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                                  {ev.tipo.replace("_", " ")}
                                </span>
                              </div>
                              <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                                isAprovado 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-150' 
                                  : isReprovado 
                                    ? 'bg-rose-50 text-rose-700 border-rose-150' 
                                    : 'bg-amber-50 text-amber-700 border-amber-150'
                              }`}>
                                {isAprovado ? 'Aprovado' : isReprovado ? 'Recusado' : 'Em análise'}
                              </span>
                            </div>
                            
                            <p className="text-xs text-slate-655 font-semibold leading-relaxed">{ev.descricao}</p>
                            
                            {/* Pontos obtidos e status visual */}
                            <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[10px]">
                              {ev.feedbackGestor ? (
                                <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50/70 border border-blue-100 px-2.5 py-1 rounded-xl w-full max-w-[85%] shadow-sm">
                                  <span className="text-xs">💬</span>
                                  <div className="truncate">
                                    <span className="font-black text-[9px] uppercase tracking-wider block">Feedback Recebido</span>
                                    <span className="font-semibold block truncate">"{ev.feedbackGestor}"</span>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-[9px] text-slate-500 italic font-medium">Nenhum comentário adicional do gestor.</span>
                              )}
                              <span className={`font-mono font-black text-xs shrink-0 ml-3 ${
                                isAprovado ? 'text-emerald-600' : 'text-slate-500'
                              }`}>
                                {isAprovado ? `+${ev.pontosAprovados} pts` : '+0 pts'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Guidelines */}
            <div className="space-y-6">
              
              {/* 🎯 PRÓXIMAS AÇÕES RECOMENDADAS */}
              <div className="card-gamified space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Zap className="w-4 h-4 text-[#00673e]" />
                  <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider">Ações Recomendadas</h3>
                </div>
                
                <div className="space-y-3">
                  {getRecomendacoes().map((rec) => {
                    return (
                      <div key={rec.id} className="p-2.5 bg-slate-50/80 border border-slate-200/50 rounded-2xl flex flex-col justify-between gap-2 hover:bg-slate-50 transition-colors shadow-xs">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex items-start gap-2">
                            <div className="w-6.5 h-6.5 rounded-lg flex items-center justify-center bg-[#00673e]/10 border border-[#00673e]/20 text-[#00673e] flex-shrink-0 mt-0.5">
                              {rec.icone === 'Heart' && <Heart className="w-3.5 h-3.5" />}
                              {rec.icone === 'Target' && <Target className="w-3.5 h-3.5" />}
                              {rec.icone === 'GraduationCap' && <GraduationCap className="w-3.5 h-3.5" />}
                              {rec.icone === 'Sparkles' && <Sparkles className="w-3.5 h-3.5" />}
                              {rec.icone === 'Users' && <Users className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <span className="text-[10px] font-black text-slate-800 block leading-tight">{rec.titulo}</span>
                              <span className="text-[9px] text-slate-600 font-semibold block mt-0.5 leading-relaxed">{rec.desc}</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono font-bold text-[#ea580c] bg-[#ea580c]/5 px-2 py-0.5 rounded border border-[#ea580c]/10 shrink-0">
                            +{rec.pontos} pts
                          </span>
                        </div>
                        <div className="flex justify-end mt-1.5 pt-1.5 border-t border-slate-100/50">
                          <button
                            onClick={() => handleExecuteRecomendacao(rec)}
                            className="px-2.5 py-1 bg-white hover:bg-[#00673e]/5 text-[#00673e] font-extrabold border border-[#00673e]/20 hover:border-[#00673e]/40 rounded-lg text-[8px] uppercase tracking-wider transition-all shadow-xs"
                          >
                            {rec.btnLabel}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 💬 MINI MURAL DA LIDERANÇA */}
              <div className="card-gamified space-y-4 shadow-sm hover:shadow-md transition-shadow" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.02) 0%, white 100%)', borderColor: 'rgba(245,158,11,0.12)' }}>
                <div className="flex items-center gap-2 border-b border-amber-100 pb-2">
                  <MessageCircle className="w-4 h-4 text-amber-500 animate-pulse" />
                  <h3 className="text-xs font-black text-amber-700 uppercase tracking-wider">Mural de Feedbacks</h3>
                </div>
                
                {orientacoesIndividuais.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center font-medium">Nenhum direcionamento individual registrado.</p>
                ) : (
                  <div className="space-y-3">
                    {orientacoesIndividuais.map((msg) => (
                      <div key={msg.id} className="p-3.5 bg-white border border-amber-100 rounded-2xl space-y-2.5 shadow-sm hover:border-amber-200 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-xs">
                              👩‍💼
                            </div>
                            <span className="text-[10px] font-black text-slate-700">{msg.autor}</span>
                          </div>
                          <span className="text-[8px] font-bold text-slate-500">{msg.data}</span>
                        </div>
                        <p className="text-[11px] text-slate-650 font-semibold leading-relaxed italic">
                          "{msg.feedback}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Seus Indicadores de Excelência */}
              <div className="card-gamified space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Seus Indicadores de Excelência
                </h3>
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl text-center space-y-1.5 flex flex-col justify-between hover:bg-slate-100/50 transition-colors">
                    <div>
                      <span className="text-[8px] font-black text-slate-500 uppercase tracking-wider block">Monitoria</span>
                      <span className="text-lg font-black text-[#00673e] font-mono block mt-1">{colaborador.indicadores?.monitoria || 98.2}%</span>
                    </div>
                    <span className="text-[9px] text-[#00673e] bg-emerald-50 border border-emerald-100 py-1 px-1.5 rounded-lg font-semibold block leading-tight mt-1.5">
                      Monitoria acima da meta institucional.
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl text-center space-y-1.5 flex flex-col justify-between hover:bg-slate-100/50 transition-colors">
                    <div>
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-wider block">CSAT</span>
                      <span className="text-lg font-black text-[#00673e] font-mono block mt-1">{colaborador.indicadores?.csat || 95}%</span>
                    </div>
                    <span className="text-[9px] text-[#00673e] bg-emerald-50 border border-emerald-100 py-1 px-1.5 rounded-lg font-semibold block leading-tight mt-1.5">
                      CSAT excelente neste ciclo.
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ================= TAB: JORNADA DA EQUIPE ================= */}
      {activeTabNav === 'jornada_equipe' && (
        <div className="space-y-6 animate-slide-up">
          
          {/* Header */}
          <div className="relative rounded-[32px] overflow-hidden border border-[#00673e]/15 p-6 shadow-sm bg-gradient-to-br from-white to-[#00673e]/2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#00673e]/10 border border-[#00673e]/20 text-[#00673e]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">Jornada Coletiva da Equipe</h3>
                <p className="text-xs text-gray-700 font-semibold mt-1">
                  Resultados construídos através da colaboração, excelência e fortalecimento da cultura Moura Leite.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Team Indicators & Progression */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Bloco Institucional: Crescemos Juntos */}
              <div className="p-6 bg-gradient-to-br from-emerald-50/40 via-white to-white border border-emerald-100 rounded-[24px] shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00673e] flex items-center justify-center text-2xl border border-emerald-100 shrink-0 select-none">
                  🌱
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-800">Crescemos Juntos</h4>
                  <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                    A evolução coletiva da nossa equipe fortalece os laços institucionais e amplia nossos resultados.
                  </p>
                </div>
              </div>

              {/* Metas Coletivas Reestruturadas */}
              <div className="card-gamified">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* META 01: CSAT */}
                  <div className="p-5 bg-gradient-to-br from-emerald-50/40 via-white to-white border-2 border-emerald-300 shadow-md shadow-emerald-50/50 rounded-3xl flex flex-col justify-between gap-4 transition-all hover:shadow-lg">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                            <Star className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-slate-800 block">Meta Mensal de CSAT</span>
                            <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider">Destaque do Mês</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-mono shrink-0">+10 pts</span>
                      </div>
                      
                      <div className="space-y-1.5 border-t border-slate-100 pt-2.5">
                        <p className="text-[11px] text-gray-700 font-semibold leading-relaxed">
                          <strong>Objetivo:</strong> Alcançar o índice coletivo de satisfação definido pela campanha.
                        </p>
                        <p className="text-[10.5px] text-slate-600 font-semibold leading-relaxed">
                          <strong>Impacto para equipe:</strong> Fortalece a excelência no atendimento e a percepção positiva dos clientes.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] text-emerald-950 bg-emerald-50 border border-emerald-100 rounded-2xl p-3 font-semibold italic">
                        "Cada atendimento positivo fornece força ao resultado da equipe."
                      </p>
                      
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10.5px] font-black">
                          <span className="text-slate-600">CSAT Atual: <strong className="text-emerald-700 font-black">96.3%</strong> (Meta: 95%)</span>
                          <span className="text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wider">Meta Atingida ✓</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative">
                          <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-[#00673e] transition-all duration-1000" style={{ width: "96.3%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* META 02: NPS */}
                  <div className="p-5 bg-gradient-to-br from-amber-50/40 via-white to-white border-2 border-amber-300 shadow-md shadow-amber-50/50 rounded-3xl flex flex-col justify-between gap-4 transition-all hover:shadow-lg">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-705 flex items-center justify-center font-bold">
                            <Trophy className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-slate-800 block">Meta Semestral de NPS</span>
                            <span className="text-[9px] font-black text-amber-705 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Meta Atingida</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-mono shrink-0">+15 pts</span>
                      </div>
                      
                      <div className="space-y-1.5 border-t border-slate-100 pt-2.5">
                        <p className="text-[11px] text-gray-705 font-semibold leading-relaxed">
                          <strong>Objetivo:</strong> Manter o índice institucional de recomendação dentro da meta estratégica.
                        </p>
                        <p className="text-[10.5px] text-slate-650 font-semibold leading-relaxed">
                          <strong>Impacto para equipe:</strong> Contribui para fortalecimento da marca e fidelização dos clientes.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] text-amber-950 bg-amber-50 border border-amber-100 rounded-2xl p-3 font-semibold italic">
                        "Relacionamentos fortes geram confiança e crescimento sustentável."
                      </p>
                      
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10.5px] font-black">
                          <span className="text-slate-600">NPS Atual: <strong className="text-amber-700 font-black">78</strong> (Meta: 75)</span>
                          <span className="text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wider">Meta Atingida ✓</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative">
                          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#d97706] transition-all duration-1000" style={{ width: "78%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* META 03: MELHORIA IMPLANTADA */}
                  <div className="p-5 bg-gradient-to-br from-purple-50/20 via-white to-white border border-purple-200 shadow-sm rounded-3xl flex flex-col justify-between gap-4 transition-all hover:border-purple-300 hover:shadow-md">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-slate-800 block">Melhoria Implantada</span>
                            <span className="text-[9px] font-black text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Em progresso</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-mono shrink-0">+5 pts</span>
                      </div>
                      
                      <div className="space-y-1.5 border-t border-slate-100 pt-2.5">
                        <p className="text-[11px] text-gray-705 font-semibold leading-relaxed">
                          <strong>Objetivo:</strong> Reconhecer melhorias operacionais implementadas pela equipe.
                        </p>
                        <p className="text-[10.5px] text-slate-650 font-semibold leading-relaxed">
                          <strong>Impacto para equipe:</strong> Estimula inovação, protagonismo e melhoria contínua.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] text-purple-950 bg-purple-50 border border-purple-100 rounded-2xl p-3 font-semibold italic">
                        "Pequenas melhorias geram grandes evoluções."
                      </p>
                      
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10.5px] font-black">
                          <span className="text-slate-600">Melhorias: <strong className="text-purple-700 font-black">4</strong> (Meta: 10)</span>
                          <span className="text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wider">40% concluído</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative">
                          <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-1000" style={{ width: "40%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* META 04: CADASTRO DE FLUXOS */}
                  <div className="p-5 bg-gradient-to-br from-blue-50/20 via-white to-white border border-blue-200 shadow-sm rounded-3xl flex flex-col justify-between gap-4 transition-all hover:border-blue-300 hover:shadow-md">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-slate-800 block">Cadastro de Fluxos</span>
                            <span className="text-[9px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Em progresso</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded font-mono shrink-0">+5 pts</span>
                      </div>
                      
                      <div className="space-y-1.5 border-t border-slate-100 pt-2.5">
                        <p className="text-[11px] text-gray-705 font-semibold leading-relaxed">
                          <strong>Objetivo:</strong> Mapear e organizar processos que fortaleçam a rotina operacional.
                        </p>
                        <p className="text-[10.5px] text-slate-650 font-semibold leading-relaxed">
                          <strong>Impacto para equipe:</strong> Melhora organização, produtividade e experiência do cliente.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] text-blue-950 bg-blue-50 border border-blue-100 rounded-2xl p-3 font-semibold italic">
                        "Processos claros fortalecem resultados consistentes."
                      </p>
                      
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10.5px] font-black">
                          <span className="text-slate-650">Progresso: <strong className="text-blue-700 font-black">13/20</strong> fluxos</span>
                          <span className="text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wider">65% concluído</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden relative">
                          <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000" style={{ width: "65%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bloco de Engajamento Coletivo: Juntos Somos Mais Fortes */}
              <div className="p-6 bg-[#00673e]/5 border border-[#00673e]/10 rounded-[24px] flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00673e]/10 text-[#00673e] flex items-center justify-center text-2xl border border-[#00673e]/20 shrink-0 select-none">
                  💚
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-800">Juntos somos mais fortes</h4>
                  <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                    A excelência da experiência do cliente é construída diariamente através da colaboração, empatia e comprometimento de toda equipe.
                  </p>
                </div>
              </div>

              {/* Timeline de Marcos */}
              <div className="card-gamified">
                <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4.5 h-4.5 text-[#00673e]" /> Metas e Marcos Coletivos da Campanha
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 relative">
                  <div className="hidden md:block absolute top-9 left-10 right-10 h-0.5 bg-slate-200 z-0">
                    <div className="h-full bg-[#00673e] transition-all" style={{ width: `${percentualCampanha}%` }}></div>
                  </div>
                  
                  {[
                    { value: 250, label: "Marco 250 pontos", icon: "🌱", desc: "Integração e engajamento inicial na plataforma." },
                    { value: 500, label: "Marco 500 pontos", icon: "🤝", desc: "Consolidação de capacitação e primeiros elogios." },
                    { value: 750, label: "Marco 750 pontos", icon: "🚀", desc: "Excelente retenção de clientes e indicações ativas." },
                    { value: 1000, label: "Meta 1000 pontos", icon: "🏆", desc: "Meta trimestral individual com reconhecimento." }
                  ].map((m, idx, arr) => {
                    const isAchieved = colaborador.pontos >= m.value;
                    const isNext = !isAchieved && (idx === 0 || colaborador.pontos >= arr[idx - 1].value);
                    
                    let circleStyle = "border-slate-200 bg-white text-slate-300";
                    let textStyle = "text-slate-400";
                    let titleStyle = "text-slate-400";
                    let badge = null;

                    if (isAchieved) {
                      circleStyle = "border-[#00673e] bg-[#00673e]/5 text-[#00673e] font-black";
                      textStyle = "text-slate-600";
                      titleStyle = "text-[#00673e] font-black";
                      badge = (
                        <div className="mt-1.5 bg-[#00673e] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                          Alcançado
                        </div>
                      );
                    } else if (isNext) {
                      circleStyle = "border-[#f59e0b] bg-amber-50 text-[#f59e0b] font-black animate-pulse shadow-sm";
                      textStyle = "text-slate-600";
                      titleStyle = "text-slate-800 font-black";
                      badge = (
                        <div className="mt-1.5 bg-[#f59e0b] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase animate-pulse">
                          Próximo
                        </div>
                      );
                    } else {
                      badge = (
                        <div className="mt-1.5 bg-slate-100 text-slate-400 text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                          Bloqueado
                        </div>
                      );
                    }

                    return (
                      <div key={m.value} className="relative z-10 flex flex-col items-center text-center p-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 text-base shadow-sm ${circleStyle}`}>
                          {m.icon}
                        </div>
                        <h4 className={`text-xs mt-2 ${titleStyle}`}>{m.label}</h4>
                        <p className={`text-[10px] mt-1 font-medium max-w-[150px] leading-snug ${textStyle}`}>
                          {m.desc}
                        </p>
                        {badge}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Team Progress & Ranking */}
            <div className="space-y-6">
              
              {/* Progresso Coletivo */}
              <div className="card-gamified">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    📈 Evolução da Equipe
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                      Objetivo Coletivo Atual
                    </span>
                    <p className="text-xs text-slate-700 font-semibold leading-snug">
                      Atingir 3000 pontos coletivos e manter os Indicadores de Excelência acima da meta no trimestre.
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Pontos Coletivos</span>
                    <span className="text-base font-black text-[#00673e] font-mono">
                      {colaboradores.reduce((sum, c) => sum + c.pontos, 0)} / 3000 pontos
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="w-full rounded-full overflow-hidden h-1.5 bg-slate-100 border border-slate-200/50">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-[#00673e]"
                        style={{ width: `${Math.min(100, Math.round((colaboradores.reduce((sum, c) => sum + c.pontos, 0) / 3000) * 100))}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-600 font-bold">
                      <span>Meta Coletiva da Campanha</span>
                      <span>{Math.min(100, Math.round((colaboradores.reduce((sum, c) => sum + c.pontos, 0) / 3000) * 100))}%</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50/50 border border-amber-200/40 rounded-2xl">
                    <span className="text-[9px] text-amber-600 font-black uppercase tracking-wider block mb-1">🎁 Recompensa Coletiva</span>
                    <p className="text-[10px] text-slate-650 font-semibold leading-relaxed">
                      Almoço Especial de Confraternização Moura Leite ao atingir 100% da meta.
                    </p>
                  </div>
                </div>
              </div>

              {/* Destaques da Colaboração */}
              <div className="card-gamified bg-white border border-slate-200/60 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    ✨ Destaques da Colaboração
                  </h3>
                </div>
                
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  Reconhecimento do impacto coletivo e da evolução contínua da nossa equipe nesta campanha.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {/* AÇÕES VALIDADAS */}
                  <div className="p-3 bg-emerald-50/40 border border-emerald-100 rounded-2xl flex flex-col gap-1 transition-all hover:bg-emerald-50/80">
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase tracking-wider">Ações</span>
                    </div>
                    <span className="text-lg font-black text-slate-800 leading-none">86</span>
                    <span className="text-[9px] text-slate-500 font-bold">validadas</span>
                  </div>

                  {/* ELOGIOS RECEBIDOS */}
                  <div className="p-3 bg-purple-50/40 border border-purple-100 rounded-2xl flex flex-col gap-1 transition-all hover:bg-purple-50/80">
                    <div className="flex items-center gap-1.5 text-purple-700">
                      <Heart className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase tracking-wider">Elogios</span>
                    </div>
                    <span className="text-lg font-black text-slate-800 leading-none">128</span>
                    <span className="text-[9px] text-slate-500 font-bold">recebidos</span>
                  </div>

                  {/* MELHORIAS IMPLANTADAS */}
                  <div className="p-3 bg-amber-50/40 border border-amber-100 rounded-2xl flex flex-col gap-1 transition-all hover:bg-amber-50/80">
                    <div className="flex items-center gap-1.5 text-amber-700">
                      <Zap className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase tracking-wider">Melhorias</span>
                    </div>
                    <span className="text-lg font-black text-slate-800 leading-none">4</span>
                    <span className="text-[9px] text-slate-500 font-bold">implantadas</span>
                  </div>

                  {/* EVOLUÇÃO DA EQUIPE */}
                  <div className="p-3 bg-blue-50/40 border border-blue-100 rounded-2xl flex flex-col gap-1 transition-all hover:bg-blue-50/80">
                    <div className="flex items-center gap-1.5 text-blue-700">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase tracking-wider">Evolução</span>
                    </div>
                    <span className="text-lg font-black text-emerald-600 leading-none">+12%</span>
                    <span className="text-[9px] text-slate-500 font-bold">esta semana</span>
                  </div>
                </div>
              </div>

              {/* Classificação da Equipe */}
              <div className="card-gamified">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider">Classificação da Equipe</h3>
                </div>

                <div className="space-y-3">
                  {ranking.map((player, index) => {
                    const isMe = player.id === colaborador.id;
                    const rankNum = index + 1;
                    const badges = ["🥇", "🥈", "🥉"];
                    
                    return (
                      <div 
                        key={player.id} 
                        className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                          isMe ? 'bg-[#00673e]/5 border-[#00673e]/20' : 'bg-slate-50/50 border-slate-150 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-black w-4 text-center">{badges[index] || `#${rankNum}`}</span>
                          <img 
                            src={player.foto} 
                            alt={player.nome} 
                            className={`w-7 h-7 rounded-full object-cover border ${
                              isMe ? 'border-[#00673e]' : 'border-slate-200'
                            }`} 
                          />
                          <div className="truncate max-w-[100px]">
                            <span className={`text-[11px] font-black block truncate ${
                              isMe ? 'text-[#00673e]' : 'text-slate-700'
                            }`}>
                              {player.nome.split(" ")[0]} {player.nome.split(" ").slice(-1)[0]}
                            </span>
                            <span className="text-[8px] text-slate-400 block truncate">{player.cargo}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`text-[11px] font-black font-mono block ${
                            isMe ? 'text-[#00673e]' : 'text-[#ea580c]'
                          }`}>
                            {player.pontos} pts
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ================= TAB: RELACIONAMENTO ================= */}
      {activeTabNav === 'relacionamento' && (
        <div className="space-y-6 animate-slide-up">
          
          {/* Header Card */}
          <div className="relative overflow-hidden rounded-[32px] p-8 text-white hero-mesh-bg dot-pattern shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 border border-white/20">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Portal de Relacionamento & Indicações</h3>
                  <p className="text-xs text-green-100/90 mt-1 font-medium">
                    Gere conexões de valor, compartilhe seu link exclusivo e acompanhe a evolução de novos clientes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Link Copy & Culture */}
            <div className="lg:col-span-1 space-y-6">
              {/* Link Indique e Ganhe */}
              <div className="card-gamified relative overflow-hidden"
                   style={{ background: 'linear-gradient(135deg, rgba(0,103,62,0.04) 0%, white 100%)', borderColor: 'rgba(0,103,62,0.15)' }}>
                {showConfetti && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {confettiColors.map((color, i) => (
                      <div key={i} className="absolute w-2 h-2 rounded-sm"
                           style={{
                             background: color,
                             left: `${20 + i * 15}%`,
                             top: '40%',
                             animation: `confettiDrop 1s ${i * 0.1}s ease-in forwards`,
                           }} />
                    ))}
                  </div>
                )}
                
                <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider mb-4">Seu Link de Indicação</h3>
                
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-[10px] text-slate-600 font-bold truncate">
                    {refLink}
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`w-full py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                      copied 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md shadow-green-500/30' 
                        : 'btn-3d-green text-white'
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'COPIADO COM SUCESSO!' : 'COPIAR LINK EXCLUSIVO'}</span>
                  </button>
                  <p className="text-[10px] text-slate-650 font-semibold leading-relaxed">
                    Copie e envie para clientes em sua rede. Você ganha <span className="text-[#00673e] font-black">+15 pontos</span> no cadastro e <span className="text-[#ea580c] font-black">+30 pontos</span> na conversão da venda.
                  </p>
                </div>
              </div>

              {/* Relationship Culture */}
              <div className="card-gamified space-y-4">
                <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider">Cultura Moura Leite</h3>
                <div className="space-y-3.5 text-xs text-slate-600 font-medium leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <span className="text-lg">🤝</span>
                    <div>
                      <h4 className="font-black text-slate-700">Relacionamento Contínuo</h4>
                      <p className="text-[10px] text-slate-600 font-semibold">A evolução é sustentada pela confiança mútua e dedicação de longo prazo.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 border-t border-slate-100 pt-3">
                    <span className="text-lg">💚</span>
                    <div>
                      <h4 className="font-black text-slate-700">Reconhecimento e Valor</h4>
                      <p className="text-[10px] text-slate-600 font-semibold">Recompensar quem nos ajuda a transformar espaços em lares em Botucatu.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Tracking List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-gamified">
                <h3 className="text-sm font-black text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Users className="w-4.5 h-4.5 text-[#00673e]" /> Rastreamento de Indicações (Indique e Ganhe)
                </h3>
                
                {minhasIndicacoes.length === 0 ? (
                  <p className="text-xs text-slate-600 py-4 text-center font-semibold">Nenhuma indicação cadastrada através do seu link.</p>
                ) : (
                  <div className="space-y-3">
                    {minhasIndicacoes.map((ind) => (
                      <div key={ind.id} className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl flex justify-between items-center text-xs">
                        <div>
                          <h4 className="font-black text-slate-700">{ind.indicadoNome}</h4>
                          <p className="text-[10px] text-slate-600 font-semibold mt-0.5">Empreendimento: {ind.empreendimento}</p>
                          <p className="text-[9px] text-slate-500 font-semibold">Origem: Cliente {ind.clienteNome}</p>
                        </div>
                        <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${
                          ind.status === 'venda_convertida' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                            : 'bg-blue-50 text-blue-600 border-blue-200'
                        }`}>
                          {ind.status === 'venda_convertida' ? 'Venda Fechada (+30pts)' : 'Contato Ativo (+15pts)'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB: MISSÕES ================= */}
      {activeTabNav === 'missoes' && (
        <div className="space-y-6 animate-slide-up">
          
          {/* Header */}
          <div className="relative rounded-[32px] overflow-hidden border border-[#00673e]/15 p-6 shadow-sm bg-gradient-to-br from-white to-[#00673e]/2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#00673e]/10 border border-[#00673e]/20 text-[#00673e]">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">Direcionamento e Cultura</h3>
                  <p className="text-xs text-gray-700 font-semibold">Conheça o propósito, pilares e orientações que fortalecem nossa experiência e cultura.</p>
                </div>
              </div>

              {/* Botão Baixar Regulamento */}
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Regulamento da campanha baixado com sucesso!');
                }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-rose-100 bg-rose-50/30 hover:bg-rose-50/80 text-rose-800 transition-all shadow-sm group shrink-0"
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-rose-100 text-rose-600 group-hover:scale-105 transition-transform">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-black block tracking-tight">Baixar Regulamento</span>
                  <span className="text-[9px] font-semibold text-rose-600 block -mt-0.5">Regras e critérios da campanha</span>
                </div>
              </a>
            </div>
          </div>

          {/* Banner Hero: Propósito da Campanha + Indicadores */}
          <div className="relative rounded-[32px] overflow-hidden border border-[#00673e]/20 p-8 shadow-md bg-gradient-to-br from-[#00673e] to-[#004d2e] text-white">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
              <div className="lg:col-span-3 space-y-4">
                <span className="text-[10px] font-extrabold text-[#00ff88] uppercase tracking-widest bg-[#004d2e] px-3 py-1 rounded-full border border-emerald-500/30">
                  Propósito da Campanha
                </span>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Fortalecendo nossa cultura e o relacionamento com o cliente.
                </h2>
                <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed font-semibold">
                  A campanha valoriza as atitudes do dia a dia que expressam os valores da Moura Leite. Nosso foco é promover o trabalho em equipe, a agilidade com empatia e o encantamento genuíno de nossos clientes, conectando cada ação ao nosso propósito de transformar espaços em lares de verdade.
                </p>
              </div>
              
              {/* Mini Indicadores da Campanha Ativa */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-3.5 bg-[#004d2e] p-5 rounded-3xl border border-emerald-800 shadow-inner">
                <div className="p-3 bg-[#003d24] rounded-2xl border border-[#005c37] flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">👥</span>
                    <span className="text-[9px] font-black text-emerald-300 uppercase tracking-wider">Participantes</span>
                  </div>
                  <span className="text-lg font-black text-white font-mono leading-none">42 ativos</span>
                </div>
                
                <div className="p-3 bg-[#003d24] rounded-2xl border border-[#005c37] flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">⭐</span>
                    <span className="text-[9px] font-black text-emerald-300 uppercase tracking-wider">Elogios</span>
                  </div>
                  <span className="text-lg font-black text-white font-mono leading-none">128 rec.</span>
                </div>

                <div className="p-3 bg-[#003d24] rounded-2xl border border-[#005c37] flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">🚀</span>
                    <span className="text-[9px] font-black text-emerald-300 uppercase tracking-wider">Pontuação</span>
                  </div>
                  <span className="text-lg font-black text-white font-mono leading-none">2.450 pts</span>
                </div>

                <div className="p-3 bg-[#003d24] rounded-2xl border border-[#005c37] flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">💚</span>
                    <span className="text-[9px] font-black text-emerald-300 uppercase tracking-wider">Ações</span>
                  </div>
                  <span className="text-lg font-black text-white font-mono leading-none">86 val.</span>
                </div>
            </div>
          </div>
        </div>

        {/* Bloco: Sua Jornada na Campanha (Linha do Tempo Horizontal Conectada) */}
          <div className="card-gamified bg-white border border-slate-200/60 shadow-sm p-6 sm:p-8 relative overflow-hidden">
            <div className="mb-8">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Sua Jornada na Campanha
              </h3>
              <p className="text-xs text-gray-700 font-semibold mt-1">
                Entenda como suas atitudes geram reconhecimento, evolução e impacto na cultura Moura Leite.
              </p>
            </div>
            
            {/* Horizontal connected timeline */}
            <div className="relative">
              {/* Connecting line for desktop */}
              <div className="hidden lg:block absolute top-[48px] left-16 right-16 h-0.5 bg-gradient-to-r from-emerald-400 via-blue-400 via-amber-400 via-rose-400 to-purple-400 z-0"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                {[
                  { step: "01", title: "Realize uma ação", desc: "Pratique atitudes alinhadas aos pilares Encantar, Resolver ou Indicar.", emoji: "💚", iconBg: "bg-emerald-50 text-emerald-700 border-emerald-100", hoverStyles: "hover:border-emerald-300 hover:shadow-emerald-50/80" },
                  { step: "02", title: "Registre sua evidência", desc: "Compartilhe prints, feedbacks ou evidências da sua atuação.", emoji: "📎", iconBg: "bg-blue-50 text-blue-700 border-blue-100", hoverStyles: "hover:border-blue-300 hover:shadow-blue-50/80" },
                  { step: "03", title: "Liderança valida", desc: "A liderança realiza a análise conforme os critérios da campanha.", emoji: "âœ…", iconBg: "bg-amber-50 text-amber-800 border-amber-100", hoverStyles: "hover:border-amber-300 hover:shadow-amber-50/80" },
                  { step: "04", title: "Receba reconhecimento", desc: "Após validação, seus pontos são liberados automaticamente.", emoji: "🏆", iconBg: "bg-rose-50 text-rose-700 border-rose-100", hoverStyles: "hover:border-rose-300 hover:shadow-rose-50/80" },
                  { step: "05", title: "Evolua na campanha", desc: "Acompanhe sua evolução individual e contribua com os resultados da equipe.", emoji: "🚀", iconBg: "bg-purple-50 text-purple-700 border-purple-100", hoverStyles: "hover:border-purple-300 hover:shadow-purple-50/80" }
                ].map((s, idx) => (
                  <div key={idx} className={`p-5 bg-white border border-slate-200/80 rounded-3xl flex flex-col gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${s.hoverStyles}`}>
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border ${s.iconBg}`}>
                        {s.emoji}
                      </div>
                      <span className="text-[10px] font-black text-slate-500 font-mono">
                        Etapa {s.step}
                      </span>
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-slate-900 tracking-tight leading-snug">
                        {s.title}
                      </h5>
                      <p className="text-[10px] text-gray-700 font-semibold mt-1.5 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bloco Final da Jornada: Importante */}
            <div className="mt-8 p-6 bg-[#f0fdf4] border border-emerald-200 rounded-[24px] flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#00673e] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black text-[#00673e] uppercase tracking-wider flex items-center gap-1.5">
                  💡 IMPORTANTE
                </h4>
                <p className="text-xs text-gray-700 font-bold leading-relaxed">
                  A campanha reconhece atitudes alinhadas à cultura Moura Leite e validadas conforme os critérios institucionais.
                </p>
                <p className="text-[10px] text-[#00673e] font-semibold block italic mt-0.5">
                  "Cada interação positiva fortalece nossa experiência com o cliente."
                </p>
              </div>
            </div>
          </div>

          {/* Mensagem Motivacional 1 */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-3xl text-center shadow-sm">
            <p className="text-xs text-[#00673e] font-black italic">
              "Excelência é construída em cada atendimento."
            </p>
          </div>

          {/* Bloco: Propósito dos Pilares (Riqueza de Conteúdo) */}
          <div className="card-gamified bg-white border border-slate-200/60 shadow-sm p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Propósito dos Pilares
              </h3>
              <p className="text-xs text-slate-600 font-semibold mt-1">
                Os pilares fundamentais que guiam a excelência em nosso relacionamento e atitudes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* PILAR: ENCANTAR */}
              <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all flex flex-col justify-between gap-5 duration-300">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-lg">
                      💚
                    </div>
                    <div>
                      <span className="text-xs font-black text-emerald-950 uppercase tracking-wider block">Encantar</span>
                      <span className="text-[9px] font-semibold text-emerald-600 block -mt-0.5">Foco na Experiência</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3.5">
                    <div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Diretriz da Experiência</span>
                      <p className="text-[11px] text-emerald-900 font-black leading-snug mt-0.5">
                        "Transformar atendimento em experiência."
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Propósito Cultural</span>
                      <p className="text-xs text-gray-700 font-bold leading-relaxed mt-0.5">
                        Cada interação é uma oportunidade de surpreender positivamente o cliente e fortalecer sua conexão com a Moura Leite.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-emerald-200">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Impacto Esperado</span>
                  <p className="text-[10px] text-gray-700 font-bold mt-0.5">
                    Clientes promotores, feedbacks espontâneos e memórias positivas no atendimento.
                  </p>
                </div>
              </div>

              {/* PILAR: RESOLVER */}
              <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 hover:bg-amber-100 hover:border-amber-300 transition-all flex flex-col justify-between gap-5 duration-300">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 text-lg">
                      ⚡
                    </div>
                    <div>
                      <span className="text-xs font-black text-amber-950 uppercase tracking-wider block">Resolver</span>
                      <span className="text-[9px] font-semibold text-amber-600 block -mt-0.5">Foco na Solução</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3.5">
                    <div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Diretriz da Experiência</span>
                      <p className="text-[11px] text-amber-900 font-black leading-snug mt-0.5">
                        "Superar desafios com protagonismo."
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Propósito Cultural</span>
                      <p className="text-xs text-gray-700 font-bold leading-relaxed mt-0.5">
                        Resolver com empatia, agilidade e senso de dono transforma situações críticas em oportunidades de confiança.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-amber-200">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Impacto Esperado</span>
                  <p className="text-[10px] text-gray-700 font-bold mt-0.5">
                    Soluções ágeis, redução de distratos e fortalecimento da parceria no longo prazo.
                  </p>
                </div>
              </div>

              {/* PILAR: INDICAR */}
              <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 transition-all flex flex-col justify-between gap-5 duration-300">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-lg">
                      🚀
                    </div>
                    <div>
                      <span className="text-xs font-black text-indigo-950 uppercase tracking-wider block">Indicar</span>
                      <span className="text-[9px] font-semibold text-indigo-700 block -mt-0.5">Foco em Relacionamento</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3.5">
                    <div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Diretriz da Experiência</span>
                      <p className="text-[11px] text-indigo-900 font-black leading-snug mt-0.5">
                        "Multiplicar conexões de valor."
                      </p>
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Propósito Cultural</span>
                      <p className="text-xs text-gray-700 font-bold leading-relaxed mt-0.5">
                        Reconhecer que boas experiências geram novos relacionamentos e oportunidades para a Moura Leite.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-indigo-200">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Impacto Esperado</span>
                  <p className="text-[10px] text-gray-700 font-bold mt-0.5">
                    Novos contatos qualificados, indicação ativa e crescimento coletivo de vendas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= SEÇÃO: MISSÕES INDIVIDUAIS DA CAMPANHA ================= */}
          <div className="space-y-8">
            <div className="border-l-4 border-[#00673e] pl-4 py-1">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                Missões Individuais da Campanha
              </h3>
              <p className="text-xs text-gray-700 font-semibold mt-1">
                Ações reconhecidas individualmente através de atitudes que fortalecem a experiência do cliente e a cultura Moura Leite.
              </p>
            </div>

            {MISSOES_INDIVIDUAIS_INFO.map((pilarBlock) => (
              <div key={pilarBlock.pilar} className="space-y-4">
                {/* Pilar Header */}
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <span className="text-xl">
                    {pilarBlock.pilar === 'encantar' ? '💚' : pilarBlock.pilar === 'resolver' ? '⚡' : '🚀'}
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      {pilarBlock.pilarLabel}
                    </h4>
                    <p className="text-xs text-gray-600 font-bold italic">
                      "{pilarBlock.pilarSub}"
                    </p>
                  </div>
                </div>

                {/* Missions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pilarBlock.missoes.map((missao) => (
                    <div 
                      key={missao.id} 
                      className={`p-6 bg-white border border-slate-200/80 rounded-[24px] shadow-sm transition-all duration-300 ${pilarBlock.borderColor} hover:shadow-md flex flex-col justify-between space-y-5`}
                    >
                      {/* Upper Section */}
                      <div className="space-y-4">
                        {/* Title & Points Row */}
                        <div className="flex justify-between items-start gap-4">
                          <h5 className="text-sm font-black text-slate-900 leading-snug">
                            {missao.titulo}
                          </h5>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 ${
                            pilarBlock.pilar === 'encantar' 
                              ? 'bg-emerald-100 text-[#00673e] border border-emerald-200' 
                              : pilarBlock.pilar === 'resolver' 
                              ? 'bg-amber-100 text-amber-950 border border-amber-250' 
                              : 'bg-indigo-100 text-indigo-950 border border-indigo-250'
                          }`}>
                            +{missao.pontos} pontos
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div className="flex">
                          {missao.status === 'automatico' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              <span>⚙️</span>
                              <span>{missao.statusLabel} · {missao.validacaoLabel}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[9px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                              <span>📎</span>
                              <span>{missao.statusLabel} · {missao.validacaoLabel}</span>
                            </span>
                          )}
                        </div>

                        {/* Details Content */}
                        <div className="space-y-3">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">
                              Objetivo:
                            </span>
                            <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                              {missao.objetivo}
                            </p>
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">
                              Propósito da Ação:
                            </span>
                            <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                              {missao.proposito}
                            </p>
                          </div>

                          {missao.criterios && (
                            <div className="space-y-0.5">
                              <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">
                                Critérios:
                              </span>
                              <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                                {missao.criterios}
                              </p>
                            </div>
                          )}

                          {/* Evidências Aceitas */}
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">
                              Evidências Aceitas:
                            </span>
                            {missao.evidencias ? (
                              <div className="flex flex-wrap gap-1">
                                {missao.evidencias.map((ev, idx) => (
                                  <span 
                                    key={idx} 
                                    className="text-[9px] font-semibold bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg flex items-center gap-1"
                                  >
                                    <FileText className="w-3 h-3 text-slate-400" />
                                    {ev}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-semibold bg-blue-50/50 border border-blue-100 text-blue-700">
                                <CheckCircle2 className="w-3 h-3 text-blue-400" />
                                Validação automática (não requer envio de comprovante)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Impact Block at the bottom */}
                      <div className="pt-3 border-t border-slate-100 flex items-start gap-2">
                        <Award className="w-4 h-4 text-[#00673e] shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider block">
                            Impacto Cultural:
                          </span>
                          <p className="text-[10px] text-gray-700 font-bold leading-normal">
                            {missao.impacto}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem Motivacional 2 */}
          <div className="p-4 bg-amber-100 border border-amber-200 rounded-3xl text-center shadow-sm">
            <p className="text-xs text-amber-950 font-black italic">
              "O reconhecimento nasce das atitudes do dia a dia."
            </p>
          </div>

          {/* Bloco removido - movido para o topo sob o Hero */}

          {/* Mensagem Motivacional 3 */}
          <div className="p-4 bg-indigo-100 border border-indigo-200 rounded-3xl text-center shadow-sm">
            <p className="text-xs text-indigo-950 font-black italic">
              "Pequenas ações fortalecem grandes relacionamentos."
            </p>
          </div>

          {/* Bloco: Cultura Moura Leite (Roteiro e Alternância de Ritmo) */}
          <div className="relative rounded-[32px] overflow-hidden border border-emerald-200 p-8 shadow-sm bg-emerald-50/80 flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 text-2xl shrink-0">
              💚
            </div>
            <div className="space-y-2">
              <span className="text-[9px] font-black text-[#00673e] uppercase tracking-widest block">Cultura Moura Leite</span>
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                "Excelência é construída em cada detalhe do relacionamento com o cliente."
              </h3>
              <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                A campanha foi criada para fortalecer atitudes que geram impacto positivo na experiência do cliente e no crescimento da equipe.
              </p>
            </div>
          </div>

          {/* Sessão de Encerramento da Cultura */}
          <div className="flex flex-col items-center justify-center p-8 bg-emerald-50 border border-emerald-200 rounded-[32px] text-center space-y-3.5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00673e]/3 rounded-full blur-2xl pointer-events-none"></div>
            <div className="w-12 h-12 rounded-full bg-[#00673e]/10 flex items-center justify-center text-[#00673e] border border-[#00673e]/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="max-w-md space-y-2">
              <h4 className="text-sm font-black text-slate-900">Juntos Somos Mais Fortes</h4>
              <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                Toda atitude de colaboração e dedicação contribui para a experiência de nossos clientes e constrói o futuro da Moura Leite.
              </p>
            </div>
            
            {/* Mensagem Motivacional 4 */}
            <span className="text-[10px] font-black text-emerald-900 bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-full uppercase tracking-wider animate-pulse">
              "Sua evolução fortalece toda a equipe."
            </span>
          </div>
        </div>
      )}

      {/* ================= TAB: CONQUISTAS MEDALHAS ================= */}
      {activeTabNav === 'conquistas' && (
        <div className="space-y-6 animate-slide-up">
          
          {/* Header — Light Mode Premium */}
          <div className="rounded-[32px] p-6 border border-[#00673e]/15 shadow-sm"
               style={{ background: 'linear-gradient(135deg, rgba(0, 103, 62, 0.05) 0%, rgba(0, 168, 98, 0.02) 100%)' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#00673e]/10 border border-[#00673e]/20 shadow-sm">
                <Award className="w-7 h-7 text-[#00673e]" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800">Suas Medalhas de Relacionamento</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {colaborador.conquistas.length} conquista{colaborador.conquistas.length !== 1 ? 's' : ''} desbloqueada{colaborador.conquistas.length !== 1 ? 's' : ''} · Continue evoluindo!
                </p>
              </div>
            </div>
          </div>

          {/* Unlocked achievements */}
          {colaborador.conquistas.length > 0 && (
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">âœ¨ Desbloqueadas</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {colaborador.conquistas.map((conq, i) => (
                  <div key={conq.id} className={`card-achievement flex gap-5 items-center animate-scale-in`}
                       style={{ animationDelay: `${i * 0.1}s` }}>
                    {/* Medal */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center medal-container flex-shrink-0 ${
                      conq.raridade === 'Lendário' ? 'badge-legendary' 
                      : conq.raridade === 'Raro' ? 'badge-rare' 
                      : 'badge-common'
                    }`}>
                      <Sparkles className={`w-7 h-7 ${
                        conq.raridade === 'Lendário' ? 'text-amber-600' 
                        : conq.raridade === 'Raro' ? 'text-purple-600' 
                        : 'text-slate-500'
                      }`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-black text-slate-800">{conq.titulo}</h4>
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full text-white ${
                          conq.raridade === 'Lendário' ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                          : conq.raridade === 'Raro' ? 'bg-gradient-to-r from-purple-500 to-violet-600' 
                          : 'bg-slate-400'
                        }`}>
                          {conq.raridade}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium mt-1">{conq.descricao}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-[10px] text-green-600 font-bold">Desbloqueada</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked achievements */}
          <div>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">🔒 Próximas Conquistas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { titulo: 'Super Indicador', descricao: 'Indique 5 clientes que convertam em venda', raridade: 'Lendário', pts: 150 },
                { titulo: 'Sequência de Fogo', descricao: 'Mantenha 30 dias de ofensiva consecutivos', raridade: 'Raro', pts: 50 },
                { titulo: 'Cliente Fidelizado', descricao: 'Reverta 3 clientes detratores', raridade: 'Raro', pts: 30 },
                { titulo: 'Estrela do Mês', descricao: 'Alcance o 1º lugar no ranking mensal', raridade: 'Lendário', pts: 100 },
              ].map((locked, i) => (
                <div key={i} className="card-achievement flex gap-5 items-center opacity-60 animate-scale-in"
                     style={{ animationDelay: `${(colaborador.conquistas.length + i) * 0.1}s` }}>
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-black text-slate-500">{locked.titulo}</h4>
                      <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full text-white opacity-70 ${
                        locked.raridade === 'Lendário' ? 'bg-amber-400' : 'bg-purple-400'
                      }`}>
                        {locked.raridade}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">{locked.descricao}</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[10px] text-amber-500 font-bold">+{locked.pts} pts ao desbloquear</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB: RECOMPENSAS CATALOG ================= */}
      {activeTabNav === 'premios' && (
        <div className="space-y-6 animate-slide-up">
          
          {/* Header */}
          <div className="card-gamified"
               style={{ background: 'linear-gradient(135deg, rgba(234,88,12,0.06) 0%, white 60%)', borderColor: 'rgba(234,88,12,0.12)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                     style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 6px 16px rgba(234,88,12,0.3)' }}>
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">Catálogo de Prêmios Moura Leite</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Resgate vouchers usando suas moedas acumuladas</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl"
                   style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.08))', border: '1.5px solid rgba(245,158,11,0.3)' }}>
                <Coins className="w-4 h-4 text-amber-500" />
                <span className="font-black text-amber-600 font-mono">{colaborador.moedas} moedas</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Voucher iFood', subtitle: 'R$ 90', desc: 'Prêmio individual de alimentação', cost: 150, color: 'from-red-400 to-rose-600', shadow: 'rgba(239,68,68,0.3)', icon: Gift },
              { title: 'Voucher Beleza', subtitle: 'R$ 90', desc: 'Cuidados pessoais e bem-estar', cost: 150, color: 'from-indigo-400 to-violet-600', shadow: 'rgba(99,102,241,0.3)', icon: Sparkles },
              { title: 'Cinema Duplo', subtitle: '+ Pipoca', desc: 'Par de ingressos de cinema', cost: 150, color: 'from-purple-400 to-fuchsia-600', shadow: 'rgba(168,85,247,0.3)', icon: Star },
            ].map((prize, i) => {
              const Icon = prize.icon;
              const canRedeem = colaborador.moedas >= prize.cost;
              return (
                <div key={i} className="card-gamified flex flex-col items-center text-center gap-4 animate-scale-in"
                     style={{ animationDelay: `${i * 0.1}s` }}>
                  {/* Icon */}
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center bg-gradient-to-br ${prize.color}`}
                         style={{ boxShadow: `0 12px 32px ${prize.shadow}` }}>
                      <Icon className="w-9 h-9 text-white" />
                    </div>
                    {canRedeem && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm animate-pulse">
                        DISPONÍVEL
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-800">{prize.title}</h4>
                    <p className="text-base font-black text-slate-400 mt-0.5">{prize.subtitle}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{prize.desc}</p>
                  </div>

                  {/* Cost */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                       style={{ background: 'rgba(234,88,12,0.08)', border: '1px solid rgba(234,88,12,0.15)' }}>
                    <Coins className="w-4 h-4 text-[#ea580c]" />
                    <span className="font-black text-[#ea580c] font-mono">{prize.cost} moedas</span>
                  </div>

                  {/* Progress toward cost */}
                  {!canRedeem && (
                    <div className="w-full space-y-1">
                      <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                        <span>{colaborador.moedas}/{prize.cost}</span>
                        <span>Faltam {prize.cost - colaborador.moedas}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                             style={{ width: `${(colaborador.moedas / prize.cost) * 100}%` }} />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (!canRedeem) {
                        alert(`Saldo insuficiente. Você tem ${colaborador.moedas} de ${prize.cost} moedas necessárias.`);
                      } else {
                        alert(`Resgate solicitado! O ${prize.title} será enviado ao seu e-mail corporativo.`);
                      }
                    }}
                    className={`w-full text-[10px] font-black py-2.5 rounded-xl mt-auto uppercase tracking-wider transition-all ${
                      canRedeem ? 'btn-3d-orange text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    }`}
                  >
                    {canRedeem ? 'Resgatar Agora 🎁' : 'Moedas Insuficientes'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB: ACADEMIA MOURA LEITE ================= */}
      {activeTabNav === 'academia' && (
        <div className="space-y-6 animate-slide-up">
          
          {/* Hero Banner Motivacional */}
          <div className="relative rounded-[32px] overflow-hidden p-8 md:p-10 text-white bg-gradient-to-br from-[#004d2e] via-[#00673e] to-[#003620] shadow-md border border-[#00673e]/10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800')] opacity-10 bg-cover bg-center pointer-events-none"></div>
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="bg-[#f59e0b] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                🎓 ACADEMIA MOURA LEITE
              </span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
                Conhecimento que Transforma e Gera Evolução
              </h2>
              <p className="text-emerald-100 text-xs md:text-sm font-medium max-w-md leading-relaxed">
                Desenvolva suas habilidades, conclua as trilhas de aprendizado e impulsione sua carreira na Moura Leite.
              </p>
            </div>
          </div>

          {/* Active study module box (if any is active) */}
          {cursoAtivo && (
            <div className="card-gamified border-2 border-[#00673e]/30 bg-gradient-to-r from-emerald-50/20 to-white relative animate-slide-up">
              <button 
                onClick={() => setCursoAtivo(null)} 
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 font-black text-[10px] uppercase tracking-wider"
              >
                Fechar Aula ✕
              </button>
              <div className="space-y-4 max-w-xl">
                <span className="text-[9px] font-black text-[#00673e] uppercase bg-[#00673e]/10 px-2 py-0.5 rounded border border-[#00673e]/20">
                  Trilha: {cursoAtivo.categoria}
                </span>
                <h3 className="text-sm font-black text-slate-800">{cursoAtivo.titulo}</h3>
                
                {/* Course progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-500">Progresso nesta aula</span>
                    <span className="text-[#00673e] font-mono">{cursoAtivo.progresso}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/55">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-[#00673e] transition-all duration-500" 
                      style={{ width: `${cursoAtivo.progresso}%` }} 
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-550 leading-relaxed font-medium">
                  {cursoAtivo.progresso === 0 ? (
                    "Boas-vindas a este módulo de aprendizado! Nesta aula, vamos introduzir os conceitos fundamentais do tema e entender como a Moura Leite aplica estes princípios no dia a dia do desenvolvimento urbano de Botucatu."
                  ) : cursoAtivo.progresso < 100 ? (
                    "Excelente evolução! Nesta etapa do conteúdo, focamos em estudos de caso reais de sucesso da Moura Leite, analisando como o engajamento e a excelência no relacionamento trazem resultados sólidos para o time e clientes."
                  ) : (
                    "Parabéns! Você concluiu todos os conteúdos teóricos deste treinamento. Seu certificado digital já está disponível e seus pontos foram adicionados à sua pontuação total!"
                  )}
                </p>

                {cursoAtivo.status !== "concluido" ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => {
                        const colId = colaborador.id;
                        onProgredirCurso(colId, cursoAtivo.id, 25);
                        setCursoAtivo(prev => {
                          const newProgress = Math.min(100, prev.progresso + 25);
                          return {
                            ...prev,
                            progresso: newProgress,
                            status: newProgress >= 100 ? "concluido" : "em_andamento"
                          };
                        });
                      }}
                      className="btn-3d-green text-white text-[10px] font-black px-4 py-2.5 rounded-xl uppercase tracking-wider"
                    >
                      📖 Estudar Próxima Aula (+25%)
                    </button>
                    <button
                      onClick={() => {
                        const colId = colaborador.id;
                        onProgredirCurso(colId, cursoAtivo.id, 100 - cursoAtivo.progresso);
                        setCursoAtivo(prev => ({
                          ...prev,
                          progresso: 100,
                          status: "concluido"
                        }));
                      }}
                      className="border border-[#00673e] hover:bg-[#00673e]/5 text-[#00673e] text-[10px] font-black px-4 py-2.5 rounded-xl uppercase tracking-wider"
                    >
                      ⚡ Concluir Curso (+{100 - cursoAtivo.progresso}%)
                    </button>
                  </div>
                ) : (
                  <div className="pt-1 flex items-center gap-3">
                    <div className="text-xs font-black text-green-600 flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Curso concluído! +{cursoAtivo.xp} pontos adicionados.
                    </div>
                    <button
                      onClick={() => setCursoAtivo(null)}
                      className="text-xs text-slate-400 hover:text-slate-650 hover:underline font-bold"
                    >
                      Voltar à lista de cursos
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Progress stats and certificates grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Overall learning progress */}
            <div className="card-gamified flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Seu Progresso</h3>
                <div className="flex items-center gap-4">
                  {/* Circular gauge */}
                  <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-150" strokeWidth="3.5" stroke="currentColor" fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-[#00673e]" strokeWidth="3.5" strokeDasharray={`${Math.round(((colaborador.academia?.cursos?.filter(c => c.status === 'concluido').length || 0) / (colaborador.academia?.cursos?.length || 1)) * 100)}, 100`} strokeLinecap="round" fill="none" stroke="currentColor"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="absolute text-sm font-black text-slate-800">
                      {Math.round(((colaborador.academia?.cursos?.filter(c => c.status === 'concluido').length || 0) / (colaborador.academia?.cursos?.length || 1)) * 100)}%
                    </span>
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-800">
                      {colaborador.academia?.cursos?.filter(c => c.status === 'concluido').length || 0} de {colaborador.academia?.cursos?.length || 0}
                    </div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Treinamentos Completados</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-100 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-semibold block">Horas de Estudo</span>
                  <span className="text-sm font-black text-slate-700 font-mono">
                    {colaborador.academia?.cursos?.reduce((acc, curr) => acc + (curr.status === 'concluido' ? curr.horas : (curr.progresso / 100) * curr.horas), 0).toFixed(1)}h
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-semibold block">Pontos Conquistados</span>
                  <span className="text-sm font-black text-[#ea580c] font-mono">
                    +{colaborador.academia?.cursos?.filter(c => c.status === 'concluido').reduce((acc, curr) => acc + curr.xp, 0)} pontos
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Unlocked Certificates */}
            <div className="card-gamified lg:col-span-2 flex flex-col justify-between">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                Certificados Digitais ({colaborador.academia?.certificados?.length || 0})
              </h3>
              
              {(!colaborador.academia?.certificados || colaborador.academia.certificados.length === 0) ? (
                <div className="flex-grow flex flex-col items-center justify-center py-4 text-center text-slate-500 text-xs font-medium">
                  <Lock className="w-8 h-8 text-slate-350 mb-2" />
                  Conclua cursos para desbloquear seus certificados.
                </div>
              ) : (
                <div className="flex-grow overflow-x-auto scrollbar-none flex gap-4 pb-1 pt-1">
                  {colaborador.academia.certificados.map((cert) => (
                    <div key={cert.id} className="w-48 shrink-0 bg-gradient-to-br from-emerald-50/20 via-white to-[#00673e]/5 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm relative hover:scale-[1.02] transition-transform">
                      <div className="absolute top-3 right-3 text-amber-500 text-sm">📜</div>
                      <div>
                        <span className="text-[8px] font-black text-[#00673e] uppercase tracking-wider block mb-1">MOURA LEITE</span>
                        <h4 className="text-[10px] font-black text-slate-700 leading-tight line-clamp-2">{cert.titulo}</h4>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[8px] text-slate-500 font-semibold">
                        <span>Concluído: {cert.data}</span>
                        <span className="bg-[#00673e]/10 text-[#00673e] font-black px-1.5 py-0.5 rounded">{cert.horas}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Learning Trails (Trilhas de Aprendizagem) */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Trilhas de Aprendizado</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { titulo: "Trilha Cultura & Valores", cat: "Cultura", medalha: "Expert em Cultura", icon: "🤝" },
                { titulo: "Trilha Técnicas de Vendas", cat: "Vendas", medalha: "Expert em Vendas", icon: "🎯" },
                { titulo: "Trilha Processos & Segurança", cat: "Processos", medalha: "Expert em Processos", icon: "🛡️" }
              ].map((trilha, idx) => {
                const cursosTrilha = colaborador.academia?.cursos?.filter(c => c.categoria === trilha.cat) || [];
                const concluidosTrilha = cursosTrilha.filter(c => c.status === 'concluido').length;
                const percentual = cursosTrilha.length > 0 ? Math.round((concluidosTrilha / cursosTrilha.length) * 100) : 0;
                const badgeJaTem = colaborador.conquistas?.some(c => c.titulo === `Expert em ${trilha.cat}`);

                return (
                  <div key={idx} className="card-gamified flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-2xl">{trilha.icon}</span>
                        <span className={`text-[8px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                          badgeJaTem 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                            : 'bg-slate-50 text-slate-400 border-slate-200'
                        }`}>
                          {badgeJaTem ? '🏅 Medalha Desbloqueada' : '🏅 Medalha Bloqueada'}
                        </span>
                      </div>
                      <h4 className="text-xs font-black text-slate-800 mt-1">{trilha.titulo}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                        Desbloqueia: <span className="text-[#ea580c] font-bold">Medalha {trilha.medalha}</span> (+50 pontos)
                      </p>
                    </div>

                    <div className="mt-6 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-400">{concluidosTrilha} de {cursosTrilha.length} concluídos</span>
                        <span className="text-[#00673e] font-mono">{percentual}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#00673e]"
                             style={{ width: `${percentual}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Treinamentos Recomendados</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(colaborador.academia?.cursos || []).map((curso) => {
                const isConcluido = curso.status === "concluido";
                
                return (
                  <div key={curso.id} className="card-gamified flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                          curso.categoria === 'Cultura' ? 'bg-emerald-50 text-emerald-600 border border-emerald-150'
                          : curso.categoria === 'Vendas' ? 'bg-indigo-50 text-indigo-600 border border-indigo-150'
                          : 'bg-amber-50 text-amber-600 border border-amber-150'
                        }`}>
                          {curso.categoria}
                        </span>
                        <span className="text-[10px] font-black text-[#ea580c] font-mono">+{curso.xp} pontos</span>
                      </div>
                      <h4 className="text-xs font-black text-slate-700 leading-tight">{curso.titulo}</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{curso.horas} horas de conteúdo</p>
                    </div>

                    <div className="space-y-3 mt-auto">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold">
                          <span className="text-slate-500">{isConcluido ? "Concluído" : "Progresso"}</span>
                          <span className="text-slate-650 font-mono">{curso.progresso}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-[#00673e]" 
                               style={{ width: `${curso.progresso}%` }} />
                        </div>
                      </div>

                      {isConcluido ? (
                        <div className="w-full bg-slate-50 border border-slate-200 text-slate-500 font-black text-[9px] py-2.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-1">
                          <Check className="w-3.5 h-3.5 text-slate-500 animate-bounce" />
                          <span>Concluído</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setCursoAtivo(curso)}
                          className={`w-full text-[9px] font-black py-2.5 rounded-xl uppercase tracking-wider transition-all ${
                            curso.progresso > 0 
                              ? 'btn-3d-green text-white' 
                              : 'border border-[#00673e] hover:bg-[#00673e]/5 text-[#00673e] bg-white'
                          }`}
                        >
                          {curso.progresso > 0 ? "Continuar Estudo 📖" : "Iniciar Treinamento 🚀"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Inline Leaf Icon for Moura Leite branding
function LeafIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
      <path d="M9 22v-4h-4" />
    </svg>
  );
}
