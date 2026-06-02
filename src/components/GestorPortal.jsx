import React, { useState } from 'react';
import { 
  ShieldCheck, Users, Clock, CheckCircle2, XCircle, BarChart3, 
  TrendingUp, Percent, Award, Coins, FileText, Check, X, ClipboardList,
  Trophy, ShoppingBag, History
} from 'lucide-react';

export default function GestorPortal({ 
  colaboradores, 
  indicacoes, 
  evidencias, 
  onGerenciarEvidencia, 
  onAtualizarStatusIndicacao,
  activeTabNav,
  onSetActiveTab
}) {
  const [feedbackTexts, setFeedbackTexts] = useState({});

  const handleAction = (evidenciaId, status) => {
    const feedback = feedbackTexts[evidenciaId] || "";
    onGerenciarEvidencia(evidenciaId, status, feedback);
    setFeedbackTexts(prev => ({ ...prev, [evidenciaId]: "" }));
    alert(`Evidência de ação ${status === 'aprovado' ? 'aprovada' : 'reprovada'} com sucesso!`);
  };

  const handleFeedbackChange = (evidenciaId, val) => {
    setFeedbackTexts(prev => ({ ...prev, [evidenciaId]: val }));
  };

  const evidenciasPendentes = evidencias.filter(e => e.status === 'pendente');
  const evidenciasProcessadas = evidencias.filter(e => e.status !== 'pendente');

  // Stats
  const totalPontosTime = colaboradores.reduce((sum, c) => sum + c.pontos, 0);
  const totalIndicacoes = indicacoes.length;
  const indicacoesConvertidas = indicacoes.filter(i => i.status === 'venda_convertida').length;
  const taxaConversao = totalIndicacoes > 0 ? ((indicacoesConvertidas / totalIndicacoes) * 100).toFixed(0) : 0;

  // Sorting ranking
  const ranking = [...colaboradores].sort((a, b) => b.pontos - a.pontos);

  return (
    <div className="space-y-6">
      
      {/* HEADER MANAGER METRICS BANNER */}
      <div className="bg-gradient-to-r from-[#00673e] via-slate-800 to-[#00673e] text-white rounded-[32px] p-6 shadow-md shadow-[#00673e]/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2.5 rounded-2xl text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Olá, Coordenador Carlos!</h2>
              <p className="text-xs text-slate-200">Aqui está o andamento da equipe de relacionamento Moura Leite.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-black/10 p-3 rounded-2xl border border-white/5">
            <div className="text-center px-3.5">
              <span className="text-[9px] font-bold text-slate-300 uppercase block">Pontos Equipe</span>
              <span className="text-sm font-black font-mono text-amber-300">{totalPontosTime}</span>
            </div>
            <div className="text-center px-3.5 border-l border-white/10">
              <span className="text-[9px] font-bold text-slate-300 uppercase block">Pendências</span>
              <span className="text-sm font-black font-mono text-amber-300">{evidenciasPendentes.length}</span>
            </div>
            <div className="text-center px-3.5 border-l border-white/10">
              <span className="text-[9px] font-bold text-slate-300 uppercase block">Indicações</span>
              <span className="text-sm font-black font-mono text-amber-300">{totalIndicacoes}</span>
            </div>
            <div className="text-center px-3.5 border-l border-white/10">
              <span className="text-[9px] font-bold text-slate-300 uppercase block">Conversão</span>
              <span className="text-sm font-black font-mono text-amber-300">{taxaConversao}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TAB: DASHBOARD (PENDING APPROVALS) ================= */}
      {activeTabNav === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Approvals */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-gamified">
              <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Clock className="w-4.5 h-4.5 text-amber-500" /> Aprovações Pendentes da Equipe
              </h3>

              {evidenciasPendentes.length === 0 ? (
                <div className="text-center py-8 text-slate-400 font-medium">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
                  <p className="text-xs">Nenhuma evidência aguardando validação.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {evidenciasPendentes.map((ev) => (
                    <div key={ev.id} className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-700">{ev.colaboradorNome}</span>
                            <span className="text-[9px] text-slate-400">{ev.dataEnvio}</span>
                          </div>
                          <span className="text-[9px] font-extrabold text-[#00673e] bg-[#00673e]/5 px-2 py-0.5 rounded border border-[#00673e]/10 inline-block mt-1">
                            {ev.tipo.replace("_", " ").toUpperCase()}
                          </span>
                          <p className="text-xs text-slate-650 mt-2 font-medium leading-relaxed">{ev.descricao}</p>
                          <div className="flex items-center gap-1.5 text-[9px] text-indigo-600 mt-2 font-mono bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded w-fit">
                            <FileText className="w-3.5 h-3.5" />
                            <span>{ev.urlEvidencia}</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-yellow-600 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded shrink-0">
                          +{ev.pontosAprovados} pts
                        </span>
                      </div>

                      {/* Approvals Feedback form */}
                      <div className="border-t border-slate-200/60 pt-2 flex gap-2">
                        <input
                          type="text"
                          placeholder="Feedback da aprovação..."
                          value={feedbackTexts[ev.id] || ""}
                          onChange={(e) => handleFeedbackChange(ev.id, e.target.value)}
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-[#00673e]"
                        />
                        <button
                          onClick={() => handleAction(ev.id, 'reprovado')}
                          className="bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white p-2 rounded-xl transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleAction(ev.id, 'aprovado')}
                          className="btn-3d-green text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Aprovar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* NPS Indicators */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card-gamified space-y-4">
              <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-2">Metas Coletivas</h3>
              <div className="space-y-3.5 text-xs font-medium text-slate-650">
                
                <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl">
                  <div className="flex justify-between items-center mb-1">
                    <span>CSAT Geral</span>
                    <span className="font-bold text-[#00673e]">96.3%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#00673e] h-full" style={{ width: '96.3%' }}></div>
                  </div>
                  <span className="text-[9px] text-slate-400 block mt-1">Meta: &gt;95.0%</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl">
                  <div className="flex justify-between items-center mb-1">
                    <span>NPS Semestral</span>
                    <span className="font-bold text-[#00673e]">78</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#00673e] h-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-[9px] text-slate-400 block mt-1">Meta: 75</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB: RANKING ================= */}
      {activeTabNav === 'ranking' && (
        <div className="card-gamified space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Trophy className="w-4.5 h-4.5 text-amber-500" /> Ranking Geral da Equipe
          </h3>
          
          <div className="overflow-hidden border border-slate-200 rounded-3xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[9px] font-black uppercase tracking-wider">
                  <th className="py-3 px-5 text-center w-16">Pos</th>
                  <th className="py-3 px-4">Colaborador</th>
                  <th className="py-3 px-4 text-center">Pontos Mensais</th>
                  <th className="py-3 px-4 text-center">Ofensiva</th>
                  <th className="py-3 px-5 text-right">Acumulado Trimestre</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-xs text-slate-700">
                {ranking.map((player, index) => (
                  <tr key={player.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-5 text-center">
                      <span className="font-bold text-slate-500 font-mono">#{index + 1}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold">{player.nome}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-[#00673e]">
                      {player.pontosMensal || 0} pontos
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">{player.ofensiva} dias</td>
                    <td className="py-3.5 px-5 text-right font-black text-amber-600 font-mono">{player.pontos} pontos</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB: MISSÕES (REFERRALS CONVERSIONS) ================= */}
      {activeTabNav === 'missoes' && (
        <div className="card-gamified space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Users className="w-4.5 h-4.5 text-indigo-500" /> Conversões do Indique e Ganhe
          </h3>
          
          <div className="space-y-3.5">
            {indicacoes.map((ind) => (
              <div key={ind.id} className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black text-[#00673e]">{ind.empreendimento}</span>
                    <span className="text-[9px] text-slate-400">• {ind.dataCadastro}</span>
                  </div>
                  <h4 className="text-xs font-black text-slate-700 mt-1">Indicado: {ind.indicadoNome} ({ind.indicadoTelefone})</h4>
                  <p className="text-[10px] text-slate-400">Cliente de Origem: {ind.clienteNome}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${
                    ind.status === 'venda_convertida' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                      : 'bg-blue-50 text-blue-600 border-blue-200'
                  }`}>
                    {ind.status === 'venda_convertida' ? 'Venda Fechada' : 'Ativo / Em Atendimento'}
                  </span>

                  {ind.status !== 'venda_convertida' && (
                    <button
                      onClick={() => {
                        onAtualizarStatusIndicacao(ind.id, 'venda_convertida');
                        alert("Venda registrada! Pontos corporativos distribuídos.");
                      }}
                      className="btn-3d-orange text-white text-[10px] font-black px-3.5 py-2 rounded-xl uppercase tracking-wider"
                    >
                      Fechar Venda 💰
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB: CONQUISTAS ================= */}
      {activeTabNav === 'conquistas' && (
        <div className="card-gamified space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Award className="w-4.5 h-4.5 text-indigo-500" /> Mural de Conquistas da Equipe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            {colaboradores.map(c => (
              <div key={c.id} className="p-3 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={c.foto} alt="" className="w-7 h-7 rounded-lg object-cover" />
                  <span className="font-bold">{c.nome}</span>
                </div>
                <div className="flex gap-1.5">
                  {c.conquistas.map((conq, idx) => (
                    <span 
                      key={idx} 
                      title={`${conq.titulo}: ${conq.descricao}`}
                      className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[9px] font-black uppercase cursor-help"
                    >
                      {conq.titulo.split(" ")[0]}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB: PREMIOS CLAIMED LOG ================= */}
      {activeTabNav === 'premios' && (
        <div className="card-gamified space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShoppingBag className="w-4.5 h-4.5 text-[#ea580c]" /> Resgates efetuados
          </h3>
          <p className="text-xs text-slate-400 font-medium">Nenhum resgate pendente de envio físico/digital no momento.</p>
        </div>
      )}

      {/* ================= TAB: HISTÓRICO ================= */}
      {activeTabNav === 'historico' && (
        <div className="card-gamified space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <History className="w-4.5 h-4.5 text-slate-400" /> Histórico Geral de Validações
          </h3>
          
          <div className="space-y-3">
            {evidenciasProcessadas.map((ev) => (
              <div key={ev.id} className="p-3 bg-slate-50 border border-slate-200/50 rounded-2xl flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-slate-700">{ev.colaboradorNome} • {ev.tipo.replace("_", " ").toUpperCase()}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Feedback: "{ev.feedbackGestor}"</p>
                </div>
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                  ev.status === 'aprovado' ? 'bg-emerald-50 text-emerald-600 border-emerald-150' : 'bg-rose-50 text-rose-600 border-rose-150'
                }`}>
                  {ev.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
