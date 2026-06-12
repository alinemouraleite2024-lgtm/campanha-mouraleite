// Moura Leite Relationship Campaign 2026 Mock Database - Redesigned
// Persisted in localStorage for rich live demo experience matching reference images

const DEFAULT_PONTUACAO_REGRAS = {
  encantar: {
    monitoria: 10,
    elogio: 15,
    csat: 10,
    nps: 15
  },
  resolver: {
    reversao_insatisfeito: 10,
    reversao_distrato: 10,
    melhoria: 5,
    meta_fluxos: 5
  },
  indicar: {
    cadastro_indicao: 15,
    conversao_venda: 30
  }
};

const DEFAULT_COLABORADORES = [
  {
    id: "ATD1023",
    nome: "Aline Oliveira",
    cargo: "Atendente Sênior",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    pontos: 368,
    pontosMensal: 68,
    moedas: 69,
    ofensiva: 7,
    linkReferencia: "ATD1023",
    conquistas: [
      { id: "c1", titulo: "Encantador de Clientes", descricao: "Recebeu um elogio espontâneo no canal oficial", icone: "Sparkles", raridade: "Lendário" }
    ],
    indicadores: {
      monitoria: 98.2,
      csat: 95.0,
      fluxosCadastrados: 6
    }
  },
  {
    id: "ATD1024",
    nome: "Max Fernandes",
    cargo: "Atendente Sênior",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    pontos: 517,
    pontosMensal: 117,
    moedas: 117,
    ofensiva: 12,
    linkReferencia: "ATD1024",
    conquistas: [
      { id: "c1", titulo: "Encantador de Clientes", descricao: "Recebeu um elogio espontâneo no canal oficial", icone: "Sparkles", raridade: "Lendário" }
    ],
    indicadores: {
      monitoria: 99.1,
      csat: 97.5,
      fluxosCadastrados: 12
    }
  },
  {
    id: "ATD1025",
    nome: "Isabella Domingues",
    cargo: "Suporte de Atendimento",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
    pontos: 414,
    pontosMensal: 114,
    moedas: 114,
    ofensiva: 8,
    linkReferencia: "ATD1025",
    conquistas: [
      { id: "c3", titulo: "Agilidade Total", descricao: "Nota 100% no tempo médio de resposta", icone: "Zap", raridade: "Comum" }
    ],
    indicadores: {
      monitoria: 98.8,
      csat: 96.0,
      fluxosCadastrados: 8
    }
  }
];

const DEFAULT_INDICACOES = [
  {
    id: "IND001",
    clienteNome: "Rodrigo Almeida",
    clienteTelefone: "(11) 98765-4321",
    indicadoNome: "Gabriel Almeida (Irmão)",
    indicadoTelefone: "(11) 97777-8888",
    empreendimento: "Residencial Jardim Europa",
    status: "venda_convertida",
    colaboradorId: "ATD1023",
    dataCadastro: "2026-05-15",
    dataConversao: "2026-05-28"
  },
  {
    id: "IND002",
    clienteNome: "Patrícia Souza",
    clienteTelefone: "(14) 99123-4567",
    indicadoNome: "Carlos Alberto",
    indicadoTelefone: "(14) 98888-2233",
    empreendimento: "Parque das Árvores II",
    status: "ativacao",
    colaboradorId: "ATD1023",
    dataCadastro: "2026-05-28",
    dataConversao: null
  }
];

const DEFAULT_EVIDENCIAS = [
  {
    id: "EVI001",
    colaboradorId: "ATD1023",
    colaboradorNome: "Aline Oliveira",
    tipo: "elogio",
    descricao: "Cliente agradeceu muito pelo suporte na alteração de vencimento e elogiou a empatia.",
    urlEvidencia: "whatsapp_screenshot.png",
    pontosAprovados: 15,
    status: "aprovado",
    dataEnvio: "2026-05-28",
    feedbackGestor: "Excelente atitude protagonista, Aline!"
  }
];

const DEFAULT_NOTIFICACOES = [
  {
    id: "NOT001",
    paraPerfil: "gestor",
    mensagem: "Nova indicação pendente para o Residencial Jardim Europa.",
    lida: false,
    data: "2026-05-30T16:30:00"
  }
];

const DEFAULT_CLIENTES = [
  {
    id: "CLI3001",
    nome: "Rodrigo Almeida",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    senha: "123",
    resgastes: []
  }
];

const DEFAULT_MENSAGENS_COLETIVAS = [
  {
    id: "mc1",
    titulo: "🏆 Orgulho em Pertencer!",
    conteudo: "Alcançamos a marca coletiva de 96.3% no CSAT em Maio! Esse resultado reflete o empenho diário de cada um de vocês no encantamento dos nossos clientes. Parabéns, equipe!",
    data: "2026-05-31T09:00:00",
    autor: "Carlos (Coordenador)"
  },
  {
    id: "mc2",
    titulo: "⚡ Foco no Pilar Resolver",
    conteudo: "Lembrem-se que ações registradas de reversão de distrato garantem pontuação bônus de +10 pontos. Vamos atuar com agilidade e foco na retenção!",
    data: "2026-05-28T14:30:00",
    autor: "Carlos (Coordenador)"
  }
];

const DEFAULT_ORIENTACOES_INDIVIDUAIS = [
  {
    id: "oi1",
    colaboradorId: "ATD1023",
    feedback: "Olá Aline, excelente trabalho nas reversões deste mês! Seu protagonismo é fundamental para a Moura Leite.",
    data: "2026-05-29",
    lido: false,
    autor: "Carlos (Coordenador)"
  },
  {
    id: "oi2",
    colaboradorId: "ATD1023",
    feedback: "Aline, vi que sua monitoria de excelência ficou em 98.2%! Muito bom, continue com esse foco no encantamento.",
    data: "2026-05-25",
    lido: true,
    autor: "Carlos (Coordenador)"
  }
];

const DEFAULT_PREMIOS = [
  { id: "p1", titulo: "Voucher iFood R$ 90", pontos: 150, tipo: "individual", icone: "Utensils", estoque: 50 },
  { id: "p2", titulo: "Voucher Beleza R$ 90", pontos: 150, tipo: "individual", icone: "Scissors", estoque: 30 },
  { id: "p3", titulo: "Par de Ingressos Cinema + Pipoca", pontos: 150, tipo: "individual", icone: "Film", estoque: 40 }
];

export const initializeDatabase = () => {
  // Force migration/clean of old cached database to clear character encoding issues
  if (!localStorage.getItem("ml_db_initialized_v4")) {
    localStorage.removeItem("ml_regras");
    localStorage.removeItem("ml_colaboradores");
    localStorage.removeItem("ml_indicacoes");
    localStorage.removeItem("ml_evidencias");
    localStorage.removeItem("ml_notificacoes");
    localStorage.removeItem("ml_clientes");
    localStorage.removeItem("ml_premios");
    localStorage.removeItem("ml_mensagens_coletivas");
    localStorage.removeItem("ml_orientacoes_individuais");
    localStorage.removeItem("ml_missoes");
    localStorage.removeItem("ml_db_initialized");
    localStorage.removeItem("ml_db_initialized_v2");
    localStorage.removeItem("ml_db_initialized_v3");
  }

  // Clear old cached missions if present in localStorage
  const cachedMissions = localStorage.getItem("ml_missoes");
  if (cachedMissions) {
    try {
      const parsed = JSON.parse(cachedMissions);
      if (Array.isArray(parsed)) {
        const hasOld = parsed.some(m => m.id === "m1" || m.id === "m2" || m.id === "m3" || m.id === "m4" || !m.id.startsWith("meta_"));
        if (hasOld) {
          localStorage.removeItem("ml_missoes");
          localStorage.removeItem("ml_db_initialized_v4");
        }
      }
    } catch (e) {
      localStorage.removeItem("ml_missoes");
    }
  }

  if (!localStorage.getItem("ml_db_initialized_v4")) {
    localStorage.setItem("ml_regras", JSON.stringify(DEFAULT_PONTUACAO_REGRAS));
    localStorage.setItem("ml_colaboradores", JSON.stringify(DEFAULT_COLABORADORES));
    localStorage.setItem("ml_indicacoes", JSON.stringify(DEFAULT_INDICACOES));
    localStorage.setItem("ml_evidencias", JSON.stringify(DEFAULT_EVIDENCIAS));
    localStorage.setItem("ml_notificacoes", JSON.stringify(DEFAULT_NOTIFICACOES));
    localStorage.setItem("ml_clientes", JSON.stringify(DEFAULT_CLIENTES));
    localStorage.setItem("ml_premios", JSON.stringify(DEFAULT_PREMIOS));
    localStorage.setItem("ml_mensagens_coletivas", JSON.stringify(DEFAULT_MENSAGENS_COLETIVAS));
    localStorage.setItem("ml_orientacoes_individuais", JSON.stringify(DEFAULT_ORIENTACOES_INDIVIDUAIS));
    
    // Mission states (Removed Check-in, added learning mission)
    const defaultMissions = [
      { id: "meta_elogio", titulo: "Elogio Espontâneo do Cliente", desc: "Atendimento reconhecido espontaneamente pelo cliente nos canais oficiais", pontos: 15, icone: "Sparkles", status: "concluido" },
      { id: "meta_monitoria", titulo: "Monitoria de Excelência", desc: "Nota acima de 98% na monitoria de qualidade e atendimento", pontos: 10, icone: "Award", status: "disponivel" },
      { id: "meta_reversao", titulo: "Reversão de Cliente Insatisfeito", desc: "Situação crítica revertida com empatia, agilidade e senso de dono", pontos: 10, icone: "Heart", status: "disponivel" },
      { id: "meta_distrato", titulo: "Reversão de Distrato", desc: "Recuperação de relacionamento e retenção do cliente com excelência", pontos: 10, icone: "Target", status: "disponivel" },
      { id: "meta_cadastro", titulo: "Cadastro de Indicação", desc: "Cliente participou do programa de indicação através da atuação do colaborador", pontos: 15, icone: "Users", status: "concluido" },
      { id: "meta_conversao", titulo: "Conversão da Indicação em Venda", desc: "Indicação convertida em oportunidade real de negócio para a empresa", pontos: 30, icone: "Coins", status: "disponivel" }
    ];
    localStorage.setItem("ml_missoes", JSON.stringify(defaultMissions));
    localStorage.setItem("ml_db_initialized_v4", "true");
  }
};

export const getData = (key) => {
  initializeDatabase();
  
  if (key === "mensagens_coletivas" && !localStorage.getItem("ml_mensagens_coletivas")) {
    localStorage.setItem("ml_mensagens_coletivas", JSON.stringify(DEFAULT_MENSAGENS_COLETIVAS));
    return DEFAULT_MENSAGENS_COLETIVAS;
  }
  if (key === "orientacoes_individuais" && !localStorage.getItem("ml_orientacoes_individuais")) {
    localStorage.setItem("ml_orientacoes_individuais", JSON.stringify(DEFAULT_ORIENTACOES_INDIVIDUAIS));
    return DEFAULT_ORIENTACOES_INDIVIDUAIS;
  }

  const data = JSON.parse(localStorage.getItem(`ml_${key}`));
  
  if (key === "colaboradores" && Array.isArray(data)) {
    let modified = false;
    const updated = data.map(col => {
      if (col.nivel !== undefined) {
        modified = true;
        delete col.nivel;
      }
      if (col.pontosMensal === undefined) {
        modified = true;
        const defaultCol = DEFAULT_COLABORADORES.find(dc => dc.id === col.id) || DEFAULT_COLABORADORES[0];
        col.pontosMensal = defaultCol.pontosMensal;
        col.pontos = defaultCol.pontos; // align points with trimestral
      }
      return col;
    });
    if (modified) {
      localStorage.setItem("ml_colaboradores", JSON.stringify(updated));
      return updated;
    }
  }

  if (key === "missoes" && Array.isArray(data)) {
    const hasOldMissions = data.some(m => m.id === "m1" || m.id === "m2" || m.id === "m3" || m.id === "m4" || !m.id.startsWith("meta_"));
    if (hasOldMissions) {
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
};

export const setData = (key, data) => {
  localStorage.setItem(`ml_${key}`, JSON.stringify(data));
};

// Gamified actions

// 2. Submit Evidence
export const enviarEvidencia = (colaboradorId, tipo, descricao, arquivoNome) => {
  const colaboradores = getData("colaboradores");
  const colaborador = colaboradores.find(c => c.id === colaboradorId);
  const evidencias = getData("evidencias");
  const regras = getData("regras");

  let pontosMap = {
    elogio: regras.encantar.elogio,
    reversao_insatisfeito: regras.resolver.reversao_insatisfeito,
    reversao_distrato: regras.resolver.reversao_distrato,
    melhoria: regras.resolver.melhoria
  };

  const novaEvidencia = {
    id: `EVI${Date.now()}`,
    colaboradorId,
    colaboradorNome: colaborador.nome,
    tipo,
    descricao,
    urlEvidencia: arquivoNome || "print.png",
    pontosAprovados: pontosMap[tipo] || 10,
    status: "pendente",
    dataEnvio: new Date().toISOString().split("T")[0],
    feedbackGestor: ""
  };

  evidencias.unshift(novaEvidencia);
  setData("evidencias", evidencias);

  // Notify Gestor
  const notificacoes = getData("notificacoes");
  notificacoes.unshift({
    id: `NOT${Date.now()}`,
    paraPerfil: "gestor",
    mensagem: `Nova evidência de ${tipo.toUpperCase().replace("_", " ")} enviada por ${colaborador.nome}.`,
    lida: false,
    data: new Date().toISOString()
  });
  setData("notificacoes", notificacoes);

  return novaEvidencia;
};

// 3. Approve/Reject Evidence
export const gerenciarEvidencia = (evidenciaId, status, feedback) => {
  const evidencias = getData("evidencias");
  const colaboradores = getData("colaboradores");
  const notificacoes = getData("notificacoes");

  const evIdx = evidencias.findIndex(e => e.id === evidenciaId);
  if (evIdx === -1) return null;

  evidencias[evIdx].status = status;
  evidencias[evIdx].feedbackGestor = feedback;
  const ev = evidencias[evIdx];

  if (status === "aprovado") {
    const colIdx = colaboradores.findIndex(c => c.id === ev.colaboradorId);
    if (colIdx !== -1) {
      colaboradores[colIdx].pontos += ev.pontosAprovados;
      colaboradores[colIdx].pontosMensal += ev.pontosAprovados;
      colaboradores[colIdx].moedas += ev.pontosAprovados;
    }
  }

  setData("evidencias", evidencias);
  setData("colaboradores", colaboradores);

  // Notify Colaborador
  notificacoes.unshift({
    id: `NOT${Date.now()}`,
    paraPerfil: "colaborador",
    paraId: ev.colaboradorId,
    mensagem: `Sua ação foi ${status === "aprovado" ? "APROVADA (+ " + ev.pontosAprovados + " pts)" : "REPROVADA"}.`,
    lida: false,
    data: new Date().toISOString()
  });
  setData("notificacoes", notificacoes);

  return ev;
};

// 4. Register Referral
export const cadastrarIndicacao = (clienteNome, clienteTelefone, indicadoNome, indicadoTelefone, empreendimento, colaboradorId) => {
  const indicacoes = getData("indicacoes");
  const colaboradores = getData("colaboradores");
  const notificacoes = getData("notificacoes");

  const novaIndicacao = {
    id: `IND${Date.now()}`,
    clienteNome,
    clienteTelefone,
    indicadoNome,
    indicadoTelefone,
    empreendimento,
    status: "cadastro",
    colaboradorId: colaboradorId || "ATD1023",
    dataCadastro: new Date().toISOString().split("T")[0],
    dataConversao: null
  };

  indicacoes.unshift(novaIndicacao);
  setData("indicacoes", indicacoes);

  // +15 points & coins to referring employee
  const colIdx = colaboradores.findIndex(c => c.id === novaIndicacao.colaboradorId);
  if (colIdx !== -1) {
    const regras = getData("regras");
    colaboradores[colIdx].pontos += regras.indicar.cadastro_indicao;
    colaboradores[colIdx].pontosMensal += regras.indicar.cadastro_indicao;
    colaboradores[colIdx].moedas += regras.indicar.cadastro_indicao;

    notificacoes.unshift({
      id: `NOT${Date.now()}`,
      paraPerfil: "colaborador",
      paraId: novaIndicacao.colaboradorId,
      mensagem: `Você recebeu +15 pts por indicação cadastrada pelo cliente ${clienteNome}!`,
      lida: false,
      data: new Date().toISOString()
    });
    setData("colaboradores", colaboradores);
  }

  return novaIndicacao;
};

// 5. Update Referral Status / Convert to Sale
export const atualizarStatusIndicacao = (indicacaoId, novoStatus) => {
  const indicacoes = getData("indicacoes");
  const colaboradores = getData("colaboradores");
  const notificacoes = getData("notificacoes");
  const regras = getData("regras");

  const indIdx = indicacoes.findIndex(i => i.id === indicacaoId);
  if (indIdx === -1) return null;

  const antigaStatus = indicacoes[indIdx].status;
  indicacoes[indIdx].status = novoStatus;

  if (novoStatus === "venda_convertida" && antigaStatus !== "venda_convertida") {
    indicacoes[indIdx].dataConversao = new Date().toISOString().split("T")[0];

    // +30 points & coins to employee
    const colIdx = colaboradores.findIndex(c => c.id === indicacoes[indIdx].colaboradorId);
    if (colIdx !== -1) {
      colaboradores[colIdx].pontos += regras.indicar.conversao_venda;
      colaboradores[colIdx].pontosMensal += regras.indicar.conversao_venda;
      colaboradores[colIdx].moedas += regras.indicar.conversao_venda;

      notificacoes.unshift({
        id: `NOT${Date.now()}`,
        paraPerfil: "colaborador",
        paraId: indicacoes[indIdx].colaboradorId,
        mensagem: `Venda concluída de indicação! (+30 pts)`,
        lida: false,
        data: new Date().toISOString()
      });
      setData("colaboradores", colaboradores);
    }
  }

  setData("indicacoes", indicacoes);
  setData("notificacoes", notificacoes);

  return indicacoes[indIdx];
};

// 6. Reset Database
export const resetDatabase = () => {
  localStorage.removeItem("ml_regras");
  localStorage.removeItem("ml_colaboradores");
  localStorage.removeItem("ml_indicacoes");
  localStorage.removeItem("ml_evidencias");
  localStorage.removeItem("ml_notificacoes");
  localStorage.removeItem("ml_clientes");
  localStorage.removeItem("ml_premios");
  localStorage.removeItem("ml_missoes");
  localStorage.removeItem("ml_db_initialized");
  localStorage.removeItem("ml_db_initialized_v2");
  localStorage.removeItem("ml_db_initialized_v3");
  localStorage.removeItem("ml_db_initialized_v4");
  initializeDatabase();
};
