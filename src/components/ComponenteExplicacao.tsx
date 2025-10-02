import { useState, useEffect } from 'react';
import { BookOpen, Clock, Users, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useVotacao } from '../contexts/VotacaoContext';
import { useNavigate } from 'react-router-dom';
import ModalMinisterio from './ModalMinisterio';

interface ComponenteExplicacaoProps {
  tempoLeitura?: number; // em segundos, padrão 120 (2 minutos)
  autoAvancar?: boolean;
}

const ComponenteExplicacao = ({
  tempoLeitura = 120,
  autoAvancar = false
}: ComponenteExplicacaoProps) => {
  const { ministerioAtual, proximaEtapa, etapaAtual, cancelarMinisterio, getNumeroVagas } = useVotacao();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(tempoLeitura);
  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false);
  const [ministeriosExplicados, setMinisteriosExplicados] = useState<Set<string>>(
    () => {
      const saved = localStorage.getItem('ministeriosExplicados');
      return new Set(saved ? JSON.parse(saved) : []);
    }
  );

  // Verificar se já foi explicado
  const jaFoiExplicado = ministerioAtual
    ? ministeriosExplicados.has(ministerioAtual.id)
    : false;

  // Timer para leitura
  useEffect(() => {
    if (!isModalOpen || !autoAvancar) return;

    if (tempoRestante <= 0) {
      handleProximaEtapa();
      return;
    }

    const timer = setInterval(() => {
      setTempoRestante(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isModalOpen, tempoRestante, autoAvancar]);

  // Resetar timer quando modal abre
  useEffect(() => {
    if (isModalOpen) {
      setTempoRestante(tempoLeitura);
    }
  }, [isModalOpen, tempoLeitura]);

  // Abrir modal automaticamente quando etapa 1 e tem ministério selecionado
  useEffect(() => {
    if (ministerioAtual && etapaAtual === 1) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [ministerioAtual, etapaAtual]);

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProximaEtapa = () => {
    if (ministerioAtual) {
      // Marcar como explicado
      const novosExplicados = new Set(ministeriosExplicados);
      novosExplicados.add(ministerioAtual.id);
      setMinisteriosExplicados(novosExplicados);
      localStorage.setItem('ministeriosExplicados', JSON.stringify([...novosExplicados]));
    }

    proximaEtapa();
    setIsModalOpen(false);
    setConfirmacaoAberta(false);
    navigate('/votacao/indicacao');
  };

  const handleVoltar = () => {
    cancelarMinisterio();
    setIsModalOpen(false);
    navigate('/votacao');
  };

  const handleIniciarIndicacoes = () => {
    if (autoAvancar || jaFoiExplicado) {
      handleProximaEtapa();
    } else {
      setConfirmacaoAberta(true);
    }
  };

  if (!ministerioAtual) return null;

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'lideranca': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'ministerio': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'clube': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoriaName = (categoria: string) => {
    switch (categoria) {
      case 'lideranca': return 'Liderança';
      case 'ministerio': return 'Ministério';
      case 'clube': return 'Clube';
      default: return categoria;
    }
  };

  return (
    <ModalMinisterio
      isOpen={isModalOpen}
      onClose={handleVoltar}
      showCloseButton={false}
    >
      {!confirmacaoAberta ? (
        <div className="space-y-6">
          {/* Cabeçalho do Ministério */}
          <div className="text-center pb-4 border-b border-gray-200">
            <div className="flex items-center justify-center gap-3 mb-3">
              <BookOpen className="text-blue-600" size={32} />
              <h3 className="text-3xl font-bold text-gray-800">
                {ministerioAtual.nome}
              </h3>
            </div>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getCategoriaColor(ministerioAtual.categoria)}`}>
              {getCategoriaName(ministerioAtual.categoria)}
            </span>
            {jaFoiExplicado && (
              <div className="mt-3 flex items-center justify-center text-green-600 text-sm">
                <CheckCircle size={16} className="mr-1" />
                <span>Este ministério já foi explicado anteriormente</span>
              </div>
            )}
          </div>

          {/* Descrição Curta */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
            <p className="text-blue-900 font-medium">{ministerioAtual.descricao}</p>
          </div>

          {/* Número de Vagas */}
          <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg">
            <Users className="text-gray-600" size={24} />
            <span className="text-lg text-gray-700">
              <span className="font-bold text-2xl text-blue-600">{getNumeroVagas(ministerioAtual.id)}</span>
              {' '}vaga{getNumeroVagas(ministerioAtual.id) !== 1 ? 's' : ''} disponíve{getNumeroVagas(ministerioAtual.id) !== 1 ? 'is' : 'l'}
            </span>
          </div>

          {/* Lista de Cargos */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <Users size={20} className="mr-2 text-blue-600" />
              Cargos do Ministério:
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {ministerioAtual.cargos.map((cargo) => (
                <div
                  key={cargo.id}
                  className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition"
                >
                  <p className="font-medium text-gray-800">{cargo.nome}</p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">
                    {cargo.tipo.replace('_', ' ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Explicação Detalhada */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
              <BookOpen size={20} className="mr-2 text-blue-600" />
              Responsabilidades e Descrição:
            </h4>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {ministerioAtual.explicacao}
              </p>
            </div>
          </div>

          {/* Timer (se auto-avanço ativado) */}
          {autoAvancar && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-yellow-800">
                  <Clock size={20} className="mr-2" />
                  <span className="font-medium">Tempo de leitura:</span>
                </div>
                <span className="text-2xl font-bold text-yellow-600">
                  {formatarTempo(tempoRestante)}
                </span>
              </div>
              <div className="mt-2">
                <div className="w-full bg-yellow-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(tempoRestante / tempoLeitura) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleVoltar}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition"
            >
              <ArrowLeft size={20} />
              Voltar
            </button>
            <button
              onClick={handleIniciarIndicacoes}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg"
            >
              Iniciar Indicações
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        // Modal de Confirmação
        <div className="space-y-6 text-center py-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-blue-600" size={40} />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Confirmar Leitura
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Você confirma que leu e compreendeu todas as responsabilidades do ministério{' '}
              <span className="font-semibold text-gray-800">{ministerioAtual.nome}</span>?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <button
              onClick={() => setConfirmacaoAberta(false)}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition"
            >
              Reler
            </button>
            <button
              onClick={handleProximaEtapa}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg"
            >
              Sim, Prosseguir
            </button>
          </div>
        </div>
      )}
    </ModalMinisterio>
  );
};

export default ComponenteExplicacao;

