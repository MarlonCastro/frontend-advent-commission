import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ministerios } from '../data/ministerios';
import type { Ministerio } from '../data/ministerios';
import useLocalStorage from '../hooks/useLocalStorage';

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
  resetarSistema: () => void;
}

const VotacaoContext = createContext<VotacaoContextData | undefined>(undefined);

interface VotacaoProviderProps {
  children: ReactNode;
}

export const VotacaoProvider = ({ children }: VotacaoProviderProps) => {
  // Estados persistidos no localStorage
  const [ministerioAtualId, setMinisterioAtualId] = useLocalStorage<string | null>('ministerioAtualId', null);
  const [etapaAtual, setEtapaAtual] = useLocalStorage<1 | 2 | 3>('etapaAtual', 1);
  const [candidatos, setCandidatos] = useLocalStorage<Candidato[]>('candidatos', []);
  const [resultados, setResultados] = useLocalStorage<ResultadoMinisterio[]>('resultados', []);
  const [inicioEtapa, setInicioEtapa] = useState<number>(Date.now());

  // Estado derivado
  const ministerioAtual = ministerioAtualId
    ? ministerios.find(m => m.id === ministerioAtualId) || null
    : null;

  // Calcula progresso geral (% de ministérios finalizados)
  const progressoGeral = Math.round((resultados.length / ministerios.length) * 100);

  // Calcula tempo estimado baseado no histórico
  const tempoEstimado = (() => {
    if (resultados.length === 0) return 0;

    const tempoTotal = resultados.reduce((acc, r) => acc + r.tempoGasto, 0);
    const tempoMedio = tempoTotal / resultados.length;
    const ministeriosRestantes = ministerios.length - resultados.length;

    return Math.round(tempoMedio * ministeriosRestantes);
  })();

  // Persiste o tempo de início da etapa quando muda
  useEffect(() => {
    setInicioEtapa(Date.now());
  }, [etapaAtual]);

  // Função: Selecionar Ministério
  const selecionarMinisterio = (id: string) => {
    const ministerio = ministerios.find(m => m.id === id);
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
    };

    setResultados([...resultados, resultado]);
    setMinisterioAtualId(null);
    setEtapaAtual(1);
    setCandidatos([]);
  };

  // Função: Resetar Sistema
  const resetarSistema = () => {
    if (window.confirm('Tem certeza que deseja resetar todo o sistema? Esta ação não pode ser desfeita.')) {
      setMinisterioAtualId(null);
      setEtapaAtual(1);
      setCandidatos([]);
      setResultados([]);
      setInicioEtapa(Date.now());
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
    resetarSistema,
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

