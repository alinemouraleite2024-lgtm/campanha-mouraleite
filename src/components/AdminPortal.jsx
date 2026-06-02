import React, { useState } from 'react';
import { 
  Settings, Coins, Award, RotateCcw, PlusCircle, 
  Trash2, Save, ShoppingBag, Shield, BarChart3, Users
} from 'lucide-react';

export default function AdminPortal({ 
  regras, 
  premios, 
  onUpdateRegras, 
  onUpdatePremios, 
  onResetData,
  activeTabNav
}) {
  const [activeTab, setActiveTab] = useState('pontuacao');

  const [encantarMonitoria, setEncantarMonitoria] = useState(regras.encantar.monitoria);
  const [encantarElogio, setEncantarElogio] = useState(regras.encantar.elogio);
  const [encantarCsat, setEncantarCsat] = useState(regras.encantar.csat);
  const [encantarNps, setEncantarNps] = useState(regras.encantar.nps);

  const [resolverReversaoInsat, setResolverReversaoInsat] = useState(regras.resolver.reversao_insatisfeito);
  const [resolverReversaoDistr, setResolverReversaoDistr] = useState(regras.resolver.reversao_distrato);
  const [resolverMelhoria, setResolverMelhoria] = useState(regras.resolver.melhoria);
  const [resolverMetaFluxos, setResolverMetaFluxos] = useState(regras.resolver.meta_fluxos);

  const [indicarCadastro, setIndicarCadastro] = useState(regras.indicar.cadastro_indicao);
  const [indicarConversao, setIndicarConversao] = useState(regras.indicar.conversao_venda);

  const [premioTitulo, setPremioTitulo] = useState('');
  const [premioPontos, setPremioPontos] = useState(150);
  const [premioTipo, setPremioTipo] = useState('individual');

  const handleSavePoints = (e) => {
    e.preventDefault();
    const novasRegras = {
      encantar: {
        monitoria: Number(encantarMonitoria),
        elogio: Number(encantarElogio),
        csat: Number(encantarCsat),
        nps: Number(encantarNps)
      },
      resolver: {
        reversao_insatisfeito: Number(resolverReversaoInsat),
        reversao_distrato: Number(resolverReversaoDistr),
        melhoria: Number(resolverMelhoria),
        meta_fluxos: Number(resolverMetaFluxos)
      },
      indicar: {
        cadastro_indicao: Number(indicarCadastro),
        conversao_venda: Number(indicarConversao)
      }
    };
    onUpdateRegras(novasRegras);
    alert('Regras de pontuação salvas e atualizadas!');
  };

  const handleAddReward = (e) => {
    e.preventDefault();
    if (!premioTitulo.trim()) return alert('Insira o título do prêmio.');
    const novoPremio = {
      id: `p_${Date.now()}`,
      titulo: premioTitulo,
      pontos: Number(premioPontos),
      tipo: premioTipo,
      icone: premioTipo === 'individual' ? 'Gift' : 'Users',
      estoque: 10
    };
    onUpdatePremios([...premios, novoPremio]);
    setPremioTitulo('');
    setPremioPontos(150);
    alert('Nova premiação cadastrada!');
  };

  const handleDeleteReward = (id) => {
    if (window.confirm('Remover esta recompensa?')) {
      onUpdatePremios(premios.filter(p => p.id !== id));
    }
  };

  const adminTabs = [
    { id: 'pontuacao', label: '⚙️ Regras de Pontuação' },
    { id: 'premios', label: '🎁 Catálogo de Recompensas' },
    { id: 'configuracoes', label: '🔧 Manutenção' }
  ];

  const InputField = ({ label, value, onChange }) => (
    <div>
      <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#00673e] focus:bg-white transition-all"
      />
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Admin Header Banner */}
      <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-[32px] p-8 overflow-hidden shadow-lg shadow-slate-800/10">
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10">
          <Shield className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="bg-white/10 p-2 w-fit rounded-full mb-3">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">Painel Administrador</h2>
          <p className="text-sm text-slate-300 mt-1">
            Gerencie as regras globais do sistema, catálogo de prêmios e manutenção da Campanha 2026.
          </p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex bg-white border border-slate-200/80 rounded-2xl p-1.5 gap-1 shadow-sm overflow-x-auto scrollbar-none">
        {adminTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-4 text-xs font-black rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Point Rules */}
      {activeTab === 'pontuacao' && (
        <form onSubmit={handleSavePoints} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Pilar Encantar */}
            <div className="card-gamified space-y-4">
              <h3 className="text-sm font-black text-indigo-600 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="text-lg">💎</span> Pilar 1: Encantar
              </h3>
              <InputField label="Monitoria >98% (pts)" value={encantarMonitoria} onChange={setEncantarMonitoria} />
              <InputField label="Elogio Espontâneo (pts)" value={encantarElogio} onChange={setEncantarElogio} />
              <InputField label="Meta Mensal CSAT (pts)" value={encantarCsat} onChange={setEncantarCsat} />
              <InputField label="Meta Semestral NPS (pts)" value={encantarNps} onChange={setEncantarNps} />
            </div>

            {/* Pilar Resolver */}
            <div className="card-gamified space-y-4">
              <h3 className="text-sm font-black text-emerald-600 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="text-lg">🔧</span> Pilar 2: Resolver
              </h3>
              <InputField label="Reversão Cliente Detrator (pts)" value={resolverReversaoInsat} onChange={setResolverReversaoInsat} />
              <InputField label="Reversão Distrato Excelência (pts)" value={resolverReversaoDistr} onChange={setResolverReversaoDistr} />
              <InputField label="Melhoria Implantada (pts)" value={resolverMelhoria} onChange={setResolverMelhoria} />
              <InputField label="Meta Cadastro Fluxos (pts)" value={resolverMetaFluxos} onChange={setResolverMetaFluxos} />
            </div>

            {/* Pilar Indicar */}
            <div className="card-gamified space-y-4">
              <h3 className="text-sm font-black text-amber-600 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="text-lg">🎯</span> Pilar 3: Indicar
              </h3>
              <InputField label="Cadastro de Indicação (pts)" value={indicarCadastro} onChange={setIndicarCadastro} />
              <InputField label="Conversão de Venda (pts)" value={indicarConversao} onChange={setIndicarConversao} />

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/50 text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-700 block mb-1">ℹ️ Como funciona?</strong>
                Os pontos são creditados automaticamente ao colaborador quando o cliente se registra usando seu link de referência.
              </div>
            </div>

          </div>

          <button
            type="submit"
            className="btn-3d-green text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-[#00673e]/10"
          >
            <Save className="w-3.5 h-3.5" /> Salvar Regras de Pontuação
          </button>
        </form>
      )}

      {/* Tab 2: Rewards Catalog */}
      {activeTab === 'premios' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Add reward form */}
          <div className="card-gamified h-fit">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-5 border-b border-slate-100 pb-3">
              <PlusCircle className="w-4 h-4 text-[#00673e]" /> Nova Recompensa
            </h3>
            <form onSubmit={handleAddReward} className="space-y-4">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Nome do Prêmio</label>
                <input
                  type="text" required
                  placeholder="Ex: Voucher Decathlon R$ 100"
                  value={premioTitulo}
                  onChange={e => setPremioTitulo(e.target.value)}
                  className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#00673e] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Custo em Moedas</label>
                <input
                  type="number" required
                  value={premioPontos}
                  onChange={e => setPremioPontos(e.target.value)}
                  className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#00673e] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Tipo</label>
                <select
                  value={premioTipo}
                  onChange={e => setPremioTipo(e.target.value)}
                  className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#00673e] focus:bg-white transition-all"
                >
                  <option value="individual">Individual (por colaborador)</option>
                  <option value="coletivo">Coletivo (toda a equipe)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full btn-3d-green text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Adicionar ao Catálogo
              </button>
            </form>
          </div>

          {/* Catalog list */}
          <div className="lg:col-span-2 card-gamified">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-5 border-b border-slate-100 pb-3">
              <ShoppingBag className="w-4 h-4 text-[#ea580c]" /> Catálogo Atual Moura Leite
            </h3>

            <div className="space-y-3">
              {premios.map(pr => (
                <div key={pr.id} className="p-4 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center justify-between gap-4 hover:bg-slate-100/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-black text-slate-800">{pr.titulo}</h4>
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                        pr.tipo === 'individual'
                          ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      }`}>
                        {pr.tipo}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Estoque: {pr.estoque} unidades</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-black text-[#ea580c] bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-mono">
                      {pr.pontos} 🪙
                    </span>
                    <button
                      onClick={() => handleDeleteReward(pr.id)}
                      className="text-slate-300 hover:text-rose-500 transition-colors p-1.5 rounded-xl hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Maintenance */}
      {activeTab === 'configuracoes' && (
        <div className="card-gamified space-y-6 max-w-2xl">
          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <RotateCcw className="w-4.5 h-4.5 text-rose-500" /> Manutenção do Banco de Dados
            </h3>
            <p className="text-xs text-slate-400 mt-1">Restaure os dados padrão da campanha ou limpe registros de sessão.</p>
          </div>

          <div className="p-5 bg-rose-50 border border-rose-200 rounded-3xl space-y-4">
            <h4 className="text-xs font-black text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
              ⚠️ Zona de Risco
            </h4>
            <p className="text-xs text-rose-600 leading-relaxed">
              Ao restaurar, todas as indicações, evidências, pontuações e dados gerados nesta sessão serão apagados e substituídos pelos dados padrão simulados da campanha.
            </p>
            <button
              onClick={() => {
                if (window.confirm('Tem certeza que deseja restaurar o banco de dados?')) {
                  onResetData();
                  alert('Banco de dados restaurado com sucesso!');
                }
              }}
              className="bg-rose-600 hover:bg-rose-500 text-white font-black py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 border-b-4 border-rose-800 active:border-b-0 active:translate-y-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restaurar Configurações Originais
            </button>
          </div>

          {/* Stats summary */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { label: 'Colaboradores', value: '12', icon: '👥' },
              { label: 'Prêmios no Catálogo', value: premios.length, icon: '🎁' },
              { label: 'Pilares Ativos', value: '3', icon: '🏛️' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200/50 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-black text-slate-800">{stat.value}</div>
                <div className="text-[10px] text-slate-400 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
