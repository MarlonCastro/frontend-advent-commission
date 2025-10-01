import { CheckCircle, Trophy, Users, TrendingUp, ArrowLeft, Check } from 'lucide-react';
import ModalMinisterio from './ModalMinisterio';

interface Candidato {
  id: string;
  nome: string;
  votos: number;
}

interface ConfirmacaoFinalizacaoProps {
  isOpen: boolean;
  candidatos: Candidato[];
  ministerioNome: string;
  onConfirmar: () => void;
  onContinuar: () => void;
}

const ConfirmacaoFinalizacao = ({
  isOpen,
  candidatos,
  ministerioNome,
  onConfirmar,
  onContinuar,
}: ConfirmacaoFinalizacaoProps) => {
  const totalVotos = candidatos.reduce((acc, c) => acc + c.votos, 0);
  const candidatosOrdenados = [...candidatos].sort((a, b) => b.votos - a.votos);
  const vencedor = candidatosOrdenados[0];

  const calcularPorcentagem = (votos: number) => {
    if (totalVotos === 0) return 0;
    return Math.round((votos / totalVotos) * 100);
  };

  return (
    <ModalMinisterio
      isOpen={isOpen}
      onClose={onContinuar}
      showCloseButton={false}
    >
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="text-center pb-4 border-b border-gray-200">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={40} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            Confirmar Finalização
          </h3>
          <p className="text-gray-600">
            Revise os resultados antes de finalizar a votação
          </p>
        </div>

        {/* Resumo do Ministério */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
          <p className="text-sm text-blue-700 font-semibold mb-1">Ministério</p>
          <p className="text-lg font-bold text-blue-900">{ministerioNome}</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-purple-600" size={20} />
              <span className="text-sm font-semibold text-purple-900">Candidatos</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">{candidatos.length}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-blue-600" size={20} />
              <span className="text-sm font-semibold text-blue-900">Total de Votos</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">{totalVotos}</p>
          </div>
        </div>

        {/* Vencedor Destacado */}
        {vencedor && vencedor.votos > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-lg p-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="text-yellow-600" size={32} />
              <h4 className="text-2xl font-bold text-yellow-900">Candidato Mais Votado</h4>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-900 mb-2">{vencedor.nome}</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-4xl font-bold text-yellow-600">{vencedor.votos}</span>
                <span className="text-lg text-yellow-700">
                  ({calcularPorcentagem(vencedor.votos)}% dos votos)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Resumo de Todos os Candidatos */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <TrendingUp size={20} className="mr-2 text-blue-600" />
            Resultado Completo:
          </h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {candidatosOrdenados.map((candidato, index) => (
              <div
                key={candidato.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-gray-500 font-bold text-lg min-w-[30px]">
                    #{index + 1}
                  </span>
                  <span className="font-semibold text-gray-800 truncate">
                    {candidato.nome}
                  </span>
                </div>
                <div className="text-right ml-4">
                  <p className="text-2xl font-bold text-blue-600">{candidato.votos}</p>
                  <p className="text-sm text-gray-600">{calcularPorcentagem(candidato.votos)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerta de Confirmação */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
          <p className="text-sm font-semibold text-orange-900 mb-1">⚠️ Atenção!</p>
          <p className="text-sm text-orange-800">
            Após confirmar, os resultados serão salvos e você não poderá modificar os votos.
            Certifique-se de que todos os votos foram registrados corretamente.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onContinuar}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition"
          >
            <ArrowLeft size={20} />
            Continuar Votando
          </button>
          <button
            onClick={onConfirmar}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition shadow-md hover:shadow-lg"
          >
            <Check size={20} />
            Confirmar e Finalizar
          </button>
        </div>
      </div>
    </ModalMinisterio>
  );
};

export default ConfirmacaoFinalizacao;

