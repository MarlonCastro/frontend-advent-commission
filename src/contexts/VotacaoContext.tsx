import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ministerios } from '../data/ministerios';
import type { Ministerio } from '../data/ministerios';
import useLocalStorage from '../hooks/useLocalStorage';
import { enviarFinalizacaoComissao } from '../utils/googleForms';
import { useToast } from './ToastContext';

// Tipos
interface Candidato {
  id: string;
  nome: string;
  votos: number;
}

interface ResultadoMinisterio {
  ministerioId: string;
  ministerioNome: string;
  cargoId: string;
  cargoNome: string;
  candidatos: Candidato[];
  vencedor?: string;
  timestamp: number;
  tempoGasto: number; // em segundos
  semCandidatos?: boolean; // true quando ministério foi encerrado sem candidatos
}

interface PreCadastroMinisterio {
  ministerioId: string;
  liderancaAtual: {
    diretor: string;
    diretorAssociado?: string;
  };
  interessados: string[];
}

interface ConfiguracaoVagas {
  ministerioId: string;
  numeroVagas: number;
}

interface VotacaoContextData {
  // Estados
  ministerios: Ministerio[];
  ministerioAtual: Ministerio | null;
  etapaAtual: 1 | 2 | 3; // 1: explicação, 2: indicação, 3: votação
  candidatos: Candidato[];
  progressoGeral: number;
  resultados: ResultadoMinisterio[];
  tempoEstimado: number; // em segundos

  // Configuração da Comissão
  nomeIgreja: string;
  ministeriosSelecionados: string[];
  departamentosPersonalizados: Ministerio[];
  ministeriosDisponiveis: Ministerio[];
  preCadastros: PreCadastroMinisterio[];
  configuracoesVagas: ConfiguracaoVagas[];
  inicioComissao: number | null;
  comissaoEncerrada: boolean;

  // Funções
  selecionarMinisterio: (id: string) => void;
  proximaEtapa: () => void;
  voltarEtapa: () => void;
  cancelarMinisterio: () => void;
  adicionarCandidato: (nome: string) => void;
  removerCandidato: (id: string) => void;
  adicionarVoto: (candidatoId: string) => void;
  removerVoto: (candidatoId: string) => void;
  zerarVotosCandidato: (candidatoId: string) => void;
  finalizarMinisterio: () => void;
  encerrarSemCandidatos: () => void;
  reabrirIndicacao: (ministerioId: string) => void;
  resetarSistema: () => void;

  // Funções de Configuração
  setNomeIgreja: (nome: string) => void;
  toggleMinisterioSelecionado: (id: string) => void;
  adicionarDepartamentoPersonalizado: (nome: string, descricao: string, vagas: number) => void;
  removerDepartamentoPersonalizado: (id: string) => void;
  selecionarTodosMinisterios: () => void;
  desselecionarTodosMinisterios: () => void;

  // Funções de Pré-Cadastro
  setLiderancaAtual: (ministerioId: string, diretor: string, diretorAssociado?: string) => void;
  adicionarInteressado: (ministerioId: string, nome: string) => void;
  removerInteressado: (ministerioId: string, nome: string) => void;
  getPreCadastro: (ministerioId: string) => PreCadastroMinisterio | undefined;
  getSugestoesMinisterio: (ministerioId: string) => string[];

  // Funções de Configuração de Vagas
  setNumeroVagas: (ministerioId: string, numeroVagas: number) => void;
  getNumeroVagas: (ministerioId: string) => number;

  // Função de Controle da Comissão
  iniciarCronometroComissao: () => void;
  encerrarComissao: () => void;
}

const VotacaoContext = createContext<VotacaoContextData | undefined>(undefined);

interface VotacaoProviderProps {
  children: ReactNode;
}

export const VotacaoProvider = ({ children }: VotacaoProviderProps) => {
  const { success } = useToast();

  // Estados persistidos no localStorage
  const [ministerioAtualId, setMinisterioAtualId] = useLocalStorage<string | null>('ministerioAtualId', null);
  const [etapaAtual, setEtapaAtual] = useLocalStorage<1 | 2 | 3>('etapaAtual', 1);
  const [candidatos, setCandidatos] = useLocalStorage<Candidato[]>('candidatos', []);
  const [resultados, setResultados] = useLocalStorage<ResultadoMinisterio[]>('resultados', []);
  const [inicioEtapa, setInicioEtapa] = useState<number>(Date.now());

  // Configuração da Comissão
  const [nomeIgreja, setNomeIgreja] = useLocalStorage<string>('nomeIgreja', '');
  const [ministeriosSelecionados, setMinisteriosSelecionados] = useLocalStorage<string[]>('ministeriosSelecionados', []);
  const [departamentosPersonalizados, setDepartamentosPersonalizados] = useLocalStorage<Ministerio[]>('departamentosPersonalizados', []);
  const [preCadastros, setPreCadastros] = useLocalStorage<PreCadastroMinisterio[]>('preCadastros', []);
  const [configuracoesVagas, setConfiguracoesVagas] = useLocalStorage<ConfiguracaoVagas[]>('configuracoesVagas', []);
  const [inicioComissao, setInicioComissao] = useLocalStorage<number | null>('inicioComissao', null);
  const [comissaoEncerrada, setComissaoEncerrada] = useLocalStorage<boolean>('comissaoEncerrada', false);
  const [finalizacaoEnviada, setFinalizacaoEnviada] = useLocalStorage<boolean>('finalizacaoEnviada', false);

  // Estado derivado - Ministérios disponíveis (padrão + personalizados)
  const todosMinisterios = [...ministerios, ...departamentosPersonalizados];

  // Ministérios que serão usados no processo (apenas os selecionados)
  const ministeriosDisponiveis = ministeriosSelecionados.length > 0
    ? todosMinisterios.filter(m => ministeriosSelecionados.includes(m.id))
    : todosMinisterios;

  const ministerioAtual = ministerioAtualId
    ? ministeriosDisponiveis.find(m => m.id === ministerioAtualId) || null
    : null;

  // Calcula progresso geral (% de ministérios finalizados)
  const progressoGeral = ministeriosDisponiveis.length > 0
    ? Math.round((resultados.length / ministeriosDisponiveis.length) * 100)
    : 0;

  // Calcula tempo estimado baseado no histórico
  const tempoEstimado = (() => {
    if (resultados.length === 0 || ministeriosDisponiveis.length === 0) return 0;

    const tempoTotal = resultados.reduce((acc, r) => acc + r.tempoGasto, 0);
    const tempoMedio = tempoTotal / resultados.length;
    const ministeriosRestantes = ministeriosDisponiveis.length - resultados.length;

    return Math.round(tempoMedio * ministeriosRestantes);
  })();

  // Persiste o tempo de início da etapa quando muda
  useEffect(() => {
    setInicioEtapa(Date.now());
  }, [etapaAtual]);

  // Função: Selecionar Ministério
  const selecionarMinisterio = (id: string) => {
    const ministerio = todosMinisterios.find(m => m.id === id);
    if (ministerio) {
      setMinisterioAtualId(id);
      setEtapaAtual(1);
      setCandidatos([]);
      setInicioEtapa(Date.now());
    }
  };

  // Função: Próxima Etapa
  const proximaEtapa = () => {
    if (etapaAtual < 3) {
      setEtapaAtual((etapaAtual + 1) as 1 | 2 | 3);
    }
  };

  // Função: Voltar Etapa
  const voltarEtapa = () => {
    if (etapaAtual > 1) {
      setEtapaAtual((etapaAtual - 1) as 1 | 2 | 3);
    } else {
      // Se está na etapa 1, cancela o ministério
      cancelarMinisterio();
    }
  };

  // Função: Cancelar Ministério Atual
  const cancelarMinisterio = () => {
    setMinisterioAtualId(null);
    setEtapaAtual(1);
    setCandidatos([]);
  };

  // Função: Adicionar Candidato
  const adicionarCandidato = (nome: string) => {
    if (!nome.trim()) return;

    const novoCandidato: Candidato = {
      id: `candidato-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      nome: nome.trim(),
      votos: 0,
    };

    setCandidatos([...candidatos, novoCandidato]);
  };

  // Função: Remover Candidato
  const removerCandidato = (id: string) => {
    setCandidatos(candidatos.filter(c => c.id !== id));
  };

  // Função: Adicionar Voto
  const adicionarVoto = (candidatoId: string) => {
    setCandidatos(
      candidatos.map(c =>
        c.id === candidatoId
          ? { ...c, votos: c.votos + 1 }
          : c
      )
    );
  };

  // Função: Remover Voto
  const removerVoto = (candidatoId: string) => {
    setCandidatos(
      candidatos.map(c =>
        c.id === candidatoId && c.votos > 0
          ? { ...c, votos: c.votos - 1 }
          : c
      )
    );
  };

  // Função: Zerar Votos de um Candidato
  const zerarVotosCandidato = (candidatoId: string) => {
    setCandidatos(
      candidatos.map(c =>
        c.id === candidatoId
          ? { ...c, votos: 0 }
          : c
      )
    );
  };

  // Função: Finalizar Ministério
  const finalizarMinisterio = () => {
    if (!ministerioAtual) return;

    const tempoGasto = Math.round((Date.now() - inicioEtapa) / 1000);
    const vencedor = candidatos.reduce((prev, current) =>
      current.votos > prev.votos ? current : prev
      , candidatos[0]);

    const resultado: ResultadoMinisterio = {
      ministerioId: ministerioAtual.id,
      ministerioNome: ministerioAtual.nome,
      cargoId: ministerioAtual.cargos[0]?.id || '',
      cargoNome: ministerioAtual.cargos[0]?.nome || '',
      candidatos: [...candidatos],
      vencedor: vencedor?.nome,
      timestamp: Date.now(),
      tempoGasto,
      semCandidatos: false,
    };

    setResultados([...resultados, resultado]);
    setMinisterioAtualId(null);
    setEtapaAtual(1);
    setCandidatos([]);

    // Mostrar toast de sucesso
    success(
      'Votação Finalizada!',
      `${ministerioAtual.nome} - ${vencedor?.nome} foi eleito(a)`,
      5000
    );
  };

  // Função: Encerrar Ministério Sem Candidatos
  const encerrarSemCandidatos = () => {
    if (!ministerioAtual) return;

    const tempoGasto = Math.round((Date.now() - inicioEtapa) / 1000);

    const resultado: ResultadoMinisterio = {
      ministerioId: ministerioAtual.id,
      ministerioNome: ministerioAtual.nome,
      cargoId: ministerioAtual.cargos[0]?.id || '',
      cargoNome: ministerioAtual.cargos[0]?.nome || '',
      candidatos: [],
      vencedor: undefined,
      timestamp: Date.now(),
      tempoGasto,
      semCandidatos: true,
    };

    setResultados([...resultados, resultado]);
    setMinisterioAtualId(null);
    setEtapaAtual(1);
    setCandidatos([]);
  };

  // Função: Reabrir Indicação (remove resultado de ministério sem candidatos)
  const reabrirIndicacao = (ministerioId: string) => {
    // Remove o resultado do ministério para permitir nova indicação
    const novosResultados = resultados.filter(r => r.ministerioId !== ministerioId);
    setResultados(novosResultados);

    // Seleciona o ministério novamente para reiniciar o processo
    selecionarMinisterio(ministerioId);
  };

  // Função: Resetar Sistema
  const resetarSistema = () => {
    if (window.confirm('Tem certeza que deseja resetar todo o sistema? Esta ação não pode ser desfeita.')) {
      setMinisterioAtualId(null);
      setEtapaAtual(1);
      setCandidatos([]);
      setResultados([]);
      setInicioEtapa(Date.now());
      setNomeIgreja('');
      setMinisteriosSelecionados([]);
      setDepartamentosPersonalizados([]);
      setPreCadastros([]);
      setConfiguracoesVagas([]);
      setInicioComissao(null);
      setComissaoEncerrada(false);
      setFinalizacaoEnviada(false);
    }
  };

  // ========== Funções de Configuração da Comissão ==========

  // Função: Toggle Ministério Selecionado
  const toggleMinisterioSelecionado = (id: string) => {
    if (ministeriosSelecionados.includes(id)) {
      setMinisteriosSelecionados(ministeriosSelecionados.filter(mid => mid !== id));
    } else {
      setMinisteriosSelecionados([...ministeriosSelecionados, id]);
    }
  };

  // Função: Adicionar Departamento Personalizado
  const adicionarDepartamentoPersonalizado = (nome: string, descricao: string, vagas: number) => {
    const novoDepartamento: Ministerio = {
      id: `personalizado-${Date.now()}`,
      nome,
      descricao,
      explicacao: descricao,
      categoria: 'personalizado',
      cargos: Array.from({ length: vagas }, (_, i) => ({
        id: `cargo-${i + 1}`,
        nome: `Cargo ${i + 1}`,
        tipo: 'diretor' as const,
      })),
    };

    setDepartamentosPersonalizados([...departamentosPersonalizados, novoDepartamento]);
    setMinisteriosSelecionados([...ministeriosSelecionados, novoDepartamento.id]);
  };

  // Função: Remover Departamento Personalizado
  const removerDepartamentoPersonalizado = (id: string) => {
    setDepartamentosPersonalizados(departamentosPersonalizados.filter(d => d.id !== id));
    setMinisteriosSelecionados(ministeriosSelecionados.filter(mid => mid !== id));
  };

  // Função: Selecionar Todos os Ministérios
  const selecionarTodosMinisterios = () => {
    const todosIds = todosMinisterios.map(m => m.id);
    setMinisteriosSelecionados(todosIds);
  };

  // Função: Desselecionar Todos os Ministérios
  const desselecionarTodosMinisterios = () => {
    setMinisteriosSelecionados([]);
  };

  // ========== Funções de Pré-Cadastro ==========

  // Função: Definir Liderança Atual
  const setLiderancaAtual = (ministerioId: string, diretor: string, diretorAssociado?: string) => {
    const preCadastroExistente = preCadastros.find(p => p.ministerioId === ministerioId);

    if (preCadastroExistente) {
      setPreCadastros(preCadastros.map(p =>
        p.ministerioId === ministerioId
          ? { ...p, liderancaAtual: { diretor, diretorAssociado } }
          : p
      ));
    } else {
      setPreCadastros([...preCadastros, {
        ministerioId,
        liderancaAtual: { diretor, diretorAssociado },
        interessados: []
      }]);
    }
  };

  // Função: Adicionar Interessado
  const adicionarInteressado = (ministerioId: string, nome: string) => {
    const preCadastroExistente = preCadastros.find(p => p.ministerioId === ministerioId);

    if (preCadastroExistente) {
      if (!preCadastroExistente.interessados.includes(nome)) {
        setPreCadastros(preCadastros.map(p =>
          p.ministerioId === ministerioId
            ? { ...p, interessados: [...p.interessados, nome] }
            : p
        ));
      }
    } else {
      setPreCadastros([...preCadastros, {
        ministerioId,
        liderancaAtual: { diretor: '', diretorAssociado: '' },
        interessados: [nome]
      }]);
    }
  };

  // Função: Remover Interessado
  const removerInteressado = (ministerioId: string, nome: string) => {
    setPreCadastros(preCadastros.map(p =>
      p.ministerioId === ministerioId
        ? { ...p, interessados: p.interessados.filter(i => i !== nome) }
        : p
    ));
  };

  // Função: Obter Pré-Cadastro de um Ministério
  const getPreCadastro = (ministerioId: string) => {
    return preCadastros.find(p => p.ministerioId === ministerioId);
  };

  // Função: Obter Sugestões de um Ministério (liderança + interessados + histórico)
  const getSugestoesMinisterio = (ministerioId: string) => {
    const sugestoes = new Set<string>();

    // Adicionar do pré-cadastro
    const preCadastro = preCadastros.find(p => p.ministerioId === ministerioId);
    if (preCadastro) {
      if (preCadastro.liderancaAtual.diretor) {
        sugestoes.add(preCadastro.liderancaAtual.diretor);
      }
      if (preCadastro.liderancaAtual.diretorAssociado) {
        sugestoes.add(preCadastro.liderancaAtual.diretorAssociado);
      }
      preCadastro.interessados.forEach(i => sugestoes.add(i));
    }

    // Adicionar de resultados anteriores
    resultados.forEach(resultado => {
      resultado.candidatos.forEach(candidato => {
        sugestoes.add(candidato.nome);
      });
    });

    return Array.from(sugestoes);
  };

  // ========== Funções de Configuração de Vagas ==========

  // Função: Definir Número de Vagas
  const setNumeroVagas = (ministerioId: string, numeroVagas: number) => {
    const configuracaoExistente = configuracoesVagas.find(c => c.ministerioId === ministerioId);

    if (configuracaoExistente) {
      setConfiguracoesVagas(configuracoesVagas.map(c =>
        c.ministerioId === ministerioId ? { ...c, numeroVagas } : c
      ));
    } else {
      setConfiguracoesVagas([...configuracoesVagas, { ministerioId, numeroVagas }]);
    }
  };

  // Função: Obter Número de Vagas
  const getNumeroVagas = (ministerioId: string): number => {
    const configuracao = configuracoesVagas.find(c => c.ministerioId === ministerioId);

    // Valores padrão/fixos para ministérios especiais
    if (ministerioId === 'desbravadores' || ministerioId === 'aventureiros') {
      return 3; // FIXO: 1 Diretor + 2 Diretores Associados
    }

    if (ministerioId === 'diaconos' || ministerioId === 'diaconisas') {
      return configuracao?.numeroVagas || 15; // Padrão 15
    }

    if (ministerioId === 'anciao') {
      return configuracao?.numeroVagas || 4; // Padrão 4 anciãos (configurável)
    }

    // Para outros ministérios, usar o número de cargos definido
    const ministerio = todosMinisterios.find(m => m.id === ministerioId);
    return ministerio?.cargos.length || 2;
  };

  // ========== Funções de Controle da Comissão ==========

  // Função: Iniciar Cronômetro da Comissão
  const iniciarCronometroComissao = () => {
    if (!inicioComissao) {
      setInicioComissao(Date.now());
    }
  };

  // Função: Encerrar Comissão Manualmente
  const encerrarComissao = async () => {
    setComissaoEncerrada(true);

    // Evitar envio duplicado
    if (finalizacaoEnviada) {
      console.log('⚠️ Finalização já foi enviada anteriormente');
      return;
    }

    // Calcular duração total da comissão
    if (inicioComissao) {
      const duracaoSegundos = Math.floor((Date.now() - inicioComissao) / 1000);

      // Enviar para Google Forms
      await enviarFinalizacaoComissao(nomeIgreja, duracaoSegundos);

      // Marcar como enviado
      setFinalizacaoEnviada(true);
    }
  };

  const value: VotacaoContextData = {
    ministerios,
    ministerioAtual,
    etapaAtual,
    candidatos,
    progressoGeral,
    resultados,
    tempoEstimado,
    nomeIgreja,
    ministeriosSelecionados,
    departamentosPersonalizados,
    ministeriosDisponiveis,
    preCadastros,
    configuracoesVagas,
    inicioComissao,
    comissaoEncerrada,
    selecionarMinisterio,
    proximaEtapa,
    voltarEtapa,
    cancelarMinisterio,
    adicionarCandidato,
    removerCandidato,
    adicionarVoto,
    removerVoto,
    zerarVotosCandidato,
    finalizarMinisterio,
    encerrarSemCandidatos,
    reabrirIndicacao,
    resetarSistema,
    setNomeIgreja,
    toggleMinisterioSelecionado,
    adicionarDepartamentoPersonalizado,
    removerDepartamentoPersonalizado,
    selecionarTodosMinisterios,
    desselecionarTodosMinisterios,
    setLiderancaAtual,
    adicionarInteressado,
    removerInteressado,
    getPreCadastro,
    getSugestoesMinisterio,
    setNumeroVagas,
    getNumeroVagas,
    iniciarCronometroComissao,
    encerrarComissao,
  };

  return (
    <VotacaoContext.Provider value={value}>
      {children}
    </VotacaoContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useVotacao = () => {
  const context = useContext(VotacaoContext);
  if (context === undefined) {
    throw new Error('useVotacao deve ser usado dentro de um VotacaoProvider');
  }
  return context;
};

export default VotacaoContext;

