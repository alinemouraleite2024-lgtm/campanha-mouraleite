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
        validacaoLabel: 'Aprovação manual da liderança',
        prazo: 'Fluxo Contínuo'
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
        validacaoLabel: 'Validação sistêmica',
        prazo: 'Mensal'
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
        validacaoLabel: 'Aprovação manual',
        prazo: 'Fluxo Contínuo'
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
        validacaoLabel: 'Aprovação manual',
        prazo: 'Fluxo Contínuo'
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
        validacaoLabel: 'Integração sistêmica via programa Indique & Ganhe',
        prazo: 'Fluxo Contínuo'
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
        validacaoLabel: 'Confirmação comercial',
        prazo: 'Fluxo Contínuo'
      }
    ]
  }
];


const PILARES_ESTRATEGICOS_INFO = [
  {
    id: 'encantar',
    titulo: 'Pilar Encantar',
    icon: Heart,
    descricao: 'Criar experiências positivas e memoráveis, entregando mais do que uma solução: percepção de cuidado, atenção e excelência.',
    missoes: [
      {
        id: 'elogio',
        titulo: 'Elogio Espontâneo do Cliente',
        descricaoCurta: 'Reconhecimento recebido diretamente do cliente pelo atendimento prestado.',
        pontos: 15,
        objetivo: 'Reconhecer atendimentos elogiados espontaneamente pelos clientes nos canais oficiais.',
        comoFunciona: 'Colaborador recebe feedback positivo direto do cliente (e-mail, WhatsApp, redes sociais) e compartilha.',
        criterio: 'Anexo legível contendo o elogio, identificação do cliente e o nome do colaborador.',
        aprovador: 'Gestão direta / Coordenação de relacionamento.',
        quando: 'Fluxo contínuo.',
        observacoes: 'O elogio deve ser espontâneo, sem indução direta ao cliente.'
      },
      {
        id: 'monitoria',
        titulo: 'Excelência na Monitoria',
        descricaoCurta: 'Destaque obtido através da qualidade e excelência no atendimento.',
        pontos: 10,
        objetivo: 'Garantir a conformidade dos procedimentos operacionais e de atendimento.',
        comoFunciona: 'Avaliação periódica realizada pela equipe de auditoria e qualidade Moura Leite.',
        criterio: 'Nota igual ou superior a 98% no fechamento do ciclo.',
        aprovador: 'Validação sistêmica automática.',
        quando: 'Apuração mensal.',
        observacoes: 'Resultados consolidados no fechamento de cada período.'
      },
      {
        id: 'csat_equipe',
        titulo: 'CSAT da Equipe',
        descricaoCurta: 'Qualidade coletiva baseada na satisfação do cliente pós-atendimento.',
        pontos: 10,
        objetivo: 'Manter o índice de satisfação do cliente coletivo acima da meta corporativa.',
        comoFunciona: 'Média das avaliações de satisfação enviadas aos clientes pós-atendimento.',
        criterio: 'CSAT consolidado da equipe igual ou superior a 95.0%.',
        aprovador: 'Validação automática via sistema de pesquisa Moura Leite.',
        quando: 'Fechamento trimestral.',
        observacoes: 'Reflete o esforço conjunto e a qualidade coletiva do atendimento.'
      }
    ]
  },
  {
    id: 'resolver',
    titulo: 'Pilar Resolver',
    icon: Target,
    descricao: 'Valorizar a capacidade de solucionar situações com agilidade, empatia e senso de dono.',
    missoes: [
      {
        id: 'reversao_insatisfeito',
        titulo: 'Reversão de Cliente Insatisfeito',
        descricaoCurta: 'Transformar uma situação crítica em uma experiência positiva.',
        pontos: 10,
        objetivo: 'Recuperar o relacionamento e converter insatisfações em experiências de valor.',
        comoFunciona: 'Atuação direta em casos de insatisfação crítica ou reclamações de clientes.',
        criterio: 'Histórico do caso comprovando a solução definitiva e feedback de satisfação do cliente.',
        aprovador: 'Coordenação de Relacionamento.',
        quando: 'Fluxo contínuo.',
        observacoes: 'Exige detalhamento da tratativa e agilidade no contato.'
      },
      {
        id: 'reversao_distrato',
        titulo: 'Reversão de Distrato',
        descricaoCurta: 'Reter a parceria e restabelecer o relacionamento comercial.',
        pontos: 10,
        objetivo: 'Reter o cliente e reverter intenções de cancelamento contratual.',
        comoFunciona: 'Negociação estratégica e acolhimento que evitam a perda da parceria ou contrato.',
        criterio: 'Assinatura do termo de manutenção ou e-mail de retratação formal.',
        aprovador: 'Gerência de Relacionamento.',
        quando: 'Fluxo contínuo.',
        observacoes: 'Negociação conduzida com base nas diretrizes financeiras e de produto.'
      },
      {
        id: 'melhoria_implantada',
        titulo: 'Sugestão de Melhoria Implantada',
        descricaoCurta: 'Protagonismo e inovação aplicados na melhoria de rotinas.',
        pontos: 20,
        objetivo: 'Estimular a inovação interna e a otimização de fluxos com foco no cliente.',
        comoFunciona: 'Envio de sugestões de melhoria em processos que venham a ser efetivamente implantadas.',
        criterio: 'Homologação e implantação da melhoria comprovada pela liderança.',
        aprovador: 'Comitê de Qualidade e Processos Moura Leite.',
        quando: 'Sob demanda / Fluxo mensal.',
        observacoes: 'A melhoria deve gerar impacto prático e mensurável na rotina ou no cliente.'
      },
      {
        id: 'cadastro_fluxos',
        titulo: 'Cadastro de Fluxos',
        descricaoCurta: 'Mapeamento e padronização para ganho de eficiência operacional.',
        pontos: 10,
        objetivo: 'Mapear e padronizar procedimentos operacionais para aumentar a eficiência.',
        comoFunciona: 'Formalização de novos fluxos de atendimento em guias estruturados.',
        criterio: 'Fluxo mapeado no padrão corporativo e aprovado para publicação interna.',
        aprovador: 'Coordenação de Processos.',
        quando: 'Conforme necessidade da área.',
        observacoes: 'Contribui para o alinhamento da equipe e onboarding de novos colaboradores.'
      }
    ]
  },
  {
    id: 'indicar',
    titulo: 'Pilar Indicar',
    icon: Users,
    descricao: 'Reconhecer ações que contribuem para geração de oportunidades e fortalecimento da marca.',
    missoes: [
      {
        id: 'cadastro_indicacao',
        titulo: 'Cadastro de Indicação',
        descricaoCurta: 'Conectar novas oportunidades ao crescimento da Moura Leite.',
        pontos: 15,
        objetivo: 'Trazer novas oportunidades de vendas através do link exclusivo do colaborador.',
        comoFunciona: 'O colaborador compartilha o seu link do programa Indique & Ganhe com sua rede de contatos.',
        criterio: 'Cadastro da indicação completado e validado no sistema básico.',
        aprovador: 'Integração sistêmica via CRM comercial.',
        quando: 'Fluxo contínuo.',
        observacoes: 'Os contatos passam por triagem comercial básica de duplicidade.'
      },
      {
        id: 'conversao_venda',
        titulo: 'Conversão de Indicação em Venda',
        descricaoCurta: 'Resultado comercial gerado a partir de conexões de valor.',
        pontos: 30,
        objetivo: 'Concretizar negócios gerados a partir de indicações de colaboradores.',
        comoFunciona: 'Equipe comercial converte a indicação qualificada em venda real de lote ou empreendimento.',
        criterio: 'Assinatura do contrato de compra e venda pelo cliente indicado.',
        aprovador: 'Sistema ERP / Diretoria Comercial.',
        quando: 'Sob fechamento de negócio.',
        observacoes: 'Recompensa máxima pelo impacto no crescimento da empresa.'
      }
    ]
  }
];

function MissionAccordion({ missao, isOpen, onToggle }) {
  return (
    <div className="border border-slate-150 rounded-2xl overflow-hidden bg-white hover:border-slate-300 transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-slate-800 hover:bg-slate-50/50 transition-colors select-none"
      >
        <div className="flex items-start gap-3">
          <span className={`transform transition-transform duration-300 text-slate-400 text-[10px] mt-1 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
            ▶
          </span>
          <div>
            <span className="text-[12px] font-extrabold tracking-tight text-slate-800 block">{missao.titulo}</span>
            {missao.descricaoCurta && (
              <span className="text-[10px] font-normal text-slate-500 block mt-0.5">{missao.descricaoCurta}</span>
            )}
          </div>
        </div>
      </button>
      
      {/* Expandable content with height transition */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100 border-t border-slate-100/60' : 'max-h-0 opacity-0'}`}>
        <div className="p-5 bg-slate-50/30 text-xs text-slate-600 space-y-4 font-medium leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Objetivo</span>
              <p className="text-[11px] text-slate-700 font-semibold">{missao.objetivo}</p>
            </div>
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Como funciona</span>
              <p className="text-[11px] text-slate-700 font-semibold">{missao.comoFunciona}</p>
            </div>
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Critério de Validação</span>
              <p className="text-[11px] text-slate-700 font-semibold">{missao.criterio}</p>
            </div>
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Quem aprova</span>
              <p className="text-[11px] text-slate-700 font-semibold">{missao.aprovador}</p>
            </div>
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Quando é aplicado</span>
              <p className="text-[11px] text-slate-700 font-semibold">{missao.quando}</p>
            </div>
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Observações importantes</span>
              <p className="text-[11px] text-slate-700 font-semibold">{missao.observacoes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StrategicPillarCard({ pilar, activeMissionId, onToggleMission }) {
  const IconComponent = pilar.icon;
  const pilarColorClasses = {
    encantar: {
      bg: 'bg-emerald-50/20 border-emerald-500/10 hover:border-emerald-500/20',
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      accentText: 'text-emerald-800'
    },
    resolver: {
      bg: 'bg-amber-50/15 border-amber-500/10 hover:border-amber-500/20',
      iconBg: 'bg-amber-50 text-amber-850 border-amber-100',
      accentText: 'text-amber-850'
    },
    indicar: {
      bg: 'bg-indigo-50/10 border-indigo-500/10 hover:border-indigo-500/20',
      iconBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      accentText: 'text-indigo-800'
    }
  };

  const classes = pilarColorClasses[pilar.id] || pilarColorClasses.encantar;

  return (
    <div className={`p-6 sm:p-8 rounded-[32px] border bg-white shadow-sm transition-all duration-300 flex flex-col gap-6 ${classes.bg}`}>
      {/* Pillar header */}
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-xs border ${classes.iconBg} shrink-0`}>
          <IconComponent className="w-5.5 h-5.5" />
        </div>
        <div className="space-y-1">
          <h4 className={`text-sm font-black uppercase tracking-wider ${classes.accentText}`}>{pilar.titulo}</h4>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">{pilar.descricao}</p>
        </div>
      </div>

      {/* Accordion list */}
      <div className="space-y-2.5">
        {pilar.missoes.map((missao) => (
          <MissionAccordion
            key={missao.id}
            missao={missao}
            isOpen={activeMissionId === missao.id}
            onToggle={() => onToggleMission(missao.id)}
          />
        ))}
      </div>
    </div>
  );
}

function CollectiveGoalsSection() {
  const [expandedGoalIdx, setExpandedGoalIdx] = useState(null);

  const collectiveItems = [
    {
      titulo: 'Meta de CSAT da Equipe',
      descricao: 'Manter a média do índice de satisfação do cliente da Moura Leite em nível de excelência.',
      impacto: 'Fidelização qualificada e satisfação contínua nas pesquisas transacionais.',
      importancia: 'Reflete a consistência da qualidade do atendimento de toda a equipe no dia a dia.',
      emoji: '💚'
    },
    {
      titulo: 'Meta de NPS (Net Promoter Score)',
      descricao: 'Alcançar e consolidar a zona de excelência na apuração do NPS institucional.',
      impacto: 'Indicação espontânea e fortalecimento do prestígio da marca no mercado.',
      importancia: 'É a nossa métrica definitiva sobre a recomendação genuína do cliente.',
      emoji: '🏆'
    },
    {
      titulo: 'Implantação de Melhorias',
      descricao: 'Colocar em prática fluxos inovadores sugeridos pelos próprios colaboradores.',
      impacto: 'Otimização operacional, eliminação de retrabalhos e processos mais eficientes.',
      importancia: 'Valoriza o protagonismo de quem vivencia os processos diariamente.',
      emoji: '⚙️'
    },
    {
      titulo: 'Objetivos Operacionais',
      descricao: 'Cumprimento das metas de tempo de resposta e resolutividade da área.',
      impacto: 'Redução do esforço do cliente e agilidade no esclarecimento de dúvidas.',
      importancia: 'Garante estabilidade e agilidade na prestação de serviço corporativo.',
      emoji: '⚡'
    },
    {
      titulo: 'Evolução Coletiva da Equipe',
      descricao: 'Engajamento e progresso conjunto no programa Atitude Valor.',
      impacto: 'Time alinhado, capacitado e em constante desenvolvimento profissional.',
      importancia: 'Reforça que a nossa força reside na colaboração e não na competição individual.',
      emoji: '👥'
    }
  ];

  const handleToggleGoal = (idx) => {
    setExpandedGoalIdx(expandedGoalIdx === idx ? null : idx);
  };

  return (
    <div className="card-gamified bg-white border border-slate-200/60 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <span>👥</span> Metas Coletivas
        </h3>
        <p className="text-xs text-slate-500 font-semibold mt-1">
          Apresentar as metas compartilhadas da equipe de forma mais institucional e colaborativa.
        </p>
      </div>

      <div className="space-y-2.5">
        {collectiveItems.map((item, idx) => {
          const isOpen = expandedGoalIdx === idx;
          return (
            <div key={idx} className="border border-slate-150 rounded-2xl overflow-hidden bg-white hover:border-slate-350 transition-all duration-300">
              <button
                onClick={() => handleToggleGoal(idx)}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-xs text-slate-800 hover:bg-slate-50/50 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <span className={`transform transition-transform duration-300 text-slate-400 text-[10px] ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                    ▶
                  </span>
                  <span className="text-lg select-none">{item.emoji}</span>
                  <span className="text-[12px] font-extrabold tracking-tight text-slate-800">{item.titulo}</span>
                </div>
              </button>
              
              {/* Expandable content with height transition */}
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[300px] opacity-100 border-t border-slate-100/60' : 'max-h-0 opacity-0'}`}>
                <div className="p-5 bg-slate-50/30 text-xs text-slate-600 space-y-4 font-medium leading-relaxed">
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Descrição</span>
                    <p className="text-[11px] text-slate-700 font-semibold">{item.descricao}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3.5 border-t border-slate-200/60">
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Impacto esperado</span>
                      <p className="text-[11px] text-slate-700 font-semibold">{item.impacto}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-slate-450 uppercase tracking-widest block mb-0.5">Importância para o time</span>
                      <p className="text-[11px] text-slate-700 font-semibold">{item.importancia}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}




export default function ColaboradorPortal({ 
  colaborador, 
  colaboradores, 
  indicacoes, 
  evidencias, 
  notificacoes, 
  onEnviarEvidencia, 
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
  
  const mensagensColetivas = getData("mensagens_coletivas") || [];
  const orientacoesIndividuais = (getData("orientacoes_individuais") || []).filter(oi => oi.colaboradorId === colaborador.id);

  // Sorting for leaderboard
  const ranking = [...colaboradores].sort((a, b) => b.pontos - a.pontos);

  return (
    <div className="space-y-6">
      {/* ================= TAB: INÍCIO (PAINEL INSTITUCIONAL) ================= */}
      {activeTabNav === 'inicio' && (
        <div className="space-y-6 animate-slide-up">
          
          {/* 1. HERO PRINCIPAL (Boas-vindas - Atitude Valor) */}
          <div className="relative rounded-[32px] overflow-hidden border border-[#00673e]/15 p-8 md:p-10 shadow-sm bg-gradient-to-br from-[#004d2e] via-[#00331f] to-[#001c11] text-white">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                 style={{ background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)' }} />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              {/* Left: Avatar + greeting */}
              <div className="flex items-center gap-5 flex-shrink-0">
                <div className="w-20 h-20 rounded-full border-2 border-[#00ff88]/30 overflow-hidden shadow-sm flex-shrink-0">
                  <img src={colaborador.foto} alt={colaborador.nome} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[#00ff88] text-[9.5px] font-black uppercase tracking-widest flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#00ff88] animate-pulse" /> ATITUDE VALOR
                  </span>
                  <h2 className="text-2xl font-black tracking-tight leading-tight">
                    Olá, {colaborador.nome.split(" ")[0]}! 👋
                  </h2>
                  <p className="text-emerald-100 text-xs mt-1.5 font-bold leading-relaxed">
                    Cultura de relacionamento e valorização Moura Leite.
                  </p>
                  <p className="text-slate-350 text-[10.5px] mt-1 font-semibold">
                    Seu espaço para celebrar conexões, aprendizado e reconhecimentos.
                  </p>
                </div>
              </div>

              {/* Right: Points summary */}
              <div className="flex-grow max-w-sm space-y-1 md:pl-6 md:border-l border-white/10">
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-wider block">Pontos Acumulados</span>
                <span className="text-3xl font-black text-[#00ff88] font-mono block leading-none">{colaborador.pontos} pts</span>
                <span className="text-[9.5px] text-slate-400 font-bold block mt-1">Reconhecimento contínuo de resultados</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: News, Culture, Announcements */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* CULTURA & INSIGHTS (Notícias, Compartilhamento, Insights) */}
              <div className="card-gamified space-y-5 p-6">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Heart className="w-4.5 h-4.5 text-[#00673e]" />
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Cultura & Compartilhamento</h3>
                </div>
                
                <div className="space-y-4">
                  {/* Notícia 1 */}
                  <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col sm:flex-row gap-4 items-start hover:bg-slate-100/50 transition-all">
                    <span className="text-2xl p-2.5 bg-white border border-slate-150 rounded-xl select-none">🌱</span>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-emerald-700 uppercase tracking-wider block">Notícias Moura Leite</span>
                      <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Programa Atitude Valor: O papel do relacionamento na nossa evolução</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Nossa cultura é pautada na excelência e na valorização das conexões que criamos todos os dias com nossos clientes e equipe.</p>
                    </div>
                  </div>
                  
                  {/* Insight 2 */}
                  <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col sm:flex-row gap-4 items-start hover:bg-slate-100/50 transition-all">
                    <span className="text-2xl p-2.5 bg-white border border-slate-150 rounded-xl select-none">✨</span>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-[#ea580c] uppercase tracking-wider block">Insights do Dia</span>
                      <h4 className="text-xs font-extrabold text-slate-800 leading-snug">Como encantar nos detalhes do atendimento diário</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Pequenas atitudes com empatia geram grandes experiências. Um retorno rápido e humanizado constrói confiança contínua.</p>
                    </div>
                  </div>

                  {/* Notícia 3 */}
                  <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col sm:flex-row gap-4 items-start hover:bg-slate-100/50 transition-all">
                    <span className="text-2xl p-2.5 bg-white border border-slate-150 rounded-xl select-none">💬</span>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-indigo-700 uppercase tracking-wider block">Compartilhamento de Experiências</span>
                      <h4 className="text-xs font-extrabold text-slate-800 leading-snug">"O carinho e dedicação da equipe me encantaram!"</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">Depoimento real enviado por um cliente do Quinta da Colina sobre o atendimento recebido da nossa equipe de relacionamento.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 📢 MENSAGENS COLETIVAS (Comunicados oficiais) */}
              <div className="card-gamified p-6" style={{ background: 'linear-gradient(135deg, rgba(0,103,62,0.01) 0%, white 100%)' }}>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                  <Bell className="w-4.5 h-4.5 text-[#00673e]" />
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Comunicados Oficiais</h3>
                </div>
                
                {mensagensColetivas.length === 0 ? (
                  <div className="py-6 text-center space-y-2">
                    <p className="text-xs text-slate-550 font-bold">Nenhum comunicado no momento. 💚</p>
                    <p className="text-[10px] text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">
                      A liderança poderá compartilhar novidades, avisos importantes e reconhecimentos gerais da equipe por aqui.
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
                        <p className="text-[10px] text-slate-505 font-medium leading-relaxed">{msg.conteudo}</p>
                        <div className="text-[9px] text-[#00673e] font-extrabold font-mono pt-1 text-right">— {msg.autor}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Right Sidebar Column: Highlights, Shortcuts */}
            <div className="space-y-6">
              
              {/* DESTAQUES DA EQUIPE / RECONHECIMENTOS RECENTES */}
              <div className="card-gamified p-6">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                  <Trophy className="w-4.5 h-4.5 text-amber-500" />
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Destaques da Equipe</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🥇</span>
                      <div>
                        <h4 className="font-extrabold text-slate-700">Lucas Santos</h4>
                        <span className="text-[8.5px] text-slate-400 font-semibold block -mt-0.5">Pilar Encantar (+15 pts)</span>
                      </div>
                    </div>
                    <span className="font-black text-[#00673e] text-[10px] font-mono">1º Lugar</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🥈</span>
                      <div>
                        <h4 className="font-extrabold text-slate-700">Juliana Rocha</h4>
                        <span className="text-[8.5px] text-slate-400 font-semibold block -mt-0.5">Pilar Resolver (+10 pts)</span>
                      </div>
                    </div>
                    <span className="font-black text-indigo-700 text-[10px] font-mono">2º Lugar</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🥉</span>
                      <div>
                        <h4 className="font-extrabold text-slate-700">Aline Oliveira</h4>
                        <span className="text-[8.5px] text-slate-400 font-semibold block -mt-0.5">Pilar Indicar (+15 pts)</span>
                      </div>
                    </div>
                    <span className="font-black text-[#ea580c] text-[10px] font-mono">3º Lugar</span>
                  </div>
                </div>
              </div>

              {/* ATALHOS RÁPIDOS DA PLATAFORMA */}
              <div className="card-gamified p-6 space-y-4">
                <h3 className="text-xs font-black text-[#00673e] uppercase tracking-wider border-b border-slate-100 pb-2">
                  Navegação Rápida
                </h3>
                
                <div className="grid grid-cols-1 gap-2.5">
                  <button onClick={() => onSetActiveTab('missoes')} 
                          className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-2xl hover:border-[#00673e] hover:shadow-sm hover:translate-x-1 transition-all text-left flex items-center justify-between group">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">🎯</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 group-hover:text-[#00673e] transition-colors">Missões</h4>
                        <span className="text-[8.5px] text-slate-400 block -mt-0.5 font-bold uppercase tracking-wider">Diretrizes & Critérios</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-350 group-hover:text-[#00673e] group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <button onClick={() => onSetActiveTab('dashboard')} 
                          className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-2xl hover:border-[#00673e] hover:shadow-sm hover:translate-x-1 transition-all text-left flex items-center justify-between group">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">📊</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 group-hover:text-[#00673e] transition-colors">Resultados</h4>
                        <span className="text-[8.5px] text-slate-400 block -mt-0.5 font-bold uppercase tracking-wider">KPIs & Classificação</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-350 group-hover:text-[#00673e] group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <button onClick={() => onSetActiveTab('enviar_resultado')} 
                          className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-2xl hover:border-[#00673e] hover:shadow-sm hover:translate-x-1 transition-all text-left flex items-center justify-between group">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">📩</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 group-hover:text-[#00673e] transition-colors">Registrar Atitude</h4>
                        <span className="text-[8.5px] text-slate-400 block -mt-0.5 font-bold uppercase tracking-wider">Envio de Evidências</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-350 group-hover:text-[#00673e] group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <button onClick={() => onSetActiveTab('conquistas')} 
                          className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-2xl hover:border-[#00673e] hover:shadow-sm hover:translate-x-1 transition-all text-left flex items-center justify-between group">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">🎖️</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 group-hover:text-[#00673e] transition-colors">Conquistas</h4>
                        <span className="text-[8.5px] text-slate-400 block -mt-0.5 font-bold uppercase tracking-wider">Medalhas & Marcos</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-355 group-hover:text-[#00673e] group-hover:translate-x-0.5 transition-all" />
                  </button>

                  <button onClick={() => onSetActiveTab('premios')} 
                          className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-2xl hover:border-[#00673e] hover:shadow-sm hover:translate-x-1 transition-all text-left flex items-center justify-between group">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">🎁</span>
                      <div>
                        <h4 className="text-xs font-black text-slate-800 group-hover:text-[#00673e] transition-colors">Benefícios</h4>
                        <span className="text-[8.5px] text-slate-400 block -mt-0.5 font-bold uppercase tracking-wider">Catálogo de Resgates</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-355 group-hover:text-[#00673e] group-hover:translate-x-0.5 transition-all" />
                  </button>

                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ================= TAB: RESULTADOS ================= */}
      {activeTabNav === 'dashboard' && (
        <div className="space-y-6 animate-slide-up">
          
          {/* Header */}
          <div className="relative rounded-[32px] overflow-hidden border border-[#00673e]/15 p-6 shadow-sm bg-gradient-to-br from-white to-[#00673e]/2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#00673e]/10 border border-[#00673e]/20 text-[#00673e]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">Resultados</h3>
                <p className="text-xs text-slate-500">Visão geral do seu progresso de reconhecimento e evolução contínua da equipe.</p>
              </div>
            </div>
          </div>

          {/* Grid de KPIs do Colaborador (Minha Evolução + Indicadores) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Card 1: Pontos do Mês */}
            <div className="p-4 bg-[#00673e]/5 border border-[#00673e]/15 rounded-2xl flex flex-col justify-between hover:bg-[#00673e]/10 transition-colors shadow-xs">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-black text-[#00673e] uppercase tracking-wider">Pontuação do Mês</span>
                <span className="text-sm">🏆</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-[#00673e] font-mono block">{colaborador.pontosMensal || 68} pts</span>
                <span className="text-[9px] text-[#00673e]/85 font-bold block mt-0.5">Evolução contínua</span>
              </div>
            </div>

            {/* Card 2: Pontos Acumulados */}
            <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col justify-between hover:bg-slate-100 transition-colors shadow-xs">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-black text-slate-550 uppercase tracking-wider">Total Acumulado</span>
                <span className="text-sm">⚡</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-black text-slate-800 font-mono block">{colaborador.pontos} pts</span>
                <span className="text-[9px] text-slate-500 font-extrabold block mt-0.5 font-semibold">Reconhecimento contínuo</span>
              </div>
            </div>

            {/* Card 3: Ações Aprovadas */}
            <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col justify-between hover:bg-slate-100 transition-colors shadow-xs">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-black text-slate-550 uppercase tracking-wider">Ações Validadas</span>
                <span className="text-sm">✨</span>
              </div>
              <div className="mt-3">
                <span className="text-xl font-black text-slate-800 font-mono block">{minhasEvidencias.filter(e => e.status === 'aprovado').length} aprovadas</span>
                <span className="text-[9px] text-slate-550 font-extrabold block mt-0.5 font-semibold">Envios de evidências aceitos</span>
              </div>
            </div>

            {/* Card 4: Monitoria de Qualidade */}
            <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col justify-between hover:bg-slate-100 transition-colors shadow-xs">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-black text-slate-550 uppercase tracking-wider">Monitoria & CSAT</span>
                <span className="text-sm">💚</span>
              </div>
              <div className="mt-3">
                <span className="text-base font-black text-slate-800 font-mono block">{colaborador.indicadores?.monitoria || 98.2}% M.</span>
                <span className="text-[9px] text-slate-650 font-extrabold block mt-0.5">{colaborador.indicadores?.csat || 95.0}% CSAT pessoal</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Coluna Esquerda (Evolução da Equipe & Ranking) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* KPIs Coletivos & Metas da Equipe */}
              <div className="card-gamified space-y-4">
                <h3 className="text-xs font-black text-slate-550 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5 font-bold">
                  👥 Evolução Coletiva da Equipe
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Pontos Coletivos</span>
                    <span className="text-lg font-black text-[#00673e] font-mono block">{colaboradores.reduce((sum, c) => sum + c.pontos, 0)} pts</span>
                    <span className="text-[9px] text-slate-400 block mt-1">Acumulado do time</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">CSAT Geral Equipe</span>
                    <span className="text-lg font-black text-[#00673e] font-mono block">96.3%</span>
                    <span className="text-[9px] text-slate-400 block mt-1">Meta: &gt;95.0%</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">NPS Geral Equipe</span>
                    <span className="text-lg font-black text-[#00673e] font-mono block">78</span>
                    <span className="text-[9px] text-slate-400 block mt-1">Meta: 75</span>
                  </div>
                </div>
              </div>

              {/* Classificação Geral da Equipe (Ranking sem Ofensiva) */}
              <div className="card-gamified">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-black text-slate-600 uppercase tracking-wider">Classificação Geral do Time</h3>
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
                          <div className="truncate max-w-[150px]">
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

              {/* Rastreamento de Indicações (Indique & Ganhe) - Integrado no Dashboard */}
              <div className="card-gamified">
                <h3 className="text-xs font-black text-slate-550 uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center gap-2 font-bold">
                  <Users className="w-4.5 h-4.5 text-[#00673e]" /> Suas Indicações (Indique & Ganhe)
                </h3>
                
                {minhasIndicacoes.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center font-semibold">Nenhuma indicação cadastrada através do seu link.</p>
                ) : (
                  <div className="space-y-3">
                    {minhasIndicacoes.map((ind) => (
                      <div key={ind.id} className="p-3.5 bg-slate-50 border border-slate-200/50 rounded-2xl flex justify-between items-center text-xs">
                        <div>
                          <h4 className="font-black text-slate-700">{ind.indicadoNome}</h4>
                          <p className="text-[10px] text-slate-655 font-semibold mt-0.5">Empreendimento: {ind.empreendimento}</p>
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

            {/* Coluna Direita (Link de Indicação + Linha do tempo de envios) */}
            <div className="space-y-6">
              
              {/* Seu Link de Indicação - Integrado */}
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
                
                <h3 className="text-xs font-black text-[#00673e] uppercase tracking-wider mb-3">Seu Link de Indicação</h3>
                
                <div className="flex flex-col gap-3">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[9.5px] text-slate-600 font-bold truncate">
                    {refLink}
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`w-full py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                      copied 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md shadow-green-500/30' 
                        : 'btn-3d-green text-white'
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'COPIADO COM SUCESSO!' : 'COPIAR LINK'}</span>
                  </button>
                  <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                    Envie para sua rede. Você ganha <strong className="text-[#00673e] font-black">+15 pts</strong> no cadastro e <strong className="text-[#ea580c] font-black">+30 pts</strong> na venda.
                  </p>
                </div>
              </div>

              {/* Linha do tempo e histórico de ações */}
              <div className="card-gamified shadow-sm space-y-4">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
                  <History className="w-4.5 h-4.5 text-[#00673e]" /> Histórico de Envios
                </h3>
                
                {minhasEvidencias.length === 0 ? (
                  <p className="text-xs text-slate-500 py-2 text-center font-medium">Nenhuma evidência registrada ainda.</p>
                ) : (
                  <div className="relative pl-4 border-l-2 border-slate-150 space-y-4 ml-1.5">
                    {minhasEvidencias.map((ev) => {
                      const isAprovado = ev.status === 'aprovado';
                      const isReprovado = ev.status === 'reprovado';
                      
                      return (
                        <div key={ev.id} className="relative group">
                          {/* Timeline dot */}
                          <div className={`absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full border border-white shadow-sm ${
                            isAprovado ? 'bg-emerald-500' : isReprovado ? 'bg-rose-500' : 'bg-amber-500 animate-pulse'
                          }`} />

                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[9.5px]">
                              <span className="font-bold text-slate-700">{ev.dataEnvio}</span>
                              <span className={`font-black uppercase px-1.5 py-0.25 rounded text-[8px] border ${
                                isAprovado 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-150' 
                                  : isReprovado 
                                    ? 'bg-rose-50 text-rose-700 border-rose-150' 
                                    : 'bg-amber-50 text-amber-700 border-amber-150'
                              }`}>
                                {isAprovado ? 'Aprovado' : isReprovado ? 'Recusado' : 'Em análise'}
                              </span>
                            </div>
                            <h4 className="text-[10.5px] font-black text-slate-800 leading-tight truncate">{ev.tipo.replace("_", " ").toUpperCase()}</h4>
                            <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{ev.descricao}</p>
                            {ev.feedbackGestor && (
                              <p className="text-[9px] text-blue-700 bg-blue-50/50 p-1.5 rounded-lg border border-blue-100 mt-1 italic font-semibold">
                                "{ev.feedbackGestor}"
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#00673e]/10 border border-[#00673e]/20 text-[#00673e]">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">Programa Atitude Valor</h3>
                <p className="text-xs text-slate-500">Conheça os comportamentos, atitudes e reconhecimentos valorizados em nossa campanha.</p>
              </div>
            </div>
          </div>

          {/* Bloco de Contextualização */}
          <div className="relative rounded-[32px] border border-[#00673e]/15 p-6 sm:p-8 bg-white shadow-xs">
            <h4 className="text-sm font-black text-[#00673e] uppercase tracking-wider mb-2">O que é o Programa Atitude Valor?</h4>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
              O Programa Atitude Valor reconhece atitudes que fortalecem o relacionamento com clientes, a colaboração entre equipes e a busca contínua pela excelência. A campanha valoriza comportamentos alinhados aos pilares Encantar, Resolver e Indicar.
            </p>
          </div>

          {/* Grid de Pilares com Accordion de Missões */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PILARES_ESTRATEGICOS_INFO.map(pilar => (
              <StrategicPillarCard 
                key={pilar.id} 
                pilar={pilar} 
                activeMissionId={expandedMissionId} 
                onToggleMission={handleToggleExpand} 
              />
            ))}
          </div>

          {/* Seção de Metas Coletivas */}
          <CollectiveGoalsSection />

          {/* Footer: Dúvidas e Regulamento */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-200/60 rounded-[32px] text-center gap-3">
            <span className="text-xs font-bold text-slate-550">Dúvidas sobre critérios e validações?</span>
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Regulamento da campanha baixado com sucesso!');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-rose-100 bg-rose-50/50 hover:bg-rose-50 text-rose-800 transition-all text-xs font-black shadow-sm group"
            >
              <FileText className="w-4 h-4 text-rose-600 group-hover:scale-105 transition-transform" />
              <span>Baixar Regulamento da Campanha</span>
            </a>
          </div>

        </div>
      )}


      {/* ================= TAB: REGISTRAR ATITUDE ================= */}
      {activeTabNav === 'enviar_resultado' && (
        <div className="space-y-6 animate-slide-up">
          
          {/* Header */}
          <div className="relative rounded-[32px] overflow-hidden border border-[#00673e]/15 p-6 shadow-sm bg-gradient-to-br from-white to-[#00673e]/2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#00673e]/10 border border-[#00673e]/20 text-[#00673e]">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">Registrar Atitude</h3>
                <p className="text-xs text-slate-550 font-semibold">Registre suas atitudes alinhadas aos pilares para validação e reconhecimento do gestor.</p>
              </div>
            </div>
          </div>

          <div className="max-w-xl mx-auto">
            {showGeneralFormSuccess ? (
              <div className="p-8 bg-emerald-50/60 border border-emerald-250 rounded-[32px] flex flex-col items-center justify-center text-center space-y-4 py-12 animate-scale-in shadow-sm">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-250/50 shadow-sm animate-bounce">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-emerald-955">✅ Evidência enviada com sucesso!</h4>
                  <p className="text-xs text-slate-800 font-bold mt-1.5">O coordenador foi notificado e revisará sua ação em breve.</p>
                </div>
                <span className="text-[10px] font-black text-amber-800 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                  <span>⏳</span> Aguardando validação da liderança
                </span>
                <button
                  type="button"
                  onClick={() => setShowGeneralFormSuccess(false)}
                  className="mt-4 px-6 py-2.5 bg-[#00673e] hover:bg-[#005734] text-white font-extrabold rounded-2xl text-[10px] uppercase tracking-wider transition-colors shadow-sm"
                >
                  Enviar Outro Resultado
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmitEvidence}
                className="p-6 md:p-8 bg-white border border-slate-200 rounded-[32px] space-y-6 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
                
                <div className="space-y-1.5">
                  <label htmlFor="mission-select" className="block text-[10px] font-black text-slate-655 uppercase tracking-wider">
                    Selecione a Missão Realizada
                  </label>
                  <select
                    id="mission-select"
                    value={formTipo}
                    onChange={(e) => setFormTipo(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-[#00673e] transition-all font-bold cursor-pointer"
                  >
                    <option value="elogio">Elogio Espontâneo do Cliente</option>
                    <option value="reversao_insatisfeito">Reversão de Cliente Insatisfeito</option>
                    <option value="reversao_distrato">Reversão de Distrato</option>
                    <option value="melhoria">Sugestão / Ação de Melhoria</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="action-description" className="block text-[10px] font-black text-slate-655 uppercase tracking-wider">
                    Descreva brevemente a ação realizada
                  </label>
                  <textarea
                    id="action-description"
                    rows="4"
                    value={formDescricao}
                    onChange={(e) => setFormDescricao(e.target.value)}
                    placeholder="Descreva detalhes como: nome do cliente, data, número do contrato ou breve relato da tratativa..."
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-[#00673e] resize-none font-bold placeholder-slate-400"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="evidence-file" className="block text-[10px] font-black text-slate-655 uppercase tracking-wider">
                    Upload do Comprovante (PDF, PNG, JPG)
                  </label>
                  <div className="relative border-2 border-dashed border-slate-200 hover:border-[#00673e]/55 rounded-2xl p-6 text-center transition-all bg-[#f8fafc]/50 hover:bg-[#f8fafc] cursor-pointer">
                    <input
                      id="evidence-file"
                      type="file"
                      value={formArquivo}
                      onChange={(e) => setFormArquivo(e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-2">
                      <span className="text-xl">📎</span>
                      <p className="text-xs text-slate-700 font-bold">
                        {formArquivo ? formArquivo.split('\\').pop() : "Clique para selecionar ou arraste o arquivo"}
                      </p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">PDF, PNG ou JPG (Max. 5MB)</p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-b from-[#0B8F5B] to-[#046C45] text-white font-extrabold py-3.5 rounded-2xl text-[11px] uppercase tracking-wider hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-[0_8px_25px_rgba(11,143,91,0.25)] transition-all duration-200"
                >
                  Registrar Atitude 🚀
                </button>
              </form>
            )}
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
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">✨ Desbloqueadas</h4>
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
                { titulo: 'Evolução Contínua', descricao: 'Envie resultados de missões por 3 meses consecutivos', raridade: 'Raro', pts: 50 },
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
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[10px] text-amber-500 font-bold">+{locked.pts} pontos ao desbloquear</span>
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
                  <h3 className="text-lg font-black text-slate-800">Catálogo de Benefícios Moura Leite</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-semibold">Resgate vouchers usando seus pontos de reconhecimento acumulados</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl"
                   style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.08))', border: '1.5px solid rgba(245,158,11,0.3)' }}>
                <Award className="w-4 h-4 text-amber-500" />
                <span className="font-black text-amber-600 font-mono">{colaborador.moedas} pontos</span>
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
                    <Award className="w-4 h-4 text-[#ea580c]" />
                    <span className="font-black text-[#ea580c] font-mono">{prize.cost} pontos</span>
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
                        alert(`Saldo insuficiente. Você tem ${colaborador.moedas} de ${prize.cost} pontos de reconhecimento necessários.`);
                      } else {
                        alert(`Resgate solicitado! O ${prize.title} será enviado ao seu e-mail corporativo.`);
                      }
                    }}
                    className={`w-full text-[10px] font-black py-2.5 rounded-xl mt-auto uppercase tracking-wider transition-all ${
                      canRedeem ? 'btn-3d-orange text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    }`}
                  >
                    {canRedeem ? 'Resgatar Agora 🎁' : 'Pontos Insuficientes'}
                  </button>
                </div>
              );
            })}
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
