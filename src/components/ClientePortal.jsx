import React, { useState } from 'react';
import { 
  Gift, UserPlus, HelpCircle, CheckCircle2, User, Lock, Phone, 
  ArrowRight, Compass, Check, FileText, Star, Shield
} from 'lucide-react';

export default function ClientePortal({ 
  clienteDefault, 
  indicacoes, 
  onCadastrarIndicacao, 
  colaboradores,
  activeTabNav,
  onSetActiveTab
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginMethod, setLoginMethod] = useState('phone');
  const [phoneVal, setPhoneVal] = useState('(11) 98765-4321');
  const [smsCode, setSmsCode] = useState('1234');
  const [cpfVal, setCpfVal] = useState('123.456.789-00');
  const [passVal, setPassVal] = useState('123');

  const [indicadoNome, setIndicadoNome] = useState('');
  const [indicadoTelefone, setIndicadoTelefone] = useState('');
  const [empreendimento, setEmpreendimento] = useState('Residencial Jardim Europa');
  const [colaboradorRef, setColaboradorRef] = useState('ATD1023');

  const clientName = "Rodrigo Almeida";
  const clientPhone = "(11) 98765-4321";

  const minhasIndicacoes = indicacoes.filter(
    ind => ind.clienteTelefone === clientPhone || ind.clienteNome === clientName
  );
  const recompensasElegiveis = minhasIndicacoes.filter(ind => ind.status === 'venda_convertida');

  const empreendimentosDisponiveis = [
    "Residencial Jardim Europa",
    "Parque das Árvores II",
    "Residencial Alvorada",
    "Residencial Villa Bella",
    "Terras de Moura Leite"
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleReferralSubmit = (e) => {
    e.preventDefault();
    if (!indicadoNome.trim() || !indicadoTelefone.trim()) {
      return alert("Por favor, preencha o nome e telefone do seu indicado.");
    }
    onCadastrarIndicacao(clientName, clientPhone, indicadoNome, indicadoTelefone, empreendimento, colaboradorRef);
    setIndicadoNome('');
    setIndicadoTelefone('');
    alert("Indicação registrada com sucesso!");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-xl border border-slate-200">
          <div className="text-center mb-8">
            <div className="bg-amber-100 p-4 rounded-3xl w-fit mx-auto mb-4 shadow-sm shadow-amber-500/5">
              <Gift className="w-10 h-10 text-[#ea580c]" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Indique e Ganhe</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">Campanha Moura Leite 2026 — Botucatu, SP</p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6 gap-1">
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${loginMethod === 'phone' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              📱 Telefone + SMS
            </button>
            <button
              onClick={() => setLoginMethod('cpf')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${loginMethod === 'cpf' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              🪪 CPF + Senha
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginMethod === 'phone' ? (
              <>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-300" />
                    <input type="text" placeholder="(11) 98765-4321" value={phoneVal} onChange={(e) => setPhoneVal(e.target.value)} className="w-full bg-[#f1f5f9] border border-transparent rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-amber-400 focus:bg-white transition-all font-medium" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Código SMS</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-300" />
                    <input type="text" placeholder="Código de 4 dígitos" value={smsCode} onChange={(e) => setSmsCode(e.target.value)} className="w-full bg-[#f1f5f9] border border-transparent rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-amber-400 focus:bg-white transition-all font-medium" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">CPF</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-300" />
                    <input type="text" placeholder="123.456.789-00" value={cpfVal} onChange={(e) => setCpfVal(e.target.value)} className="w-full bg-[#f1f5f9] border border-transparent rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-amber-400 focus:bg-white transition-all font-medium" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-300" />
                    <input type="password" placeholder="Sua senha simples" value={passVal} onChange={(e) => setPassVal(e.target.value)} className="w-full bg-[#f1f5f9] border border-transparent rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-amber-400 focus:bg-white transition-all font-medium" />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="w-full btn-3d-orange text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 mt-4">
              Acessar o Portal <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Amber welcome banner */}
      <div className="relative bg-gradient-to-r from-[#ea580c] to-amber-500 text-white rounded-[32px] p-8 overflow-hidden shadow-lg shadow-amber-500/15">
        <div className="absolute right-0 top-0 bottom-0 w-48 opacity-10 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=200')] bg-cover bg-center pointer-events-none"></div>
        <div className="relative z-10">
          <div className="bg-white/20 p-2 w-fit rounded-full mb-3">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-black">Olá, {clientName.split(" ")[0]}! 🎁</h2>
          <p className="text-sm text-orange-100 mt-1">
            Você tem <span className="font-black text-white">{minhasIndicacoes.length} indicação(ões)</span> registrada(s) e <span className="font-black text-white">{recompensasElegiveis.length} recompensa(s)</span> elegível(eis).
          </p>
          <div className="flex gap-3 mt-5">
            <button onClick={() => onSetActiveTab('missoes')} className="btn-3d-green text-white text-xs font-black px-5 py-2.5 rounded-xl uppercase tracking-wider">
              Indicar Amigo
            </button>
            <button onClick={() => setIsLoggedIn(false)} className="border-2 border-white/30 hover:bg-white/10 text-white text-xs font-bold px-5 py-2 rounded-xl transition-all uppercase tracking-wider">
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Tab: Dashboard shows referral form */}
      {(activeTabNav === 'dashboard' || activeTabNav === 'missoes') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Referral Form */}
          <div className="lg:col-span-2 card-gamified">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-5 border-b border-slate-100 pb-3">
              <UserPlus className="w-4.5 h-4.5 text-[#ea580c]" /> Cadastrar Nova Indicação
            </h3>

            <form onSubmit={handleReferralSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Nome Completo do Indicado</label>
                <input type="text" required placeholder="Nome completo do amigo ou familiar" value={indicadoNome} onChange={(e) => setIndicadoNome(e.target.value)}
                  className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-all font-medium" />
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Telefone / WhatsApp</label>
                <input type="text" required placeholder="(11) 99999-9999" value={indicadoTelefone} onChange={(e) => setIndicadoTelefone(e.target.value)}
                  className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-all font-medium" />
              </div>

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Empreendimento de Interesse</label>
                <select value={empreendimento} onChange={(e) => setEmpreendimento(e.target.value)}
                  className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-all font-medium">
                  {empreendimentosDisponiveis.map(emp => (
                    <option key={emp} value={emp}>{emp}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Quem te apresentou esta campanha?</label>
                <select value={colaboradorRef} onChange={(e) => setColaboradorRef(e.target.value)}
                  className="w-full bg-[#f1f5f9] border border-transparent rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#ea580c] focus:bg-white transition-all font-medium">
                  {colaboradores.map(c => (
                    <option key={c.id} value={c.id}>{c.nome} — {c.cargo}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="md:col-span-2 w-full btn-3d-orange text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 mt-2">
                <UserPlus className="w-3.5 h-3.5" /> Enviar Indicação
              </button>
            </form>
          </div>

          {/* How it works */}
          <div className="card-gamified h-fit">
            <h3 className="font-black text-slate-800 text-sm mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Compass className="w-4 h-4 text-amber-500" /> Como funciona?
            </h3>
            <ul className="space-y-4 text-xs text-slate-600 font-medium">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-amber-100 text-amber-600 font-black rounded-full flex items-center justify-center text-[10px] shrink-0">1</span>
                <p>Você cadastra um amigo interessado em comprar um lote Moura Leite.</p>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-amber-100 text-amber-600 font-black rounded-full flex items-center justify-center text-[10px] shrink-0">2</span>
                <p>Nossa equipe comercial entra em contato de forma prioritária.</p>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-emerald-100 text-emerald-600 font-black rounded-full flex items-center justify-center text-[10px] shrink-0">3</span>
                <p>Se a venda fechar, <strong>você ganha seu benefício especial!</strong></p>
              </li>
            </ul>
          </div>

        </div>
      )}

      {/* Tab: Histórico — referral timeline */}
      {activeTabNav === 'historico' && (
        <div className="card-gamified space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-3">Acompanhamento das Suas Indicações</h3>

          {minhasIndicacoes.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <Gift className="w-10 h-10 mx-auto text-slate-200 mb-3" />
              <p className="text-xs font-semibold">Nenhuma indicação cadastrada ainda.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {minhasIndicacoes.map((ind) => (
                <div key={ind.id} className="p-5 bg-slate-50 border border-slate-200/50 rounded-3xl space-y-4">
                  <div className="flex flex-col md:flex-row justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black text-[#ea580c]">{ind.empreendimento}</span>
                      <h4 className="text-sm font-black text-slate-800 mt-0.5">Indicado: {ind.indicadoNome}</h4>
                      <p className="text-[10px] text-slate-400">Cadastrado em {ind.dataCadastro}</p>
                    </div>
                  </div>

                  {/* Progress steps */}
                  <div className="grid grid-cols-3 gap-3 text-center text-[10px]">
                    {[
                      { label: "1. Cadastrado", active: true },
                      { label: "2. Contato Ativo", active: ind.status !== 'cadastro' },
                      { label: "3. Venda Fechada 🎉", active: ind.status === 'venda_convertida' }
                    ].map((step, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto font-black border-2 border-white shadow-sm ${step.active ? 'bg-[#00673e] text-white' : 'bg-slate-200 text-slate-400'}`}>
                          {step.active ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <span className={`font-bold block ${step.active ? 'text-slate-700' : 'text-slate-400'}`}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Recompensas */}
      {activeTabNav === 'conquistas' && (
        <div className="card-gamified space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Star className="w-4.5 h-4.5 text-amber-500" /> Suas Recompensas
          </h3>

          {recompensasElegiveis.length === 0 ? (
            <div className="text-center py-10 bg-slate-50 border border-slate-200/50 rounded-3xl text-slate-400">
              <Gift className="w-10 h-10 mx-auto text-slate-200 mb-3" />
              <p className="text-xs font-semibold">Nenhuma recompensa disponível ainda.</p>
              <p className="text-[10px] text-slate-300 mt-1">Quando seu indicado fechar negócio, seu prêmio aparecerá aqui!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recompensasElegiveis.map((recomp, idx) => (
                <div key={idx} className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-black uppercase text-[#ea580c] bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">Elegível para Resgate</span>
                    <h4 className="text-sm font-black text-slate-800 mt-2">Indicação Convertida: {recomp.indicadoNome}</h4>
                    <p className="text-[10px] text-slate-500">{recomp.empreendimento}</p>
                  </div>
                  <button onClick={() => alert("Solicitação de resgate enviada! Em até 48h nossa equipe entrará em contato.")}
                    className="btn-3d-orange text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider shrink-0">
                    Resgatar Benefício
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Regulamento */}
      {activeTabNav === 'premios' && (
        <div className="card-gamified space-y-4 text-xs text-slate-600 leading-relaxed">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Shield className="w-4.5 h-4.5 text-[#00673e]" /> Regulamento da Campanha Indique e Ganhe
          </h3>
          <p><strong>1. Elegibilidade:</strong> Podem participar todos os clientes Moura Leite com contrato ativo ou quitado.</p>
          <p><strong>2. Validade da Indicação:</strong> A indicação só é válida se o indicado não estiver na base comercial ativa dos últimos 6 meses.</p>
          <p><strong>3. Premiação:</strong> O prêmio é concedido após a assinatura do contrato de compra e venda pelo indicado.</p>
          <p><strong>4. Pontuação Interna:</strong> O colaborador corporativo vinculado ao link receberá +15 pts no cadastro e +30 pts na conversão da venda.</p>
        </div>
      )}

    </div>
  );
}
